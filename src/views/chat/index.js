import React from 'react'
import { Switch, Link, Redirect } from 'react-router-dom'
import './index.less'
import { ContactsFilled, MessageFilled, PushpinFilled, SettingFilled, SoundFilled } from '@ant-design/icons'
import avatar from './avatar.jpg'
import HandleRoute from '../../components/HandleRoute'

function Chat({ parentRoute, history, location }) {
	const { subs: subRoutes } = parentRoute
	return (
		<div className='chat'>
			<div className='chat-layout'>
				<div className='chat-layout-left'>
					<div>
						<img className='avatar' src={avatar}/>
						<Link to='/chat/message'><MessageFilled className='icon'/></Link>
						<Link to='/chat/contact'><ContactsFilled className='icon'/></Link>
						<SoundFilled className='icon'/>
					</div>
					<div>
						<PushpinFilled className='icon'/>
						<SettingFilled className='icon'/>
					</div>
				</div>
				<div className='chat-layout-main'>
					<Switch>
						<Redirect exact from={parentRoute.path} to={subRoutes[0].path}/>
						{ subRoutes.map((route, i) => (<HandleRoute key={route.path} {...route} />)) }
					</Switch>
				</div>
			</div>
		</div>
	)
}

export default Chat
