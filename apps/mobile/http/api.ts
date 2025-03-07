import * as SecureStore from 'expo-secure-store'

const baseUrl = 'http://localhost:3000/api/v1/'

async function post(url: string) {
	// PEGAR o token do async-storage
	const authorization = (await SecureStore.getItemAsync('authorization')) ?? ''

	const response = await fetch(baseUrl + url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', authorization },
	})

	return response
}

export const api = {
	post,
}
