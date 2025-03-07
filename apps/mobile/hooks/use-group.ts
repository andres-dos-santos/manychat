import { useDispatch, useSelector } from 'react-redux'

import {
	addMember as add,
	removeMember as remove,
	addGroupName,
} from '@/slices/group-slice'

import type { RootState } from '@/store'

export function useGroup() {
	const members = useSelector((state: RootState) => state.group.members)
	const groupName = useSelector((state: RootState) => state.group.name)
	const dispatch = useDispatch()

	function addMember(name: string, image: string) {
		dispatch(add({ members: { image, name } }))
	}

	function addGroup(name: string) {
		dispatch(addGroupName({ name }))
	}

	function removeMember(name: string) {
		dispatch(remove(name))
	}

	return {
		members,
		addMember,
		removeMember,
		addGroup,
		groupName,
	}
}
