import React, { useContext, useState } from 'react'

import {
	PlusOutlined,
	SearchOutlined
} from '@ant-design/icons'
import { Input, Button, message } from 'antd'

import AddFriendModal from './AddFriendModal'
import { addFriend } from '../../../api'

import Context from '../context'


function MiddleLayout() {
	const { state: { currentFriend, friends }, dispatch } = useContext(Context)
	
	// const [LatestFriends, dispatch] = useReducer(friendReducer, [{
	// 	name: '轻松1',
	// 	id: '6ddee3ed-6580-4bfd-b761-5281c3cf89cc',
	// 	latestMessage: '你好呀',
	// 	time: new Date().toLocaleDateString()
	// }])
	
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	
	function handleOk(val) {
		setConfirmLoading(true)
		addFriend({
			responder: val.value,
			remarks: val.remarks
		}).then(res => {
			console.log(res)
			setVisible(false)
			message.success('发送请求成功')
		}).finally(() => {
			setConfirmLoading(false)
		})
	}
	function switchChat(item) {
		dispatch({
			type: 'set_current_friend',
			payload: {
				currentFriend: item
			}
		})
	}
	
	return (
		<div className='chat-layout-middle'>
			<div className='top-content'>
				<Input
					size='small'
					allowClear
					placeholder="搜索"
					prefix={<SearchOutlined className="top-icon"/>}
				/>
				<Button icon={<PlusOutlined/>} size='small' className='add-btn' onClick={() => setVisible(true)}/>
				<AddFriendModal visible={visible} handleOk={handleOk} onCancel={() => setVisible(false)}
				                confirmLoading={confirmLoading}/>
			</div>
			<ul className='list-friend-container'>
				{
					friends.map(item => (
						<li
							onClick={(e) => switchChat(item)}
							key={item.id} className={currentFriend.friendId ===item.friendId ? 'active-item' : ''}>
							<img className='avatar' src={ window.publicPath + item.avatar }/>
							<div className='list-middle'>
								<h5>{item.name}</h5>
								<p>{item.latestMessage}</p>
							</div>
							<span className='time'>{item.time}</span>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default MiddleLayout
