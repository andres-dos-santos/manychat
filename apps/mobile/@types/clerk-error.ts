export interface ClerkError {
	status: number
	clerkError: boolean
	errors: {
		code: string
		message: string
		longMessage: string
		meta: {
			paramName: string
		}
	}[]
}
