import { useAuth, useUser } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'

export default function Layout() {
	const { isSignedIn } = useAuth()
	const { user } = useUser()

	console.log(user)

	return (
		<Stack
			screenOptions={{
				animation: 'fade_from_bottom',
				contentStyle: { backgroundColor: '#1C1C1C' },
			}}
		>
			<Stack.Screen
				name="(auth)"
				options={{ headerShown: false }}
				redirect={!isSignedIn}
			/>
			<Stack.Screen
				name="(tabs)"
				options={{ headerShown: false }}
				redirect={!isSignedIn}
			/>
			<Stack.Screen
				name="create-group"
				options={{ headerShown: false }}
				redirect={!isSignedIn}
			/>
		</Stack>
	)
}
