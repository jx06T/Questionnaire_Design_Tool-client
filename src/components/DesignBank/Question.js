import React, { useEffect, useRef } from 'react';
import EveryPiece from '../EveryPiece';
import DDM from '../DDM';
import MDBlock from '../MDBlock';
import TextEditor from '../TextEditor';

function Question(props) {
    const options = [
        { value: 'SAQ', label: 'SAQ' },
        { value: 'DAQ', label: 'DAQ' },
        { value: 'SCQ', label: 'SCQ' },
        { value: 'SMQ', label: 'SMQ' },
        { value: 'LSQ', label: 'LSQ' },
        { value: 'UDQ', label: 'UDQ' },
        { value: 'Description', label: 'Dsc' },
        { value: 'Submit', label: 'Sub' },
        // { value: 'Title', label: 'Title' },
    ];

    const SelectionType = (value) => {
        console.log(value)
    }

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleMDChange = (newContent) => {
        // console.log(newContent)
    };

    const handleTextEditorChange = (newContent) => {
        // console.log(newContent)
    };

    const MDBlockRef = useRef(null);
    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (MDBlockRef.current) {
                MDBlockRef.current.focus();
            }
        }
    };

    return (
        <EveryPiece >
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <input ref={inputRef} onKeyDown={handleInputKeyDown} placeholder="在這輸入題目!" type='text' className={`myjx-input2 text-2xl mb-[0.2rem] w-[83%] ${props.required ? "J-required" : ""}`}></input>
                    <DDM options={options} callback={SelectionType} />
                </div>
                <MDBlock ref={MDBlockRef} SendMDContent={handleMDChange} />

            </div>
            <hr className='w-[100%] mx-auto bg-slate-50 h-[0.1rem] mb-4 mt-1' />

            <TextEditor rows={3} placeholder="在這輸入預設答案等等設定" className='myjx-textarea text-base  border-none' />
        </EveryPiece>
    );
}

export default Question;
