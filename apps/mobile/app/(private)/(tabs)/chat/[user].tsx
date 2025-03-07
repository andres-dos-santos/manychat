import { router, useLocalSearchParams } from 'expo-router'
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { width } from '@/utils/sizes'

const messages = [
	{
		id: '1',
		text: 'Oi, tudo bem?',
		sender: 'A',
		image:
			'https://plus.unsplash.com/premium_photo-1669703777437-27602d656c27?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '2',
		text: 'Oi! Tudo ótimo e você?',
		sender: 'B',
		image:
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '3',
		text: 'Estou bem também! Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito?',
		sender: 'A',
		image:
			'https://plus.unsplash.com/premium_photo-1669703777437-27602d656c27?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '4',
		text: 'Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito?',
		sender: 'B',
		image:
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '5',
		text: 'Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito?',
		sender: 'B',
		image:
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '6',
		text: 'Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito?',
		sender: 'A',
		image:
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '7',
		text: 'Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito? Que bom! O que tem feito?',
		sender: 'B',
		image:
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '8',
		text: 'Que bom!',
		sender: 'A',
		image:
			'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
]

export default function Chat() {
	const { user } = useLocalSearchParams<'/chat/[user]'>()

	return (
		<View style={s.container}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={router.back}
				style={s.header}
			>
				<Feather name="arrow-left" color="#FFFFFF" size={14} />
				<Text style={s.headerTitle}>{user}</Text>
			</TouchableOpacity>

			<View style={s.content}>
				<View style={s.chat}>
					<FlatList
						contentContainerStyle={s.contentContainerStyle}
						data={messages}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => {
							const showImage = !(
								messages[index - 1]?.sender === messages[index].sender
							)

							return (
								<View
									style={[
										s.messageContainer,
										item.sender === 'A' ? s.leftMessage : s.rightMessage,
									]}
								>
									<View
										style={[
											s.message,
											{
												marginTop: showImage ? 8 : 2,
											},
										]}
									>
										<Text
											style={[
												item.sender === 'A'
													? s.messageTextLeft
													: s.messageTextRight,
												{
													borderRadius: 2,
												},
											]}
										>
											{item.text}
										</Text>
									</View>
									<Image
										source={{ uri: showImage ? item.image : undefined }}
										style={s.messageImage}
									/>
								</View>
							)
						}}
					/>
				</View>

				<View style={s.form}>
					<TextInput
						multiline
						style={s.input}
						placeholder="Write a message here"
						cursorColor="#FBCD40"
					/>
					<TouchableOpacity activeOpacity={0.8} style={s.button}>
						<Feather name="chevron-right" size={20} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1C1C1C',
		position: 'absolute',
		top: -44,
		bottom: 0,
		left: 0,
		right: 0,
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
		color: '#000',
		fontFamily: '400',
		lineHeight: 18,
		letterSpacing: -0.25,
		padding: 12,
		backgroundColor: '#FBCD40',
	},
	messageTextLeft: {
		color: '#000',
		fontFamily: '400',
		lineHeight: 18,
		letterSpacing: -0.25,
		padding: 12,
		backgroundColor: '#E4E4E7',
	},
	messageImage: {
		width: 32,
		height: 32,
		borderRadius: 32,
		marginTop: 4,
	},
})
