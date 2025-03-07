import { configureStore } from '@reduxjs/toolkit'

import groupReducer from './slices/group-slice'

export const store = configureStore({
	reducer: {
		group: groupReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
