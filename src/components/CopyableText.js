import React, { useState } from 'react';

const CopyableText = ({ text }) => {
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
    <span onClick={handleCopy} className='my-1 cursor-pointer'>
      {text} {isCopied && <span style={{ color: 'green' }}>(copied)</span>}
    </span>
  );
};

export default CopyableText;