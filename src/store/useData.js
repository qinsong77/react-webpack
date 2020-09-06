import { useState, useEffect } from 'react'

function useData(getData) {
	const [data, setData] = useState({
		data: [],
		loading: true,
		pagination: {
			current: 1,
			pageSize: 10,
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
		getData(pagination)
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
	
	return [data, fetchData]
}

export default useData
