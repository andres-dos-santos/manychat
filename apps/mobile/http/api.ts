import * as SecureStore from 'expo-secure-store'

const baseUrl =
	'https://29b0-2804-3708-8049-3301-742d-39ce-8728-cba5.ngrok-free.app/api/v1/'

async function post(url: string) {
	const authorization = (await SecureStore.getItemAsync('authorization')) ?? ''

	const response = await fetch(baseUrl + url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', authorization },
	})

	return response
}

async function get(url: string) {
	const authorization = (await SecureStore.getItemAsync('authorization')) ?? ''

	const response = await fetch(baseUrl + url, {
		// headers: { 'Content-Type': 'application/json', authorization },
	})

	return response
}

export const api = {
	post,
	get,
}
