import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function Index() {
	return (
		<View style={s.container}>
			<ActivityIndicator size={14} color="#1C1C1C" />
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
