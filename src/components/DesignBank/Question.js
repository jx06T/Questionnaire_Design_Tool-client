import React, { useState, useRef, useEffect } from 'react';
import EveryPiece from '../EveryPiece';
import DDM from '../DDM';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

    const [markdownText, setMarkdownText] = useState('');
    const [previewing, setPreviewing] = useState(false);
    const textareaRef = useRef(null);
    const markdownTextRef = useRef('');

    useEffect(() => {
        markdownTextRef.current = markdownText;
    }, [markdownText]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (markdownTextRef.current !== "" && textareaRef.current && !textareaRef.current.contains(event.target)) {
                setPreviewing(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setMarkdownText(e.target.value);
    };

    const handlePreviewAreaClick = (e) => {
        setPreviewing(false)
    };

    const SelectionType = (value) => {
        console.log(value)
    }
    const UProw = (event) => {
        event.target.rows = Math.max(event.target.value.split("\n").length, 3)
    }
    const countNewlines = (text) => {
        return (text.match(/\n/g) || []).length + 1;
    }

    return (
        <EveryPiece >
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <input placeholder="在這輸入題目!" type='text' className={`myjx-input2 text-2xl mb-[0.2rem] ${props.required ? "J-required" : ""}`}></input>
                    {(previewing && markdownText != "") ?
                        <div
                            className="markdown-preview text-sm mb-6 min-h-16"
                            onClick={handlePreviewAreaClick}
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText.replace(/(?<!\n)\n(?!\n)/g, '  \n')}</ReactMarkdown>
                        </div> :
                        <div className='mb-6 min-h-16'>
                            <textarea
                                ref={textareaRef}
                                placeholder="在這輸入其他說明! (支持 Markdown)"
                                className='myjx-textarea text-sm  border-none'
                                value={markdownText}
                                onInput={UProw}
                                onChange={handleInputChange}
                                rows={countNewlines(markdownText)}
                            ></textarea>
                        </div>
                    }
                </div>
                <DDM options={options} callback={SelectionType} />
            </div>
        </EveryPiece>
    );
}

export default Question;
