import { GroupImagePicker } from '@/components/group-image-picker'
import { GroupMembersList } from '@/components/group-members-list'
import { Header } from '@/components/header'
import { useGroup } from '@/hooks/use-group'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function CreateGroup() {
	const { top } = useSafeAreaInsets()
	const { addGroup } = useGroup()

	const [text, setText] = useState('')

	const handleAddGroup = useCallback(() => {
		addGroup(text)

		router.push('/(tabs)/group')
	}, [text, addGroup])

	return (
		<View
			style={[
				s.container,
				{
					paddingTop: top,
				},
			]}
		>
			<Header style={s.heading}>New Group</Header>

			<GroupMembersList />

			<View style={s.header}>
				<GroupImagePicker />
				<View style={s.content}>
					<Text style={s.contentTitle}>
						Enter the name and create a new group
					</Text>
					<TextInput
						style={s.input}
						placeholderTextColor="#9F9FA9"
						placeholder="New group"
						cursorColor="#FBCD40"
						onChangeText={setText}
						value={text}
					/>
				</View>
			</View>

			<TouchableOpacity
				style={s.button}
				onPress={handleAddGroup}
				activeOpacity={0.8}
			>
				<Text style={s.buttonTitle}>Create</Text>
				<Feather name="arrow-up-right" style={s.buttonIcon} size={14} />
			</TouchableOpacity>
		</View>
	)
}

const s = StyleSheet.create({
	input: {
		height: 44,
		fontSize: 13,
		fontFamily: '500',
		borderBottomWidth: 1,
		borderColor: '#F3F4F6',
		width: '100%',
		marginHorizontal: 'auto',
		marginTop: 12,
		borderRadius: 8,
		paddingHorizontal: 12,
		color: '#1C1C1C',
	},
	header: {
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	content: {
		flex: 1,
	},
	contentTitle: {
		fontFamily: '500',
		fontSize: 12,
	},
	button: {
		position: 'absolute',
		bottom: 32,
		right: 32,
		height: 40,
		width: 100,
		backgroundColor: '#FBCD40',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonTitle: {
		fontFamily: '500',
		letterSpacing: -0.25,
	},
	buttonIcon: {
		marginTop: 4,
	},
	heading: {
		marginBottom: 32,
	},
	container: {
		flex: 1,
		backgroundColor: '#FEFEFE',
	},
})
