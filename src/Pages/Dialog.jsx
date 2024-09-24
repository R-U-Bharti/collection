import { useRef } from "react"

const Dialog = () => {

    const dialogRef = useRef()

    const openModal = () => {
        dialogRef.current.showModal()
    }

    const closeModal = () => {
        dialogRef.current.close()
    }

    return (
        <>
            <dialog ref={dialogRef} className='animate__animated animate__zoomIn animate__faster w-screen h-screen bg-transparent'>
                <div className='h-full flex justify-center items-center w-full bg-black/40'>
                    <div className="md:w-[30%] w-[95%] bg-white p-4 rounded border flex flex-wrap items-center gap-y-3 gap-x-2">
                        Work Here...
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Dialog