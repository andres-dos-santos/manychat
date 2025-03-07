import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import * as z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useSignIn } from '@clerk/clerk-expo'
import { useCallback } from 'react'
import { router } from 'expo-router'

import { Colors } from '@/constants/Colors'

import { Input } from './input'

import { toast } from '@/utils/toast'

import type { ClerkError } from '@/@types/clerk-error'

const Schema = z.object({
	email: z.string().email({ message: 'email with invalid format.' }),
	password: z.string().min(8, 'must be 8 characters'),
})

type SchemaInput = z.infer<typeof Schema>

export function SignWithEmailForm() {
	const { signIn, setActive, isLoaded } = useSignIn()

	const { control, handleSubmit, formState, setError } = useForm<SchemaInput>({
		resolver: zodResolver(Schema),
		defaultValues: {
			email: 'andres.dosantosbritoamaral@gmail.com',
			password: '_many_@ndres44',
		},
	})

	const onSign = useCallback(
		async (input: SchemaInput) => {
			if (!isLoaded) return

			try {
				const signInAttempt = await signIn.create({
					identifier: input.email,
					password: input.password,
				})

				if (signInAttempt.status === 'complete') {
					await setActive({ session: signInAttempt.createdSessionId })

					// fazer o POST para a API

					router.replace('/')
				} else {
					console.error(JSON.stringify(signInAttempt, null, 2))
				}
			} catch (err) {
				const error = (err as ClerkError).errors[0]

				toast.error(error.message)

				if (error.meta.paramName === 'password') {
					setError('password', { message: error.message })
				}

				if (error.meta.paramName === 'emailAddress') {
					setError('email', { message: error.message })
				}
			}
		},
		[isLoaded, signIn, setActive, setError],
	)

	const { mutate, isPending } = useMutation({
		mutationKey: ['sign-in'],
		mutationFn: onSign,
	})

	return (
		<>
			<View style={s.content}>
				<Controller
					control={control}
					name="email"
					render={({ field }) => (
						<Input
							hasError={!!formState.errors.email}
							value={field.value}
							onChangeText={field.onChange}
							placeholder="Enter your better email"
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					render={({ field }) => (
						<Input
							hasError={!!formState.errors.password}
							value={field.value}
							onChangeText={field.onChange}
							placeholder="Enter your secret password"
							secureTextEntry
						/>
					)}
				/>
			</View>

			<TouchableOpacity
				activeOpacity={0.8}
				onPress={handleSubmit((input) => mutate(input))}
				style={s.button}
			>
				{isPending ? (
					<ActivityIndicator size={14} color="#1C1C1C" />
				) : (
					<Text style={s.buttonTitle}>Sign in</Text>
				)}
			</TouchableOpacity>
		</>
	)
}

const s = StyleSheet.create({
	content: {
		gap: 12,
	},
	button: {
		height: 52,
		width: '100%',
		borderRadius: 4,
		backgroundColor: Colors.main,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	buttonTitle: {
		fontFamily: '500',
	},
})
