import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MDBlock() {
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

    const UProw = (event) => {
        event.target.rows = Math.max(event.target.value.split("\n").length, 3)
    }

    const countNewlines = (text) => {
        console.log((text.match(/\n/g) || []).length + 1)
        if (textareaRef.current) {
            textareaRef.current.rows = (text.match(/\n/g) || []).length + 1
        }
        return (text.match(/\n/g) || []).length + 1;
    }

    return (
        <>
            {(previewing && markdownText != "") ?
                <div
                    className="markdown-preview text-sm min-h-7"
                    onClick={handlePreviewAreaClick}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText.replace(/(?<!\n)\n(?!\n)/g, '  \n')}</ReactMarkdown>
                </div> :
                <div className='min-h-7'>
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
        </>
    );
}

export default MDBlock;
