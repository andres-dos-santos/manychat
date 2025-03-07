import * as SecureStore from "expo-secure-store";

const baseUrl =
	"https://2932-2804-3708-8058-4801-8e8c-66ba-a6fe-8bc3.ngrok-free.app/api/v1/";

async function post(url: string) {
	const authorization = (await SecureStore.getItemAsync("authorization")) ?? "";

	const response = await fetch(baseUrl + url, {
		method: "POST",
		headers: { "Content-Type": "application/json", authorization },
	});

	return response;
}

async function get(url: string) {
	const authorization = (await SecureStore.getItemAsync("authorization")) ?? "";

	const response = await fetch(baseUrl + url, {
		// headers: { 'Content-Type': 'application/json', authorization },
	});

	return response;
}

export const api = {
	post,
	get,
};
