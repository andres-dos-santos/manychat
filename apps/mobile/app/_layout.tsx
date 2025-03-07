import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import {
	Barlow_400Regular,
	Barlow_500Medium,
	Barlow_600SemiBold,
	Barlow_700Bold,
} from '@expo-google-fonts/barlow'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'

import { tokenCache } from '@/utils/cache'

import { store } from '@/store'

import { Toast } from '@/components/toast'
import { InitialLayout } from '@/components/initial-layout'

SplashScreen.preventAutoHideAsync()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''
const queryClient = new QueryClient()

if (!publishableKey) {
	throw new Error(
		'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
	)
}

export default function App() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		400: Barlow_400Regular,
		500: Barlow_500Medium,
		600: Barlow_600SemiBold,
		700: Barlow_700Bold,
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Provider store={store}>
					<ClerkProvider
						tokenCache={tokenCache}
						publishableKey={publishableKey}
					>
						<ClerkLoaded>
							<QueryClientProvider client={queryClient}>
								<InitialLayout />
							</QueryClientProvider>
						</ClerkLoaded>
					</ClerkProvider>
				</Provider>

				<Toast />
				<StatusBar style="light" />
			</ThemeProvider>
		</GestureHandlerRootView>
	)
}
