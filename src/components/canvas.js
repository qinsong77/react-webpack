import React from 'react'
export default function () {
	const canvasRef = React.useRef(null)
	React.useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.rotate(45 * Math.PI / 180);
// 字体填充
		ctx.font = '20px STHeiti, SimHei';
		ctx.fillText('旋转，跳跃，我闭着眼', 60, -40, 188);
// 重置当前的变换矩阵为初始态
		ctx.setTransform(1, 0, 0, 1, 0, 0);
// 登录状态下不会出现这行文字，点击页面右上角一键登录
	})
	return (
		<div className="canvas-demo">
			<canvas
				ref={canvasRef}
				width={1000}
				height={300} />
		</div>
	)
}
