import React, { useEffect, useState } from 'react'
import { Card, Table, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { getUsers, getUserDetail } from '_api'

export default function () {
	const [data, setData] = useState({
		data: [],
		loading: true,
		pagination: {
			current: 1,
			pageSize: 2,
			total: 0
		}
	})
	useEffect(() => {
		fetchData()
		// getUserDetail('a666591f-a999-4b08-98f3-bd9a08f9c90f')
		// 	.then(res => {
		// 		console.log(res)
		// 	})
	}, [])
	
	
	const fetchData = (pagination = data.pagination) => {
		setData({
			...data,
			loading: true
		})
		delete pagination.total
		getUsers(pagination)
			.then(res => {
				console.log(res)
				setData({
					pagination: {
						...pagination,
						total: res.data.total
					},
					data: res.data.data,
					loading: false
				})
			})
	}
	
	// eslint-disable-next-line max-params
	const handleTableChange = (pagination, filters, sorter, extra) => {
		console.log(pagination)
		if (extra.action === 'paginate') {
			fetchData(pagination)
		}
	}
	
	const deleteUser = (record)=> {
		console.log(record)
	}
	
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: {
				compare: (a, b) => a.id - b.id,
			},
		},
		{
			title: 'Name',
			dataIndex: 'name'
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'action',
			dataIndex: 'action',
			render: (text, record, index) => <a onClick={() => deleteUser(record)}>删除</a>
		}
	]
	return (
		<Card>
			<h1>Users</h1>
			<Table
				bordered={true}
				columns={columns}
				rowKey={record => record.id}
				dataSource={data.data}
				pagination={data.pagination}
				loading={data.loading}
				onChange={handleTableChange}
			/>
		</Card>
	)
}
