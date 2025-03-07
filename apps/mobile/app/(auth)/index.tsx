import { Link } from 'expo-router'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { Colors } from '@/constants/Colors'

import { SignWithEmailForm } from '@/components/sign-with-email-form'
import SignWithGoogle from '@/components/sign-with-google'

export default function SignIn() {
	return (
		<View style={s.container}>
			<View
				style={{
					backgroundColor: '#FFFFFF',
					borderBottomLeftRadius: 32,
					borderBottomRightRadius: 32,
					flex: 0.9,
					padding: 24,
				}}
			>
				<Image
					source={require('../../assets/images/logo.png')}
					style={s.image}
				/>

				<View style={s.header}>
					<Text style={s.heading}>Log in to{'\n'}</Text>
					<Text style={s.subHeading}>Your account</Text>
				</View>

				<SignWithEmailForm />

				<View style={s.orContainer}>
					<View style={s.orLine} />
					<Text style={s.or}>Or</Text>
					<View style={s.orLine} />
				</View>

				<View style={s.socialLoginContainer}>
					<SignWithGoogle />

					<TouchableOpacity style={s.socialLoginButton} activeOpacity={0.8}>
						<Image source={require('../../assets/images/apple.png')} />
						<Text style={s.socialLoginButtonText}>Login with Apple</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={s.account}>
				<Feather name="arrow-up-right" size={13} color={Colors.main} />
				<Text style={s.accountTitle}>
					Don't have an account?{' '}
					<Link href="/sign-up">
						<Text style={s.accountTitleLink}>Sign up</Text>
					</Link>
				</Text>
			</View>
		</View>
	)
}

const s = StyleSheet.create({
	image: { height: 100, width: 100 },
	container: {
		flex: 1,
		marginTop: 56,
		backgroundColor: '#1C1C1C',
	},
	header: {
		marginVertical: 40,
	},
	heading: {
		fontFamily: '500',
		fontSize: 32,
		letterSpacing: -1.25,
	},
	subHeading: {
		fontStyle: 'italic',
		letterSpacing: -0.75,
		fontSize: 32,
		fontWeight: 300,
	},
	account: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 0.1,
		marginHorizontal: 'auto',
	},
	accountTitle: {
		fontFamily: '500',
		fontSize: 12,
		color: '#FFFFFF',
	},
	accountTitleLink: {
		textDecorationLine: 'underline',
	},
	orContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginVertical: 24,
	},
	orLine: {
		height: 1,
		flex: 1,
		backgroundColor: Colors.zinc[200],
	},
	or: {
		fontFamily: '500',
	},
	socialLoginContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
	socialLoginButton: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 52,
		borderWidth: 1,
		flex: 1,
		justifyContent: 'center',
		gap: 8,
		borderRadius: 4,
		borderColor: Colors.zinc[200],
	},
	socialLoginButtonText: { fontFamily: '500', fontSize: 12 },
})
