import { Feather } from "@expo/vector-icons";
import {
	Image,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { router } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function Profile() {
	const { user } = useUser();
	const { signOut } = useAuth();

	return (
		<View style={s.container}>
			<Image source={{ uri: user?.imageUrl }} style={s.picture} />

			<Text style={s.userName}>Andres</Text>
			<Text style={s.position}>Software Engineer</Text>

			<TouchableOpacity activeOpacity={0.8} style={s.editButton}>
				<Feather name="edit-3" color={Colors.black} />
				<Text style={s.editButtonTitle}>Editar</Text>
			</TouchableOpacity>

			<View style={s.content}>
				<Text style={s.title}>Inventário</Text>

				<View style={s.item}>
					<TouchableOpacity activeOpacity={0.8} style={s.button}>
						<View style={s.buttonIcon}>
							<Feather size={14} name="help-circle" />
						</View>
						<Text style={s.buttonTitle}>Suporte</Text>

						<Feather
							size={14}
							name="arrow-right"
							style={[
								s.buttonLinkIcon,
								{
									marginRight: 12,
								},
							]}
							color={Colors.zinc[400]}
						/>
					</TouchableOpacity>

					<View style={s.itemDivider} />

					<TouchableOpacity activeOpacity={0.8} style={s.button}>
						<View style={s.buttonIcon}>
							<Feather size={14} name="bell" />
						</View>
						<Text style={s.buttonTitle}>Push notifications</Text>

						<Switch style={s.buttonLinkIcon} />
					</TouchableOpacity>
				</View>

				<Text style={[s.title, { marginTop: 24 }]}>Preferências</Text>

				<View style={s.item}>
					<TouchableOpacity
						onPress={() => signOut().then(() => router.replace("/(auth)"))}
						activeOpacity={0.8}
						style={s.button}
					>
						<View style={[s.buttonIcon, { backgroundColor: Colors.red[100] }]}>
							<Feather size={14} name="log-out" color={Colors.red[500]} />
						</View>
						<Text style={[s.buttonTitle, { color: Colors.red[500] }]}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		alignItems: "center",
	},
	backButton: {
		position: "absolute",
		top: 32,
		left: 24,
	},
	picture: {
		height: 96,
		width: 96,
		backgroundColor: Colors.zinc[100],
		borderRadius: 999,
		marginTop: 56,
	},
	userName: {
		fontFamily: "500",
		fontSize: 16,
		letterSpacing: -0.5,
		marginTop: 24,
	},
	position: {
		marginTop: 8,
		fontFamily: "400",
		fontSize: 11,
		textTransform: "uppercase",
		color: Colors.zinc[400],
		textAlign: "center",
		letterSpacing: -0.25,
	},
	editButton: {
		height: 44,
		marginTop: 24,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: Colors.main,
		borderRadius: 999,
	},
	editButtonTitle: {
		fontFamily: "500",
		fontSize: 12,
		color: Colors.black,
	},
	content: {
		flex: 1,
		marginTop: 32,
		paddingHorizontal: 12,
		width: "100%",
	},
	title: {
		fontFamily: "500",
		fontSize: 11,
		color: Colors.zinc[500],
		letterSpacing: -0.25,
		marginBottom: 12,
		marginLeft: 8,
	},
	item: {
		backgroundColor: Colors.zinc[100],
		borderWidth: 1,
		borderRadius: 16,
		borderColor: Colors.zinc[200],
		paddingVertical: 2,
		paddingHorizontal: 8,
	},
	itemDivider: {
		backgroundColor: `${Colors.zinc[400]}80`,
		height: StyleSheet.hairlineWidth,
		width: "95%",
		marginHorizontal: "auto",
		marginVertical: 8,
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		height: 48,
	},
	buttonIcon: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.white,
		height: 32,
		width: 32,
		borderRadius: 8,
	},
	buttonTitle: {
		fontFamily: "400",
		letterSpacing: -0.25,
		fontSize: 13,
	},
	buttonLinkIcon: {
		marginLeft: "auto",
	},
});
