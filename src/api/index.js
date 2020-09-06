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

export const editUser = (id, data) => {
	return axios.request({
		url:'/user/' + id,
		method: 'put',
		data
	})
}

export const getUsers = (params) => {
	return axios.request({
		url: '/users/list',
		method: 'get',
		params
	})
}

export const getFriends = (params) => {
	return axios.request({
		url: '/user/friends/list',
		method: 'get',
		params
	})
}

export const getHistoryMessages = (params) => {
	return axios.request({
		url: '/user/history_message/list',
		method: 'get',
		params
	})
}

export const getAddMessage = (params) => {
	return axios.request({
		url: '/user/add_friend_message/list',
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
		url: '/user/friend',
		method: 'post',
		data
	})
}

export const agreeAddFriend = (data) => {
	return axios.request({
		url: '/user/add_friend_agree',
		method: 'post',
		data
	})
}


export const uploadFile = (data) => {
	return axios.request({
		url: '/user/uploadFile',
		headers: { "Content-Type": "multipart/form-data" },
		method: 'post',
		data
	})
}
