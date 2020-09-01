import React, { useEffect, useReducer, useState } from 'react'
import './index.less'
import {
	ContactsFilled,
	MessageFilled,
	PlusOutlined,
	PushpinFilled,
	SearchOutlined,
	SettingFilled,
	SoundFilled
} from '@ant-design/icons'
import avatar from './avatar.jpg'
import { Button, Input, Modal, Select, Spin } from 'antd'
import { addFriend, getUsers } from '../../api'

import friendReducer from './reducer/friendReducer'


function Item(props) {
	return (
		<li>
			<img className='avatar' src={avatar}/>
			<div className='list-middle'>
				<h5>{props.title}</h5>
				<p>{props.text}</p>
			</div>
			<span>{props.time}</span>
		</li>
	)
}


function AddFriendModal(props) {
	
	const [value, setValue] = useState({
		value: '',
		label: ''
	})
	const [userList, setUserList] = useState([])
	const [fetching, setFetching] = useState(false)
	const [input, setInput] = useState('')
	
	useEffect(() => {
		setValue({
			value: '',
			label: ''
		})
		// fetchUser()
	}, [props.visible])
	
	
	const fetchUser = (val = '') => {
		setFetching(true)
		getUsers({
			current: 1,
			pageSize: 200,
			name: val
		})
			.then(res => {
				console.log(res)
				setUserList(res.data.data)
			})
			.finally(() => {
				setFetching(false)
			})
	}
	
	function selectChange(val) {
		console.log(val)
		setValue(val)
	}
	
	return (
		<Modal
			title="添加好友"
			visible={props.visible}
			confirmLoading={props.confirmLoading}
			onOk={() => props.handleOk(Object.assign(value, {remarks: input}))}
			onCancel={props.onCancel}
		>
			<Select
				// mode="multiple"
				labelInValue
				showSearch={true}
				value={value}
				placeholder="Select users"
				notFoundContent={fetching ? <Spin size="small"/> : null}
				filterOption={false}
				onSearch={fetchUser}
				onChange={selectChange}
				style={{ width: '100%', marginBottom: '20px' }}
			>
				{userList.map(d => (
					<Select.Option key={d.id}>{d.name}</Select.Option>
				))}
			</Select>
			
			<Input.TextArea onChange={(e) => setInput(e.target.value) } allowClear  value={input} placeholder='请输入备注信息'/>
		</Modal>
	)
}


function Chat() {
	console.log(1)
	const [list, dispatch] = useReducer(friendReducer, [])
	
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	
	function handleOk(val) {
		setConfirmLoading(true)
		// setTimeout(() => {
		// 	dispatch({
		// 		type: 'add',
		// 		payload: {
		// 			id: new Date().getTime(),
		// 			title: input,
		// 			text: new Date().getTime(),
		// 			time: new Date().toLocaleDateString(),
		// 		}
		// 	})
		// 	setConfirmLoading(false)
		// 	setVisible(false)
		// }, 3000)
		addFriend({
			responder: val.value,
			remarks: val.remarks
		}).then(res => {
			console.log(res)
			setConfirmLoading(false)
			setVisible(false)
		})
	}
	
	return (
		<div className='chat'>
			<div className='chat-layout'>
				<div className='chat-layout-left'>
					<div>
						<img className='avatar' src={avatar}/>
						<MessageFilled className='icon'/>
						<ContactsFilled className='icon'/>
						<SoundFilled className='icon'/>
					</div>
					<div>
						<PushpinFilled className='icon'/>
						<SettingFilled className='icon'/>
					</div>
				</div>
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
				<div className='chat-layout-right'>3</div>
			</div>
		</div>
	)
}

export default Chat
