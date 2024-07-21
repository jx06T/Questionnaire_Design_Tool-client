import React from "react";


function InfoBlock(props) {
    return (
        <div className="absolute h-full mx-4 my-4 sm:max-w-96 sm:mr-0 w-[calc(100vw-2rem)] sm:right-0 rounded-md bg-slate-200">
            {props.children}
        </div>
    );
}

export default InfoBlock;