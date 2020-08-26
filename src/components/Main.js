import React from 'react'
import { Switch, withRouter } from 'react-router-dom'

import { Layout, Menu, Breadcrumb } from 'antd'
import * as Icon from '@ant-design/icons'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

import HeaderComp from '../components/Header'

// import PrivateRoute from './PrivateRoute'
import RouteWithSubRoutes from './RouteWithSubRoutes'
import '../styles/main-layout.less'

// 渲染二级菜单
function RenderMenuWithSub (route) {
	const icon = React.createElement(
		Icon[route.icon]
	)
	return (
		<SubMenu key={ route.path } icon={icon} title={ route.title }>
			{
				route.subs.map((item) => (<Menu.Item key={item.path}>{ item.title }</Menu.Item>))
			}
		</SubMenu>
	)
}

function RenderBread (routes, pathName) {
	let subRoute = null
	const route = routes.find( v => {
		if (v.path === pathName) {
			return true
		} else if (pathName.indexOf(v.path) > -1) {
			subRoute = v.subs.find(sub => sub.path === pathName)
			return true
		} else return false
	})

	return (
		route && route.title ? (
		<Breadcrumb style={{ margin: '12px 0' }}>
			<Breadcrumb.Item>{ route.title }</Breadcrumb.Item>
			{ subRoute ? (<Breadcrumb.Item>{ subRoute.title }</Breadcrumb.Item>) : ''}
		</Breadcrumb>
		): ''
	)
}

function Main ({ routes, history, location }) {
	const menuOnClick = ({ item, key, keyPath, domEvent }) => {
		history.push(key)
	}

	const setDefaultOpenKeys = () => {
		const splitPath = location.pathname.split('/')
		return splitPath.length > 3 ? splitPath.slice(0, 3).join('/') : location.pathname
	}

	return (
			<div className="container">


				<Layout>
					<Header className='container-header'>
						<HeaderComp/>
					</Header>
				</Layout>
				<Layout>
					<Sider width={200}>
						<Menu
							onClick={menuOnClick}
							mode="inline"
							defaultSelectedKeys={location.pathname}
							defaultOpenKeys={[setDefaultOpenKeys()]}
							style={{ height: '100%', borderRight: 0 }}>
							{ routes.map((item, index) =>
								item.hasOwnProperty('subs') ?
									RenderMenuWithSub(item)
									: (
										<Menu.Item key={item.path}>
											{
												React.createElement(
													Icon[item.icon]
												)
											}
											{ item.title }
										</Menu.Item>
									)
							)}
						</Menu>
					</Sider>
					<Layout className='container-main'>
						{ RenderBread(routes, location.pathname) }
						<Content className="container-main-content">
							<div id='subapp'/>
							<Switch>
								{ routes.filter(v => !v.isSubApp).map((route, i) => {
									// if (route.auth) {
									// 	return (
									// 		<PrivateRoute  key={i} path={route.path}>
									// 			<route.component/>
									// 		</PrivateRoute>
									// 	)
									// } else {
									// 	return (<RouteWithSubRoutes key={i} {...route} />)
									// }
									return route.hasOwnProperty('subs') ? route.subs.map(sub => (<RouteWithSubRoutes key={sub.path} {...sub} />)) : (<RouteWithSubRoutes key={route.path} {...route} />)
								})}
							</Switch>
						</Content>
						<Footer className='container-footer'>footer</Footer>
					</Layout>
				</Layout>
			</div>
	)
}

export default withRouter(Main)
