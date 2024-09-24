import { useState } from 'react'

const DivMagicCompiler = () => {

    const [data, setdata] = useState('<b>Here will be your output.</b>')
    const [left, setleft] = useState('45')
    const [right, setright] = useState('45')

    const handlChange = (e) => {
        console.log(e)
        setdata(e.target.innerText)
    }

    const handleStyle = (e, type) => {
        { type == 'left' && setleft(e.target.value) }
        { type == 'right' && setright(e.target.value) }
    }

    return (
        <>
            <div className='flex flex-wrap w-[80vw]'>
                <input className={`w-[45%]`} type="range" name="" id="" onChange={(e) => handleStyle(e, 'left')} />
                <input className={`w-[45%]`} type="range" name="" id="" onChange={(e) => handleStyle(e, 'right')} />
            </div>

            <div className='flex flex-wrap gap-2 w-[80vw] h-[80vh]'>
                <div style={{ width: `${left}%` }} className={` border flex justify-start p-4 `} autoFocus={true} onKeyUp={handlChange} contentEditable={true} >Write Your HTML body here</div>
                <div style={{ width: `${right}%` }} className={` border p-4`} draggable={true} dangerouslySetInnerHTML={{ __html: data }} />
            </div>

        </>
    )
}

export default DivMagicCompiler