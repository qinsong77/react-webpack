import { lazy } from 'react';

import Index from '../views/index'
import Register from '../views/Register/register'
import Chat from '../views/chat'
import Message from '../views/chat/Message/index'
import Contact from '../views/chat/contact/index'
// import SuspenseDemo from '../views/main/reactHooks/SuspenseDemo'
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
		component: lazy(() => import('../views/Login/login'))
	},
	{
		path: '/register',
		exact: true,
		auth: false,
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
		exact: false, // 嵌套路由，不能在父级加 exact，因为先要匹配父级然后才能匹配子集
		auth: true,
		component: lazy(() => import('../components/Main')),
		subs: [
			{
				path: '/main/dashboard',
				title: 'Dashboard',
				icon: 'DashboardOutlined',
				component: lazy(() => import('../views/main/dashboard'))
			},
			{
				path: '/main/user',
				title: '用户管理',
				icon: 'UserOutlined',
				subs: [
					{
						path: '/main/user/list',
						title: '用户列表',
						component: lazy(() => import('../views/main/user-list'))
					},
					{
						path: '/main/user/table',
						title: 'table',
						component: lazy(() => import('../views/main/table'))
					}
				]
			},
			{
				path: '/main/test',
				title: '测试管理',
				icon: 'RadarChartOutlined',
				subs: [
					{
						path: '/main/test/one',
						title: 'test-1',
						component: lazy(() => import('../views/main/test/one'))
					},
					// {
					// 	path: '/main/test/two',
					// 	title: 'test-2',
					// 	component: lazy(() => import('../views/main/test/two'))
					// },
					// {
					// 	path: '/main/test/context',
					// 	title: 'context',
					// 	component: lazy(() => import('../views/main/test/Context'))
					// },
					{
						path: '/main/test/tree',
						title: 'test-3',
						component: lazy(() => import('../views/main/test/tree'))
					}
				]
			},
			{
				path: '/main/reactHooks',
				title: 'react hooks',
				icon: 'RadarChartOutlined',
				subs: [
					{
						path: '/main/reactHooks/one',
						title: 'test-1',
						component: lazy(() => import('../views/main/reactHooks/one'))
					},
					{
						path: '/main/reactHooks/two',
						title: 'test-2',
						component: lazy(() => import('../views/main/reactHooks/two'))
					},
					{
						path: '/main/reactHooks/suspense-demo',
						title: 'suspense-demo',
						component: lazy(() => import('../views/main/reactHooks/SuspenseDemo'))
					}
				]
			}
		]
	}
]
export default routes
