import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Member {
	name: string
	image: string
}

export interface GroupState {
	members: Member[]
	name?: string | null
}

const initialState: GroupState = {
	members: [],
	name: null,
}

export const groupSlice = createSlice({
	name: 'group-slice',
	initialState,
	reducers: {
		addMember: (state, action: PayloadAction<{ members: Member }>) => {
			state.members.push(action.payload.members)
		},
		addGroupName: (state, action: PayloadAction<{ name: string | null }>) => {
			state.name = action.payload.name
		},
		removeMember: (state, action: PayloadAction<Member['name']>) => {
			state.members = state.members.filter(
				(member) => member.name !== action.payload,
			)
		},
	},
})

export const { addMember, removeMember, addGroupName } = groupSlice.actions

export default groupSlice.reducer
