import * as SQLite from "expo-sqlite";

// let db: SQLite.SQLiteDatabase | null = null;

interface Create<D> {
	data: D;
	sql: string;

	getFirstRowFrom?: "messages";
}

export function db(name: "messages") {
	return {
		init: async (sql: string) => {
			const database = await SQLite.openDatabaseAsync(name);

			await database.execAsync(`
				PRAGMA journal_mode = WAL;
		
				${sql}
			`);
		},
		create: async <R>(
			query: string,
			...data: SQLite.SQLiteVariadicBindParams
		) => {
			const database = await SQLite.openDatabaseAsync(name);

			await database.execAsync(query);

			const result = await database.runAsync(
				"INSERT INTO messages (message, image, senderId) VALUES (?, ?, ?)",
				...data,
			);

			return (await database.getFirstAsync(
				"SELECT * FROM messages WHERE id = ?;",
				[result.lastInsertRowId],
			)) as R;
		},
		get: async <D>(...data: SQLite.SQLiteVariadicBindParams) => {
			try {
				const database = await SQLite.openDatabaseAsync(name);

				const result = await database.getAllAsync("messages", ...data);

				return result as D;
			} catch (error) {
				console.log(error);

				return null;
			}
		},
		remove: async (message: string) => {
			const database = await SQLite.openDatabaseAsync(name);

			await database.runAsync(
				"DELETE FROM messages WHERE message = $message;",
				{
					$message: message,
				},
			);
		},
	};
}

/*
export async function setupDatabase() {
	if (!db) db = await SQLite.openDatabaseAsync("messages.db");

	
}





export async function set<D, R>(props: Set<D>) {
	if (!db) throw new Error("database is not initialized.");

	const result = await db.runAsync(props.sql, [
		props.data as SQLite.SQLiteBindValue,
	]);

	
}

export async function get<D>() {
	if (!db) throw new Error("database is not initialized.");

	
}*/
