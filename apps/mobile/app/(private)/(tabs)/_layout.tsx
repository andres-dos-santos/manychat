import { router, Tabs } from "expo-router";
import React from "react";
import {
	Platform,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatSvg } from "@/components/svg/chat";
import { GroupSvg } from "@/components/svg/group";
import { Header } from "@/components/header";
import { TabBarProfile } from "@/components/tab-bar-profile";

export const TAB_BAR_HEIGHT = 64;
const TAB_BAR_PADDING_HORIZONTAL = 96;
export const TAB_ICON_MARGIN_TOP = 32;

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { top } = useSafeAreaInsets();

	return (
		<SafeAreaView style={[s.safeArea, { paddingTop: top }]}>
			<Tabs
				screenOptions={{
					animation: "fade",
					header(props) {
						return <Header>{props.options.title}</Header>;
					},
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					sceneStyle: s.container,
					tabBarStyle: Platform.select({
						ios: {
							position: "absolute",
						},
						default: {
							backgroundColor: "#1C1C1C",
							borderTopWidth: 0,
							height: TAB_BAR_HEIGHT,
							paddingHorizontal: TAB_BAR_PADDING_HORIZONTAL,
						},
					}),
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Messages",
						tabBarShowLabel: false,
						tabBarIcon: () => (
							<TouchableOpacity
								onPress={() => router.push("/(private)/(tabs)")}
								style={s.tabIcon}
								activeOpacity={0.8}
							>
								<ChatSvg />
							</TouchableOpacity>
						),
					}}
				/>
				<Tabs.Screen
					name="group"
					options={{
						title: "Groups",
						tabBarShowLabel: false,
						tabBarIcon: () => (
							<TouchableOpacity
								onPress={() => router.push("/(private)/(tabs)/group")}
								style={s.tabIcon}
								activeOpacity={0.8}
							>
								<GroupSvg />
							</TouchableOpacity>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Perfil",
						tabBarShowLabel: false,
						tabBarIcon: () => <TabBarProfile />,
					}}
				/>
				<Tabs.Screen
					name="chat/[user]"
					options={{
						href: null,
						tabBarShowLabel: false,
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}

const s = StyleSheet.create({
	tabIcon: {
		minHeight: TAB_BAR_HEIGHT,
		alignItems: "center",
		justifyContent: "center",
		marginTop: TAB_ICON_MARGIN_TOP,
		flex: 1,
	},
	safeArea: {
		flex: 1,
		backgroundColor: "#1C1C1C",
	},
	container: {
		paddingTop: 8,
		backgroundColor: "#FEFEFE",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		borderBottomLeftRadius: 32,
		borderBottomRightRadius: 32,
	},
});
