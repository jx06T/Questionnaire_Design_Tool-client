import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// function MDBlock({ SendMDContent }) {
const MDBlock = forwardRef(({ SendMDContent }, ref) => {
    const [markdownText, setMarkdownText] = useState('');
    const [previewing, setPreviewing] = useState(false);
    const textareaRef = useRef(null);
    const hiddenDivRef = useRef(null);
    const markdownTextRef = useRef('');

    useImperativeHandle(ref, () => ({
        focus: () => {
            setPreviewing(false);
            if (textareaRef.current) {
                setTimeout(() => {
                    textareaRef.current.focus();
                }, 100);
                textareaRef.current.focus();
            }
        }
    }));

    useEffect(() => {
        markdownTextRef.current = markdownText;
    }, [markdownText]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (markdownTextRef.current !== "" && textareaRef.current && !textareaRef.current.contains(event.target)) {
                setPreviewing(true)
                SendMDContent(markdownTextRef.current)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleBlur = () => {
        if (markdownTextRef.current !== "") {
            setPreviewing(true)
            SendMDContent(markdownTextRef.current)
        }
    }

    const handleInputChange = (e) => {
        setMarkdownText(e.target.value);
    };

    const handlePreviewAreaClick = (e) => {
        setPreviewing(false)
    };

    const UProw = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    return (
        <>
            <div
                className={`${(!previewing || markdownText == "") ? "hidden" : ""} markdown-preview text-sm min-h-7 break-all`}
                onClick={handlePreviewAreaClick}
                ref={hiddenDivRef}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText.replace(/\n/g, '　  \n')}</ReactMarkdown>
            </div>
            <div className={`${(previewing && markdownText != "") ? "hidden" : ""} text-sm min-h-7 `}>
                <textarea
                    ref={textareaRef}
                    placeholder="在這輸入其他說明! (支持 Markdown)"
                    className="myjx-textarea border-none"
                    value={markdownText}
                    onInput={UProw}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                ></textarea>
            </div>

        </>
    );
});

export default MDBlock;
