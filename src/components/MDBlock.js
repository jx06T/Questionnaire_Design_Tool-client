import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from './TextEditor';

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
                SendMDContent2(markdownTextRef.current)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [SendMDContent]);

    const handleBlur = () => {
        if (markdownTextRef.current !== "") {
            setPreviewing(true)
            SendMDContent2(markdownTextRef.current)
        }
    }

    const handlePreviewAreaClick = (e) => {
        setPreviewing(false)
    };

    const SendMDContent2 = (content) => {
        SendMDContent(content)
        setMarkdownText(content)
    }

    return (
        <>
            <div
                className={`${(!previewing || markdownText === "") ? "hidden" : ""} markdown-preview text-sm min-h-7 break-all`}
                onClick={handlePreviewAreaClick}
                ref={hiddenDivRef}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText.replace(/\n/g, '　  \n')}</ReactMarkdown>
            </div>
            <div className={`${(previewing && markdownText !== "") ? "hidden" : ""} text-sm min-h-7 `}>
                <TextEditor
                    ref={textareaRef}
                    SendContent={SendMDContent2}
                    placeholder="在這輸入其他說明! (支持 Markdown)"
                    className="myjx-textarea border-none"
                    // value={markdownText}
                    onBlur={handleBlur}
                ></TextEditor>
            </div>

        </>
    );
});

export default MDBlock;
