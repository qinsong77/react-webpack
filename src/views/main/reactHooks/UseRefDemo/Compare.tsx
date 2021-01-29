import React, { useState, useRef} from 'react'


export default function () {
    const [renderIndex, setRenderIndex ] = useState(0)
    const createRefEl = React.createRef()
    const useRefEl = useRef()

    if(!createRefEl.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        createRefEl.current = renderIndex
    }

    if(!useRefEl.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        useRefEl.current = renderIndex
    }
    return (
        <>
            <p>Current render index: { renderIndex }</p>
            <p>
                <b>createRefEl</b> value: { createRefEl.current  }
            </p>
            <p>
                <b>useRefEl</b> value: { useRefEl.current  }
            </p>
            <button onClick={() => setRenderIndex(prevState => prevState+1)}>Cause re-render</button>
        </>
    )
}
