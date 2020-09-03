import React, { useReducer, useState } from 'react'

import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Divider, Input, message } from 'antd'

import AddFriendModal from './AddFriendModal'
import Item from './Item'
import friendReducer from '../reducer/friendReducer'
import { addFriend } from '../../../api'


function MiddleLayout() {
	const [list, dispatch] = useReducer(friendReducer, [{
		label: '新的朋友',
		title: '新的朋友'
	}])
	
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
			<ul className='list-contact-container'>
				{
					list.map((item, index) => (
						<div key={index}>
							<Item
								{...item}
							/>
							<Divider/>
						</div>
					))
				}
			</ul>
		</div>
	)
}

export default MiddleLayout
