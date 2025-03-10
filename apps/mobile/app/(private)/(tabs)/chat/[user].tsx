import { router, useLocalSearchParams } from 'expo-router'
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import dayjs from 'dayjs'
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { width } from '@/utils/sizes'

import { db } from '@/db/db'

import type { User } from '@/@types/user'
import { Colors } from '@/constants/Colors'
import { useMessagesDatabase, type Message } from '@/db/use-messages-database'

export default function Chat() {
	const { user: username } = useLocalSearchParams<'/chat/[user]'>()

	const query = useQueryClient()
	const { save, search } = useMessagesDatabase()

	const users = query.getQueryData<User[]>(['get-users'])
	const user = users ? users.find((user) => user.name === username) : null

	const [message, setMessage] = useState('')

	const { data: messages } = useQuery({
		queryKey: ['get-messages', user],
		queryFn: async () => {
			if (user) {
				const result = await search(user.id)

				return result as Message[]
			}
		},
	})

	async function onSubmit() {
		if (user && message) {
			try {
				const insertedMessage = await save({
					message,
					image: user.image,
					senderId: user.id,
				})

				if (insertedMessage && messages) {
					messages.push(insertedMessage as Message)
				}

				setMessage('')
			} catch (error) {
				console.log(error)
			}
		}
	}

	console.log(messages)

	return user ? (
		<View style={s.container}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={router.back}
				style={s.header}
			>
				<Feather name="arrow-left" color="#FFFFFF" size={14} />
				<Image source={{ uri: user.image }} style={s.image} />
				<Text style={s.headerTitle}>{user.name}</Text>
			</TouchableOpacity>

			<View style={s.content}>
				<View style={s.chat}>
					<FlatList
						contentContainerStyle={s.contentContainerStyle}
						data={messages}
						keyExtractor={(item) => item.id.toString()}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => {
							let showImage = true

							if (messages) {
								showImage = !(
									messages[index - 1]?.senderId === messages[index].senderId
								)
							}

							const sendingByUser = item.senderId !== user.id

							return (
								<Pressable
									onPress={async () => {
										try {
											await db('messages').remove(item.message)
										} catch (error) {
											console.log(error)
										}
									}}
									style={[
										s.messageContainer,
										sendingByUser ? s.leftMessage : s.rightMessage,
									]}
								>
									<View style={s.message}>
										<View
											style={[
												sendingByUser ? s.messageTextLeft : s.messageTextRight,
											]}
										>
											<Text style={s.messageContent}>{item.message}</Text>
											<Text style={s.timeMessage}>
												{dayjs(item.createdAt).format('HH:mm')}
											</Text>
										</View>
									</View>
									<Image
										source={{ uri: showImage ? item.image : undefined }}
										style={s.messageImage}
									/>
								</Pressable>
							)
						}}
					/>
				</View>

				<View style={s.form}>
					<TextInput
						value={message}
						onChangeText={setMessage}
						multiline
						style={s.input}
						placeholder="Write a message here"
						cursorColor="#FBCD40"
					/>
					<TouchableOpacity
						onPress={onSubmit}
						activeOpacity={0.8}
						style={s.button}
					>
						<Feather name="chevron-right" size={20} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	) : null
}

const s = StyleSheet.create({
	timeMessage: {
		color: Colors.zinc[800],
		fontFamily: '500',
		fontSize: 8,
		marginLeft: 'auto',
	},
	container: {
		flex: 1,
		backgroundColor: '#1C1C1C',
		position: 'absolute',
		top: -44,
		bottom: 0,
		left: 0,
		right: 0,
	},
	image: {
		height: 32,
		width: 32,
		borderRadius: 999,
	},
	contentContainerStyle: {
		padding: 24,
	},
	headerTitle: {
		fontFamily: '600',
		color: '#FFFFFF',
		letterSpacing: -0.25,
		fontSize: 16,
	},
	header: {
		gap: 12,
		height: 80,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	content: {
		marginTop: 'auto',
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		borderBottomRightRadius: 24,
		borderBottomLeftRadius: 24,
	},
	chat: {
		flex: 1,
	},
	form: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		gap: 12,
		paddingHorizontal: 24,
		paddingBottom: 20,
	},
	input: {
		minHeight: 56,
		height: 'auto',
		paddingHorizontal: 20,
		flex: 1,
		borderRadius: 32,
		backgroundColor: '#E4E4E7',
		fontFamily: '500',
		fontSize: 14,
		letterSpacing: -0.25,
	},
	messageContent: {
		color: '#000',
		fontFamily: '500',
		fontSize: 12,
		lineHeight: 18,
		letterSpacing: -0.25,
	},
	button: {
		height: 56,
		width: 56,
		borderRadius: 999,
		backgroundColor: '#FBCD40',
		alignItems: 'center',
		justifyContent: 'center',
	},
	messageContainer: {
		gap: 8,
	},
	message: {
		marginTop: 2,
		flexDirection: 'row',
		alignItems: 'flex-end',
		maxWidth: width / 1.7,
	},
	leftMessage: {
		flexDirection: 'row-reverse',
		alignSelf: 'flex-start',
	},
	rightMessage: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	messageTextRight: {
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 6,
		backgroundColor: '#FBCD40',
	},
	messageTextLeft: {
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 6,
		backgroundColor: '#E4E4E7',
	},
	messageImage: {
		width: 24,
		height: 24,
		borderRadius: 32,
		marginTop: 4,
	},
})
