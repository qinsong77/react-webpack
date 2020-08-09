import React, { useState, useEffect } from 'react'

function Test () {

	const [ count, setCount ] = useState(0)

	useEffect(() => {
		console.log(`You clicked ${count} times`)
		return () => {
			console.log('clear up count')
		}
	}, [count])

	const [ count2, setCount2 ] = useState(0)

	useEffect(() => {
		console.log(`You clicked ${count2} times`)
	})

	return (
		<div>
			<p>you click { count } times</p>
			<button onClick={() => setCount(count+1)}>click me!</button>
			<p>you click { count2 } times</p>
			<button onClick={() => setCount2(count2+1)}>click me!</button>
		</div>
	)

}

export default Test
