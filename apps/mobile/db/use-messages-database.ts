import { useSQLiteContext } from 'expo-sqlite'

export interface Message {
	id: string
	message: string
	image: string
	senderId: string
	createdAt: string
}

export function useMessagesDatabase() {
	const database = useSQLiteContext()

	async function save(data: Omit<Message, 'id' | 'createdAt'>) {
		const statement = await database.prepareAsync(
			'INSERT INTO messages (message, image, senderId) VALUES ($message, $image, $senderId)',
		)

		try {
			const result = await statement.executeAsync({
				$message: data.message,
				$image: data.image,
				$senderId: data.senderId,
			})

			const insertedRowId = result.lastInsertRowId.toLocaleString()

			const insertedMessage = await database.getFirstAsync(
				'SELECT * FROM messages WHERE id = ?',
				insertedRowId,
			)

			return insertedMessage
		} catch (error) {
			throw error
		} finally {
			await statement.finalizeAsync()
		}
	}

	async function search(senderId: string) {
		try {
			const query = 'SELECT * FROM messages WHERE senderId LIKE ?'

			const response = await database.getAllAsync<Message>(
				query,
				`%${senderId}%`,
			)

			return response
		} catch (error) {
			throw error
		}
	}

	return { save, search }
}
