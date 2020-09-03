import React from 'react'
import 'normalize.css'
import './styles/common.less'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './router'
import PrivateRoute from './components/PrivateRoute'
import RouteWithSubRoutes from './components/RouteWithSubRoutes'
import NoMatch from './views/error/NotFound'


function App () {
	return (
		<Router>
			<Switch>
				{routes.map ((route, i) => {
					if (route.auth) {
						return (
							<PrivateRoute key={i} path={route.path}>
								<route.component {...route}/>
							</PrivateRoute>
						)
					} else {
						return (<RouteWithSubRoutes key={i} {...route} />)
					}
				})}
				<Route path="*">
					<NoMatch/>
				</Route>
			</Switch>
		</Router>
	)
}

export default App
