import { Router } from "express";

import bodyParser from "body-parser";
import { Webhook } from "svix";
import { clerkClient } from "@clerk/express";
import { prisma } from "../prisma";

const userRouter = Router();

userRouter.get("/api/v1/users", async (req, res) => {
	const users = await clerkClient.users.getUserList();

	const data = users.data.map((item) => ({
		name: item.firstName ?? item.emailAddresses[0].emailAddress.split("@")[0],
		email: item.emailAddresses[0].emailAddress,
		image: item.imageUrl,
		id: item.id,
	}));

	res.json(data);
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

			if (user) {
				const email = user.emailAddresses[0].emailAddress;

				const userAlreadyExists = await prisma.user.findFirst({
					where: { email },
				});

				if (!userAlreadyExists) {
					await prisma.user.create({
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

					res.status(201).json({ status: true, message: "Created!" });
				}

				res
					.status(400)
					.json({ status: false, message: "User already exists!" });
			}
		}
	},
);

export { userRouter };
