import {
	Button,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useGroup } from '@/hooks/use-group'

export function GroupMembersList() {
	const { removeMember, members } = useGroup()

	return (
		<View style={s.groupList}>
			<FlatList
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 16,
				}}
				data={members}
				renderItem={({ item }) => (
					<Pressable style={s.member} onPress={() => removeMember(item.name)}>
						<Image
							style={[s.image, { marginRight: 12 }]}
							source={{ uri: item.image }}
						/>

						<View style={s.close}>
							<Feather name="x" color="#FFFFFF" size={12} />
						</View>
					</Pressable>
				)}
			/>
		</View>
	)
}

const s = StyleSheet.create({
	member: {
		position: 'relative',
	},
	close: {
		backgroundColor: '#C53030',
		height: 16,
		width: 16,
		borderRadius: 999,
		position: 'absolute',
		top: 0,
		right: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},
	groupList: {
		height: 80,
		paddingBottom: 24,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#E4E4E7',
	},
	image: {
		height: 52,
		width: 52,
		borderRadius: 9999,
		backgroundColor: '#E4E4E7',
	},
})
