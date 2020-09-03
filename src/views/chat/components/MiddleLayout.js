import React, { useEffect, useReducer, useState } from 'react'

import {
	PlusOutlined,
	SearchOutlined
} from '@ant-design/icons'
import { Input, Button, message } from 'antd'

import AddFriendModal from './AddFriendModal'
import Item from './Item'
import friendReducer from '../reducer/friendReducer'
import { addFriend } from '../../../api'


function MiddleLayout() {
	const [list, dispatch] = useReducer(friendReducer, [])
	
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
			<ul className='list-container'>
				{
					list.map(item => (
						<Item key={item.id}
						      {...item}
						/>
					))
				}
			</ul>
		</div>
	)
}

export default MiddleLayout
