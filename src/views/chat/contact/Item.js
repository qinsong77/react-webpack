import React from 'react'
import avatar from '../avatar.jpg'

function Item(props) {
	console.log(props)
	return (
		<>
			<p className='label'>{ props.label }</p>
			<li>
				<img className='avatar' src={avatar}/>
				<p className='list-middle'>
					{props.title }
				</p>
			</li>
		</>
	)
}

export default Item
