
import React from 'react';

function Content(props) {
    if (props.direction === "L") {
        return (
            <div className='items-center flex flex-col md:flex-row lg:justify-around m-16'>
                <div className='text-2xl sm:text-3xl md:text-4xl text-center flex space-y-8 flex-col items-center lg:items-end' style={{ minWidth: '18rem', maxHeight: '10rem' }}>
                    {props.children}
                </div>
                <div className='max-w-96 min-w-44 border-b-4'>
                    <img className='h-auto max-w-full' alt='img' src={props.img} title="問卷圖示" ></img>
                </div>
            </div>
        );
    } else {
        return (
            <div className='items-center flex flex-col md:flex-row lg:justify-around m-16 mb-20 '>
                <div className='max-w-96 order-2 md:order-1 min-w-44'>
                    <img className='h-auto max-w-full border-b-4' src={props.img} alt='img' title="問卷圖示" ></img>
                </div>
                <div className='text-2xl sm:text-3xl md:text-4xl text-center md:order-2 flex space-y-8 flex-col items-center lg:items-start' style={{ minWidth: '18rem', maxHeight: '10rem' }}>
                    {props.children}
                </div>
            </div>
        );
    }
}

export default Content;
