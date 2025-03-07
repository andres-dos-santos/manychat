import {
	ActivityIndicator,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from 'react'
import { useAuth, useSSO, useUser } from '@clerk/clerk-expo'

import { Colors } from '@/constants/Colors'

WebBrowser.maybeCompleteAuthSession()

export default function SignWithGoogle() {
	const googleOAuth = useSSO()

	const [isLoading, setIsLoading] = useState(false)

	async function onGoogleSignIn() {
		try {
			setIsLoading(true)

			const oAuthFlow = await googleOAuth.startSSOFlow({
				strategy: 'oauth_google',
			})

			if (oAuthFlow.authSessionResult?.type === 'success') {
				if (oAuthFlow.setActive) {
					await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })

					// fazer o POST para a api
				}
			} else {
				setIsLoading(false)
			}
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		WebBrowser.warmUpAsync()

		return () => {
			WebBrowser.coolDownAsync()
		}
	}, [])

	return (
		<TouchableOpacity
			style={s.socialLoginButton}
			onPress={onGoogleSignIn}
			activeOpacity={0.8}
		>
			{isLoading ? (
				<ActivityIndicator size={14} color="#1C1C1C" />
			) : (
				<>
					<Image source={require('../assets/images/google.png')} />
					<Text style={s.socialLoginButtonText}>Login with Google</Text>
				</>
			)}
		</TouchableOpacity>
	)
}

const s = StyleSheet.create({
	socialLoginButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 52,
		borderWidth: 1,
		flex: 1,
		gap: 8,
		borderRadius: 4,
		borderColor: Colors.zinc[200],
	},
	socialLoginButtonText: { fontFamily: '500', fontSize: 12 },
})
