import React, { useState } from 'react';

const CopyableText = ({ text, label }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('無法複製文字: ', err);
        }
    };

    return (
        <div className='mb-2 border-b border-b-stone-300'>
            <span className='my-1 w-full mr-1'>
                {label}
            </span>
            <span className='my-1 w-full mr-1'>
                ：
            </span>
            <span onClick={handleCopy} className='my-1 cursor-pointer w-full mr-1'>
                {text} {isCopied && <span style={{ color: 'green' }}>(copied)</span>}
            </span>
        </div>
    );
};

export default CopyableText;