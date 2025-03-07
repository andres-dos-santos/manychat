import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text } from 'react-native'

export function GroupImagePicker() {
	const [image, setImage] = useState<string | null>(null)

	async function handleSelectPicker() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri)
		}
	}

	return (
		<Pressable style={s.button} onPress={handleSelectPicker}>
			{image ? (
				<Image source={{ uri: image }} style={s.image} />
			) : (
				<>
					<Feather name="camera" size={16} />
					<Text style={s.imageText}>Choose a image</Text>
				</>
			)}
		</Pressable>
	)
}

const s = StyleSheet.create({
	button: {
		height: 80,
		width: 80,
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
	},
	image: {
		height: 80,
		width: 80,
		borderRadius: 12,
	},
	imageText: {
		marginTop: 4,
		fontFamily: '500',
		textAlign: 'center',
		fontSize: 10,
		letterSpacing: -0.25,
	},
})
