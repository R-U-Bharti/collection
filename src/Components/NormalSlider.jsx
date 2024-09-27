import React from 'react'

const NormalSlider = () => {
    return (
        <>
            <div className='w-full md:mt-0 mt-8'>
                <div className="relative w-full px-4">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        name={'pieces'}
                        value={formik.values.pieces}
                        step="1"
                        className="transition-all duration-200 w-full focus:outline-none h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                            background: `linear-gradient(to right, #132438 ${formik.values.pieces * 1}%, #e2e8f0 0%)`,
                        }}
                    />
                    {/* Tooltip */}
                    <div
                        className="transition-all duration-200 absolute w-max left-1/2 transform -translate-x-1/2 -top-7 bg-[#132438] text-white px-2 py-1 rounded-md text-xs"
                        style={{ left: `${(formik.values.pieces / 110) * 100}%`, transform: 'translateX(0%)' }}
                    >
                        {formik.values.pieces} Nos
                    </div>
                </div>

                {/* Min and Max Labels */}
                <div className="flex justify-between w-full mt-1 text-sm text-gray-500">
                    <span>00 Nos</span>
                    <span>100 Nos</span>
                </div>
            </div>

            <div className='flex flex-col gap-1 bg-[#f6f7fb] w-[35%] p-2'>
                <label htmlFor="pieces" className='text-zinc-700 text-xs'>Custom <span className="text-zinc-500">(max 100 Nos)</span></label>
                <input type="number" min={0} max={100} value={formik.values.pieces} name="pieces" className='focus:outline-none border-2 rounded-lg px-3 py-1.5 placeholder:text-xs text-zinc-800 focus:outline-none' placeholder='Enter no. of Nos' id="" />
            </div>
        </>
    )
}

export default NormalSlider