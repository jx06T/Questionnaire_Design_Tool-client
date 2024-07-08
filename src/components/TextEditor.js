import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";


const TextEditor = forwardRef(({ SendContent, ...otherProps }, externalRef) => {
    const internalRef = useRef(null);

    useImperativeHandle(externalRef, () => internalRef.current);

    useEffect(() => {
        const textarea = internalRef.current;
        if (!textarea) return;

        const handleKeyDown = (e) => {
            const { key, ctrlKey, altKey, shiftKey } = e;
            const { selectionStart, selectionEnd, value } = textarea;

            const lines = value.split('\n');
            const startLineIndex = value.slice(0, selectionStart).split("\n").length - 1
            const endLineIndex = value.slice(0, selectionEnd).split("\n").length - 1
            // console.log(startLineIndex, endLineIndex)

            // Ctrl+C / Ctrl+X (複製/剪切整行)
            if (ctrlKey && (key === 'c' || key === 'x') && selectionStart === selectionEnd) {
                e.preventDefault();
                navigator.clipboard.writeText(lines[startLineIndex]);

                if (key === 'x') {
                    lines.splice(startLineIndex, 1)
                    textarea.value = lines.join("\n");
                    textarea.selectionStart = textarea.selectionEnd = selectionStart;
                    UProw();
                }
            }

            // Alt+上下箭頭 (移動行)
            if (altKey && (key === 'ArrowUp' || key === 'ArrowDown') && !shiftKey) {
                e.preventDefault();
                const moveLineIndex = key === 'ArrowUp' ?
                    startLineIndex - 1 :
                    endLineIndex + 1;

                const moveLineContent = lines[moveLineIndex]
                if (moveLineContent) {
                    lines.splice(moveLineIndex, 1)

                    let b = (moveLineContent.length + 1) * (key === 'ArrowUp' ? -1 : 1)
                    lines.splice(key === 'ArrowUp' ? endLineIndex : startLineIndex, 0, moveLineContent)
                    textarea.value = lines.join('\n');
                    textarea.selectionStart = selectionStart + b
                    textarea.selectionEnd = selectionEnd + b
                    UProw();
                }
            }

            // Alt+Shift+上下箭頭 (複製並移動行)
            if (altKey && shiftKey && (key === 'ArrowUp' || key === 'ArrowDown')) {
                e.preventDefault();
                const copyContent = lines.slice(startLineIndex, endLineIndex + 1)
                lines.splice(key === 'ArrowUp' ? endLineIndex : startLineIndex, 0, ...copyContent)
                let b = key === 'ArrowUp' ? 0 : copyContent.join("\n").length + 1
                textarea.value = lines.join('\n');
                textarea.selectionStart = selectionStart + b
                textarea.selectionEnd = selectionEnd + b
                UProw();
            }

            // Ctrl+Enter / Ctrl+Shift+Enter (插入空白行)
            if (ctrlKey && (key === 'Enter')) {
                e.preventDefault();
                const insertPosition = shiftKey ? endLineIndex : endLineIndex + 1;
                lines.splice(insertPosition, 0, "")
                textarea.value = lines.join("\n");
                textarea.selectionStart = textarea.selectionEnd = lines.slice(0, insertPosition + 1).join("\n").length;
                UProw();
            }
        };

        textarea.addEventListener('keydown', handleKeyDown);
        return () => textarea.removeEventListener('keydown', handleKeyDown);
    }, []);

    const UProw = () => {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
        SendContent(internalRef.current.value)
    };

    return (
        <textarea
            ref={internalRef}
            onInput={UProw}
            {...otherProps}
        />
    );
});

export default TextEditor