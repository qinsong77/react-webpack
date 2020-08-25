import React from 'react'
import { Link } from 'react-router-dom'

function Index () {
	return (
		<ul>
			<li>
				<Link to="/main/user">user</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	)
}

export default Index
