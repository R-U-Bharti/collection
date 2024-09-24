const PerformanceAPI = () => {

  const loadTime = window.performance.now() / 1000

  let str = "This is a javascript"

  const reverseFun = (str) => {

    window.performance.mark("start")

    let words = str.split(' ')

    let myWords = words?.map((elem) => {
      return elem?.split('').reverse().join('')
    }).join(' ')

    window.performance.mark('end')

    return myWords;
  }

  let reversedStr = reverseFun(str);

  window.performance.measure('render', 'start', 'end')
  const performanceMeasure = window.performance.getEntries('render')[0];

  return (
    <div className='flex flex-col items-center justify-center w-screen'>
      <div>
        Component load time: {(loadTime / 60).toFixed(4)}sec
      </div>

      <div>
        Flipped the word "This is a javascript" in {performanceMeasure.duration / 1000}sec : {reversedStr}
      </div>
    </div>
  )
}

export default PerformanceAPI