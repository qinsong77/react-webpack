import React, { useState, useEffect } from 'react'
import { Divider } from 'antd'
import { getAddMessage } from '../../../api'
import useData from '../../../styles/useData'
function AddMessageList() {
	
	const [data, fetchData] = useData(getAddMessage)
	console.log(data)
	return (
		<div className='chat-layout-right contact-right'>
			<h3>新的朋友</h3>
			<Divider/>
		</div>
	)
}

export default AddMessageList
