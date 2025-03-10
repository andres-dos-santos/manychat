import {
	TAB_BAR_HEIGHT,
	TAB_ICON_MARGIN_TOP,
} from "@/app/(private)/(tabs)/_layout";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export function TabBarProfile() {
	const { user } = useUser();

	return (
		<TouchableOpacity
			onPress={() => router.push("/(private)/(tabs)/profile")}
			style={s.tabIcon}
			activeOpacity={0.8}
		>
			<Image source={{ uri: user?.imageUrl }} style={s.image} />
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	tabIcon: {
		height: TAB_BAR_HEIGHT,
		minHeight: TAB_BAR_HEIGHT,
		maxHeight: TAB_BAR_HEIGHT,
		alignItems: "center",
		justifyContent: "center",
		marginTop: TAB_ICON_MARGIN_TOP,
	},
	image: {
		height: 28,
		width: 28,
		borderRadius: 999,
	},
});
