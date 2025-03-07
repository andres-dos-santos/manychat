import { useGroup } from '@/hooks/use-group'
import { Text, View } from 'react-native'

export default function Group() {
	const { groupName } = useGroup()

	return (
		<View>
			<Text>{groupName}</Text>
		</View>
	)
}
