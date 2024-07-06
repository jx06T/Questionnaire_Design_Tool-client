import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function QuestionTitle({question,description = "詳細說明",required = false}) {
    return (
        <>
            <h2 className={`text-2xl mb-[0.2rem] ${required ? "J-required" : ""}`}>{question || "題目"}</h2>
            <ReactMarkdown className="text-sm mb-6" remarkPlugins={[remarkGfm]}>{description.replace(/(?<!\n)\n(?!\n)/g, '  \n')}</ReactMarkdown>
        </>
    );
}

export default QuestionTitle;
