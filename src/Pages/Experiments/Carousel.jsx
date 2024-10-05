/*
Readme
=================================================================================
props: imageList, option

let imageList = [
        {
            image: '/image1.png',
            title: 'Image 1 Title',

            !when overlay is true
            overlay: <>
                <div className="h-full w-full bg-black/20">Title</div>
            </>
        },
        {
            image: 'image2.png',
            title: 'Image 2 Title',
        }
    ]

let option = {
    width: '', // carouse width default 100%
    height: '', // carousel height default 100%
    cover: true, // image fit // default false
    delay: 2000, // image change delay time
    backgroundColor: 'transparent', // image background color
    dots: false, // default true
    overlay: true, // default false, if true, write your code for overlay,
}
        
*/

import { useEffect, useState } from "react"

const Carousel = ({ imageList = [], option = {} }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [mouseInStatus, setMouseInStatus] = useState(false)

    let options = option ?? {}

    const changeImageFun = (type) => {
        if (type === 'next') {
            if (currentImageIndex === imageList.length - 1) {
                setCurrentImageIndex(0)
                return;
            }
            setCurrentImageIndex((prev) => prev + 1);
        }
        if (type === 'prev') {
            if (currentImageIndex === 0) {
                setCurrentImageIndex(imageList.length - 1)
                return;
            }
            setCurrentImageIndex((prev) => prev - 1);
        }
    };

    useEffect(() => {
        !mouseInStatus && setTimeout(() => {
            changeImageFun('next')
        }, options?.delay ?? 3000)
    }, [currentImageIndex, mouseInStatus]);

    return (
        <>
            <div style={{ height: '100vh', width: '100vw', backdropFilter: 'blur(4px)' }}>

                <div style={{ width: options?.width || '100%', height: options?.height || '70%', position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={() => setMouseInStatus(true)}
                    onMouseLeave={() => setMouseInStatus(false)}>

                    <div style={{ display: 'flex', transition: 'all 1s ease-in-out', width: '100%', height: '100%' }}>
                        {
                            imageList?.map((card, index) =>
                                <div key={index} style={{ width: '100%', height: '100%', flexShrink: 0, position: 'relative', transform: `translateX(-${currentImageIndex * 100}%)` }}>
                                    <img src={card?.image} style={{ objectFit: options?.cover ? 'cover' : 'contain', width: '100%', height: '100%', backgroundColor: options?.backgroundColor }} alt="" />

                                    {
                                        !options?.overlay && card?.title &&
                                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', background: 'rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'end', justifyContent: 'center', padding: '2.5rem' }}>
                                            <div style={{ width: 'max-content', backdropFilter: 'blur(8px)', padding: '0.25rem 1rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '0.375rem', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                                                {card?.title}
                                            </div>
                                        </div>
                                    }

                                    {options?.overlay && <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
                                        {card?.overlay}
                                    </div>}
                                </div>
                            )
                        }
                    </div>

                    <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '10%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '0.5rem' }}>
                            <span onClick={() => changeImageFun('prev')} style={{ userSelect: 'none', padding: '0.125rem 0.5rem', backdropFilter: 'blur(8px)', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.2)' }}>
                                &lt;
                            </span>
                        </div>

                        {(options?.dots == undefined || options?.dots == true) &&
                            <div style={{ width: '80%', height: '100%', display: 'flex', alignItems: 'end', justifyContent: 'center', padding: '0.5rem 0' }}>
                                <div style={{ width: 'max-content', backdropFilter: 'blur(8px)', padding: '0.25rem 0.75rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                    {
                                        Array.from({ length: imageList.length ?? 0 }).map((_, index) =>
                                            <div key={index} onClick={() => setCurrentImageIndex(index)} style={{
                                                transition: 'all 0.3s',
                                                cursor: 'pointer',
                                                height: '0.625rem',
                                                width: '0.625rem',
                                                borderRadius: '9999px',
                                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                                background: currentImageIndex === index ? 'rgba(0, 0, 0, 1)' : ''
                                            }} />
                                        )
                                    }
                                </div>
                            </div>
                        }

                        <div style={{ width: '10%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', padding: '0.5rem' }}>
                            <span onClick={() => changeImageFun('next')} style={{ userSelect: 'none', padding: '0.125rem 0.5rem', backdropFilter: 'blur(8px)', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.2)' }}>
                                &gt;
                            </span>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Carousel