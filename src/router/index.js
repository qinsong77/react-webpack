import Main from '../components/Main'
import Index from '../views/index'
import Login from '../views/Login/login'
import Register from '../views/Register/register'
import UserList from '../views/main/user-list.js'
import Dashboard from '../views/main/dashboard'
import Table from '../views/main/table'
import Chat from '../views/chat'
import Message from '../views/chat/Message'
import Contact from '../views/chat/Contact'
/*
	重定向只到二级路由
 */
const routes = [
	{
		path: '/',
		exact: true,
		auth: false,
		component: Index
	},
	{
		path: '/redirect',
		redirect: '/main',
		exact: true,
		auth: false
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
		auth: true,
		component: Register
	},
	{
		path: '/chat',
		exact: false,
		auth: true,
		component: Chat,
		subs: [
			{
				path: '/chat/message',
				title: 'message',
				component: Message
			},
			{
				path: '/chat/contact',
				title: 'contact',
				component: Contact
			}]
	},
	{
		path: '/main',
		exact: false, // 嵌套路由，不能在父级家 exact，因为先要匹配父级然后才能匹配子集
		auth: false,
		component: Main,
		subs: [
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
