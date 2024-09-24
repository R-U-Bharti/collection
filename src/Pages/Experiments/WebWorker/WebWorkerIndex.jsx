// JS is single-threaded programming language
// Solution web worker

// Main Thread
import React, { useState } from 'react'
import useWebWorker from './useWebWorker'

const WebWorkerIndex = () => {

  const allProducts = 5000 * 100 * 10000
  const [response, setResponse] = useState('...')
  const { calculate, result } = useWebWorker()

  const makeSumTill = (number) => {
    let result = 0;
    for (let i = 0; i <= number; i++) {
      result += i;
    }
    return result;
  }

  const handleCalculate = () => {
    // setResponse('Calculating...')
    calculate(allProducts)
  }

  return (
    <>
      <div>
        <h2>{allProducts}</h2>
        <button onClick={handleCalculate}>Calulate</button>
        <h3>Sum of Products: {result || 0}</h3>
        <input type="text" name="" id="" />
      </div>
    </>
  )
}

export default WebWorkerIndex