import{r as l,j as r}from"./index-CPFMIRBX.js";import{h as u,t as x,B as g}from"./StateRouteIndex-_Z81qDZQ.js";const k=`// Background thread\r
\r
import { useEffect, useState } from "react";\r
\r
const useWebWorker = () => {\r
    const [worker, setWorker] = useState(null)\r
    const [result, setResult] = useState(null)\r
\r
    useEffect(() => {\r
        const workerInstance = new Worker('worker.js') // this file is in public folder\r
        setWorker(workerInstance)\r
\r
        return () => {\r
            workerInstance.terminate()\r
        }\r
    }, [])\r
\r
    const calculate = (number) => {\r
        if (worker) {\r
            worker.postMessage({ number });\r
\r
            worker.onmessage = (event) => {\r
                setResult(event.data)\r
            }\r
        }\r
    }\r
\r
    return { calculate, result }\r
}\r
\r
export default useWebWorker;`,v=`// JS is single-threaded programming language\r
// Solution web worker\r
\r
// Main Thread\r
import React, { useState } from 'react'\r
import useWebWorker from './useWebWorker'\r
\r
const WebWorkerIndex = () => {\r
\r
  const allProducts = 5000 * 100 * 10000\r
  const [response, setResponse] = useState('...')\r
  const { calculate, result } = useWebWorker()\r
\r
  const makeSumTill = (number) => {\r
    let result = 0;\r
    for (let i = 0; i <= number; i++) {\r
      result += i;\r
    }\r
    return result;\r
  }\r
\r
  const handleCalculate = () => {\r
    // setResponse('Calculating...')\r
    calculate(allProducts)\r
  }\r
\r
  return (\r
    <>\r
      <div>\r
        <h2>{allProducts}</h2>\r
        <button onClick={handleCalculate}>Calulate</button>\r
        <h3>Sum of Products: {result || 0}</h3>\r
        <input type="text" name="" id="" />\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default WebWorkerIndex`,b=`import { FixedSizeList } from 'react-window';\r
\r
const DataVirtualization = () => {\r
\r
  const data = Array.from({ length: 1000000 }, (_, index) => index);\r
\r
  const renderRow = ({ index, style }) => {\r
    return (\r
      <div style={style} key={index}>\r
        {index} -&gt; DataVirtualization\r
      </div>\r
    );\r
  };\r
\r
  return (\r
    <>\r
      <FixedSizeList\r
        height={700}\r
        itemCount={data.length} // Number of items in the data array\r
        itemSize={35} // Height of each item\r
        width={1000} // Width of the list viewport\r
      >\r
        {renderRow}\r
      </FixedSizeList>\r
    </>\r
  )\r
}\r
\r
export default DataVirtualization`,w=`import React, { useState, useRef, useEffect } from 'react';\r
\r
const data = Array.from({ length: 1000000 }, (_, index) => new Object({ id: index, name: \`Item \${index}\` }));\r
\r
const ITEM_HEIGHT = 35; // Height of each item\r
const VIEWPORT_HEIGHT = window.innerHeight; // Height of the visible area\r
\r
const Virtualization = () => {\r
    const [visibleItems, setVisibleItems] = useState([]);\r
    const containerRef = useRef(null);\r
    const listRef = useRef(null); // Ref for the inner list container\r
\r
    const calculateVisibleItems = () => {\r
        if (containerRef.current) {\r
            const scrollTop = containerRef.current.scrollTop;\r
            const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);\r
            const endIndex = Math.min(\r
                data.length - 1,\r
                Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ITEM_HEIGHT)\r
            );\r
\r
            console.log("ScrollTop: ", scrollTop, "\\nItem Height: ", ITEM_HEIGHT, "\\nViewport Height: ", VIEWPORT_HEIGHT, "\\nTotal Height: ", data.length * ITEM_HEIGHT, "\\nStart Index: ", startIndex, "\\nEnd Index: ", endIndex)\r
\r
            setVisibleItems(data.slice(startIndex, endIndex + 1));\r
        }\r
    };\r
\r
    useEffect(() => {\r
        const container = containerRef.current;\r
        container.addEventListener('scroll', calculateVisibleItems);\r
\r
        // Initial calculation\r
        calculateVisibleItems();\r
\r
        // Log dimensions of the list container\r
        if (listRef.current) {\r
            console.log('List container dimensions:', listRef.current.getBoundingClientRect());\r
        }\r
\r
        return () => container.removeEventListener('scroll', calculateVisibleItems);\r
    }, []);\r
\r
    const totalHeight = data.length * ITEM_HEIGHT;\r
\r
    return (\r
        <div\r
            ref={containerRef}\r
            style={{ height: VIEWPORT_HEIGHT, overflowY: 'auto', position: 'relative' }}\r
        >\r
            <div\r
                ref={listRef} // Ref for the inner container\r
                style={{ height: totalHeight, width: '100%', position: 'relative' }}\r
            >\r
                {visibleItems.map((item, index) => (\r
                    <div\r
                        key={index}\r
                        style={{\r
                            height: ITEM_HEIGHT,\r
                            display: 'flex',\r
                            alignItems: 'center',\r
                            paddingLeft: 10,\r
                            position: 'absolute',\r
                            top: (index + Math.floor(containerRef.current.scrollTop / ITEM_HEIGHT)) * ITEM_HEIGHT // Positioning\r
                        }}\r
                    >\r
                        <span>{item.id}: {item.name}</span>\r
                    </div>\r
                ))}\r
            </div>\r
        </div>\r
    );\r
};\r
\r
export default Virtualization;`,W=`function Curried() {\r
\r
    // 1. Basic Currying Problem\r
    function curry(func) {\r
        return function curried(...args) {\r
            if (args.length >= func.length) {\r
                return func(...args)\r
            } else {\r
                return function (...moreArgs) {\r
                    return curried(...args.concat(moreArgs))\r
                }\r
            }\r
        }\r
    }\r
\r
    function multiply(a, b, c) {\r
        return a * b * c;\r
    }\r
\r
    const curriedMultiply = curry(multiply);\r
\r
    // Direct Solution\r
    // function curriedMultiply(a){\r
    //     return function(b){\r
    //         return function(c){\r
    //             return a * b * c;\r
    //         }\r
    //     }\r
    // }\r
\r
    console.log(curriedMultiply(2)(3)(4)); // 24\r
    console.log(curriedMultiply(2, 3, 4)); // 24\r
\r
    // 2. Currying a Function with Multiple Parameters\r
    function curry(func) {\r
        return function curried(...args) {\r
            if (args.length >= func.length) {\r
                return func(...args);\r
            } else {\r
                return function (...moreArgs) {\r
                    return curried(...args.concat(moreArgs))\r
                }\r
            }\r
        }\r
    }\r
\r
    function sumFun(a, b, c, d) {\r
        return a + b + c + d;\r
    }\r
\r
    const curriedSum = curry(sumFun)\r
\r
    console.log(curriedSum(1)(2)(3)(4)); // 10\r
    console.log(curriedSum(1, 2)(3, 4)); // 10\r
\r
    // 3. Infinite Currying\r
\r
    // Direct Solution\r
    // function sum(a){\r
    //     return function(b){\r
    //         if(!b){\r
    //             return a;\r
    //         } else {\r
    //             return sum(a+b)\r
    //         }\r
    //     }\r
    // }\r
\r
    function infiniteCurry(func) {\r
        const next = (...args) => {\r
            return (...moreArgs) => {\r
                if (moreArgs.length == 0) {\r
                    return func(...args)\r
                }\r
                return next(...args, ...moreArgs)\r
            }\r
        }\r
        return next();\r
    }\r
\r
    const sum = infiniteCurry((...nums) => nums.reduce((acc, num) => acc + num, 0));\r
\r
    console.log(sum(1)(2)(3)(4)()); // 10\r
    console.log(sum(5)(10)(15)(20)()); // 50\r
\r
    // 4. Curried Function with Partial Application\r
    function partial(func, ...fixedArgs) {\r
        return function (...remainingArgs) {\r
            return func(...fixedArgs, ...remainingArgs); // Combine fixed and remaining args\r
        };\r
    }\r
\r
    // Example: Partial multiplication function\r
    function multiply(a, b, c) {\r
        return a * b * c;\r
    }\r
\r
    const partialMultiply = partial(multiply, 2);\r
    console.log(partialMultiply(3, 4)); // 24\r
\r
    //   5. Currying with Multiple Functions\r
    // Direct Solution\r
    // function compose(func1, func2){\r
    //     return function curried(...moreArgs){\r
    //         return (func1(func2(...moreArgs)))\r
    //         }\r
    //     }\r
\r
    function compose(...func) {\r
        return function (value) {\r
            return func.reduceRight((acc, fun) => fun(acc), value)\r
        }\r
    }\r
\r
    // Example: Compose multiple functions\r
    function add2(x) {\r
        return x + 2;\r
    }\r
\r
    function multiplyBy3(x) {\r
        return x * 3;\r
    }\r
\r
    const composedFunction = compose(add2, multiplyBy3);\r
\r
    console.log(composedFunction(5));// (5 * 3) + 2 = 17\r
\r
    // 6. Currying with Fixed Number of Arguments\r
    function curryN(func, n) {\r
        return function curried(...args) {\r
            if (args.length >= n) {\r
                return func(...args)\r
            } else {\r
                return (...moreArgs) => curried(...args, ...moreArgs)\r
            }\r
        }\r
    }\r
\r
    function add(a, b, c) {\r
        return a + b + c;\r
    }\r
\r
    const curriedAdd = curryN(add, 3);\r
\r
    console.log(curriedAdd(1)(2)(3)); // 6\r
    console.log(curriedAdd(1, 2)(3)); // 6\r
\r
    // 7. Currying a Function with Spread Arguments\r
    function curryWithSpread(func) {\r
        const next = (...args) => {\r
            return (...moreArgs) => {\r
                if (moreArgs.length == 0) {\r
                    return func(...args)\r
                }\r
                return next(...args.concat(moreArgs))\r
            }\r
        }\r
        return next()\r
    }\r
\r
    const curriedSum2 = curryWithSpread((...nums) => nums.reduce((acc, num) => acc + num, 0));\r
\r
    console.log(curriedSum2(1, 2)(3)(4)()); // 10\r
    console.log(curriedSum2(5)(10, 15)()); // 30\r
\r
    // 8. Curried Function with Optional Arguments\r
    function curryOptional(func) {\r
        return function curried(...args) {\r
            return function (...moreArgs) {\r
                const allArgs = args.concat(moreArgs);\r
\r
                if (moreArgs.length === 0) {\r
                    return func(...allArgs);\r
                }\r
\r
                return curried(...allArgs);\r
\r
            };\r
        };\r
    }\r
\r
    function sum(a = 0, b = 0, c = 0) {\r
        return a + b + c;\r
    }\r
\r
    const curriedSum3 = curryOptional(sum);\r
\r
    console.log(curriedSum3(1)(2, 3)); // 6\r
    console.log(curriedSum3(1)(2)()); // 3 (since c defaults to 0)\r
\r
    //   9. Currying with Context (this)\r
    function curryWithContext(func) {\r
        return function curried(...args) {\r
            return (...moreArgs) => {\r
                return func.apply(this, [...args, ...moreArgs])\r
            }\r
        }\r
    }\r
\r
    // Example: Method that uses 'this'\r
    const obj = {\r
        name: 'Alice',\r
        greet(greeting, punctuation) {\r
            return \`\${greeting}, \${this.name}\${punctuation}\`;\r
        }\r
    };\r
\r
    // Currying the 'greet' function\r
    const curriedGreet = curryWithContext(obj.greet);\r
\r
    // Binding 'this' to 'obj' to preserve the context\r
    const boundGreet = curriedGreet.bind(obj);\r
\r
    // Now we can call the curried version\r
    console.log(boundGreet('Hello')('!')); // Output: "Hello, Alice!"\r
    console.log(boundGreet('Hi')('!!!'));  // Output: "Hi, Alice!!!"\r
\r
    return (<></>)\r
}\r
\r
export default Curried;`,C=`import { useFormik } from 'formik'\r
import React, { useState, useRef, useEffect } from "react";\r
import EXIF from 'exif-js'\r
import * as yup from 'yup'\r
import Modal from 'react-modal'\r
import { FcCamera } from 'react-icons/fc'\r
import { ImCross } from 'react-icons/im'\r
import exifr from 'exifr';\r
import 'animate.css'\r
\r
const SmartCam = () => {\r
\r
    // =====fetching application data============\r
    const [frontImageUpload, setfrontImageUpload] = useState()\r
    const [frontUrl, setfrontUrl] = useState(null)\r
    const [frontData, setfrontData] = useState()\r
    const [frontCamera, setfrontCamera] = useState(false)\r
\r
    const [rightImageUpload, setrightImageUpload] = useState()\r
    const [rightUrl, setrightUrl] = useState(null)\r
    const [rightData, setrightData] = useState()\r
    const [rightCamera, setrightCamera] = useState(false)\r
\r
    const [leftImageUpload, setleftImageUpload] = useState()\r
    const [leftUrl, setleftUrl] = useState(null)\r
    const [leftData, setleftData] = useState()\r
    const [leftCamera, setleftCamera] = useState(false)\r
\r
    const [imageNo, setimageNo] = useState(0)\r
    // ===========fetching application data end=========\r
\r
    const validationSchema = yup.object({\r
        frontImage: yup.mixed().required('required to upload'),\r
        leftImage: yup.mixed().required('required to upload'),\r
        rightImage: yup.mixed().required('required to upload'),\r
    })\r
\r
    const formik = useFormik({\r
        initialValues: {\r
            frontImage: '',\r
            leftImage: '',\r
            rightImage: '',\r
        },\r
        onSubmit: (values) => {\r
            console.log('submitting images => ', values)\r
            setactionType('forward')\r
        }\r
        , validationSchema\r
    })\r
\r
\r
    const submitDocFun = () => {\r
\r
        let url;\r
\r
        let fd = new FormData();\r
\r
        fd.append('safId', id)\r
\r
        fd.append("directionType[2]", 'Front')\r
        {\r
            !frontCamera ? fd.append('imagePath[2]', frontImageUpload) :\r
                fd.append("imagePath[2]", dataURLtoFile(frontUrl, "FrontImage.jpg"))\r
        }\r
        fd.append('longitude[2]', frontData?.longitude)\r
        fd.append('latitude[2]', frontData?.latitude)\r
\r
        fd.append('directionType[1]', 'Right')\r
        {\r
            !rightCamera ? fd.append('imagePath[1]', rightImageUpload) :\r
                fd.append("imagePath[1]", dataURLtoFile(rightUrl, "RightImage.jpg"))\r
        }\r
        fd.append('longitude[1]', rightData?.longitude)\r
        fd.append('latitude[1]', rightData?.latitude)\r
\r
        fd.append('directionType[0]', 'Left')\r
        {\r
            !leftCamera ? fd.append('imagePath[0]', leftImageUpload) :\r
                fd.append("imagePath[0]", dataURLtoFile(leftUrl, "LeftImage.jpg"))\r
        }\r
        fd.append('longitude[0]', leftData?.longitude)\r
        fd.append('latitude[0]', leftData?.latitude)\r
\r
    }\r
\r
    function dataURLtoFile(dataurl, filename) {\r
        const arr = dataurl.split(",");\r
        const mime = arr[0].match(/:(.*?);/)[1];\r
        const bstr = atob(arr[1]);\r
        let n = bstr.length;\r
        const u8arr = new Uint8Array(n);\r
        while (n--) {\r
            u8arr[n] = bstr.charCodeAt(n);\r
        }\r
        return new File([u8arr], filename, { type: mime });\r
    }\r
\r
    // ================to turn on location==================\r
\r
    const [position, setPosition] = useState(null);\r
\r
    const enableLocation = () => {\r
        // Get the user's location\r
        navigator.geolocation.getCurrentPosition(\r
            (position) => {\r
                setPosition(position);\r
                if (imageNo == 1) {\r
                    setfrontData(position?.coords)\r
                }\r
                if (imageNo == 3) {\r
                    setleftData(position?.coords)\r
                }\r
                if (imageNo == 2) {\r
                    setrightData(position?.coords)\r
                }\r
            },\r
            () => {\r
                // alert("Please enable location first.");\r
                // setrepeat(repeat+1)\r
            }\r
        );\r
    }\r
\r
    // ================to turn on location end==================\r
\r
\r
    //   ====enable camera========\r
    const videoRef = useRef(null);\r
    const canvasRef = useRef(null);\r
    const [imageData, setImageData] = useState(null);\r
\r
    useEffect(() => {\r
        enableLocation()\r
    })\r
\r
    const startCamera = async (val) => {\r
        navigator.mediaDevices\r
            .getUserMedia({ video: true })\r
            .then((stream) => {\r
                videoRef.current.srcObject = stream;\r
                videoRef.current.onloadedmetadata = () => {\r
                    // set the canvas size to match the video stream size\r
                    canvasRef.current.width = videoRef.current.videoWidth;\r
                    canvasRef.current.height = videoRef.current.videoHeight;\r
                };\r
            })\r
            .catch((error) => {\r
                if (error.name === 'NotAllowedError') {\r
                    alert('Permission to access camera was not granted');\r
                } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {\r
                    alert('No camera found');\r
                } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {\r
                    alert('Could not start camera');\r
                } else {\r
                    alert('Error accessing camera');\r
                }\r
                console.log("Error accessing camera:", error);\r
            });\r
    };\r
\r
    const stopCamera = () => {\r
        const stream = videoRef.current.srcObject;\r
\r
        if (stream) {\r
            const tracks = stream.getTracks();\r
\r
            tracks.forEach(track => track.stop());\r
            videoRef.current.srcObject = null;\r
        }\r
        // if (mediaStream) {\r
        //   mediaStream.getTracks().forEach((track) => track.stop());\r
        //   mediaStream = null;\r
        // }\r
    };\r
\r
    const captureImage = () => {\r
        const context = canvasRef.current.getContext("2d");\r
        context.drawImage(videoRef.current, 0, 0);\r
        const data = canvasRef.current.toDataURL("image/jpg");\r
        setImageData(data);\r
        console.log('image data captured => ', data)\r
    };\r
    //   ====enable camera end ========\r
\r
\r
    // ===========to get location from image==================\r
    function getGeoLocation(file) {\r
        return new Promise((resolve, reject) => {\r
            EXIF.getData(file, function () {\r
                const lat = EXIF.getTag(this, "GPSLatitude");\r
                const latRef = EXIF.getTag(this, "GPSLatitudeRef");\r
                const lng = EXIF.getTag(this, "GPSLongitude");\r
                const lngRef = EXIF.getTag(this, "GPSLongitudeRef");\r
\r
                if (lat && latRef && lng && lngRef) {\r
                    const latitude = convertToDecimalDegrees(lat, latRef);\r
                    const longitude = convertToDecimalDegrees(lng, lngRef);\r
                    resolve({ latitude, longitude });\r
                } else {\r
                    alert('Image does not have location. Turn on location first and then take a picture to upload...');\r
                }\r
            });\r
        });\r
    }\r
\r
    function convertToDecimalDegrees(coordinates, direction) {\r
        const degrees = coordinates[0];\r
        const minutes = coordinates[1];\r
        const seconds = coordinates[2];\r
        const decimalDegrees = degrees + minutes / 60 + seconds / 3600;\r
        return direction === "S" || direction === "W" ? -decimalDegrees : decimalDegrees;\r
    }\r
\r
    async function getLocationFromImage(imageFile, val) {\r
        const exifData = await exifr.parse(imageFile);\r
        const { latitude, longitude } = exifData?.latitude && exifData?.longitude\r
            ? { latitude: exifData.latitude, longitude: exifData.longitude }\r
            : (alert('Image does not have location. Turn on location first and then take a picture to upload...'), emptyFun(val));\r
\r
        return { latitude, longitude };\r
    }\r
\r
    const emptyFun = (val) => {\r
        val == 1 && formik.setFieldValue('frontImage', '')\r
        val == 2 && formik.setFieldValue('rightImage', '')\r
        val == 3 && formik.setFieldValue('leftImage', '')\r
    }\r
\r
    async function checkFile(file, val) {\r
        let validSize = await checkSizeValidation(file);\r
        if (validSize) {\r
            return true\r
        } else {\r
            emptyFun(val)\r
            return false\r
        }\r
    }\r
\r
    // ===========to get location from image end here==================\r
\r
    const handleImage = async (e) => {\r
        if (e.target.name == "frontImage") {\r
            setfrontCamera(false)\r
            let file = e.target.files[0];\r
            console.log('image => ', e.target.files[0])\r
            const getSize = await checkFile(file, 1)\r
            if (!getSize) {\r
                return\r
            }\r
            const geoLocation = await getLocationFromImage(file, 1); // for location from image\r
            console.log("1 Image geo location:", geoLocation); // for location from image\r
            setfrontData(geoLocation)\r
            setfrontImageUpload(e.target.files[0]);\r
            setfrontUrl(URL.createObjectURL(e.target.files[0]))\r
            // formik.setFieldValue('frontImage', frontImageUpload)\r
            formik.setFieldValue('flongitude', frontData?.longitude)\r
            formik.setFieldValue('flatitude', frontData?.latitude)\r
            console.log("--1-- name file on change..", file);\r
        }\r
\r
        if (e.target.name == "rightImage") {\r
            setrightCamera(false)\r
            let file = e.target.files[0];\r
            const getSize = await checkFile(file, 2)\r
            if (!getSize) {\r
                return\r
            }\r
            const geoLocation = await getLocationFromImage(file, 2);\r
            console.log("2 Image geo location:", geoLocation);\r
            setrightData(geoLocation)\r
            setrightImageUpload(e.target.files[0]);\r
            setrightUrl(URL.createObjectURL(e.target.files[0]))\r
            // formik.setFieldValue('rightImage', rightImageUpload)\r
            formik.setFieldValue('rlongitude', rightData?.longitude)\r
            formik.setFieldValue('rlatitude', rightData?.latitude)\r
            console.log("--2-- name file on change..", file);\r
        }\r
\r
        if (e.target.name == "leftImage") {\r
            setleftCamera(false)\r
            let file = e.target.files[0];\r
            const getSize = await checkFile(file, 3)\r
            if (!getSize) {\r
                return\r
            }\r
            const geoLocation = await getLocationFromImage(file, 3);\r
            console.log("3 Image geo location:", geoLocation);\r
            setleftData(geoLocation)\r
            setleftImageUpload(e.target.files[0]);\r
            setleftUrl(URL.createObjectURL(e.target.files[0]))\r
            // formik.setFieldValue('leftImage', leftImageUpload)\r
            formik.setFieldValue('llongitude', leftData?.longitude)\r
            formik.setFieldValue('llatitude', leftData?.latitude)\r
            console.log("--3-- name file on change..", file);\r
        }\r
    }\r
\r
    // ==========Modal==============\r
    const [modalIsOpen, setIsOpen] = useState(false);\r
    const [modalIsOpen2, setIsOpen2] = useState(false);\r
    const openModal = (val) => {\r
        setIsOpen(true)\r
        startCamera(val)\r
        setImageData(null)\r
        setimageNo(val)\r
    }\r
    const openModal2 = (data) => {\r
        setIsOpen2(true)\r
        setImageData(data)\r
    }\r
    const closeModal = () => {\r
        setIsOpen(false)\r
        setIsOpen2(false)\r
    }\r
    const afterOpenModal = () => { }\r
    const afterOpenModal2 = () => { }\r
    // ===========Modal End=========\r
\r
    // =====download image==========\r
    const handleDownload = () => {\r
        const link = document.createElement("a");\r
        link.href = imageData;\r
        // link.download = "./Images/CapturedImage.jpg";\r
        if (imageNo == 1) {\r
            setfrontCamera(true)\r
            setfrontUrl(imageData)\r
            formik.setFieldValue('frontImage', imageData)\r
        }\r
        if (imageNo == 2) {\r
            setrightCamera(true)\r
            setrightUrl(imageData)\r
            formik.setFieldValue('rightImage', imageData)\r
        }\r
        if (imageNo == 3) {\r
            setleftCamera(true)\r
            setleftUrl(imageData)\r
            formik.setFieldValue('leftImage', imageData)\r
        }\r
        link.click();\r
        closeModal()\r
    };\r
\r
    const wfFdAction = () => {\r
        setforwardStatus(true)\r
        setactionType('forward')\r
    }\r
    const wfBdAction = () => {\r
        setforwardStatus(true)\r
        setactionType('backward')\r
    }\r
\r
    return (\r
        <>\r
\r
            <div className='text-black w-[50vw] h-[80vh]'>\r
\r
                <form className='w-full h-full border-2 border-blue-700 bg-blue-50 mb-4' onChange={formik.handleChange} onSubmit={formik.handleSubmit} >\r
                    <h1 className='text-center font-semibold py-2 border-b border-gray-800 text-black uppercase text-lg'>Smart Camera</h1>\r
\r
                    {/* =====Front======== */}\r
                    <div className='bg-gray-50 border-2 border-gray-500 my-2 mx-1 h-[28%]'>\r
                        <div className='text-black bg-gray-500 px-2 font-semibold'>Front Image</div>\r
                        <div className='px-2 py-2'>\r
                            <div className="flex items-center gap-2 w-full text-sm pb-2 px-2">\r
                                <div className='w-[40%] flex items-center justify-center '>\r
                                    <img src={frontUrl} alt="Front Image" srcSet="" className='w-[60%]' />\r
                                </div>\r
                                <div className=' w-[60%]'>\r
                                    <span className=' col-span-12 grid grid-cols-12 mb-2'>\r
                                        <span className="col-span-8 text-sm flex items-center">Capture Image :</span>\r
                                        {/* <span className="col-span-5 text-sm"><input type="file" onChange={handleImage} name="frontImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span> */}\r
                                        {/* <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span> */}\r
                                        <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image' onClick={() => openModal(1)} className='cursor-pointer'><span className='text-4xl'><FcCamera fontSize={'large'} /></span></abbr> </span>\r
                                    </span>\r
                                    <span className='col-span-12 grid grid-cols-12'>\r
                                        <span className="col-span-6 text-sm flex items-center">Latitude :</span>\r
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{frontData?.latitude}</span></span>\r
                                    </span>\r
                                    <span className='col-span-12 grid grid-cols-12'>\r
                                        <span className="col-span-6 text-sm flex items-center">Longitude :</span>\r
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{frontData?.longitude}</span></span>\r
                                    </span>\r
                                </div>\r
\r
                            </div>\r
\r
\r
                        </div>\r
                    </div>\r
\r
                    {/* =======Right========= */}\r
                    <div className='bg-gray-50 border-2 border-gray-500 my-2 mx-1 h-[28%]'>\r
                        <div className='text-black bg-gray-500 px-2 font-semibold'>Right Image</div>\r
                        <div className='px-2 py-2'>\r
                            <div className="flex items-center gap-2 w-full h-full text-sm pb-2 px-2">\r
                                <div className='w-[40%] flex items-center justify-center '>\r
                                    <img src={rightUrl} alt="Front Image" srcSet="" className='w-[60%]' />\r
                                </div>\r
                                <div className=' w-[60%] '>\r
                                    <span className='col-span-12 grid grid-cols-12 mb-2'>\r
                                        <span className="col-span-8 text-sm flex items-center">Capture Image :</span>\r
                                        {/* <span className="col-span-5 text-sm"><input type="file" onChange={handleImage} name="rightImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span>\r
                                            <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span> */}\r
                                        <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image' onClick={() => openModal(2)} className='cursor-pointer'><span className='text-4xl'><FcCamera fontSize={'large'} /></span></abbr> </span>\r
                                    </span>\r
                                    <span className='col-span-12 grid grid-cols-12'>\r
                                        <span className="col-span-6 text-sm flex items-center">Latitude :</span>\r
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{rightData?.latitude}</span></span>\r
                                    </span>\r
                                    <span className='col-span-12 grid grid-cols-12'>\r
                                        <span className="col-span-6 text-sm flex items-center">Longitude :</span>\r
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{rightData?.longitude}</span></span>\r
                                    </span>\r
                                </div>\r
                            </div>\r
\r
\r
                        </div>\r
                    </div>\r
\r
                    {/* ====Left Image===== */}\r
                    <div className='bg-gray-50 border-2 border-gray-500 my-2 mx-1 h-[28%]'>\r
                        <div className='text-black bg-gray-500 px-2 font-semibold'>Left Image</div>\r
                        <div className='px-2 py-2'>\r
                            <div className="flex items-center gap-2 w-full h-full text-sm pb-2 px-2">\r
                                <div className='w-[40%] flex items-center justify-center '>\r
                                    <img src={leftUrl} alt="Front Image" srcSet="" className='w-[60%]' />\r
                                </div>\r
                                <div className=' w-[60%] '>\r
                                    <span className='col-span-12 grid grid-cols-12 mb-2'>\r
                                        <span className="col-span-8 text-sm flex items-center">Capture Image :</span>\r
                                        {/* <span className="col-span-5 text-sm"><input type="file" onChange={handleImage} name="leftImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span> */}\r
                                        {/* <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span> */}\r
                                        <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image' onClick={() => openModal(3)} className='cursor-pointer'><div className='text-4xl'><FcCamera fontSize={'large'} /></div></abbr> </span>\r
                                    </span>\r
                                    <span className='col-span-12 grid grid-cols-12'>\r
                                        <span className="col-span-6 text-sm flex items-center">Latitude :</span>\r
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{leftData?.latitude}</span></span>\r
                                    </span>\r
                                    <span className='col-span-12 grid grid-cols-12'>\r
                                        <span className="col-span-6 text-sm flex items-center">Longitude :</span>\r
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{leftData?.longitude}</span></span>\r
                                    </span>\r
                                </div>\r
                            </div>\r
\r
\r
                        </div>\r
                    </div>\r
\r
                    {/* ==========Button========= */}\r
                    <div className='w-full flex justify-center m-2'>\r
                        {/* <div onClick={props?.back} className='px-4 py-1.5 text-sm text-black rounded-sm shadow-md bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 cursor-pointer'>\r
                    Back\r
                </div> */}\r
                        <button type='submit' className="px-4 py-1.5 mr-4 text-sm text-black rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">Done</button>\r
                    </div>\r
\r
                </form>\r
            </div>\r
\r
            {/* ========Modal==========*/}\r
            <Modal\r
                isOpen={modalIsOpen}\r
                onAfterOpen={afterOpenModal}\r
                className="z-50 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"\r
                contentLabel="Example Modal"\r
            >\r
\r
                <div className=" animate__animated animate__zoomIn animate__faster rounded-lg md:ml-24 shadow-lg relative bg-gray-50 px-4 py-4 w-max mt-10 z-50 border-t-2 border-l-2 border-white overflow-auto" >\r
\r
                    <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>\r
                        <ImCross fontSize={10} />\r
                    </div>\r
\r
                    {/* =======To open camera and take picture */}\r
                    <div className='flex justify-center gap-2'>\r
                        <button onClick={stopCamera} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Stop Camera</button>\r
                        <button onClick={startCamera} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Start Camera</button>\r
                    </div>\r
                    <div className='mt-6 w-full flex flex-wrap gap-4'>\r
                        <div>\r
                            <video ref={videoRef} autoPlay className='-scale-x-1' />\r
                            <canvas ref={canvasRef} style={{ display: "none" }} />\r
                            {/* <button onClick={startCamera}>Start Camera</button> */}\r
                            {/* <button onClick={endCamera}>End Camera</button> */}\r
                            {videoRef?.current?.srcObject != null && <div className='w-full flex justify-center gap-2 text-center my-4'>\r
                                <button onClick={captureImage} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Capture</button>\r
                            </div>}\r
                        </div>\r
                        {imageData && <>\r
                            <div className='mx-auto'>\r
                                <img src={imageData} alt="Captured Image" />\r
                                <div className='w-full text-center my-4'>\r
                                    <button onClick={handleDownload} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Save</button>\r
                                </div>\r
                            </div>\r
                        </>}\r
\r
\r
\r
                        {/* {\r
                        imageData && \r
                        <>\r
                        {imageNo == 1 && setfrontUrl(imageData)}\r
                        {imageNo == 2 && setrightUrl(imageData)}\r
                        {imageNo == 3 && setleftUrl(imageData)}\r
                        </>\r
                    } */}\r
\r
                    </div>\r
\r
                </div>\r
            </Modal>\r
\r
            <Modal\r
                isOpen={modalIsOpen2}\r
                onAfterOpen={afterOpenModal2}\r
                className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"\r
                contentLabel="Example Modal"\r
            >\r
\r
                <div className=" animate__animated animate__zoomIn animate__faster relative rounded-lg shadow-xl border-2 border-gray-50 px-0" style={{ 'width': '95vw', 'height': '80vh' }}>\r
\r
                    <div className="absolute top-2 z-40 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>\r
                        <ImCross fontSize={10} />\r
                    </div>\r
\r
                    <div className='w-full h-[77vh] overflow-auto flex flex-wrap items-center justify-center'>\r
                        <img src={imageData} alt="" srcSet="" />\r
                    </div>\r
\r
                </div>\r
            </Modal>\r
\r
        </>\r
    )\r
}\r
\r
export default SmartCam`,I=`const PerformanceAPI = () => {\r
\r
  const loadTime = window.performance.now() / 1000\r
\r
  let str = "This is a javascript"\r
\r
  const reverseFun = (str) => {\r
\r
    window.performance.mark("start")\r
\r
    let words = str.split(' ')\r
\r
    let myWords = words?.map((elem) => {\r
      return elem?.split('').reverse().join('')\r
    }).join(' ')\r
\r
    window.performance.mark('end')\r
\r
    return myWords;\r
  }\r
\r
  let reversedStr = reverseFun(str);\r
\r
  window.performance.measure('render', 'start', 'end')\r
  const performanceMeasure = window.performance.getEntries('render')[0];\r
\r
  return (\r
    <div className='flex flex-col items-center justify-center w-screen'>\r
      <div>\r
        Component load time: {(loadTime / 60).toFixed(4)}sec\r
      </div>\r
\r
      <div>\r
        Flipped the word "This is a javascript" in {performanceMeasure.duration / 1000}sec : {reversedStr}\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default PerformanceAPI`,N=`import React, { useEffect, useRef, useState } from 'react';\r
import ReCAPTCHA from 'react-google-recaptcha';\r
import HCaptcha from '@hcaptcha/react-hcaptcha';\r
import axios from 'axios'\r
\r
const HumanVerification = () => {\r
\r
  // const handleCaptchaVerification = (response) => {\r
  //   // Handle the CAPTCHA response (send it to your server for validation, etc.)\r
  //   console.log('CAPTCHA response:', response);\r
  // };\r
\r
  // const verifyCaptcha = async (userResponse) => {\r
  //   const secretKey = '6LdD9rknAAAAAAFfQgCrMP0cYKMkr7HpHRcZG0fk';\r
  //   const url = \`https://www.google.com/recaptcha/api/siteverify\`;\r
\r
  //   const response = await axios.post(url, null, {\r
  //     params: {\r
  //       secret: secretKey,\r
  //       response: userResponse,\r
  //     },\r
  //   });\r
\r
  //   return response.data.success;\r
  // };\r
\r
  const [token, setToken] = useState(null);\r
  const captchaRef = useRef(null);\r
\r
  const onLoad = () => {\r
    // this reaches out to the hCaptcha JS API and runs the\r
    // execute function on it. you can use other functions as\r
    // documented here:\r
    // https://docs.hcaptcha.com/configuration#jsapi\r
    captchaRef.current.execute();\r
  };\r
\r
  useEffect(() => {\r
\r
    if (token)\r
      console.log(\`hCaptcha Token: \${token}\`);\r
  }, [token]);\r
\r
\r
  return (\r
    <div>\r
      {/* Other form fields */}\r
      {/* <ReCAPTCHA\r
        sitekey='6Le2-icoAAAAAO6SWFL_y_BvwL2-Rafo3KGBmH6M'\r
        onChange={handleCaptchaVerification}\r
      /> */}\r
\r
      <HCaptcha\r
        sitekey="cbf8c168-af51-486a-ad4d-333c3947ab6b"\r
        onLoad={onLoad}\r
        onVerify={setToken}\r
        ref={captchaRef}\r
      />\r
\r
      {/* Submit button */}\r
    </div>\r
  );\r
};\r
\r
export default HumanVerification;\r
`,S=`// ==============================================\r
// || Author: R U Bharti\r
// || Date: 21-08-2023\r
// || Component: Chat Bot\r
// || Description: This is actually help bot with some specific question.\r
// ==============================================\r
/*\r
Readme\r
---------------------------------------------------------------------------------------------------\r
Note: Do not change key -> q, a, topic\r
\r
 // Array for ChatBot\r
 const your_array = [\r
    { q: "Here will be your heading/topic/question",      a: "Here will be your answer" }\r
  ]\r
\r
    <ChatBot topic={your_array}/> // Imported ChatBot Component\r
*/\r
\r
import React, { useEffect, useRef, useState } from 'react'\r
import chatBot from './chatBot.png'\r
import 'animate.css'\r
\r
const ChatBot = (props) => {\r
\r
    const { topic } = props\r
    const chatContainerRef = useRef(null);\r
\r
    const [open, setOpen] = useState(false)\r
    const [chatHistory, setChatHistory] = useState([])\r
\r
    const chatDataFun = (question) => {\r
        console.log(question)\r
        let answer = topic?.filter((item) => item?.q == question)\r
        console.log(answer)\r
        if(answer?.length > 0){\r
            setChatHistory([...chatHistory, answer[0]?.a]);\r
        }\r
    }\r
\r
    useEffect(() => {\r
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;\r
    },[chatHistory])\r
\r
    return (\r
        <>\r
            {/* Main Section */}\r
            <div ref={chatContainerRef} style={{scrollBehavior: 'smooth'}} className={\` text-gray-900 bg-none backdrop:blur-lg drop-shadow-lg fixed bottom-6 right-6 transition-all duration-300 \${open ? ' w-[30vw] h-[90vh] bg-gray-100 rounded-xl overflow-y-auto overflow-x-clip ' : ' w-[7vw] h-[0vw] '}\`}>\r
\r
                {open && <>\r
\r
                    {/* Header */}\r
                    <header className='text-center flex items-center bg-gradient-to-r select-none from-indigo-400 to-indigo-300 rounded-t-xl p-4 font-semibold text-white'>\r
                        <span className='w-[13%]'><img src={chatBot} alt="" srcSet="" className='w-[3vw] transform -scale-x-100' /></span>\r
                        <span className='w-[40%] text-start text-lg'>Welcome To Help Bot</span>\r
                        <span className='w-[47%] flex justify-end cursor-pointer text-3xl font-semibold' onClick={() => setOpen(false)}>&times;</span>\r
                    </header>\r
\r
                    {/* Chat Section */}\r
                    <main className='w-full flex-col p-4 relative'>\r
\r
                        {/* Static Chat */}\r
                        <div className='flex items-end gap-2'>\r
                            <img src={chatBot} alt="Chatbot" className='w-[2.2vw] -scale-x-100 select-none' />\r
                            <div className='flex flex-col text-md gap-1'>\r
                                <span className='rounded-xl bg-gray-200 w-max flex flex-col px-4 p-2'>\r
                                    <span>Hi there 👋 </span>\r
                                    <span>Welcome to Help Bot - </span>\r
                                    <span>Seems like you stuck !!!</span>\r
                                </span>\r
                                <span className='rounded-xl bg-gray-200 w-max px-4 p-2'>\r
                                    How can I help you ?\r
                                </span>\r
                            </div>\r
                        </div>\r
\r
                        <div className='w-full flex justify-end mt-4 select-none'>\r
                            <div className='w-[75%] flex flex-wrap items-end justify-end gap-2 '>\r
                                {topic?.map((elem) => <>\r
                                    <div onClick={() => chatDataFun(elem?.q)} className='w-max text-sm text-indigo-400 px-4 p-1 rounded-xl border border-indigo-400 hover:bg-indigo-400 hover:text-white cursor-pointer'>\r
                                        {elem?.q}\r
                                    </div>\r
                                </>)}\r
                            </div>\r
                        </div>\r
\r
                        {/* Dynamic Chat */}\r
                        <div className='w-full mt-6'>\r
\r
                            {\r
                                chatHistory?.map((elem) => <>\r
                                    <div className='flex items-end gap-2 mt-4 w-[80%] animate__animated animate__fadeInLeft animate__faster'>\r
                                        <img src={chatBot} alt="Chatbot" className='w-[2.2vw] -scale-x-100 select-none' />\r
                                        <div className='rounded-xl bg-gray-200 w-max flex flex-wrap px-4 p-2'>\r
                                                {elem}\r
                                        </div>\r
                                    </div>\r
\r
                                    <div className='w-full flex justify-end mt-4 select-none'>\r
                                        <div className='w-[75%] flex flex-wrap items-end justify-end gap-2 animate__animated animate__fadeInRight '>\r
                                            {topic?.map((elem) => <>\r
                                                <div onClick={() => chatDataFun(elem?.q)} className='w-max text-sm text-indigo-400 px-4 p-1 rounded-xl border border-indigo-400 hover:bg-indigo-400 hover:text-white cursor-pointer'>\r
                                                    {elem?.q}\r
                                                </div>\r
                                            </>)}\r
                                        </div>\r
                                    </div>\r
                                </>)\r
                            }\r
\r
                        </div>\r
\r
                    </main>\r
                </>}\r
\r
\r
                {/* Logo for toggle */}\r
                {!open && <img src={chatBot} alt="" srcSet="" className='w-[3vw] absolute bottom-2 right-2 hover:animate-spin drop-shadow-md cursor-pointer' onClick={() => setOpen(!open)} />}\r
\r
            </div>\r
\r
        </>\r
    )\r
}\r
\r
export default ChatBot`,D=`import React from 'react'\r
import Atropos from 'atropos/react';\r
import 'atropos/css'\r
\r
const Parallax = () => {\r
    return (\r
        <>\r
\r
            <Atropos className="my-atropos">\r
                <div className=' h-[50vh] w-[70vw]'>\r
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns: xlink="http://www.w3.org/1999/xlink" xmlns: svgjs="http://svgjs.dev/svgjs" viewBox="0 0 1422 800"><circle r="19" cx="611" cy="176" strokeWidth="2" stroke="hsl(326, 50%, 50%)" fill="none" opacity="0.71"></circle><circle r="14" cx="135" cy="713" fill="hsl(157, 50%, 50%)" opacity="0.80"></circle><circle r="13" cx="101" cy="605" strokeWidth="2" stroke="hsl(129, 50%, 50%)" fill="none" opacity="0.54"></circle><circle r="17.5" cx="1129" cy="480" fill="hsl(247, 50%, 50%)" opacity="0.85"></circle><circle r="11.5" cx="27" cy="374" fill="hsl(86, 50%, 50%)" opacity="0.22"></circle><circle r="17" cx="162" cy="83" fill="hsl(236, 50%, 50%)" opacity="0.35"></circle><circle r="19.5" cx="701" cy="118" fill="hsl(336, 50%, 50%)" opacity="0.27"></circle><circle r="15.5" cx="240" cy="182" fill="hsl(198, 50%, 50%)" opacity="0.29"></circle><circle r="13" cx="101" cy="190" strokeWidth="2" stroke="hsl(129, 50%, 50%)" fill="none" opacity="0.54"></circle><circle r="11.5" cx="76" cy="724" fill="hsl(115, 50%, 50%)" opacity="0.72"></circle><circle r="17.5" cx="555" cy="574" fill="hsl(299, 50%, 50%)" opacity="0.19"></circle><circle r="17" cx="406" cy="220" strokeWidth="2" stroke="hsl(247, 50%, 50%)" fill="none" opacity="0.73"></circle><circle r="18" cx="664" cy="166" strokeWidth="2" stroke="hsl(334, 50%, 50%)" fill="none" opacity="0.96"></circle><circle r="15" cx="966" cy="584" fill="hsl(240, 50%, 50%)" opacity="0.36"></circle><circle r="13.5" cx="183" cy="532" strokeWidth="2" stroke="hsl(180, 50%, 50%)" fill="none" opacity="0.98"></circle><circle r="18.5" cx="1179" cy="442" strokeWidth="2" stroke="hsl(264, 50%, 50%)" fill="none" opacity="0.96"></circle><circle r="16.5" cx="1396" cy="725" fill="hsl(289, 50%, 50%)" opacity="0.98"></circle><circle r="15" cx="1076" cy="545" strokeWidth="2" stroke="hsl(237, 50%, 50%)" fill="none" opacity="0.18"></circle><circle r="15.5" cx="281" cy="520" fill="hsl(212, 50%, 50%)" opacity="0.79"></circle><circle r="17" cx="1232" cy="412" strokeWidth="2" stroke="hsl(275, 50%, 50%)" fill="none" opacity="0.86"></circle><circle r="14.5" cx="137" cy="347" fill="hsl(157, 50%, 50%)" opacity="0.16"></circle><circle r="15.5" cx="1061" cy="258" fill="hsl(235, 50%, 50%)" opacity="0.54"></circle><circle r="17" cx="282" cy="75" strokeWidth="2" stroke="hsl(268, 50%, 50%)" fill="none" opacity="0.53"></circle><circle r="16" cx="1009" cy="683" fill="hsl(234, 50%, 50%)" opacity="0.48"></circle><circle r="21" cx="686" cy="451" fill="hsl(335, 50%, 50%)" opacity="0.11"></circle><circle r="16" cx="882" cy="774" fill="hsl(272, 50%, 50%)" opacity="0.96"></circle><circle r="15.5" cx="1070" cy="493" fill="hsl(237, 50%, 50%)" opacity="0.19"></circle><circle r="14.5" cx="946" cy="776" strokeWidth="2" stroke="hsl(246, 50%, 50%)" fill="none" opacity="0.27"></circle><circle r="14.5" cx="214" cy="659" fill="hsl(190, 50%, 50%)" opacity="0.32"></circle><circle r="15" cx="1115" cy="69" fill="hsl(232, 50%, 50%)" opacity="0.27"></circle><circle r="19.5" cx="769" cy="663" strokeWidth="2" stroke="hsl(321, 50%, 50%)" fill="none" opacity="0.41"></circle><circle r="19" cx="1393" cy="196" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.49"></circle><circle r="17.5" cx="1181" cy="83" fill="hsl(252, 50%, 50%)" opacity="1.00"></circle><circle r="15.5" cx="1211" cy="26" strokeWidth="2" stroke="hsl(239, 50%, 50%)" fill="none" opacity="0.36"></circle><circle r="17.5" cx="1349" cy="543" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.82"></circle><circle r="16.5" cx="1234" cy="731" strokeWidth="2" stroke="hsl(275, 50%, 50%)" fill="none" opacity="0.29"></circle><circle r="15.5" cx="980" cy="80" fill="hsl(221, 50%, 50%)" opacity="0.99"></circle><circle r="17" cx="841" cy="575" fill="hsl(293, 50%, 50%)" opacity="0.60"></circle><circle r="19" cx="825" cy="667" fill="hsl(293, 50%, 50%)" opacity="0.66"></circle><circle r="17.5" cx="472" cy="219" fill="hsl(271, 50%, 50%)" opacity="0.76"></circle><circle r="19" cx="1343" cy="419" fill="hsl(289, 50%, 50%)" opacity="0.23"></circle><circle r="17" cx="1396" cy="506" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.60"></circle><circle r="19" cx="669" cy="72" strokeWidth="2" stroke="hsl(340, 50%, 50%)" fill="none" opacity="0.27"></circle><circle r="16.5" cx="1089" cy="435" strokeWidth="2" stroke="hsl(242, 50%, 50%)" fill="none" opacity="0.54"></circle><circle r="15" cx="1062" cy="204" fill="hsl(235, 50%, 50%)" opacity="0.21"></circle><circle r="15" cx="279" cy="650" fill="hsl(212, 50%, 50%)" opacity="0.33"></circle><circle r="13.5" cx="1012" cy="777" fill="hsl(234, 50%, 50%)" opacity="0.78"></circle><circle r="16.5" cx="1112" cy="653" strokeWidth="2" stroke="hsl(247, 50%, 50%)" fill="none" opacity="0.69"></circle><circle r="16.5" cx="977" cy="729" strokeWidth="2" stroke="hsl(240, 50%, 50%)" fill="none" opacity="0.84"></circle><circle r="16.5" cx="1198" cy="371" strokeWidth="2" stroke="hsl(264, 50%, 50%)" fill="none" opacity="0.90"></circle><circle r="15.5" cx="200" cy="135" strokeWidth="2" stroke="hsl(203, 50%, 50%)" fill="none" opacity="0.28"></circle><circle r="15.5" cx="225" cy="770" fill="hsl(198, 50%, 50%)" opacity="0.99"></circle><circle r="17.5" cx="760" cy="553" strokeWidth="2" stroke="hsl(321, 50%, 50%)" fill="none" opacity="0.46"></circle><circle r="19" cx="605" cy="375" fill="hsl(324, 50%, 50%)" opacity="0.16"></circle><circle r="17" cx="1396" cy="567" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.38"></circle><circle r="11.5" cx="100" cy="774" fill="hsl(129, 50%, 50%)" opacity="0.35"></circle><circle r="19" cx="1184" cy="505" strokeWidth="2" stroke="hsl(264, 50%, 50%)" fill="none" opacity="0.30"></circle><circle r="10.5" cx="23" cy="135" fill="hsl(104, 50%, 50%)" opacity="0.67"></circle><circle r="16" cx="1141" cy="773" fill="hsl(252, 50%, 50%)" opacity="0.72"></circle><circle r="18" cx="703" cy="25" fill="hsl(338, 50%, 50%)" opacity="0.79"></circle><circle r="19" cx="534" cy="101" strokeWidth="2" stroke="hsl(316, 50%, 50%)" fill="none" opacity="0.60"></circle><circle r="12" cx="109" cy="291" fill="hsl(129, 50%, 50%)" opacity="0.64"></circle><circle r="17.5" cx="1270" cy="773" strokeWidth="2" stroke="hsl(283, 50%, 50%)" fill="none" opacity="0.91"></circle><circle r="11.5" cx="31" cy="769" fill="hsl(86, 50%, 50%)" opacity="0.35"></circle><circle r="16" cx="351" cy="318" fill="hsl(229, 50%, 50%)" opacity="0.43"></circle><circle r="18.5" cx="717" cy="654" strokeWidth="2" stroke="hsl(332, 50%, 50%)" fill="none" opacity="0.50"></circle><circle r="17" cx="259" cy="710" strokeWidth="2" stroke="hsl(206, 50%, 50%)" fill="none" opacity="0.16"></circle><circle r="20.5" cx="790" cy="720" strokeWidth="2" stroke="hsl(313, 50%, 50%)" fill="none" opacity="0.55"></circle><circle r="10.5" cx="88" cy="391" fill="hsl(115, 50%, 50%)" opacity="0.26"></circle><circle r="15" cx="1029" cy="446" fill="hsl(233, 50%, 50%)" opacity="0.75"></circle><circle r="13.5" cx="26" cy="27" strokeWidth="2" stroke="hsl(180, 50%, 50%)" fill="none" opacity="0.36"></circle><circle r="17" cx="916" cy="397" fill="hsl(253, 50%, 50%)" opacity="0.79"></circle><circle r="17" cx="1289" cy="110" strokeWidth="2" stroke="hsl(285, 50%, 50%)" fill="none" opacity="0.46"></circle><circle r="16" cx="858" cy="255" strokeWidth="2" stroke="hsl(282, 50%, 50%)" fill="none" opacity="0.38"></circle><circle r="19.5" cx="734" cy="74" fill="hsl(325, 50%, 50%)" opacity="0.11"></circle><circle r="16" cx="966" cy="308" strokeWidth="2" stroke="hsl(240, 50%, 50%)" fill="none" opacity="0.39"></circle><circle r="18.5" cx="1135" cy="543" fill="hsl(252, 50%, 50%)" opacity="0.38"></circle><circle r="18.5" cx="478" cy="336" fill="hsl(271, 50%, 50%)" opacity="0.33"></circle><circle r="15" cx="379" cy="726" fill="hsl(240, 50%, 50%)" opacity="0.89"></circle><circle r="16.5" cx="1114" cy="231" strokeWidth="2" stroke="hsl(247, 50%, 50%)" fill="none" opacity="0.29"></circle><circle r="16.5" cx="862" cy="622" strokeWidth="2" stroke="hsl(282, 50%, 50%)" fill="none" opacity="0.23"></circle><circle r="19.5" cx="582" cy="128" strokeWidth="2" stroke="hsl(325, 50%, 50%)" fill="none" opacity="0.11"></circle><circle r="14.5" cx="170" cy="186" strokeWidth="2" stroke="hsl(169, 50%, 50%)" fill="none" opacity="0.85"></circle><circle r="17" cx="866" cy="308" strokeWidth="2" stroke="hsl(282, 50%, 50%)" fill="none" opacity="0.19"></circle><circle r="19" cx="637" cy="494" fill="hsl(330, 50%, 50%)" opacity="0.18"></circle><circle r="14" cx="1010" cy="495" strokeWidth="2" stroke="hsl(234, 50%, 50%)" fill="none" opacity="0.37"></circle><circle r="17.5" cx="1116" cy="718" fill="hsl(247, 50%, 50%)" opacity="0.63"></circle><circle r="13.5" cx="240" cy="609" strokeWidth="2" stroke="hsl(198, 50%, 50%)" fill="none" opacity="0.10"></circle><circle r="19.5" cx="1326" cy="599" fill="hsl(288, 50%, 50%)" opacity="0.87"></circle><circle r="20.5" cx="743" cy="437" strokeWidth="2" stroke="hsl(328, 50%, 50%)" fill="none" opacity="0.25"></circle><circle r="19.5" cx="492" cy="153" fill="hsl(290, 50%, 50%)" opacity="0.28"></circle><circle r="15.5" cx="1195" cy="311" strokeWidth="2" stroke="hsl(264, 50%, 50%)" fill="none" opacity="0.29"></circle><circle r="17" cx="436" cy="113" strokeWidth="2" stroke="hsl(275, 50%, 50%)" fill="none" opacity="0.49"></circle><circle r="21.5" cx="729" cy="715" strokeWidth="2" stroke="hsl(332, 50%, 50%)" fill="none" opacity="0.12"></circle><circle r="16.5" cx="434" cy="481" fill="hsl(254, 50%, 50%)" opacity="0.53"></circle><circle r="15" cx="1012" cy="277" fill="hsl(234, 50%, 50%)" opacity="0.37"></circle><circle r="18" cx="376" cy="148" strokeWidth="2" stroke="hsl(250, 50%, 50%)" fill="none" opacity="0.42"></circle><circle r="10" cx="30" cy="306" fill="hsl(86, 50%, 50%)" opacity="0.15"></circle><circle r="11.5" cx="77" cy="246" fill="hsl(115, 50%, 50%)" opacity="0.44"></circle><circle r="20.5" cx="656" cy="222" strokeWidth="2" stroke="hsl(334, 50%, 50%)" fill="none" opacity="0.38"></circle><circle r="15" cx="957" cy="533" strokeWidth="2" stroke="hsl(240, 50%, 50%)" fill="none" opacity="0.22"></circle><circle r="18" cx="1239" cy="137" strokeWidth="2" stroke="hsl(278, 50%, 50%)" fill="none" opacity="0.96"></circle><circle r="18.5" cx="564" cy="411" fill="hsl(308, 50%, 50%)" opacity="0.27"></circle><circle r="17" cx="1393" cy="81" strokeWidth="2" stroke="hsl(276, 50%, 50%)" fill="none" opacity="0.92"></circle><circle r="10.5" cx="34" cy="191" strokeWidth="2" stroke="hsl(86, 50%, 50%)" fill="none" opacity="0.21"></circle><circle r="12.5" cx="130" cy="547" strokeWidth="2" stroke="hsl(143, 50%, 50%)" fill="none" opacity="0.53"></circle><circle r="16.5" cx="765" cy="24" strokeWidth="2" stroke="hsl(313, 50%, 50%)" fill="none" opacity="0.36"></circle><circle r="15.5" cx="320" cy="474" strokeWidth="2" stroke="hsl(223, 50%, 50%)" fill="none" opacity="0.14"></circle><circle r="14.5" cx="1062" cy="386" strokeWidth="2" stroke="hsl(235, 50%, 50%)" fill="none" opacity="0.93"></circle><circle r="17.5" cx="673" cy="678" strokeWidth="2" stroke="hsl(335, 50%, 50%)" fill="none" opacity="0.61"></circle><circle r="17.5" cx="479" cy="25" strokeWidth="2" stroke="hsl(318, 50%, 50%)" fill="none" opacity="0.99"></circle><circle r="15.5" cx="336" cy="256" fill="hsl(229, 50%, 50%)" opacity="0.55"></circle><circle r="19.5" cx="597" cy="536" fill="hsl(316, 50%, 50%)" opacity="0.90"></circle><circle r="14" cx="1016" cy="27" strokeWidth="2" stroke="hsl(202, 50%, 50%)" fill="none" opacity="0.91"></circle><circle r="16.5" cx="376" cy="567" fill="hsl(234, 50%, 50%)" opacity="0.95"></circle><circle r="18.5" cx="1328" cy="771" strokeWidth="2" stroke="hsl(288, 50%, 50%)" fill="none" opacity="0.13"></circle><circle r="14.5" cx="284" cy="773" strokeWidth="2" stroke="hsl(212, 50%, 50%)" fill="none" opacity="0.96"></circle><circle r="17.5" cx="1343" cy="716" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.34"></circle><circle r="20" cx="611" cy="719" strokeWidth="2" stroke="hsl(324, 50%, 50%)" fill="none" opacity="0.83"></circle><circle r="15.5" cx="476" cy="618" fill="hsl(271, 50%, 50%)" opacity="0.55"></circle><circle r="17" cx="1136" cy="121" fill="hsl(250, 50%, 50%)" opacity="0.22"></circle><circle r="16.5" cx="1140" cy="404" strokeWidth="2" stroke="hsl(252, 50%, 50%)" fill="none" opacity="0.99"></circle><circle r="18.5" cx="1270" cy="366" strokeWidth="2" stroke="hsl(283, 50%, 50%)" fill="none" opacity="0.81"></circle><circle r="17.5" cx="416" cy="329" strokeWidth="2" stroke="hsl(247, 50%, 50%)" fill="none" opacity="0.41"></circle><circle r="16.5" cx="1245" cy="314" fill="hsl(279, 50%, 50%)" opacity="0.93"></circle><circle r="17" cx="586" cy="776" strokeWidth="2" stroke="hsl(316, 50%, 50%)" fill="none" opacity="0.92"></circle><circle r="17" cx="917" cy="337" strokeWidth="2" stroke="hsl(253, 50%, 50%)" fill="none" opacity="0.90"></circle><circle r="18" cx="450" cy="275" strokeWidth="2" stroke="hsl(262, 50%, 50%)" fill="none" opacity="0.92"></circle><circle r="21" cx="655" cy="333" fill="hsl(334, 50%, 50%)" opacity="0.56"></circle><circle r="15" cx="1070" cy="689" fill="hsl(237, 50%, 50%)" opacity="0.15"></circle><circle r="15" cx="827" cy="24" strokeWidth="2" stroke="hsl(276, 50%, 50%)" fill="none" opacity="0.77"></circle><circle r="19" cx="1223" cy="258" strokeWidth="2" stroke="hsl(275, 50%, 50%)" fill="none" opacity="0.25"></circle><circle r="10" cx="27" cy="575" fill="hsl(86, 50%, 50%)" opacity="0.61"></circle><circle r="18" cx="508" cy="284" strokeWidth="2" stroke="hsl(280, 50%, 50%)" fill="none" opacity="0.32"></circle><circle r="14" cx="318" cy="730" strokeWidth="2" stroke="hsl(223, 50%, 50%)" fill="none" opacity="0.39"></circle><circle r="12.5" cx="34" cy="81" strokeWidth="2" stroke="hsl(146, 50%, 50%)" fill="none" opacity="0.85"></circle><circle r="14.5" cx="1092" cy="162" strokeWidth="2" stroke="hsl(242, 50%, 50%)" fill="none" opacity="0.41"></circle><circle r="15.5" cx="348" cy="202" fill="hsl(229, 50%, 50%)" opacity="0.39"></circle><circle r="17" cx="252" cy="26" fill="hsl(290, 50%, 50%)" opacity="0.15"></circle><circle r="14.5" cx="1042" cy="732" strokeWidth="2" stroke="hsl(233, 50%, 50%)" fill="none" opacity="0.25"></circle><circle r="17" cx="1389" cy="619" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.89"></circle><circle r="19" cx="480" cy="82" fill="hsl(303, 50%, 50%)" opacity="0.10"></circle><circle r="18" cx="740" cy="607" fill="hsl(328, 50%, 50%)" opacity="0.22"></circle><circle r="15.5" cx="235" cy="286" strokeWidth="2" stroke="hsl(198, 50%, 50%)" fill="none" opacity="0.74"></circle><circle r="16.5" cx="379" cy="494" fill="hsl(240, 50%, 50%)" opacity="0.29"></circle><circle r="16.5" cx="857" cy="68" fill="hsl(271, 50%, 50%)" opacity="0.99"></circle><circle r="19" cx="611" cy="600" fill="hsl(324, 50%, 50%)" opacity="0.73"></circle><circle r="19.5" cx="703" cy="773" fill="hsl(335, 50%, 50%)" opacity="0.53"></circle><circle r="17" cx="963" cy="247" fill="hsl(240, 50%, 50%)" opacity="0.50"></circle><circle r="16.5" cx="907" cy="453" fill="hsl(262, 50%, 50%)" opacity="0.93"></circle><circle r="14.5" cx="1031" cy="592" fill="hsl(233, 50%, 50%)" opacity="0.34"></circle><circle r="15.5" cx="79" cy="29" fill="hsl(214, 50%, 50%)" opacity="0.95"></circle><circle r="17" cx="1393" cy="672" fill="hsl(289, 50%, 50%)" opacity="0.80"></circle><circle r="19.5" cx="1392" cy="322" fill="hsl(289, 50%, 50%)" opacity="0.95"></circle><circle r="18" cx="886" cy="675" strokeWidth="2" stroke="hsl(272, 50%, 50%)" fill="none" opacity="0.21"></circle><circle r="16" cx="964" cy="368" strokeWidth="2" stroke="hsl(240, 50%, 50%)" fill="none" opacity="0.73"></circle><circle r="15" cx="208" cy="234" fill="hsl(190, 50%, 50%)" opacity="0.32"></circle><circle r="19" cx="493" cy="560" strokeWidth="2" stroke="hsl(280, 50%, 50%)" fill="none" opacity="0.69"></circle><circle r="18.5" cx="596" cy="322" fill="hsl(316, 50%, 50%)" opacity="0.92"></circle><circle r="18" cx="1241" cy="527" fill="hsl(275, 50%, 50%)" opacity="0.91"></circle><circle r="15" cx="262" cy="457" fill="hsl(206, 50%, 50%)" opacity="0.54"></circle><circle r="16" cx="554" cy="734" strokeWidth="2" stroke="hsl(299, 50%, 50%)" fill="none" opacity="0.11"></circle><circle r="15" cx="292" cy="411" fill="hsl(218, 50%, 50%)" opacity="0.67"></circle><circle r="18.5" cx="1394" cy="383" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.40"></circle><circle r="18" cx="760" cy="189" strokeWidth="2" stroke="hsl(321, 50%, 50%)" fill="none" opacity="0.10"></circle><circle r="18" cx="806" cy="532" strokeWidth="2" stroke="hsl(303, 50%, 50%)" fill="none" opacity="0.46"></circle><circle r="15" cx="1079" cy="108" fill="hsl(229, 50%, 50%)" opacity="0.21"></circle><circle r="19" cx="622" cy="663" fill="hsl(324, 50%, 50%)" opacity="0.45"></circle><circle r="18" cx="794" cy="229" strokeWidth="2" stroke="hsl(313, 50%, 50%)" fill="none" opacity="0.25"></circle><circle r="20" cx="709" cy="387" fill="hsl(335, 50%, 50%)" opacity="0.94"></circle><circle r="11" cx="32" cy="634" fill="hsl(86, 50%, 50%)" opacity="0.75"></circle><circle r="16.5" cx="498" cy="723" strokeWidth="2" stroke="hsl(280, 50%, 50%)" fill="none" opacity="0.36"></circle><circle r="18" cx="1336" cy="87" strokeWidth="2" stroke="hsl(280, 50%, 50%)" fill="none" opacity="0.81"></circle><circle r="17" cx="585" cy="24" fill="hsl(341, 50%, 50%)" opacity="0.35"></circle><circle r="18.5" cx="686" cy="512" strokeWidth="2" stroke="hsl(335, 50%, 50%)" fill="none" opacity="0.29"></circle><circle r="17.5" cx="1395" cy="446" fill="hsl(289, 50%, 50%)" opacity="0.99"></circle><circle r="18.5" cx="425" cy="34" fill="hsl(309, 50%, 50%)" opacity="0.19"></circle><circle r="18" cx="1197" cy="565" strokeWidth="2" stroke="hsl(264, 50%, 50%)" fill="none" opacity="0.56"></circle><circle r="18.5" cx="798" cy="608" strokeWidth="2" stroke="hsl(313, 50%, 50%)" fill="none" opacity="0.37"></circle><circle r="14.5" cx="195" cy="714" strokeWidth="2" stroke="hsl(180, 50%, 50%)" fill="none" opacity="0.21"></circle><circle r="14" cx="1036" cy="81" fill="hsl(218, 50%, 50%)" opacity="0.73"></circle><circle r="16.5" cx="915" cy="279" fill="hsl(253, 50%, 50%)" opacity="0.59"></circle><circle r="20.5" cx="762" cy="127" fill="hsl(318, 50%, 50%)" opacity="0.40"></circle><circle r="11" cx="105" cy="440" strokeWidth="2" stroke="hsl(129, 50%, 50%)" fill="none" opacity="0.87"></circle><circle r="16" cx="410" cy="773" strokeWidth="2" stroke="hsl(247, 50%, 50%)" fill="none" opacity="0.62"></circle><circle r="17" cx="801" cy="432" strokeWidth="2" stroke="hsl(303, 50%, 50%)" fill="none" opacity="0.48"></circle><circle r="18" cx="313" cy="29" fill="hsl(297, 50%, 50%)" opacity="0.78"></circle><circle r="17.5" cx="193" cy="28" fill="hsl(275, 50%, 50%)" opacity="0.89"></circle><circle r="18" cx="1153" cy="605" strokeWidth="2" stroke="hsl(252, 50%, 50%)" fill="none" opacity="0.60"></circle><circle r="16" cx="307" cy="164" strokeWidth="2" stroke="hsl(227, 50%, 50%)" fill="none" opacity="0.60"></circle><circle r="17" cx="557" cy="685" strokeWidth="2" stroke="hsl(308, 50%, 50%)" fill="none" opacity="0.53"></circle><circle r="14.5" cx="159" cy="404" strokeWidth="2" stroke="hsl(169, 50%, 50%)" fill="none" opacity="0.50"></circle><circle r="15" cx="336" cy="534" fill="hsl(229, 50%, 50%)" opacity="0.59"></circle><circle r="13.5" cx="236" cy="558" strokeWidth="2" stroke="hsl(198, 50%, 50%)" fill="none" opacity="0.80"></circle><circle r="15.5" cx="1080" cy="773" strokeWidth="2" stroke="hsl(237, 50%, 50%)" fill="none" opacity="0.22"></circle><circle r="19.5" cx="540" cy="517" strokeWidth="2" stroke="hsl(299, 50%, 50%)" fill="none" opacity="0.59"></circle><circle r="15.5" cx="298" cy="582" fill="hsl(218, 50%, 50%)" opacity="0.58"></circle><circle r="19" cx="748" cy="271" strokeWidth="2" stroke="hsl(328, 50%, 50%)" fill="none" opacity="0.67"></circle><circle r="15.5" cx="1150" cy="337" strokeWidth="2" stroke="hsl(252, 50%, 50%)" fill="none" opacity="0.13"></circle><circle r="14" cx="163" cy="771" fill="hsl(169, 50%, 50%)" opacity="0.35"></circle><circle r="16.5" cx="819" cy="334" strokeWidth="2" stroke="hsl(303, 50%, 50%)" fill="none" opacity="0.61"></circle><circle r="19.5" cx="713" cy="329" strokeWidth="2" stroke="hsl(332, 50%, 50%)" fill="none" opacity="0.40"></circle><circle r="18.5" cx="527" cy="224" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.57"></circle><circle r="19" cx="1334" cy="658" fill="hsl(289, 50%, 50%)" opacity="0.49"></circle><circle r="14" cx="1016" cy="544" fill="hsl(234, 50%, 50%)" opacity="0.79"></circle><circle r="18" cx="820" cy="773" strokeWidth="2" stroke="hsl(303, 50%, 50%)" fill="none" opacity="0.20"></circle><circle r="19" cx="851" cy="723" strokeWidth="2" stroke="hsl(282, 50%, 50%)" fill="none" opacity="0.86"></circle><circle r="17.5" cx="1276" cy="33" fill="hsl(256, 50%, 50%)" opacity="0.53"></circle><circle r="15" cx="1009" cy="210" strokeWidth="2" stroke="hsl(234, 50%, 50%)" fill="none" opacity="0.97"></circle><circle r="16" cx="1095" cy="597" strokeWidth="2" stroke="hsl(242, 50%, 50%)" fill="none" opacity="0.93"></circle><circle r="15.5" cx="436" cy="588" fill="hsl(254, 50%, 50%)" opacity="0.35"></circle><circle r="17.5" cx="573" cy="637" fill="hsl(308, 50%, 50%)" opacity="0.21"></circle><circle r="9.5" cx="24" cy="247" strokeWidth="2" stroke="hsl(86, 50%, 50%)" fill="none" opacity="0.41"></circle><circle r="14.5" cx="326" cy="679" fill="hsl(223, 50%, 50%)" opacity="0.86"></circle><circle r="18" cx="1393" cy="137" strokeWidth="2" stroke="hsl(292, 50%, 50%)" fill="none" opacity="0.17"></circle><circle r="17.5" cx="914" cy="726" fill="hsl(253, 50%, 50%)" opacity="0.71"></circle><circle r="15.5" cx="230" cy="399" fill="hsl(198, 50%, 50%)" opacity="0.54"></circle><circle r="16.5" cx="1159" cy="269" strokeWidth="2" stroke="hsl(258, 50%, 50%)" fill="none" opacity="0.31"></circle><circle r="14" cx="892" cy="24" fill="hsl(238, 50%, 50%)" opacity="0.81"></circle><circle r="19.5" cx="638" cy="116" strokeWidth="2" stroke="hsl(335, 50%, 50%)" fill="none" opacity="0.59"></circle><circle r="16.5" cx="1227" cy="678" strokeWidth="2" stroke="hsl(275, 50%, 50%)" fill="none" opacity="0.15"></circle><circle r="18.5" cx="590" cy="225" fill="hsl(316, 50%, 50%)" opacity="0.65"></circle><circle r="17" cx="377" cy="375" fill="hsl(234, 50%, 50%)" opacity="0.75"></circle><circle r="15" cx="1104" cy="358" strokeWidth="2" stroke="hsl(242, 50%, 50%)" fill="none" opacity="0.64"></circle><circle r="15" cx="967" cy="427" fill="hsl(240, 50%, 50%)" opacity="0.81"></circle><circle r="15" cx="1050" cy="639" strokeWidth="2" stroke="hsl(235, 50%, 50%)" fill="none" opacity="0.25"></circle><circle r="17" cx="135" cy="28" strokeWidth="2" stroke="hsl(256, 50%, 50%)" fill="none" opacity="0.83"></circle><circle r="12" cx="88" cy="665" strokeWidth="2" stroke="hsl(115, 50%, 50%)" fill="none" opacity="0.85"></circle><circle r="17" cx="466" cy="772" fill="hsl(262, 50%, 50%)" opacity="0.80"></circle><circle r="17.5" cx="1334" cy="29" strokeWidth="2" stroke="hsl(260, 50%, 50%)" fill="none" opacity="0.89"></circle><circle r="19.5" cx="704" cy="565" fill="hsl(335, 50%, 50%)" opacity="0.88"></circle><circle r="18" cx="332" cy="100" fill="hsl(263, 50%, 50%)" opacity="0.55"></circle><circle r="19" cx="735" cy="498" strokeWidth="2" stroke="hsl(328, 50%, 50%)" fill="none" opacity="0.70"></circle><circle r="15.5" cx="986" cy="633" strokeWidth="2" stroke="hsl(236, 50%, 50%)" fill="none" opacity="0.24"></circle><circle r="16" cx="1037" cy="150" fill="hsl(232, 50%, 50%)" opacity="0.56"></circle><circle r="14.5" cx="151" cy="652" strokeWidth="2" stroke="hsl(157, 50%, 50%)" fill="none" opacity="0.14"></circle><circle r="17" cx="847" cy="475" fill="hsl(282, 50%, 50%)" opacity="0.13"></circle><circle r="16" cx="259" cy="346" strokeWidth="2" stroke="hsl(206, 50%, 50%)" fill="none" opacity="0.55"></circle><circle r="16" cx="857" cy="153" fill="hsl(278, 50%, 50%)" opacity="0.33"></circle><circle r="18.5" cx="563" cy="277" strokeWidth="2" stroke="hsl(308, 50%, 50%)" fill="none" opacity="0.96"></circle><circle r="16" cx="850" cy="205" strokeWidth="2" stroke="hsl(282, 50%, 50%)" fill="none" opacity="0.81"></circle><circle r="19" cx="1343" cy="284" fill="hsl(289, 50%, 50%)" opacity="0.86"></circle><circle r="18" cx="787" cy="483" strokeWidth="2" stroke="hsl(313, 50%, 50%)" fill="none" opacity="0.18"></circle><circle r="17.5" cx="433" cy="171" strokeWidth="2" stroke="hsl(260, 50%, 50%)" fill="none" opacity="0.19"></circle><circle r="13" cx="76" cy="136" fill="hsl(136, 50%, 50%)" opacity="0.74"></circle><circle r="19" cx="764" cy="379" strokeWidth="2" stroke="hsl(321, 50%, 50%)" fill="none" opacity="0.42"></circle><circle r="18.5" cx="506" cy="392" strokeWidth="2" stroke="hsl(280, 50%, 50%)" fill="none" opacity="0.61"></circle><circle r="18" cx="1213" cy="623" strokeWidth="2" stroke="hsl(270, 50%, 50%)" fill="none" opacity="0.15"></circle><circle r="18.5" cx="767" cy="323" fill="hsl(321, 50%, 50%)" opacity="0.95"></circle><circle r="14.5" cx="1014" cy="340" strokeWidth="2" stroke="hsl(234, 50%, 50%)" fill="none" opacity="0.38"></circle><circle r="20" cx="649" cy="558" fill="hsl(334, 50%, 50%)" opacity="0.63"></circle><circle r="20" cx="1282" cy="249" fill="hsl(283, 50%, 50%)" opacity="0.17"></circle><circle r="16" cx="430" cy="535" fill="hsl(254, 50%, 50%)" opacity="0.22"></circle><circle r="15.5" cx="940" cy="127" strokeWidth="2" stroke="hsl(239, 50%, 50%)" fill="none" opacity="0.64"></circle><circle r="13.5" cx="992" cy="139" strokeWidth="2" stroke="hsl(233, 50%, 50%)" fill="none" opacity="0.78"></circle><circle r="16" cx="351" cy="427" fill="hsl(229, 50%, 50%)" opacity="0.75"></circle><circle r="19" cx="542" cy="344" fill="hsl(299, 50%, 50%)" opacity="0.37"></circle><circle r="19.5" cx="717" cy="226" strokeWidth="2" stroke="hsl(332, 50%, 50%)" fill="none" opacity="0.44"></circle><circle r="17" cx="1297" cy="311" strokeWidth="2" stroke="hsl(286, 50%, 50%)" fill="none" opacity="0.13"></circle><circle r="17" cx="1175" cy="722" strokeWidth="2" stroke="hsl(258, 50%, 50%)" fill="none" opacity="0.58"></circle><circle r="17.5" cx="1290" cy="422" fill="hsl(286, 50%, 50%)" opacity="0.58"></circle><circle r="17.5" cx="947" cy="678" fill="hsl(246, 50%, 50%)" opacity="0.49"></circle><circle r="11.5" cx="76" cy="336" strokeWidth="2" stroke="hsl(115, 50%, 50%)" fill="none" opacity="0.59"></circle><circle r="19" cx="1277" cy="645" fill="hsl(283, 50%, 50%)" opacity="0.39"></circle><circle r="11" cx="27" cy="505" fill="hsl(86, 50%, 50%)" opacity="0.61"></circle><circle r="16" cx="293" cy="295" fill="hsl(218, 50%, 50%)" opacity="0.76"></circle><circle r="18" cx="806" cy="168" strokeWidth="2" stroke="hsl(301, 50%, 50%)" fill="none" opacity="0.45"></circle><circle r="16.5" cx="279" cy="229" strokeWidth="2" stroke="hsl(212, 50%, 50%)" fill="none" opacity="0.61"></circle><circle r="17.5" cx="793" cy="71" strokeWidth="2" stroke="hsl(306, 50%, 50%)" fill="none" opacity="0.78"></circle><circle r="19" cx="547" cy="172" strokeWidth="2" stroke="hsl(302, 50%, 50%)" fill="none" opacity="0.94"></circle><circle r="16" cx="1061" cy="320" strokeWidth="2" stroke="hsl(235, 50%, 50%)" fill="none" opacity="0.86"></circle><circle r="18" cx="659" cy="393" fill="hsl(334, 50%, 50%)" opacity="0.80"></circle><circle r="21" cx="686" cy="277" fill="hsl(335, 50%, 50%)" opacity="0.69"></circle><circle r="14" cx="955" cy="25" strokeWidth="2" stroke="hsl(211, 50%, 50%)" fill="none" opacity="0.77"></circle><circle r="19.5" cx="367" cy="30" strokeWidth="2" stroke="hsl(301, 50%, 50%)" fill="none" opacity="0.78"></circle><circle r="11.5" cx="86" cy="492" fill="hsl(115, 50%, 50%)" opacity="0.30"></circle><circle r="18" cx="904" cy="570" strokeWidth="2" stroke="hsl(262, 50%, 50%)" fill="none" opacity="0.60"></circle><circle r="16" cx="1390" cy="775" fill="hsl(289, 50%, 50%)" opacity="0.57"></circle><circle r="11.5" cx="74" cy="550" fill="hsl(115, 50%, 50%)" opacity="0.15"></circle><circle r="16.5" cx="526" cy="619" fill="hsl(289, 50%, 50%)" opacity="0.49"></circle><circle r="13.5" cx="149" cy="481" fill="hsl(157, 50%, 50%)" opacity="0.61"></circle><circle r="19" cx="533" cy="36" strokeWidth="2" stroke="hsl(327, 50%, 50%)" fill="none" opacity="0.31"></circle><circle r="19.5" cx="624" cy="436" strokeWidth="2" stroke="hsl(330, 50%, 50%)" fill="none" opacity="0.43"></circle><circle r="17" cx="870" cy="364" strokeWidth="2" stroke="hsl(272, 50%, 50%)" fill="none" opacity="0.70"></circle><circle r="14.5" cx="1077" cy="28" fill="hsl(203, 50%, 50%)" opacity="0.54"></circle><circle r="17" cx="819" cy="384" strokeWidth="2" stroke="hsl(303, 50%, 50%)" fill="none" opacity="0.11"></circle><circle r="15" cx="136" cy="137" fill="hsl(180, 50%, 50%)" opacity="0.35"></circle><circle r="15" cx="172" cy="290" strokeWidth="2" stroke="hsl(169, 50%, 50%)" fill="none" opacity="0.71"></circle><circle r="15" cx="100" cy="83" strokeWidth="2" stroke="hsl(196, 50%, 50%)" fill="none" opacity="0.30"></circle><circle r="15" cx="960" cy="478" fill="hsl(240, 50%, 50%)" opacity="0.12"></circle><circle r="16.5" cx="391" cy="275" strokeWidth="2" stroke="hsl(240, 50%, 50%)" fill="none" opacity="0.32"></circle><circle r="16.5" cx="407" cy="432" fill="hsl(247, 50%, 50%)" opacity="0.27"></circle><circle r="19.5" cx="1342" cy="481" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.17"></circle><circle r="18" cx="442" cy="384" fill="hsl(254, 50%, 50%)" opacity="0.84"></circle><circle r="15" cx="1203" cy="776" fill="hsl(270, 50%, 50%)" opacity="0.10"></circle><circle r="19.5" cx="1335" cy="358" fill="hsl(289, 50%, 50%)" opacity="0.99"></circle><circle r="18" cx="861" cy="421" strokeWidth="2" stroke="hsl(282, 50%, 50%)" fill="none" opacity="0.34"></circle><circle r="16.5" cx="441" cy="659" fill="hsl(254, 50%, 50%)" opacity="0.52"></circle><circle r="18.5" cx="1288" cy="180" strokeWidth="2" stroke="hsl(283, 50%, 50%)" fill="none" opacity="0.85"></circle><circle r="17.5" cx="714" cy="171" fill="hsl(332, 50%, 50%)" opacity="0.47"></circle><circle r="18" cx="1395" cy="258" fill="hsl(289, 50%, 50%)" opacity="0.51"></circle><circle r="17.5" cx="922" cy="625" fill="hsl(253, 50%, 50%)" opacity="0.62"></circle><circle r="18" cx="222" cy="80" fill="hsl(259, 50%, 50%)" opacity="0.58"></circle><circle r="17.5" cx="668" cy="727" fill="hsl(335, 50%, 50%)" opacity="0.77"></circle><circle r="17.5" cx="1287" cy="482" strokeWidth="2" stroke="hsl(283, 50%, 50%)" fill="none" opacity="0.38"></circle><circle r="16.5" cx="861" cy="527" strokeWidth="2" stroke="hsl(282, 50%, 50%)" fill="none" opacity="0.78"></circle><circle r="14.5" cx="176" cy="596" fill="hsl(169, 50%, 50%)" opacity="0.88"></circle><circle r="16.5" cx="822" cy="113" strokeWidth="2" stroke="hsl(287, 50%, 50%)" fill="none" opacity="0.27"></circle><circle r="18" cx="388" cy="85" strokeWidth="2" stroke="hsl(283, 50%, 50%)" fill="none" opacity="0.17"></circle><circle r="16" cx="1188" cy="150" strokeWidth="2" stroke="hsl(266, 50%, 50%)" fill="none" opacity="0.32"></circle><circle r="18.5" cx="1339" cy="153" fill="hsl(294, 50%, 50%)" opacity="0.82"></circle><circle r="15" cx="1011" cy="396" strokeWidth="2" stroke="hsl(234, 50%, 50%)" fill="none" opacity="0.21"></circle><circle r="20.5" cx="627" cy="274" fill="hsl(330, 50%, 50%)" opacity="0.22"></circle><circle r="15.5" cx="395" cy="622" fill="hsl(240, 50%, 50%)" opacity="0.21"></circle><circle r="16.5" cx="905" cy="171" strokeWidth="2" stroke="hsl(260, 50%, 50%)" fill="none" opacity="0.53"></circle><circle r="16" cx="264" cy="128" fill="hsl(239, 50%, 50%)" opacity="0.93"></circle><circle r="16.5" cx="499" cy="671" fill="hsl(280, 50%, 50%)" opacity="0.87"></circle><circle r="10.5" cx="26" cy="698" fill="hsl(86, 50%, 50%)" opacity="0.21"></circle><circle r="18" cx="1287" cy="709" fill="hsl(283, 50%, 50%)" opacity="0.59"></circle><circle r="18.5" cx="596" cy="74" strokeWidth="2" stroke="hsl(333, 50%, 50%)" fill="none" opacity="0.94"></circle><circle r="17.5" cx="1234" cy="199" strokeWidth="2" stroke="hsl(275, 50%, 50%)" fill="none" opacity="0.94"></circle><circle r="16.5" cx="1179" cy="215" fill="hsl(264, 50%, 50%)" opacity="0.33"></circle><circle r="17" cx="440" cy="716" strokeWidth="2" stroke="hsl(254, 50%, 50%)" fill="none" opacity="0.42"></circle><circle r="18" cx="808" cy="281" strokeWidth="2" stroke="hsl(303, 50%, 50%)" fill="none" opacity="0.93"></circle><circle r="14" cx="141" cy="238" strokeWidth="2" stroke="hsl(157, 50%, 50%)" fill="none" opacity="0.17"></circle><circle r="17" cx="1167" cy="666" strokeWidth="2" stroke="hsl(258, 50%, 50%)" fill="none" opacity="0.21"></circle><circle r="16.5" cx="908" cy="507" fill="hsl(262, 50%, 50%)" opacity="0.38"></circle><circle r="12" cx="33" cy="440" strokeWidth="2" stroke="hsl(86, 50%, 50%)" fill="none" opacity="0.89"></circle><circle r="16.5" cx="958" cy="187" fill="hsl(240, 50%, 50%)" opacity="0.72"></circle><circle r="16" cx="338" cy="621" fill="hsl(229, 50%, 50%)" opacity="0.84"></circle><circle r="15.5" cx="1139" cy="180" fill="hsl(252, 50%, 50%)" opacity="0.98"></circle><circle r="14.5" cx="225" cy="499" strokeWidth="2" stroke="hsl(198, 50%, 50%)" fill="none" opacity="0.72"></circle><circle r="15" cx="524" cy="777" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.96"></circle><circle r="16" cx="1109" cy="293" fill="hsl(242, 50%, 50%)" opacity="0.63"></circle><circle r="15" cx="384" cy="674" strokeWidth="2" stroke="hsl(240, 50%, 50%)" fill="none" opacity="0.31"></circle><circle r="15.5" cx="198" cy="346" fill="hsl(180, 50%, 50%)" opacity="0.73"></circle><circle r="15.5" cx="887" cy="112" fill="hsl(265, 50%, 50%)" opacity="0.94"></circle><circle r="19.5" cx="1337" cy="221" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="1.00"></circle><circle r="16" cx="922" cy="71" strokeWidth="2" stroke="hsl(239, 50%, 50%)" fill="none" opacity="0.41"></circle><circle r="20" cx="581" cy="474" strokeWidth="2" stroke="hsl(316, 50%, 50%)" fill="none" opacity="0.80"></circle><circle r="18" cx="1239" cy="79" fill="hsl(265, 50%, 50%)" opacity="0.12"></circle><circle r="17" cx="1297" cy="541" fill="hsl(286, 50%, 50%)" opacity="0.54"></circle><circle r="18" cx="486" cy="501" strokeWidth="2" stroke="hsl(271, 50%, 50%)" fill="none" opacity="0.34"></circle><circle r="15.5" cx="317" cy="362" strokeWidth="2" stroke="hsl(223, 50%, 50%)" fill="none" opacity="0.68"></circle><circle r="19" cx="1261" cy="587" fill="hsl(279, 50%, 50%)" opacity="0.57"></circle><circle r="19.5" cx="642" cy="27" strokeWidth="2" stroke="hsl(345, 50%, 50%)" fill="none" opacity="0.37"></circle><circle r="21.5" cx="669" cy="617" strokeWidth="2" stroke="hsl(335, 50%, 50%)" fill="none" opacity="0.11"></circle><circle r="17.5" cx="1233" cy="468" fill="hsl(275, 50%, 50%)" opacity="0.84"></circle><circle r="13.5" cx="349" cy="776" strokeWidth="2" stroke="hsl(229, 50%, 50%)" fill="none" opacity="0.20"></circle><circle r="19" cx="525" cy="455" strokeWidth="2" stroke="hsl(289, 50%, 50%)" fill="none" opacity="0.95"></circle><circle r="16.5" cx="909" cy="225" fill="hsl(262, 50%, 50%)" opacity="0.34"></circle><circle r="16" cx="1393" cy="27" fill="hsl(254, 50%, 50%)" opacity="0.39"></circle><circle r="19.5" cx="760" cy="772" strokeWidth="2" stroke="hsl(321, 50%, 50%)" fill="none" opacity="1.00"></circle><circle r="14.5" cx="198" cy="449" fill="hsl(180, 50%, 50%)" opacity="0.36"></circle><circle r="18" cx="643" cy="774" strokeWidth="2" stroke="hsl(330, 50%, 50%)" fill="none" opacity="0.29"></circle><circle r="14" cx="1147" cy="26" fill="hsl(218, 50%, 50%)" opacity="0.81"></circle><circle r="17.5" cx="470" cy="438" strokeWidth="2" stroke="hsl(271, 50%, 50%)" fill="none" opacity="0.56"></circle></svg>\r
                    This is parallax\r
                </div>\r
            </Atropos>\r
\r
        </>\r
    )\r
}\r
\r
export default Parallax`,R=`import { useState } from 'react'\r
\r
const DivMagicCompiler = () => {\r
\r
    const [data, setdata] = useState('<b>Here will be your output.</b>')\r
    const [left, setleft] = useState('45')\r
    const [right, setright] = useState('45')\r
\r
    const handlChange = (e) => {\r
        console.log(e)\r
        setdata(e.target.innerText)\r
    }\r
\r
    const handleStyle = (e, type) => {\r
        { type == 'left' && setleft(e.target.value) }\r
        { type == 'right' && setright(e.target.value) }\r
    }\r
\r
    return (\r
        <>\r
            <div className='flex flex-wrap w-[80vw]'>\r
                <input className={\`w-[45%]\`} type="range" name="" id="" onChange={(e) => handleStyle(e, 'left')} />\r
                <input className={\`w-[45%]\`} type="range" name="" id="" onChange={(e) => handleStyle(e, 'right')} />\r
            </div>\r
\r
            <div className='flex flex-wrap gap-2 w-[80vw] h-[80vh]'>\r
                <div style={{ width: \`\${left}%\` }} className={\` border flex justify-start p-4 \`} autoFocus={true} onKeyUp={handlChange} contentEditable={true} >Write Your HTML body here</div>\r
                <div style={{ width: \`\${right}%\` }} className={\` border p-4\`} draggable={true} dangerouslySetInnerHTML={{ __html: data }} />\r
            </div>\r
\r
        </>\r
    )\r
}\r
\r
export default DivMagicCompiler`,F=`import React, { useState } from 'react'\r
import './style.css'\r
\r
/*\r
https://react-grid-layout.github.io/react-grid-layout/examples/0-showcase.html\r
https://www.npmjs.com/package/react-dnd-multi-backend\r
http://react-grid-layout.github.io/react-draggable/example/\r
https://react-beautiful-dnd.netlify.app/?path=/story/multiple-horizontal-lists--stress-test\r
*/\r
\r
/* \r
-----------------------\r
| 🔰 KANBAN BOARD 🔰 |\r
-----------------------\r
*/\r
\r
const Cards = ({ card, deleteCard, onDragStart }) => {\r
\r
    const handleDragStart = (e) => {\r
        onDragStart(e, card)\r
    }\r
\r
    return (\r
        <>\r
            <div draggable onDragStart={handleDragStart} className="bg-white/10 p-4 rounded shadow select-none flex items-center justify-between">{card?.content} <span onClick={() => deleteCard(card?.id)} className='cursor-pointer z-10 text-2xl font-semibold text-red-500'>&times;</span></div>\r
        </>\r
    )\r
}\r
\r
const Column = ({ column, addCard, deleteCard, onCardDrop, handleDragStart }) => {\r
\r
    const [cardContent, setCardContent] = useState('')\r
\r
    const handleAddCard = (e) => {\r
        e.preventDefault()\r
        if (cardContent) {\r
            addCard(column?.id, cardContent)\r
            setCardContent('')\r
        }\r
    }\r
\r
    const handleDragOver = (e) => {\r
        e.preventDefault()\r
    }\r
\r
    const handleDrop = (e) => {\r
        e.preventDefault()\r
        onCardDrop(e, column?.id)\r
    }\r
\r
    return (\r
        <>\r
            <div className="bg-slate-400/20 p-4 rounded shadow w-1/3" onDragOver={handleDragOver} onDrop={handleDrop}>\r
                <h2 className='text-xl font-bold mb-4'>{column?.title}</h2>\r
\r
                <form className="mb-4 flex gap-2" onSubmit={handleAddCard}>\r
                    <input value={cardContent} onChange={e => setCardContent(e.target.value)} type="text" placeholder='Task name...' className='bg-slate-800/90 p-2 w-full rounded focus:outline-none' />\r
                    <button type='submit' className='bg-green-400/70 hover:bg-green-600/70 p-2 px-3 text-2xl rounded'>+</button>\r
                </form>\r
\r
                <div className="space-y-4">\r
                    {\r
                        column?.cards?.map((elem) => <>\r
                            <Cards key={elem?.id} card={elem} deleteCard={(cardId) => deleteCard(cardId, column?.id)} onDragStart={(e, card) => handleDragStart(e, card)} />\r
                        </>)\r
                    }\r
                </div>\r
            </div>\r
        </>\r
    )\r
}\r
\r
const Board = () => {\r
\r
    const [columns, setColumns] = useState([\r
        {\r
            id: 1, title: "To Do", cards: [\r
                { id: 1, content: "Task 1" },\r
                { id: 2, content: "Task 2" },\r
                { id: 3, content: "Task 3" },\r
                { id: 4, content: "Task 4" },\r
                { id: 5, content: "Task 5" }\r
            ]\r
        },\r
        { id: 2, title: "In Progress", cards: [] },\r
        { id: 3, title: "Completed", cards: [] }\r
    ])\r
\r
    const [draggedCard, setDraggedCard] = useState(null)\r
\r
    const addCard = (colId, content) => {\r
        const newColumn = columns?.map((column) => {\r
            if (column?.id === colId) {\r
                return {\r
                    ...column,\r
                    cards: [...column?.cards, { id: Date.now(), content: content }]\r
                }\r
            }\r
            return column;\r
        })\r
\r
        setColumns(newColumn);\r
    }\r
\r
    const deleteCard = (cardId, colId) => {\r
        const newColumn = columns?.map((column) => {\r
            if (column?.id === colId) {\r
                return {\r
                    ...column,\r
                    cards: column?.cards?.filter((card) => card?.id !== cardId)\r
                }\r
            }\r
            return column;\r
        })\r
        setColumns(newColumn);\r
    }\r
\r
    const handleDragStart = (e, card) => {\r
        setDraggedCard(card)\r
    }\r
\r
    const onCardDrop = (e, colId) => {\r
        const sourceId = columns.find(col => col.cards.includes(draggedCard))?.id;\r
\r
        if (sourceId === colId)\r
            return;\r
\r
        const updatedColumn = columns?.map((elem) => {\r
\r
            if (elem?.id === sourceId) {\r
                return { ...elem, cards: elem?.cards.filter(item => item?.id !== draggedCard?.id) }\r
            }\r
\r
            if (elem?.id === colId) {\r
                return { ...elem, cards: [...elem?.cards, draggedCard] }\r
            }\r
\r
            return elem;\r
\r
        })\r
\r
        setColumns(updatedColumn)\r
        setDraggedCard(null)\r
\r
    }\r
\r
    return (\r
        <>\r
            <div className="w-full h-full flex space-x-4 p-4">\r
\r
                {\r
                    columns?.map((elem) =>\r
                        <Column key={elem?.id} column={elem} addCard={addCard} deleteCard={deleteCard} onCardDrop={onCardDrop} handleDragStart={handleDragStart} />\r
                    )\r
                }\r
\r
            </div>\r
        </>\r
    )\r
}\r
\r
// Main component\r
const KanbanBoard = () => {\r
\r
    return (\r
        <>\r
            <div className="w-screen h-screen flex flex-col items-center p-10 gap-6 *:select-none">\r
                <details>\r
                    <summary className='font-sans w-full text-center text-3xl font-bold'>KANBAN BOARD</summary>\r
                    <p className='max-w-[500px]'>A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). It can help both agile and DevOps teams establish order in their daily work.</p>\r
                </details>\r
\r
                <Board />\r
\r
            </div>\r
        </>\r
    )\r
}\r
\r
export default KanbanBoard`,j=`/* Inbuilt accordion CSS */\r
details>* {\r
    user-select: none;\r
    transition: all;\r
    animation-duration: 300ms;\r
    animation-timing-function: ease-in-out;\r
}\r
\r
summary::before,\r
summary::after {\r
    transition: all;\r
    animation-duration: 300ms;\r
    animation-timing-function: ease-in-out;\r
}\r
\r
/* summary::marker {\r
    content: none;\r
}\r
\r
summary::after {\r
    content: "+";\r
}\r
\r
[open]>summary::after {\r
    content: "-";\r
} */`,A=`const FileCompressor = () => {\r
    \r
    const handleFileChange = async (event) => {\r
        const file = event.target.files[0];\r
        if (file?.size > (1 * 1024 * 1024)) { // > 1 MB\r
            try {\r
                const resizedFile = await resizeFile(file);\r
                console.log(\`Resized file of size \${file?.size / (1024 * 1024)}MB to \${resizedFile?.size / (1024 * 1024)}MB\`);\r
            } catch (error) {\r
                console.error('Error resizing file:', error);\r
            }\r
        } else {\r
            console.log("No need of Compression.")\r
        }\r
    };\r
\r
    const resizeFile = async (file) => {\r
        if (file.type.startsWith('image/')) {\r
            return resizeImage(file);\r
        } else {\r
            return truncateFile(file);\r
        }\r
    };\r
\r
    const resizeImage = (file) => {\r
        return new Promise((resolve, reject) => {\r
            const reader = new FileReader();\r
            reader.onload = (event) => {\r
                const img = new Image();\r
                img.onload = () => {\r
                    const canvas = document.createElement('canvas');\r
                    const ctx = canvas.getContext('2d');\r
                    const maxWidth = 800; // Set your maximum width here\r
                    const maxHeight = 600; // Set your maximum height here\r
                    let width = img.width;\r
                    let height = img.height;\r
\r
                    if (width > maxWidth || height > maxHeight) {\r
                        const ratio = Math.min(maxWidth / width, maxHeight / height);\r
                        width *= ratio;\r
                        height *= ratio;\r
                    }\r
\r
                    canvas.width = width;\r
                    canvas.height = height;\r
                    ctx.drawImage(img, 0, 0, width, height);\r
                    canvas.toBlob((blob) => {\r
                        resolve(new File([blob], file.name, { type: 'image/jpeg' }));\r
                    }, 'image/jpeg');\r
                };\r
                img.src = event.target.result;\r
            };\r
            reader.onerror = (error) => {\r
                reject(error);\r
            };\r
            reader.readAsDataURL(file);\r
        });\r
    };\r
\r
    const truncateFile = (file) => {\r
        return new Promise((resolve, reject) => {\r
            const maxSize = 5 * 1024 * 1024; // 5 MB\r
            if (file.size <= maxSize) {\r
                resolve(file);\r
            } else {\r
                const truncatedFile = file.slice(0, maxSize, file.type);\r
                resolve(truncatedFile);\r
            }\r
        });\r
    };\r
\r
    return (\r
        <div>\r
            <input type="file" onChange={handleFileChange} />\r
        </div>\r
    );\r
};\r
\r
export default FileCompressor;`,T=`import React, { useEffect, useState } from 'react'\r
\r
const MouseMove = () => {\r
\r
    const [pos, setPos] = useState({ x: '0px', y: '0px' })\r
\r
    useEffect(() => {\r
        document.addEventListener('mousemove', (event) => {\r
            setPos({ x: event?.x, y: event?.y })\r
        })\r
    })\r
\r
    return (\r
        <>\r
            <div className='h-5 w-5 bg-white hover:bg-red-500 hover:shadow-lg shadow-red-400 rounded-full absolute top-0' style={{ translate: \`\${pos?.x}px \${pos?.y}px\` }} />\r
        </>\r
    )\r
}\r
\r
export default MouseMove`,H=()=>{let f=[{id:1,topic:"Web Worker",fname:"useWebWorker.js, WebWorkerIndex.jsx",file:[k,v]},{id:2,topic:"Data Virtualization with and without library",fname:"DataVirtualization.jsx, Virtualization.jsx",file:[b,w]},{id:3,topic:"Camera Feature",fname:"SmartCam.jsx",file:[C]},{id:4,topic:"Performance API",fname:"PerformanceAPI.jsx",file:[I]},{id:5,topic:"Human Verification",fname:"HumanVerification.jsx",file:[N]},{id:6,topic:"Chat Bot",fname:"ChatBot.jsx",file:[S]},{id:7,topic:"Parallax using 'Atropos'",fname:"Parallax.jsx",file:[D]},{id:8,topic:"Compiler using div tag only",fname:"DivMagicCompiler.jsx",file:[R]},{id:9,topic:"Kanban Board with inbuild accodion",fname:"KanbanBoard.jsx, style.css",file:[F,j]},{id:10,topic:"File Compressor",fname:"FileCompressor.jsx",file:[A]},{id:11,topic:"Mouse Movement",fname:"MouseMove.jsx",file:[T]},{id:100,topic:"Curried Problems",fname:"Curried.js",file:[W]}];const[p,o]=l.useState(""),[t,n]=l.useState(""),[m,a]=l.useState(!1),s=()=>{window.scrollTo({top:0,behavior:"smooth"})},h=e=>{s(),t==e?n(""):n(e)},y=(e,c)=>{navigator.clipboard.writeText(e).then(()=>{o(c),setTimeout(()=>o(""),2e3)}).catch(i=>{console.error("Failed to copy: ",i)})},d=()=>{window.scrollY>152?a(!0):a(!1)};return l.useEffect(()=>(window.addEventListener("scroll",d),()=>{window.removeEventListener("scroll",d)}),[]),r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"flex justify-center *:text-zinc-50 overflow-x-clip",children:r.jsxs("div",{className:"w-full px-2",children:[r.jsx("div",{className:"w-full flex justify-center",children:r.jsx("h1",{className:"text-2xl font-medium text-center py-2 mt-2 mb-4 border-b border-gray-400 w-max px-10",children:"Experimented Components"})}),r.jsx("div",{className:"flex flex-wrap gap-2 gap-y-4 w-full p-2 md:p-4",children:f.map(e=>r.jsx(r.Fragment,{children:r.jsxs("div",{className:`w-full transition-all duration-200 ${t==e.id?"md:w-full":"md:w-[49%]"}`,resizable:!0,children:[r.jsxs("h2",{className:`border cursor-pointer animate__animated animate__flipInX px-4 py-2 ${t==e.id?"border-green-700 bg-green-500/20 hover:shadow-[0px_0px_20px_rgba(0,255,0,0.5)]":"border-indigo-700 bg-indigo-500/20 hover:shadow-[0px_0px_20px_rgba(0,0,255,0.5)]"}`,onClick:()=>h(e.id),children:[e.topic," - ",r.jsxs("span",{className:"font-semibold italic",children:["(",e.fname,")"]})]}),t==e.id&&e.file.map((c,i)=>r.jsxs("div",{className:"animate__animated animate__fadeIn w-full bg-[#2b2b2b] border border-green-700 relative",children:[r.jsxs("button",{className:"absolute z-10 right-1 top-1 border border-amber-600 text-amber-50 text-xs font-medium hover:text-white px-3 py-1 hover:bg-amber-500",onClick:()=>y(c,String(c)),children:[p==String(c)?"Copied":"Copy"," Code"]}),r.jsx(u,{className:"text-xs",language:"javascript",style:x,children:c},i)]}))]},e.id)}))})]})}),m&&r.jsx("div",{onClick:s,className:"animate__animated animate__fadeIn cursor-pointer text-sm border rounded-full w-max fixed bottom-2 right-2 hover:scale-105 transition-all duration-300 p-2 hover:bg-blue-500/50",children:r.jsx("a",{className:"transform text-white ",children:r.jsx(g,{})})})]})};export{H as default};
