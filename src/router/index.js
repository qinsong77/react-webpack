import Index from '../views/index'
import Table from '../views/table'
import List from '../views/list'

const routes = [
	{
		path: '/',
		exact: true,
		component: Index
	},
	{
		path: '/table',
		exact: true,
		component: Table
	},
	{
		path: '/list',
		exact: true,
		component: List
	}
]
export default routes
