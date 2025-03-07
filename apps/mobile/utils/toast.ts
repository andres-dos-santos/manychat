import Toast, { type BaseToastProps } from 'react-native-toast-message'

interface Props extends BaseToastProps {}

function success(props: Props) {
	Toast.show({
		...props,
		type: 'success',
	})
}

function error(message: string, props?: Props) {
	Toast.show({
		...props,
		text1: message,
		type: 'error',
	})
}

export const toast = {
	success,
	error,
}
