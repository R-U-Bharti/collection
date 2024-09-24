// Background thread

import { useEffect, useState } from "react";

const useWebWorker = () => {
    const [worker, setWorker] = useState(null)
    const [result, setResult] = useState(null)

    useEffect(() => {
        const workerInstance = new Worker('worker.js') // this file is in public folder
        setWorker(workerInstance)

        return () => {
            workerInstance.terminate()
        }
    }, [])

    const calculate = (number) => {
        if (worker) {
            worker.postMessage({ number });

            worker.onmessage = (event) => {
                setResult(event.data)
            }
        }
    }

    return { calculate, result }
}

export default useWebWorker;