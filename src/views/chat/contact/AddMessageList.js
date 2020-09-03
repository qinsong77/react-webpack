import React from 'react'
import { Button, Divider, Typography, message } from 'antd'
import { getAddMessage } from '../../../api'
import useData from '../../../styles/useData'
import avatar from '../avatar.jpg'
// eslint-disable-next-line no-duplicate-imports
import { agreeAddFriend } from '../../../api'

const { Text, Link } = Typography

function AddMessageList() {
	
	const [data, fetchData] = useData(getAddMessage)
	console.log(data)
	
	function agreeAdd(id) {
		agreeAddFriend({
			msgId: id
		}).then(res => {
			message.success('添加成功！')
			fetchData()
		})
	}
	
	return (
		<div className='chat-layout-right contact-right'>
			<h3>新的朋友</h3>
			<Divider/>
			<ul>
				{
					data.data.map(v => <Item key={v.id} {...v} agreeAdd={agreeAdd}/>)
				}
			</ul>
		</div>
	)
}



function Item(props) {
	return (
		<>
			<li>
				<div className='right-content'>
					<img className='avatar' src={avatar}/>
					<div>
						<p className='name'>{props.sender.name}</p>
						<p className='remarks'>{props.remarks}</p>
					</div>
				</div>
				{props.status === 0 ? <Button size='small' type="primary" onClick={() => props.agreeAdd(props.id)}>接受</Button> :
					<Text>已接受</Text>}
			</li>
			<Divider/>
		</>
	)
}

export default AddMessageList
