import React, { memo, useState } from 'react'

function Counter1(props) {
	console.log(props)
	console.log(`Counter ${props.name} render`)
	
	// 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
	function getInitState() {
		return { number: props.number }
	}
	const number1 = props.number
	let [counter, setCounter] = useState(getInitState())
	let [counter1, setCounter2] = useState(number1)
	return (
		<>
			<h1>name: { props.name }</h1>
			<p>{counter.number}</p>
			<p>{props.number}</p>
			<p>{counter1}</p>
			<button onClick={() => setCounter({ number: counter.number + 1 })}>+</button>
			<button onClick={() => setCounter(counter)}>setCounter</button>
		</>
	)
}

const Counter1Memo = memo(Counter1)

function Test() {
	console.log('render 1')
	const [state, setSate] = useState(111)
	
	function AlertNum() {
		setSate((state + 1))
		setTimeout(() => {
			setSate(number => number + 1)
			// setSate((state+1)) // 不起作用
			alert(state) // 0
		}, 3000)
	}
	
	return (
		<div>
			<p>{state}</p>
			<button onClick={() => setSate(prev => prev + 1)}>add</button>
			<br/>
			<button onClick={AlertNum}>AlertNum</button>
			<Counter1 number={state} name='1' key={1}/>
			<Counter1 number={12} name='2' key={2}/>
			<Counter1Memo number={state} name='3' key={3}/>
			<Counter1Memo number={12} name='4' key={4}/>
		</div>
	)
}

export default Test
