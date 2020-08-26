import Main from '../components/Main'
import Index from '../views/index'
import Login from '../views/Login/login'
import UserList from '../views/main/user-list.js'
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
		path: '/main',
		exact: false, // 嵌套路由，不能在父级家 exact，因为先要匹配父级然后才能匹配子集
		auth: true,
		component: Main,
		routes: [
			{
				path: '/main/user',
				title: '菜单1',
				icon: 'UserOutlined',
				component: UserList
			},
			{
				path: '/main/menu2',
				title: '菜单2',
				icon: 'LaptopOutlined',
				subs: [
					{
						path: '/main/menu2/table',
						title: '菜单2-1',
						component: Table
					}
				]
			},
			{
				path: '/main/device',
				title: '设备',
				icon: 'LaptopOutlined',
				isSubApp: true,
				subs: [
					{
						path: '/main/device',
						title: '设备首页'
					},
					{
						path: '/main/device/table',
						title: '设备table'
					},
					{
						path: '/main/device/list',
						title: '设备list'
					}
				]
			},
		]
	}
]
export default routes
