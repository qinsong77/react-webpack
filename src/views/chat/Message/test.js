import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import localConfig from '@/config'

const socket = io('http://localhost:3000', {
	path: '/socket/chat',
	reconnectionAttempts: 1,
	query: {
		token: 'Bearer ' + localStorage.getItem(localConfig.tokeKey) || ''
	}
	// transportOptions: {
	// 	polling: {
	// 		extraHeaders: {
	// 			[localConfig.tokeKey]: 'Bearer ' + localStorage.getItem(localConfig.tokeKey) || ''
	// 		}
	// 	}
	// }
})

function Test() {
	const [isConnected, setIsConnected] = useState(socket.connected)
	const [lastMessage, setLastMessage] = useState(null)
	
	useEffect(() => {
		socket.on('connect', () => {
			setIsConnected(true)
		})
		socket.on('disconnect', () => {
			setIsConnected(false)
		})
		socket.on('getMsg', data => {
			setLastMessage(data)
		})
		return () => {
			socket.off('connect')
			socket.off('disconnect')
			socket.off('message')
		}
	}, [isConnected])
	
	const sendMessage = () => {
		socket.emit('send', 'hello')
	}
	
	return (
		<div className="App">
			<header className="App-header">
				<p>Connected: {'11' + isConnected}</p>
				<p>Last message: {lastMessage || '-'}</p>
				<button onClick={sendMessage}>Say hello!</button>
			</header>
		</div>
	)
}

export default Test
