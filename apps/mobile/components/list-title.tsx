import { type TextProps, StyleSheet, Text } from 'react-native'

export function ListTitle({ style, ...props }: TextProps) {
	return <Text style={[s.container, style]}>{props.children}</Text>
}

const s = StyleSheet.create({
	container: {
		fontFamily: '500',
		paddingHorizontal: 16,
		fontSize: 12,
		letterSpacing: -0.25,
		marginBottom: 16,
	},
})
