import { useAuth } from '@clerk/clerk-expo'
import { router, Slot } from 'expo-router'
import { useEffect } from 'react'

export function InitialLayout() {
	const { isLoaded, isSignedIn } = useAuth()

	useEffect(() => {
		if (!isLoaded) return

		if (isSignedIn) {
			router.replace('/(private)/(tabs)')
		} else {
			router.replace('/(auth)')
		}
	}, [isSignedIn, isLoaded])

	return <Slot />
}
