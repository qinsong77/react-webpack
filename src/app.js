import React from 'react'
import 'normalize.css'
import './styles/common.less'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './router'


function App () {
	return (
		<Router>
			<Switch>
				{routes.map((route, index) => (
					// Render more <Route>s with the same paths as
					// above, but different components this time.
					<Route
						key={index}
						path={ '/main/device' + route.path}
						// exact={route.exact}
						exact={true}
						// eslint-disable-next-line react/no-children-prop
						children={<route.component />}
					/>
				))}
			</Switch>
		</Router>
	)
}

export default App
