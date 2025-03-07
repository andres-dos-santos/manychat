import {
	StyleSheet,
	Text,
	FlatList,
	View,
	Image,
	Pressable,
	TouchableOpacity,
	Button,
} from "react-native";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { height, width } from "@/utils/sizes";

import { GroupMembersList } from "@/components/group-members-list";
import { ListTitle } from "@/components/list-title";
import { addMember } from "@/slices/group-slice";
import type { RootState } from "@/store";
import { useGroup } from "@/hooks/use-group";
import { useAuth } from "@clerk/clerk-expo";
import { api } from "@/http/api";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UserDto } from "@/@types/user";

const DATA = [
	{
		image:
			"https://plus.unsplash.com/premium_photo-1669703777437-27602d656c27?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Lewis Park",
		time: "04:30",
		message: "Fala sumido",
	},
	{
		image:
			"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Mr. Carlos",
		time: "02:11",
		message: "Oi, preciso falar com você sobre uma coisa.",
	},
	{
		image:
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "Ana Clara",
		time: "10:15",
		message: "Conseguiu fazer o que te pedi?",
	},
];

async function getUsers() {
	const response = await api.get("users");

	if (response.ok) {
		const json = await response.json();

		return json;
	}

	console.log(response.status, response.statusText);
}

export default function HomeScreen() {
	const { members, addMember } = useGroup();

	const { data, error } = useQuery<UserDto>({
		queryKey: ["get-users"],
		queryFn: getUsers,
		// select(data) {
		// 	return data.map((item) => ({
		// 		...item,
		// 		email: item.emailAddresses[0].emailAddress,
		// 	}));
		// },
	});

	return (
		<>
			{members.length > 0 && (
				<>
					<View style={s.header}>
						<ListTitle>New Group ({members.length} members)</ListTitle>
						<Link asChild href="/create-group">
							<TouchableOpacity activeOpacity={0.8} style={s.createGroupButton}>
								<Text style={s.createGroupButtonTitle}>Criar</Text>
							</TouchableOpacity>
						</Link>
					</View>

					<GroupMembersList />
				</>
			)}

			<ListTitle style={s.title}>Friends</ListTitle>

			<FlatList
				style={s.list}
				contentContainerStyle={s.contentContainerStyle}
				ListEmptyComponent={() => (
					<View style={s.listEmpty}>
						<Text style={s.listEmptyTitle}>Add friends with email</Text>
					</View>
				)}
				// data={DATA}
				data={data}
				renderItem={({ item }) => {
					const isInTheGroup = members.find(
						(person) => person.name === item.name,
					);

					return (
						<Pressable
							onPress={() =>
								members.length === 0
									? router.push(`/chat/${item.name}`)
									: addMember(item.name, item.image)
							}
							onLongPress={() => addMember(item.name, item.image)}
							style={[s.item, { opacity: isInTheGroup ? 0.5 : 1 }]}
						>
							<Image source={{ uri: item.image }} style={s.image} />

							<View>
								<Text style={s.name}>{item.name}</Text>

								<View>
									<Text style={s.time}>
										{item.time} • <Text style={s.message}>{item.message}</Text>
									</Text>
								</View>
							</View>
						</Pressable>
					);
				}}
			/>
		</>
	);
}

const s = StyleSheet.create({
	listEmptyTitle: {
		fontFamily: "500",
		fontSize: 12,
		letterSpacing: -0.25,
	},
	listEmpty: {
		height: height / 1.3,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		marginTop: 24,
	},
	contentContainerStyle: {
		paddingHorizontal: 16,
	},
	list: {
		// marginTop: 32,
	},
	header: {
		flexDirection: "row",
		marginTop: 32,
		alignItems: "center",
		justifyContent: "space-between",
	},
	createGroupButton: {
		paddingRight: 16,
	},
	createGroupButtonTitle: {
		fontFamily: "500",
		fontSize: 12,
		color: "#2283E2",
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		width: width - 32,
		height: 72,
	},
	image: {
		height: 52,
		width: 52,
		borderRadius: 9999,
		backgroundColor: "#E4E4E7",
	},
	name: {
		fontFamily: "600",
		fontSize: 14,
		letterSpacing: -0.15,
		marginBottom: 4,
	},
	time: {
		fontFamily: "500",
		fontSize: 11,
		color: "#71717C",
		letterSpacing: -0.15,
	},
	message: {
		fontSize: 12,
		fontFamily: "400",
		color: "#1C1C1C",
	},
});
