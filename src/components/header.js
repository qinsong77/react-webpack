import logo from '../assets/logo.svg'
import React from 'react'
import { Link } from 'react-router-dom'
import config from '../config'

export default function () {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					{
						!localStorage.getItem(config.tokeKey) ?
							(
								<React.Fragment key='login'>
									<li>
										<Link to="/register">Register</Link>
									</li>
									<li>
										<Link to="/login">Login</Link>
									</li>
								</React.Fragment>
							) :
							(<React.Fragment key='login-yes'>
									<li>
										<Link to="/user-list">user list</Link>
									</li>
							</React.Fragment>
							)
					}
				</ul>
			</nav>
		</header>
	)
}
