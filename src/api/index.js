import axios from '@/common/axios'

export const registerUser = (data) => {
	return axios.request({
		url: '/public/auth/register',
		method: 'post',
		data
	})
}
export const login = (data) => {
	return axios.request({
		url: '/public/auth/login',
		method: 'post',
		data
	})
}

export const getUsers = (params) => {
	return axios.request({
		url: '/users',
		method: 'get',
		params
	})
}

export const getUserDetail = (id) => {
	return axios.request({
		url: `/users/${id}`,
		method: 'get'
	})
}

export const addFriend = (data) => {
	return axios.request({
		url: '/users/add_friend',
		method: 'post',
		data
	})
}
