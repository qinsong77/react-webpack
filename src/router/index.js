import App from '../components/App'
import Register from '../views/register'
import Login from '../views/login'
import UserList from '../views/user-list'

const routes = [
	{
		path: '/',
		exact: true,
		// sidebar: () => <div>home!</div>,
		main: App
	},
	{
		path: '/register',
		// sidebar: () => <div>bubblegum!</div>,
		main: Register
	},
	{
		path: '/login',
		// sidebar: () => <div>shoelaces!</div>,
		main: Login
	},
	{
		path: '/user-list',
		// sidebar: () => <div>shoelaces!</div>,
		main: UserList
	}
]
export default routes
