import React from 'react'
import avatar from '../avatar.jpg'

function Item(props) {
	return (
		<li>
			<img className='avatar' src={avatar}/>
			<div className='list-middle'>
				<h5>{props.title}</h5>
				<p>{props.text}</p>
			</div>
			<span>{props.time}</span>
		</li>
	)
}

export default Item
