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

export const getUsers = _ => {
	return axios.request({
		url: '/users',
		method: 'get'
	})
}
