import React from 'react'

function Item(props) {
	return (
		<>
			<p className='label'>{ props.label }</p>
			<li>
				<img className='avatar' src={window.publicPath + props.sender.avatar}/>
				<p className='list-middle'>
					{props.title }
				</p>
			</li>
		</>
	)
}

export default Item
