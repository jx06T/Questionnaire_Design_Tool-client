import React, { useEffect, useRef } from 'react';
import EveryPiece from '../EveryPiece';

function TitleEdit({ createNewQuestionnaire,defaultTitle, defaultSubtitle, onUpdate, ...props }) {
    const inputRef = useRef(null)
    const inputRef2 = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.nextSibling.focus()
        }
    }

    const handleChange = () => {
        onUpdate(inputRef.current.value, inputRef2.current.value)
    }

    return (
        <EveryPiece color="400">
            <div className='flex flex-col'>
                <input defaultValue={defaultTitle} onChange={handleChange} ref={inputRef} onKeyDown={handleKeyDown} className='myjx-input2 text-center text-3xl mb-[1rem] myjx-inputP leading-relaxed' placeholder="輸入問卷標題"></input>
                <input defaultValue={defaultSubtitle} onChange={handleChange} ref={inputRef2} className='myjx-input2 text-center text-lg -mb-2 myjx-inputP' placeholder='輸入副標題等等等'></input>
            </div>
            {/* <div className='text-right mt-5 -mb-5 -mr-3'>
                <button onClick={createNewQuestionnaire} className='text-sm underline'>
                    Create new questionnaire
                </button>
            </div> */}
        </EveryPiece>
    );
}

export default TitleEdit;
