import React from 'react';
import EveryPiece from '../EveryPiece';
import MDBlock from '../MDBlock';

function BlockEdit(props) {
    return (
        <div className='flex flex-col mt-10 mx-0'>
            {!props.noI && <EveryPiece color="300">
                <input placeholder="在這輸入區塊說明!" type='text' className={`myjx-input2 text-2xl mb-[0.2rem] ${props.required ? "J-required" : ""}`}></input>
               <MDBlock/>
            </EveryPiece>}
            {props.children}
            <hr className='my-8 w-[110%] -ml-[5%] bg-slate-200 h-[1.8px] max-w-[98vw]' />
        </div>
    );
}

export default BlockEdit;
