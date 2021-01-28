import React from 'react'
import ReactHooksWay from './MouseTrackDemoList/ReactHooksWay'
import ClassHOCWay from './MouseTrackDemoList/ClassHOCWay'
import RenderPropsWay from './MouseTrackDemoList/RenderPropsWay'
import { Divider } from 'antd'
import './MouseTrackDemoList/style.less'


export default function App() {
    return (
        <div>
            <p>实现需求：某一个组件，需要跟踪鼠标的实时位置。例如拖拽，K线图，走马灯等场景都会需要用到这个逻辑片段。</p>
            <h3>自定义Hooks</h3>
            <ReactHooksWay/>
            <Divider/>
            <h3>高阶组件实现</h3>
            <ClassHOCWay/>
            <Divider/>
            <h3>Render Props</h3>
            <RenderPropsWay/>
        </div>
    )
}
