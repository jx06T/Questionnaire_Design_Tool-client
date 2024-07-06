import React from 'react';
import EveryPiece from '../EveryPiece';
import DDM from '../DDM';
import MDBlock from '../MDBlock';

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
        { value: 'Title', label: 'Title' },
    ];

    const SelectionType = (value) => {
        console.log(value)
    }
    const UProw = (event) => {
        event.target.rows = Math.max(event.target.value.split("\n").length, 3)
    }

    return (
        <EveryPiece >
            <div className='flex justify-between'>
                <div className='flex flex-col w-[82%]'>
                    <input placeholder="在這輸入題目!" type='text' className={`myjx-input2 text-2xl mb-[0.2rem] ${props.required ? "J-required" : ""}`}></input>
                    <MDBlock />
                </div>
                <DDM options={options} callback={SelectionType} />
            </div>
            <hr className='w-[100%] mx-auto bg-slate-50 h-[1.8px] mb-4 mt-1' />

            <textarea
                placeholder="在這輸入預設答案等等設定"
                className='myjx-textarea text-base  border-none'
                onInput={UProw}
                rows={3}
            ></textarea>
        </EveryPiece>
    );
}

export default Question;
