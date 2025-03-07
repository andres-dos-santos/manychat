import { Stack } from 'expo-router'

export default function AuthRoutesLayout() {
	return (
		<Stack screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="sign-up" options={{ headerShown: false }} />
		</Stack>
	)
}
