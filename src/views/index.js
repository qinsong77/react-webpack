import React from 'react'
import { Link } from 'react-router-dom'

function Index () {
	return (
		<div>
			<p>子应用首页</p>
			<ul>
				<li>
					<Link to="/main/user">user</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/table">table</Link>
				</li>
				<li>
					<Link to="/list">list</Link>
				</li>
			</ul>
		</div>
	)
}

export default Index
