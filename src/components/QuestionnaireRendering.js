import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import QB from './QuestionBank'
import MB from './MethodBank'

export const ReplyContext = React.createContext(null);

function QuestionnaireRendering(props) {
    const { page } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
    console.log(page, navigate, currentPage)

    const [questionnaireData, setQuestionnaireData] = useState(props.data);
    const [replyContent, setReplyContent] = useState([]);
    const previousPage = useRef(null)

    const contextValue = useMemo(() => ({
        replyContent,
        setReplyContent
    }))

    useEffect(() => {
        console.log(replyContent)
    }, [replyContent])


    useEffect(() => {
        if (props.data) {
            setQuestionnaireData(props.data);
        }
    }, [props.data]);

    const renderQuestion = (question,index) => {
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
                if (previousPage.current) {
                    return (
                        <>
                            <MB.NextPage {...previousPage.current} key={previousPage.current.id + "-next"} id={previousPage.current.id + "-next"}></MB.NextPage>
                            <MB.Block {...question.params} key={question.id} id={question.id} />
                        </>
                    );
                }
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
    };

    previousPage.current = null
    return (
        <ReplyContext.Provider value={contextValue}>
            <div className='Demo flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title {...questionnaireData.setting}></MB.Title>
                {questionnaireData.questionnaire.map((question, index) => (
                    <React.Fragment key={index}>
                        {renderQuestion(question,index)}
                    </React.Fragment>
                ))}
            </div>
        </ReplyContext.Provider>
    );
}

export default QuestionnaireRendering;