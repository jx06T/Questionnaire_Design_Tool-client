import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import QB from './QuestionBank'
import MB from './MethodBank'
import Block from './MethodBank/Block';

export const ReplyContext = React.createContext(null);

function QuestionnaireRendering(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('p')) || 1);

    const [questionnaireData, setQuestionnaireData] = useState(props.data);

    const savedReplies = localStorage.getItem(`questionnaireReplies-${questionnaireData.setting.id}`);
    const [replyContent, setReplyContent] = useState(
        savedReplies ? JSON.parse(savedReplies) : []
    );

    const previousPage = useRef(null)
    const contextValue = useMemo(() => ({
        replyContent,
        setReplyContent
    }))

    useEffect(() => {
        localStorage.setItem(`questionnaireReplies-${questionnaireData.setting.id}`, JSON.stringify(replyContent));
    }, [replyContent])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage])

    useEffect(() => {
        if (props.data) {
            setQuestionnaireData(props.data);
            const savedReplies = localStorage.getItem(`questionnaireReplies-${questionnaireData.setting.id}`);
            console.log(JSON.parse(savedReplies))
            if (savedReplies) {
                setReplyContent(JSON.parse(savedReplies));
            }
        }
    }, [props.data]);

    const getRangeList = () => {
        let count = 1;
        let first = false
        return questionnaireData.questionnaire.map((element, i) => {
            if (element.type === "block" && i !== 0) {
                if (!first) {
                    first = true
                } else {
                    count++;
                }
            }
            const currentCount = count;
            return currentCount;
        });
    };

    const goToNextPage = () => {
        const totalBlocks = questionnaireData.questionnaire.filter(q => q.type === 'block').length;
        if (currentPage < totalBlocks) {
            setIsLoading(true);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            setSearchParams({ p: nextPage.toString() });
            setTimeout(() => setIsLoading(false), 400);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setIsLoading(true);
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            setSearchParams({ p: prevPage.toString() });
            setTimeout(() => setIsLoading(false), 400);
        }
    };

    const renderQuestion = (question, index) => {
        if (rangeList[index] != currentPage) {
            if (question.type === "block" && rangeList[index] - 1 === currentPage && previousPage.current) {
                return <MB.NextPage goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage} {...previousPage.current} key={previousPage.current.id + "-next"} id={previousPage.current.id + "-next"}></MB.NextPage>
            }
            return null
        }

        const q = () => {
            switch (question.type) {
                case 'SAQ':
                    return <QB.SAQ {...question.params} key={question.id} id={question.id} />;
                case 'DAQ':
                    return <QB.DAQ {...question.params} key={question.id} id={question.id} />;
                case 'SCQ':
                    return <QB.SCQ {...question.params} key={question.id} id={question.id} />;
                case 'MCQ':
                    return <QB.MCQ {...question.params} key={question.id} id={question.id} />;
                case 'LSQ':
                    return <QB.LSQ {...question.params} key={question.id} id={question.id} />;
                case 'UDQ':
                    return <QB.UDQ {...question.params} key={question.id} id={question.id} />;
                case 'block':
                    previousPage.current = { ...question.params }
                    return (
                        <MB.Block {...question.params} key={question.id} id={question.id} />
                    );
                case 'submit':
                    return (
                        <MB.Submit {...question.params} key={question.id} id={question.id}></MB.Submit>
                    );
                case 'description':
                    return (
                        <MB.Description {...question.params} key={question.id} id={question.id}></MB.Description>
                    );
                default:
                    return null;
            }
        }
        if (index === questionnaireData.questionnaire.length - 1 && previousPage.current) {
            return (
                <>
                    {q()}
                    <MB.NextPage goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage} {...previousPage.current} key={previousPage.current.id + "-next"} id={previousPage.current.id + "-next"}></MB.NextPage>
                </>
            )
        }else{
            return q()
        }

    };

    previousPage.current = null
    const rangeList = getRangeList()
    console.log(rangeList)
    return (
        <ReplyContext.Provider value={contextValue}>
            {isLoading && <Loading />}
            <div className='Demo flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title {...questionnaireData.setting} page={currentPage}></MB.Title>
                {questionnaireData.questionnaire.map((question, index) => (
                    <React.Fragment key={index}>
                        {renderQuestion(question, index)}
                    </React.Fragment>
                ))}
            </div>
        </ReplyContext.Provider>
    );
}
const Loading = () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-85 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-white">這可能需要幾秒鐘，請不要關閉頁面。</p>
    </div>
);
export default QuestionnaireRendering;