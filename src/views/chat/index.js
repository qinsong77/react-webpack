import React, { useEffect, useReducer, useState } from 'react'
import { Link, Redirect, Switch } from 'react-router-dom'
import './index.less'
import { ContactsFilled, MessageFilled, PushpinFilled, SettingFilled, SoundFilled } from '@ant-design/icons'
import HandleRoute from '../../components/HandleRoute'
import reducer from './reducer/reducer'
import { getFriends, getHistoryMessages } from '../../api'
import Context from './context'
import socketIo from './socket'
import config from '../../config'

import EditUserInfoModal from './EditUserInfo'

function Chat({ parentRoute, history, location }) {
	
	const [editUserModalVisible, setEditUserModalVisible] = useState(false)
	
	const [state, dispatch] = useReducer(reducer, {
		friends: [],
		currentFriend: {},
		messages: {},
		socket: null,
		userInfo: config.getUserInfo()
	})
	useEffect(() => {
		getFriends({
			current: 1,
			pageSize: 10,
		}).then(res => {
			const friends = res.data.data
			dispatch({
				type: 'init_friends',
				payload: {
					friends: friends
				}
			})
			if (friends.length > 0) {
				dispatch({
					type: 'set_current_friend',
					payload: {
						currentFriend: friends[0]
					}
				})
				const messages = {}
				friends.forEach(friend => {
					messages[friend.id] = []
				})
				dispatch({
					type: 'init_messages',
					payload: {
						messages
					}
				})
			}
			
			getHistoryMessages().then(res => {
				const data = res.data.data
				const messages = {}
				// eslint-disable-next-line max-nested-callbacks
				data.forEach(v => {
					if (v.userId === state.userInfo.id) {
						if (!messages.hasOwnProperty(v.friendId)) {
							messages[v.friendId] = []
						}
						messages[v.friendId].push({
							content: v.content,
							time: v.time,
							friendId: v.friendId,
							self: true
						})
					} else if (v.friendId === state.userInfo.id) {
						if (!messages.hasOwnProperty(v.userId)) {
							messages[v.userId] = []
						}
						messages[v.userId].push({
							content: v.content,
							time: v.time,
							friendId: v.userId
						})
					}
				})
				// eslint-disable-next-line max-nested-callbacks
				friends.forEach(v => {
					if (!messages.hasOwnProperty(v.id)) messages[v.id] = []
				})
				dispatch({
					type: 'init_messages',
					payload: {
						messages
					}
				})
			})
		})
		const socket = socketIo()
		dispatch({
			type: 'set_socket',
			payload: {
				socket
			}
		})
		socket.on('connect', () => {
			console.log('socket connect')
		})
		socket.on('disconnect', () => {
			console.log('socket disconnect')
		})
		socket.on('reply', data => {
			console.log(data)
			dispatch({
				type: 'add_message',
				payload: {
					message: data
				}
			})
		})
		return () => {
			socket.close()
		}
		
	}, [])
	const { subs: subRoutes } = parentRoute
	return (
		<Context.Provider value={{ state, dispatch }}>
			<div className='chat'>
				<div className='chat-layout'>
					<div className='chat-layout-left'>
						<div>
							<img className='avatar' onClick={() => setEditUserModalVisible(true)} src={ window.publicPath + state.userInfo.avatar}/>
							<Link to='/chat/message'><MessageFilled className='icon'/></Link>
							<Link to='/chat/contact'><ContactsFilled className='icon'/></Link>
							<SoundFilled className='icon'/>
						</div>
						<div>
							<PushpinFilled className='icon'/>
							<SettingFilled className='icon'/>
						</div>
					</div>
					<div className='chat-layout-main'>
						<Switch>
							<Redirect exact from={parentRoute.path} to={subRoutes[0].path}/>
							{subRoutes.map((route, i) => (<HandleRoute key={route.path} {...route} />))}
						</Switch>
					</div>
				</div>
				
				<EditUserInfoModal
					onOk={() => setEditUserModalVisible(false)}
					onCancel={() => setEditUserModalVisible(false)}
					visible={editUserModalVisible}/>
			</div>
		</Context.Provider>
	)
}

export default Chat
