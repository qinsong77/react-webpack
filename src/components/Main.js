import React from 'react'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'

import { Layout, Menu, Breadcrumb } from 'antd'
// import * as Icons from '@ant-design/icons'

import { DashboardOutlined, UserOutlined } from '@ant-design/icons'

const Icons = {
	DashboardOutlined,
	UserOutlined
}

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

import '../styles/main-layout.less'
import HeaderComp from './Header'
import HandleRoute from './HandleRoute'
import NoMatch from '../views/error/NotFound'

// 渲染二级菜单
function RenderMenuWithSub (route) {
	const icon = React.createElement(
		Icons[route.icon]
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

function Main ({ parentRoute, history, location }) {
	
	console.log(location)
	
	const { subs: subRoutes } = parentRoute
	
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
							// selectedKeys={[location.pathname]}
							defaultSelectedKeys={[location.pathname]}
							defaultOpenKeys={[setDefaultOpenKeys()]}
							// openKeys={[setDefaultOpenKeys()]}
							style={{ height: '100%', borderRight: 0 }}>
							{ subRoutes.map((item, index) =>
								item.hasOwnProperty('subs') ?
									RenderMenuWithSub(item)
									: (
										<Menu.Item key={item.path}>
											{
												React.createElement(
													Icons[item.icon]
												)
											}
											{ item.title }
										</Menu.Item>
									)
							)}
						</Menu>
					</Sider>
					
					<Layout className='container-main'>
						{ RenderBread(subRoutes, location.pathname) }
						<Content className="container-main-content">
							<Switch>
								<Redirect exact from={parentRoute.path} to={subRoutes[0].path}/>
								{ subRoutes.map((route, i) =>
									{
										return route.hasOwnProperty('subs') ?
											(
												<Switch key={route.path}>
													 <Redirect exact from={route.path} to={route.subs[0].path}/>
													{ route.subs.map(sub => (<HandleRoute key={sub.path} {...sub} />)) }
												</Switch>
											) :
											(<HandleRoute key={route.path} {...route} />)
									}
								)}
								<Route path="*">
									<NoMatch/>
								</Route>
							</Switch>
						</Content>
						<Footer className='container-footer'>footer</Footer>
					</Layout>
					
				</Layout>
			</div>
	)
}

export default withRouter(Main)
