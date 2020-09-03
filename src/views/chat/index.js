import React from 'react'
import { Switch, Link } from 'react-router-dom'
import './index.less'
import { ContactsFilled, MessageFilled, PushpinFilled, SettingFilled, SoundFilled } from '@ant-design/icons'
import avatar from './avatar.jpg'
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes'

function Chat({ routes, history, location }) {
	console.log('chat render')
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
						{ routes.map((route, i) => (<RouteWithSubRoutes key={route.path} {...route} />)) }
					</Switch>
				</div>
			</div>
		</div>
	)
}

export default Chat
