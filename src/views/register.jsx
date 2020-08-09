import React, { useState } from 'react'
import { registerUser } from '../api'

export default function () {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassWord] = useState('')

	function submit () {
		registerUser({
			name,
			email,
			password
		})
	}

	return (
		<div className='register-form'>
			<div>
				<label>name: { name }</label>
				<input onChange={event => setName(event.target.value)}/>
			</div>
			<div>
				<label>email: { email }</label>
				<input onChange={event => setEmail(event.target.value)}/>
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
