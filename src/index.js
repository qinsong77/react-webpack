import React from 'react'
import ReactDom from 'react-dom'

import App from './app'
console.log(module)
if (module.hot) {
	module.hot.accept(()=>{
		ReactDom.render(<App/>, document.getElementById('root'))
	});
}
ReactDom.render(<App/>, document.getElementById('root'))
