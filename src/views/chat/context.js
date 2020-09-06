import React from 'react'
import config from '../../config'
const Context = React.createContext({
	friends: [],
	currentFriend: {},
	messages: {},
	socket: null,
	userInfo: config.getUserInfo()
})
export default Context
