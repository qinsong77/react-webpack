import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function RouteWithSubRoutes(route) {
	console.log(route)
	if (Array.isArray(route.routes) && route.routes[0]) {
		console.log(route.path)
		console.log(route.routes[0].path)
	}
	if (route.redirect && !route.routes) {
		return <Redirect exact from={route.path} to={route.redirect}/>
	} else return (
		<>
			{ Array.isArray(route.routes) && route.routes[0]  && route.location.pathname === route.path ? <Redirect exact from={route.path} to={route.routes[0].path}/> : ''}
			<Route
				path={route.path}
				exact={route.exact}
				render={props => (
					// pass the sub-routes down to keep nesting
					<route.component {...props} routes={route.routes} />
				)}
			/>
		</>
	)
}

export default RouteWithSubRoutes
