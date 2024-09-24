import React, { useEffect, useState } from 'react'

const MouseMove = () => {

    const [pos, setPos] = useState({ x: '0px', y: '0px' })

    useEffect(() => {
        document.addEventListener('mousemove', (event) => {
            setPos({ x: event?.x, y: event?.y })
        })
    })

    return (
        <>
            <div className='h-5 w-5 bg-white hover:bg-red-500 hover:shadow-lg shadow-red-400 rounded-full absolute top-0' style={{ translate: `${pos?.x}px ${pos?.y}px` }} />
        </>
    )
}

export default MouseMove