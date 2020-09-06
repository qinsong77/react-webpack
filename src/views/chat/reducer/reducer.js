function reducer (state, { type, payload}) {
	switch (type) {
		case 'save_user_info':
			return {
				...state,
				userInfo: payload.userInfo
			}
		case 'init_friends':
			return {
				...state,
				friends: payload.friends
			}
		case 'add_friend':
			return {
				...state,
				friends: [...state.friends, payload.friend]
			}
		case 'set_current_friend':
			return {
				...state,
				currentFriend: payload.currentFriend
			}
		case 'init_messages':
			return {
				...state,
				messages: payload.messages
			}
		case 'add_message':
			console.log(state)
			return {
				...state,
				messages: {
					...state.messages,
					[payload.message.friendId]: [
						payload.message,
						...state.messages[payload.message.friendId]
					]
				}
			}
		case 'set_socket':
			return {
				...state,
				socket: payload.socket
			}
		default:
			throw new Error()
	}
}

export default reducer
