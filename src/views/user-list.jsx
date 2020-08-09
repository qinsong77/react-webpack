import React, { useState, useEffect } from 'react'
import { getUsers } from '_api'

export default function () {
	const [users, setUsers] = useState([])
	// useEffect(() => {
	// 	const getData = async ()=> {
	// 		const data = await getUsers()
	// 		setUsers(data)
	// 	}
	// 	getData()
	// })
	useEffect(()=> {
		getUsers()
			.then(res=> {
				setTimeout(() => {
					console.log(res)
					setUsers(res.data)
				}, 1000)
			})
	}, [])
	return (
		<div>
			<h1>App</h1>
			<div>{ users.map((item, index) =>
				<li key={index}>
					{JSON.stringify(item)}
				</li>
			)}</div>
		</div>
	)
}
