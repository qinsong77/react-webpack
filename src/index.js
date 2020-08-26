import React from 'react'
import ReactDom from 'react-dom'
import { registerMicroApps, start, runAfterFirstMounted } from 'qiankun'

import App from './app'

registerMicroApps([
	{
		name: 'react', // app name registered
		entry: 'http://172.20.225.92:5000',
		container: '#subapp',
		activeRule: '/main/subapp',
	},
	{
		name: 'device', // app name registered
		entry: 'http://localhost:3000',
		container: '#subapp',
		activeRule: '/main/device',
	},
])



if (module.hot) {
	module.hot.accept(()=>{
		ReactDom.render(<App/>, document.getElementById('root'))
	});
}
ReactDom.render(<App/>, document.getElementById('root'))

start()
runAfterFirstMounted(() => {
	console.log('[MainApp] first app mounted')
})
