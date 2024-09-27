import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const TwoThumbSlider = ({ min = 0, max = 100, step = 1 }) => {
    const [values, setValues] = useState([min, max]);

    return (
        <div className='w-full md:mt-0 mt-8'>
            {/* Slider Container */}
            <div className="relative w-full px-4">
                {/* Range Component from react-range */}
                <Range
                    step={step}               // Step size for slider movement
                    min={min}                 // Minimum range value
                    max={max}                 // Maximum range value
                    values={values}           // Current values of the two thumbs
                    onChange={(values) => setValues(values)}  // Update state on change
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="w-full h-1 bg-gray-200 rounded-lg relative"
                            ref={props.ref}  // Attach ref to correctly position track
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ['#e2e8f0', '#132438', '#e2e8f0'],
                                    min,
                                    max,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ index, props }) => (
                        <div
                            {...props}
                            className="w-5 h-5 bg-[#132438] rounded-full cursor-pointer flex justify-center items-center absolute"
                            style={{
                                outline: 'none',
                            }}
                        >
                            {/* Tooltip showing the value */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-max bg-[#132438] text-white px-2 py-1 rounded-md text-xs">
                                {values[index]} Tons
                            </div>
                        </div>
                    )}
                />
            </div>

            {/* Min and Max Labels */}
            <div className="flex justify-between w-full mt-1 text-sm text-gray-500">
                <span>{min} Tons</span>
                <span>{max} Tons</span>
            </div>

            {/* Display Selected Range */}
            <div className='flex justify-center mt-4 text-zinc-700'>
                <span>Selected Range: {values[0]} Tons - {values[1]} Tons</span>
            </div>
        </div>
    );
};

export default TwoThumbSlider;
