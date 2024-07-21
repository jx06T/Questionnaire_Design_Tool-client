import React from "react";


function InfoBlock({ close, title, ...props }) {
    return (
        <div className="p-4 z-20 absolute h-full w-[calc(100vw-3rem)] mx-4 my-4 sm:max-w-96 sm:mr-0 sm:right-0  rounded-md bg-slate-200">
            <div className="flex">
                <button onClick={close} className="leading-3 w-7 h-7 rounded-full bg-slate-300 text-2xl">
                    <span className="">
                        ×
                    </span>
                </button>
                <div className="text-lg w-72 ml-3">{title}</div>
            </div>
            <hr className='w-[100%] mx-auto bg-slate-100 h-[2px] my-1' />
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default InfoBlock;