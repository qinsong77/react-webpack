import React from 'react'
import 'normalize.css'
import './styles/common.less'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './router'
import HandleRoute from './components/HandleRoute'
import NotFound from './views/error/NotFound'


function App () {
	return (
		<Router>
			<Switch>
				{routes.map ((route, i) => <HandleRoute key={i} {...route} />)}
				<Route path="*">
					<NotFound/>
				</Route>
			</Switch>
		</Router>
	)
}

export default App
