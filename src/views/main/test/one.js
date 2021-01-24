import React, { useState} from 'react'

function Test() {
	const [ state, setSate] = useState(0)
	return (
		<div>
			<h2>Parent</h2>
			<p>{ state }</p>
			<Button add={() => setSate((state+1))}/>
		</div>
	)
}

function Button(props) {
	return (
		<button onClick={e => props.add()}>add</button>
	)
}

export default Test
