import type { SQLiteDatabase } from 'expo-sqlite'

export async function initializeMessagesDatabase(database: SQLiteDatabase) {
	await database.execAsync(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      message TEXT NOT NULL,
      senderId TEXT NOT NULL,
      image TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    );`)
}
