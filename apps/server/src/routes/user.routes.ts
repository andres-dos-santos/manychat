import { Router } from "express";
import jwt from "jsonwebtoken";

import bodyParser from "body-parser";
import { Webhook } from "svix";
import { clerkClient } from "@clerk/express";
import { prisma } from "../prisma";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
	const user = await clerkClient.users.getUser(
		"user_2txInLTyodJfNxEU9rJjvMmswAI",
	);

	// console.log(user)

	res.send(user);
});

userRouter.post(
	"/api/webhooks",
	bodyParser.raw({ type: "application/json" }),
	async (req, res) => {
		const SIGNING_SECRET = process.env.SIGNING_SECRET;

		if (!SIGNING_SECRET) {
			throw new Error(
				"Error: Please add SIGNING_SECRET from Clerk Dashboard to .env",
			);
		}

		const wh = new Webhook(SIGNING_SECRET);

		const headers = req.headers;
		const payload = req.body;

		const svix_id = headers["svix-id"];
		const svix_timestamp = headers["svix-timestamp"];
		const svix_signature = headers["svix-signature"];

		if (!svix_id || !svix_timestamp || !svix_signature) {
			return void res.status(400).json({
				success: false,
				message: "Error: Missing svix headers",
			});
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let evt: any = {};

		try {
			evt = wh.verify(JSON.stringify(payload), {
				"svix-id": svix_id as string,
				"svix-timestamp": svix_timestamp as string,
				"svix-signature": svix_signature as string,
			});
		} catch (err) {
			return void res.status(400).json({
				success: false,
				message: (err as { message: string }).message,
			});
		}

		// const { id } = evt.data
		const eventType = evt.type;

		// console.log(JSON.stringify(evt, null, 2))

		if (evt.type === "session.created") {
			const authId = evt.data.user_id;

			const user = await clerkClient.users.getUser(authId);
			console.log(user);

			if (user) {
				const email = user.emailAddresses[0].emailAddress;

				const { id } = await prisma.user.create({
					data: {
						email,
						firstName: user.firstName ?? "",
						lastName: user.lastName ?? "",
						phone: "",
						imageUrl: user.imageUrl,
					},
					select: {
						id: true,
					},
				});

				const token = jwt.sign(
					{ id, authId: user.id, email },
					process.env.TOKEN_SECRET ?? "",
					{
						expiresIn: "7d",
					},
				);

				res.status(201).json({ token });
			}
		}
	},
);

export { userRouter };
