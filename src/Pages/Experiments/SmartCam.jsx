import { useFormik } from 'formik'
import React, { useState, useRef, useEffect } from "react";
import EXIF from 'exif-js'
import * as yup from 'yup'
import Modal from 'react-modal'
import { FcCamera } from 'react-icons/fc'
import { ImCross } from 'react-icons/im'
import exifr from 'exifr';
import 'animate.css'

const SmartCam = () => {

    // =====fetching application data============
    const [frontImageUpload, setfrontImageUpload] = useState()
    const [frontUrl, setfrontUrl] = useState(null)
    const [frontData, setfrontData] = useState()
    const [frontCamera, setfrontCamera] = useState(false)

    const [rightImageUpload, setrightImageUpload] = useState()
    const [rightUrl, setrightUrl] = useState(null)
    const [rightData, setrightData] = useState()
    const [rightCamera, setrightCamera] = useState(false)

    const [leftImageUpload, setleftImageUpload] = useState()
    const [leftUrl, setleftUrl] = useState(null)
    const [leftData, setleftData] = useState()
    const [leftCamera, setleftCamera] = useState(false)

    const [imageNo, setimageNo] = useState(0)
    // ===========fetching application data end=========

    const validationSchema = yup.object({
        frontImage: yup.mixed().required('required to upload'),
        leftImage: yup.mixed().required('required to upload'),
        rightImage: yup.mixed().required('required to upload'),
    })

    const formik = useFormik({
        initialValues: {
            frontImage: '',
            leftImage: '',
            rightImage: '',
        },
        onSubmit: (values) => {
            console.log('submitting images => ', values)
            setactionType('forward')
        }
        , validationSchema
    })


    const submitDocFun = () => {

        let url;

        let fd = new FormData();

        fd.append('safId', id)

        fd.append("directionType[2]", 'Front')
        {
            !frontCamera ? fd.append('imagePath[2]', frontImageUpload) :
                fd.append("imagePath[2]", dataURLtoFile(frontUrl, "FrontImage.jpg"))
        }
        fd.append('longitude[2]', frontData?.longitude)
        fd.append('latitude[2]', frontData?.latitude)

        fd.append('directionType[1]', 'Right')
        {
            !rightCamera ? fd.append('imagePath[1]', rightImageUpload) :
                fd.append("imagePath[1]", dataURLtoFile(rightUrl, "RightImage.jpg"))
        }
        fd.append('longitude[1]', rightData?.longitude)
        fd.append('latitude[1]', rightData?.latitude)

        fd.append('directionType[0]', 'Left')
        {
            !leftCamera ? fd.append('imagePath[0]', leftImageUpload) :
                fd.append("imagePath[0]", dataURLtoFile(leftUrl, "LeftImage.jpg"))
        }
        fd.append('longitude[0]', leftData?.longitude)
        fd.append('latitude[0]', leftData?.latitude)

    }

    function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    // ================to turn on location==================

    const [position, setPosition] = useState(null);

    const enableLocation = () => {
        // Get the user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition(position);
                if (imageNo == 1) {
                    setfrontData(position?.coords)
                }
                if (imageNo == 3) {
                    setleftData(position?.coords)
                }
                if (imageNo == 2) {
                    setrightData(position?.coords)
                }
            },
            () => {
                // alert("Please enable location first.");
                // setrepeat(repeat+1)
            }
        );
    }

    // ================to turn on location end==================


    //   ====enable camera========
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        enableLocation()
    })

    const startCamera = async (val) => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    // set the canvas size to match the video stream size
                    canvasRef.current.width = videoRef.current.videoWidth;
                    canvasRef.current.height = videoRef.current.videoHeight;
                };
            })
            .catch((error) => {
                if (error.name === 'NotAllowedError') {
                    alert('Permission to access camera was not granted');
                } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                    alert('No camera found');
                } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                    alert('Could not start camera');
                } else {
                    alert('Error accessing camera');
                }
                console.log("Error accessing camera:", error);
            });
    };

    const stopCamera = () => {
        const stream = videoRef.current.srcObject;

        if (stream) {
            const tracks = stream.getTracks();

            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        // if (mediaStream) {
        //   mediaStream.getTracks().forEach((track) => track.stop());
        //   mediaStream = null;
        // }
    };

    const captureImage = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0);
        const data = canvasRef.current.toDataURL("image/jpg");
        setImageData(data);
        console.log('image data captured => ', data)
    };
    //   ====enable camera end ========


    // ===========to get location from image==================
    function getGeoLocation(file) {
        return new Promise((resolve, reject) => {
            EXIF.getData(file, function () {
                const lat = EXIF.getTag(this, "GPSLatitude");
                const latRef = EXIF.getTag(this, "GPSLatitudeRef");
                const lng = EXIF.getTag(this, "GPSLongitude");
                const lngRef = EXIF.getTag(this, "GPSLongitudeRef");

                if (lat && latRef && lng && lngRef) {
                    const latitude = convertToDecimalDegrees(lat, latRef);
                    const longitude = convertToDecimalDegrees(lng, lngRef);
                    resolve({ latitude, longitude });
                } else {
                    alert('Image does not have location. Turn on location first and then take a picture to upload...');
                }
            });
        });
    }

    function convertToDecimalDegrees(coordinates, direction) {
        const degrees = coordinates[0];
        const minutes = coordinates[1];
        const seconds = coordinates[2];
        const decimalDegrees = degrees + minutes / 60 + seconds / 3600;
        return direction === "S" || direction === "W" ? -decimalDegrees : decimalDegrees;
    }

    async function getLocationFromImage(imageFile, val) {
        const exifData = await exifr.parse(imageFile);
        const { latitude, longitude } = exifData?.latitude && exifData?.longitude
            ? { latitude: exifData.latitude, longitude: exifData.longitude }
            : (alert('Image does not have location. Turn on location first and then take a picture to upload...'), emptyFun(val));

        return { latitude, longitude };
    }

    const emptyFun = (val) => {
        val == 1 && formik.setFieldValue('frontImage', '')
        val == 2 && formik.setFieldValue('rightImage', '')
        val == 3 && formik.setFieldValue('leftImage', '')
    }

    async function checkFile(file, val) {
        let validSize = await checkSizeValidation(file);
        if (validSize) {
            return true
        } else {
            emptyFun(val)
            return false
        }
    }

    // ===========to get location from image end here==================

    const handleImage = async (e) => {
        if (e.target.name == "frontImage") {
            setfrontCamera(false)
            let file = e.target.files[0];
            console.log('image => ', e.target.files[0])
            const getSize = await checkFile(file, 1)
            if (!getSize) {
                return
            }
            const geoLocation = await getLocationFromImage(file, 1); // for location from image
            console.log("1 Image geo location:", geoLocation); // for location from image
            setfrontData(geoLocation)
            setfrontImageUpload(e.target.files[0]);
            setfrontUrl(URL.createObjectURL(e.target.files[0]))
            // formik.setFieldValue('frontImage', frontImageUpload)
            formik.setFieldValue('flongitude', frontData?.longitude)
            formik.setFieldValue('flatitude', frontData?.latitude)
            console.log("--1-- name file on change..", file);
        }

        if (e.target.name == "rightImage") {
            setrightCamera(false)
            let file = e.target.files[0];
            const getSize = await checkFile(file, 2)
            if (!getSize) {
                return
            }
            const geoLocation = await getLocationFromImage(file, 2);
            console.log("2 Image geo location:", geoLocation);
            setrightData(geoLocation)
            setrightImageUpload(e.target.files[0]);
            setrightUrl(URL.createObjectURL(e.target.files[0]))
            // formik.setFieldValue('rightImage', rightImageUpload)
            formik.setFieldValue('rlongitude', rightData?.longitude)
            formik.setFieldValue('rlatitude', rightData?.latitude)
            console.log("--2-- name file on change..", file);
        }

        if (e.target.name == "leftImage") {
            setleftCamera(false)
            let file = e.target.files[0];
            const getSize = await checkFile(file, 3)
            if (!getSize) {
                return
            }
            const geoLocation = await getLocationFromImage(file, 3);
            console.log("3 Image geo location:", geoLocation);
            setleftData(geoLocation)
            setleftImageUpload(e.target.files[0]);
            setleftUrl(URL.createObjectURL(e.target.files[0]))
            // formik.setFieldValue('leftImage', leftImageUpload)
            formik.setFieldValue('llongitude', leftData?.longitude)
            formik.setFieldValue('llatitude', leftData?.latitude)
            console.log("--3-- name file on change..", file);
        }
    }

    // ==========Modal==============
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const openModal = (val) => {
        setIsOpen(true)
        startCamera(val)
        setImageData(null)
        setimageNo(val)
    }
    const openModal2 = (data) => {
        setIsOpen2(true)
        setImageData(data)
    }
    const closeModal = () => {
        setIsOpen(false)
        setIsOpen2(false)
    }
    const afterOpenModal = () => { }
    const afterOpenModal2 = () => { }
    // ===========Modal End=========

    // =====download image==========
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageData;
        // link.download = "./Images/CapturedImage.jpg";
        if (imageNo == 1) {
            setfrontCamera(true)
            setfrontUrl(imageData)
            formik.setFieldValue('frontImage', imageData)
        }
        if (imageNo == 2) {
            setrightCamera(true)
            setrightUrl(imageData)
            formik.setFieldValue('rightImage', imageData)
        }
        if (imageNo == 3) {
            setleftCamera(true)
            setleftUrl(imageData)
            formik.setFieldValue('leftImage', imageData)
        }
        link.click();
        closeModal()
    };

    const wfFdAction = () => {
        setforwardStatus(true)
        setactionType('forward')
    }
    const wfBdAction = () => {
        setforwardStatus(true)
        setactionType('backward')
    }

    return (
        <>

            <div className='text-black w-[50vw] h-[80vh]'>

                <form className='w-full h-full border-2 border-blue-700 bg-blue-50 mb-4' onChange={formik.handleChange} onSubmit={formik.handleSubmit} >
                    <h1 className='text-center font-semibold py-2 border-b border-gray-800 text-black uppercase text-lg'>Smart Camera</h1>

                    {/* =====Front======== */}
                    <div className='bg-gray-50 border-2 border-gray-500 my-2 mx-1 h-[28%]'>
                        <div className='text-black bg-gray-500 px-2 font-semibold'>Front Image</div>
                        <div className='px-2 py-2'>
                            <div className="flex items-center gap-2 w-full text-sm pb-2 px-2">
                                <div className='w-[40%] flex items-center justify-center '>
                                    <img src={frontUrl} alt="Front Image" srcSet="" className='w-[60%]' />
                                </div>
                                <div className=' w-[60%]'>
                                    <span className=' col-span-12 grid grid-cols-12 mb-2'>
                                        <span className="col-span-8 text-sm flex items-center">Capture Image :</span>
                                        {/* <span className="col-span-5 text-sm"><input type="file" onChange={handleImage} name="frontImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span> */}
                                        {/* <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span> */}
                                        <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image' onClick={() => openModal(1)} className='cursor-pointer'><span className='text-4xl'><FcCamera fontSize={'large'} /></span></abbr> </span>
                                    </span>
                                    <span className='col-span-12 grid grid-cols-12'>
                                        <span className="col-span-6 text-sm flex items-center">Latitude :</span>
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{frontData?.latitude}</span></span>
                                    </span>
                                    <span className='col-span-12 grid grid-cols-12'>
                                        <span className="col-span-6 text-sm flex items-center">Longitude :</span>
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{frontData?.longitude}</span></span>
                                    </span>
                                </div>

                            </div>


                        </div>
                    </div>

                    {/* =======Right========= */}
                    <div className='bg-gray-50 border-2 border-gray-500 my-2 mx-1 h-[28%]'>
                        <div className='text-black bg-gray-500 px-2 font-semibold'>Right Image</div>
                        <div className='px-2 py-2'>
                            <div className="flex items-center gap-2 w-full h-full text-sm pb-2 px-2">
                                <div className='w-[40%] flex items-center justify-center '>
                                    <img src={rightUrl} alt="Front Image" srcSet="" className='w-[60%]' />
                                </div>
                                <div className=' w-[60%] '>
                                    <span className='col-span-12 grid grid-cols-12 mb-2'>
                                        <span className="col-span-8 text-sm flex items-center">Capture Image :</span>
                                        {/* <span className="col-span-5 text-sm"><input type="file" onChange={handleImage} name="rightImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span>
                                            <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span> */}
                                        <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image' onClick={() => openModal(2)} className='cursor-pointer'><span className='text-4xl'><FcCamera fontSize={'large'} /></span></abbr> </span>
                                    </span>
                                    <span className='col-span-12 grid grid-cols-12'>
                                        <span className="col-span-6 text-sm flex items-center">Latitude :</span>
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{rightData?.latitude}</span></span>
                                    </span>
                                    <span className='col-span-12 grid grid-cols-12'>
                                        <span className="col-span-6 text-sm flex items-center">Longitude :</span>
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{rightData?.longitude}</span></span>
                                    </span>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* ====Left Image===== */}
                    <div className='bg-gray-50 border-2 border-gray-500 my-2 mx-1 h-[28%]'>
                        <div className='text-black bg-gray-500 px-2 font-semibold'>Left Image</div>
                        <div className='px-2 py-2'>
                            <div className="flex items-center gap-2 w-full h-full text-sm pb-2 px-2">
                                <div className='w-[40%] flex items-center justify-center '>
                                    <img src={leftUrl} alt="Front Image" srcSet="" className='w-[60%]' />
                                </div>
                                <div className=' w-[60%] '>
                                    <span className='col-span-12 grid grid-cols-12 mb-2'>
                                        <span className="col-span-8 text-sm flex items-center">Capture Image :</span>
                                        {/* <span className="col-span-5 text-sm"><input type="file" onChange={handleImage} name="leftImage" id="" accept='.jpg, .jpeg' className='bg-white px-2 py-1 w-full rounded-sm shadow-sm border-[1px] border-gray-400' /></span> */}
                                        {/* <span className='text-red-500 text-xs col-span-2 flex justify-center items-center'>OR</span> */}
                                        <span className="col-span-1 text-sm flex items-center justify-end"><abbr title='Click to capture image' onClick={() => openModal(3)} className='cursor-pointer'><div className='text-4xl'><FcCamera fontSize={'large'} /></div></abbr> </span>
                                    </span>
                                    <span className='col-span-12 grid grid-cols-12'>
                                        <span className="col-span-6 text-sm flex items-center">Latitude :</span>
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{leftData?.latitude}</span></span>
                                    </span>
                                    <span className='col-span-12 grid grid-cols-12'>
                                        <span className="col-span-6 text-sm flex items-center">Longitude :</span>
                                        <span className="col-span-6 text-sm"><span className='font-semibold text-sm'>{leftData?.longitude}</span></span>
                                    </span>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* ==========Button========= */}
                    <div className='w-full flex justify-center m-2'>
                        {/* <div onClick={props?.back} className='px-4 py-1.5 text-sm text-black rounded-sm shadow-md bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 cursor-pointer'>
                    Back
                </div> */}
                        <button type='submit' className="px-4 py-1.5 mr-4 text-sm text-black rounded-sm shadow-md bg-green-500 hover:bg-green-600 focus:bg-green-600">Done</button>
                    </div>

                </form>
            </div>

            {/* ========Modal==========*/}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                className="z-50 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
                contentLabel="Example Modal"
            >

                <div className=" animate__animated animate__zoomIn animate__faster rounded-lg md:ml-24 shadow-lg relative bg-gray-50 px-4 py-4 w-max mt-10 z-50 border-t-2 border-l-2 border-white overflow-auto" >

                    <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                        <ImCross fontSize={10} />
                    </div>

                    {/* =======To open camera and take picture */}
                    <div className='flex justify-center gap-2'>
                        <button onClick={stopCamera} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Stop Camera</button>
                        <button onClick={startCamera} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Start Camera</button>
                    </div>
                    <div className='mt-6 w-full flex flex-wrap gap-4'>
                        <div>
                            <video ref={videoRef} autoPlay className='-scale-x-1' />
                            <canvas ref={canvasRef} style={{ display: "none" }} />
                            {/* <button onClick={startCamera}>Start Camera</button> */}
                            {/* <button onClick={endCamera}>End Camera</button> */}
                            {videoRef?.current?.srcObject != null && <div className='w-full flex justify-center gap-2 text-center my-4'>
                                <button onClick={captureImage} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Capture</button>
                            </div>}
                        </div>
                        {imageData && <>
                            <div className='mx-auto'>
                                <img src={imageData} alt="Captured Image" />
                                <div className='w-full text-center my-4'>
                                    <button onClick={handleDownload} className="text-sm px-4 py-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 text-black rounded-md shadow-md">Save</button>
                                </div>
                            </div>
                        </>}



                        {/* {
                        imageData && 
                        <>
                        {imageNo == 1 && setfrontUrl(imageData)}
                        {imageNo == 2 && setrightUrl(imageData)}
                        {imageNo == 3 && setleftUrl(imageData)}
                        </>
                    } */}

                    </div>

                </div>
            </Modal>

            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
                contentLabel="Example Modal"
            >

                <div className=" animate__animated animate__zoomIn animate__faster relative rounded-lg shadow-xl border-2 border-gray-50 px-0" style={{ 'width': '95vw', 'height': '80vh' }}>

                    <div className="absolute top-2 z-40 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                        <ImCross fontSize={10} />
                    </div>

                    <div className='w-full h-[77vh] overflow-auto flex flex-wrap items-center justify-center'>
                        <img src={imageData} alt="" srcSet="" />
                    </div>

                </div>
            </Modal>

        </>
    )
}

export default SmartCam