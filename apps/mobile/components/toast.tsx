import ReactNativeToast, {
	BaseToast,
	ErrorToast,
} from 'react-native-toast-message'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Colors } from '@/constants/Colors'

import { width } from '@/utils/sizes'

export const toastConfig = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	success: (props: any) => <BaseToast {...props} />,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: (props: any) => (
		<ErrorToast {...props} style={s.errorContainer} text1Style={s.errorTitle} />
	),
}

export function Toast() {
	const { top } = useSafeAreaInsets()

	return (
		<ReactNativeToast position="top" topOffset={top} config={toastConfig} />
	)
}

const s = StyleSheet.create({
	errorContainer: {
		borderLeftWidth: 0,
		backgroundColor: Colors.red[500],
		height: 56,
		width: width,
		borderRadius: 0,
		elevation: 0,
	},
	errorTitle: {
		fontSize: 13,
		fontWeight: '400',
		color: '#FFFFFF',
	},
})
