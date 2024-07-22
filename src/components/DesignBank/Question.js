import React, { useEffect, useRef, useState } from 'react';
import EveryPiece from '../EveryPiece';
import DDM from '../DDM';
import MDBlock from '../MDBlock';
import TextEditor from '../TextEditor';
import Buttons from './Buttons';

class interpreter {
    constructor() {
        this.SCQ = this.SMCQ
        this.MCQ = this.SMCQ
        this.SAQ = (c, p) => { return this.SDAQ(c, p, " ") }
        this.DAQ = (c, p) => { return this.SDAQ(c, p, "\n") }
        this.UDQ = (c, p) => { return p }
        this.description = (c, p) => { return p }
        this.finish = (c, p) => { return p }
        this.submit = (c, p) => {
            p.message = c
            return p
        }
    }

    SDAQ(content, params, a) {
        const lines = content.split("\n")
        const regex0 = /^\/.*\/$/
        const regex = regex0.test(lines[lines.length - 1]) ? lines.pop() : ""
        params.placeholder = lines.join(a)
        params.regex = regex
        return params
    }

    SMCQ(content, params) {
        const regex0 = /\[([^\]]*)\](.*)/g;
        const options = [];
        let match;

        while ((match = regex0.exec(content)) !== null) {
            const [, id, text] = match;
            if (text.trim() !== '') {
                options.push({
                    id: id.trim() || text.trim(),
                    text: text.trim()
                });
            }
        }
        params.options = options
        return params;
    }

    LSQ(content, params) {
        const regex0 = /\[([^\]]*)\](.*)/g;
        const options = [];
        let match;
        const TempParams = {}
        while ((match = regex0.exec(content)) !== null) {
            const [, id, text] = match;
            if (text.trim() !== '') {
                if (id === "-m") {
                    TempParams.min = parseFloat(text.trim())
                    continue
                }
                if (id === "+m") {
                    TempParams.max = parseFloat(text.trim())
                    continue
                }
                if (id === "-c") {
                    TempParams.capture = parseFloat(text.trim())
                    continue
                }
                options.push({
                    value: id.trim() || undefined,
                    text: text.trim()
                });
            }
        }

        let min = undefined
        let minIndex = undefined
        let spacing = undefined
        options.forEach((item, index) => {
            const value = parseFloat(item.value)
            if (!isNaN(value)) {
                if (!min) {
                    min = value
                    minIndex = index
                } else {
                    spacing = (value - min) / (index - minIndex)
                }
            }
        })
        if (!min || !spacing) {
            spacing = 50
            let medIndex = (options.length - 1) / 2
            minIndex = Math.floor(medIndex)
            min = 0 + spacing * (minIndex - medIndex)
        }

        const NewOptions = options.map((e, i) => {
            return { ...e, value: min + (i - minIndex) * spacing };
        });

        params.capture = spacing * 0.2
        if (NewOptions.length > 0) {
            params.min = NewOptions[0].value - spacing * NewOptions.length * 0.05
            params.max = NewOptions[NewOptions.length - 1].value + spacing * NewOptions.length * 0.05
        }
        params = { ...params, ...TempParams }
        params.options = NewOptions

        return params;
    }
}

function Question({ buttonsFUN, onUpdateB, ...props }) {
    const Myinterpreter = new interpreter()
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const options = [
        { value: 'SAQ', label: 'SAQ' },
        { value: 'DAQ', label: 'DAQ' },
        { value: 'SCQ', label: 'SCQ' },
        { value: 'MCQ', label: 'MCQ' },
        { value: 'LSQ', label: 'LSQ' },
        { value: 'UDQ', label: 'UDQ' },
        { value: 'description', label: 'Dsc' },
        { value: 'finish', label: 'ok' },
        // { value: 'submit', label: 'Sub' },
    ];

    const getLabelByValue = (value) => {
        const option = options.find(option => option.value === value);
        return option ? option.label : null;
    }

    const [questionData, setQuestionData] = useState({
        type: props.type || 'SAQ',
        params: {
            question: props.question || '',
            description: props.description || '',
            required: props.required || false,
            placeholder: props.placeholder || '',
            originalData: props.originalData || ''
        },
        id: props.id || Date.now()
    });

    const SelectionType = (value) => {
        setQuestionData(prevData => {
            const updatedData = { ...prevData, type: value }
            // onUpdate(updatedData)
            return (updatedData)
        })
    }

    const handleMDChange = (newContent) => {
        setQuestionData(prevData => {
            const updatedData = {
                ...prevData,
                params: { ...prevData.params, description: newContent }
            }
            // onUpdate(updatedData)
            return updatedData;
        })
    };

    const handleTextEditorChange = (newContent) => {
        setQuestionData(prevData => {
            const updatedData = {
                ...prevData,
                params: { ...Myinterpreter[prevData.type](newContent, prevData.params), originalData: newContent }
            }
            // onUpdate(updatedData)
            return updatedData;
        });

    };

    const handleInputChange = () => {
        setQuestionData(prevData => {
            const updatedData = {
                ...prevData,
                params: { ...prevData.params, question: inputRef.current.value }
            };
            // onUpdate(updatedData);
            return updatedData;
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            onUpdateB(questionData);
        }, 300);
        return () => clearTimeout(timer);
    }, [questionData]);

    const MDBlockRef = useRef(null);
    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (MDBlockRef.current) {
                MDBlockRef.current.focus();
            }
        }
    };
    if (questionData.type === "finish" || questionData.type === "description") {
        buttonsFUN.ShowRequired = false
    } else {
        buttonsFUN.ShowRequired = true
    }

    return (
        <EveryPiece >
            <div className='a-question flex flex-col'>
                <div className='flex justify-between'>
                    <input defaultValue={props.question} onChange={handleInputChange} ref={inputRef} onKeyDown={handleInputKeyDown} placeholder="在這輸入題目!" type='text' className={`myjx-input2 text-2xl mb-[0.2rem] w-[83%] ${props.required ? "J-required" : ""}`}></input>
                    <DDM options={options} callback={SelectionType} defaultValue={getLabelByValue(props.type)} />
                </div>
                <MDBlock defaultValue={props.description} ref={MDBlockRef} SendMDContent={handleMDChange} />

            </div>
            <hr className='w-[100%] mx-auto bg-slate-50 h-[0.1rem] mb-4 mt-1' />
            <TextEditor defaultValue={props.originalData} SendContent={handleTextEditorChange} rows={3} placeholder={"在這輸入預設答案等等設定"} className='myjx-textarea text-base  border-none' />
            <hr className='w-[100%] mx-auto bg-slate-50 h-[0.1rem] mb-4 mt-1' />
            <Buttons {...buttonsFUN} />
        </EveryPiece>
    );
}

export default Question;
