import React, { useState } from 'react'
import { login } from '../api'
import config from '../config'

export default function () {
	const [name, setName] = useState('')
	const [password, setPassWord] = useState('')

	function submit () {
		login({
			name,
			password
		}).then(res => {
			console.log(res)
			if (res.data && res.data.token) localStorage.setItem(config.tokeKey, res.data.token)
		})
	}

	return (
		<div className='register-form'>
			<div>
				<label>name: { name }</label>
				<input onChange={event => setName(event.target.value)}/>
			</div>
			<div>
				<label>password: { password }</label>
				<input onChange={event => setPassWord(event.target.value)}/>
			</div>
			<div>
				<button onClick={submit}>submit</button>
			</div>
		</div>
	)
}
