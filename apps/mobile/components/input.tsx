import { useState, type ComponentProps } from 'react'
import { StyleSheet, TextInput, type TextInputProps } from 'react-native'

import { Colors } from '@/constants/Colors'

export function Input(props: TextInputProps & { hasError?: boolean }) {
	const [focus, setFocus] = useState(false)

	return (
		<TextInput
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			autoCapitalize="none"
			style={[
				s.container,
				{
					backgroundColor: props.hasError ? Colors.red[100] : undefined,
					borderColor: props.hasError
						? Colors.red[500]
						: Colors.zinc[focus ? 400 : 200],
				},
			]}
			cursorColor={Colors.main}
			{...props}
		/>
	)
}

const s = StyleSheet.create({
	container: {
		height: 52,
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 12,

		fontFamily: '500',
		letterSpacing: -0.4,
	},
})
