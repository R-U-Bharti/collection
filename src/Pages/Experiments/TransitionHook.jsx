import { useTransition } from "react";
import { useState } from "react";

const TransitionHook = () => {

    let data = Array.from({ length: 100000 }, (_, index) => `Data0${index}`)

    const [result, setResult] = useState(data)
    const [pending, setTransition] = useTransition(data)

    const filterFun = (query) => {
        const filteredData = data.filter(item => item.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        return filteredData;
    }

    const handleChange = (e) => {
        const { value } = e.target;

        setTransition(() => {
            let filterData = filterFun(value)
            setResult(filterData)
        })

    }

    return (
        <div className="h-screen w-screen p-10 flex justify-center">

            <div className="w-[30%]">

                <input type="search" onChange={handleChange} className="mb-3 w-full bg-black/40 border border-white/20 focus:outline-none px-2 py-1" placeholder="Search here" />

                <div className="flex flex-col gap-2 overflow-auto h-[500px] w-full">
                    {pending ? <span className="px-2 py-1 bg-blue-700/40">Loading...</span> : null}
                    {result.map((item, index) => (
                        <span className="px-2 py-1 bg-blue-700/40" key={index} value={item}>{item}</span>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default TransitionHook