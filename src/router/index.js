import Main from '../components/Main'
import Index from '../views/index'
import Login from '../views/Login/login'
import Register from '../views/Register/register'
import UserList from '../views/main/user-list.js'
import Dashboard from '../views/main/dashboard'
import Table from '../views/main/table'

const routes = [
	{
		path: '/',
		exact: true,
		auth: false,
		component: Index
	},
	{
		path: '/login',
		exact: true,
		auth: false,
		component: Login
	},
	{
		path: '/register',
		exact: true,
		auth: false,
		component: Register
	},
	{
		path: '/main',
		exact: false, // 嵌套路由，不能在父级家 exact，因为先要匹配父级然后才能匹配子集
		auth: true,
		component: Main,
		redirect: '/main/dashboard',
		routes: [
			{
				path: '/main/dashboard',
				title: 'Dashboard',
				icon: 'DashboardOutlined',
				component: Dashboard
			},
			{
				path: '/main/user',
				title: '用户管理',
				icon: 'UserOutlined',
				subs: [
					{
						path: '/main/user/list',
						title: '用户列表',
						component: UserList
					},
					{
						path: '/main/user/table',
						title: 'table',
						component: Table
					}
				]
			}
		]
	}
]
export default routes
