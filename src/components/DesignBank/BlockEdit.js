import React, { useEffect, useRef, useState } from 'react';
import EveryPiece from '../EveryPiece';
import MDBlock from '../MDBlock';
import TextEditor from '../TextEditor';
import Buttons from './Buttons';

function BlockEdit({ isFirst, buttonsFUN, onUpdateB, ...props }) {
    const inputRef = useRef(null);
    const [questionData, setQuestionData] = useState({
        type: 'block',
        params: {
            question: props.question || '',
            description: props.description || '',
            questionN: props.questionN || '切換到下一個區塊',
            descriptionN: props.descriptionN || '',
            required: props.required || false,
            originalData: props.originalData || '[b]返回\n[n]繼續',
            message1: props.message1 || '返回',
            message2: props.message2 || '繼續'
        },
        id: props.id || Date.now()
    });

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleMDChange = (newContent, t) => {
        setQuestionData(prevData => {
            const updatedData = {
                ...prevData,
                params: { ...prevData.params, [t]: newContent }
            }
            return updatedData;
        })
    }

    const handleTextEditorChange = (newContent) => {
        const regex0 = /\[([^\]]*)\](.*)/g;
        let match;
        let msg1;
        let msg2;

        while ((match = regex0.exec(newContent)) !== null) {
            const [, id, text] = match;
            if (id === 'b') {
                msg1 = text.trim()
            }
            if (id === 'n') {
                msg2 = text.trim()
            }
        }
        setQuestionData(prevData => {
            const updatedData = {
                ...prevData,
                params: { ...prevData.params, originalData: newContent, message1: msg1, message2: msg2 }
            }
            return updatedData;
        });
    }

    const handleInputChange = (e, t) => {
        setQuestionData(prevData => {
            const updatedData = {
                ...prevData,
                params: { ...prevData.params, [t]: e.target.value }
            };
            return updatedData;
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            onUpdateB(questionData);
        }, 300);
        return () => clearTimeout(timer);
    }, [questionData]);

    return (
        <div className='flex flex-col a-question'>
            {!isFirst && <hr className='my-8 w-[110%] -ml-[5%] bg-slate-200 h-[1.8px] max-w-[98vw]' />}
            {!props.noI && <EveryPiece color="300">
                <input defaultValue={props.question} onChange={(e) => handleInputChange(e, "question")} ref={inputRef} placeholder="在這輸入區塊說明!" type='text' className={`myjx-input2 text-2xl mb-[0.2rem] w-full ${props.required ? "J-required" : ""}`}></input>
                <MDBlock defaultValue={props.description} SendMDContent={(v) => handleMDChange(v, "description")} />

                <hr className='w-[100%] mx-auto bg-slate-50 h-[0.1rem] mb-4 mt-1' />
                <input defaultValue={props.questionN} onChange={(e) => handleInputChange(e, "questionN")} placeholder="在這輸入區塊說明!" type='text' className={`myjx-input2 text-2xl mb-[0.2rem] w-full ${props.required ? "J-required" : ""}`}></input>
                <MDBlock defaultValue={props.descriptionN} SendMDContent={(v) => handleMDChange(v, "descriptionN")} />

                <hr className='w-[100%] mx-auto bg-slate-50 h-[0.1rem] mb-4 mt-1' />
                <TextEditor defaultValue={props.originalData} SendContent={handleTextEditorChange} rows={3} placeholder={"在這輸入預設答案等等設定"} className='myjx-textarea text-base  border-none' />
                <hr className='w-[100%] mx-auto bg-slate-50 h-[0.1rem] mb-4 mt-1' />
                <Buttons {...buttonsFUN} />
            </EveryPiece>}
        </div>
    );
}

export default BlockEdit;
