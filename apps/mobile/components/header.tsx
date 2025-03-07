import { StyleSheet, Text, type TextProps } from 'react-native'

export function Header({ style, ...props }: TextProps) {
	return (
		<Text style={[styles.title, style]} {...props}>
			{props.children}
		</Text>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontFamily: '700',
		letterSpacing: -0.25,
		paddingHorizontal: 16,
	},
})
