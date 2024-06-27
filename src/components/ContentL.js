
import React from 'react';

function ContentL(props) {
    return (
        <div className='items-center flex flex-col md:flex-row lg:justify-around m-16'>
            <div className='text-2xl sm:text-3xl md:text-4xl text-center' style={{ minWidth: '18rem', maxHeight: '10rem' }}>
                {props.children}
            </div>
            <div className='max-w-96 min-w-44'>
                <img className='h-auto max-w-full' src={props.img} title="問卷圖示" ></img>
            </div>
        </div>
    );
}

export default ContentL;
