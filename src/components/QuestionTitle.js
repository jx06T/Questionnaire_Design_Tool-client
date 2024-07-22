import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function QuestionTitle({ question, description = "", required = false }) {
    const newTabLink = ({ node, ...props }) => {
        return <a target="_blank" rel="noopener noreferrer" className='underline' {...props} />;
    };
    return (
        <>
            <h2 className={`text-2xl mb-[0.2rem] ${required ? "J-required" : ""}`}>{question || "題目或標題"}</h2>
            <div className='markdown-preview'>
                <ReactMarkdown
                    components={{ a: newTabLink }}
                    className="text-base mb-6"
                    remarkPlugins={[remarkGfm]}
                >
                    {description.replace(/(?<!`)\n/g, '　  \n').replace(/\$n\//g, '\n')}

                </ReactMarkdown>
            </div>
        </>
    );
}

export default QuestionTitle;
