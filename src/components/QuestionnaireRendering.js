import React, { useEffect, useState } from 'react';
import QB from './QuestionBank'
import MB from './MethodBank'

export const ReplyContext = React.createContext(null);

function QuestionnaireRendering(props) {
    const [questionnaireData, setQuestionnaireData] = useState(props.data);
    const [replyContent, setReplyContent] = useState([]);
    const contextValue = {
        replyContent,
        setReplyContent
    }
    useEffect(() => {
        console.log(replyContent)
    }, [replyContent])


    useEffect(() => {
        if (props.data) {
            setQuestionnaireData(props.data);
        }
    }, [props.data]);

    const renderQuestion = (question) => {
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
                return (
                    <MB.Block {...question.params} key={question.id} id={question.id}>
                        {/* <MB.Illustrate>{question.params.description}</MB.Illustrate> */}
                        {question.subQuestions.map((subQ, index) => (
                            <React.Fragment key={index}>
                                {renderQuestion(subQ)}
                            </React.Fragment>
                        ))}
                    </MB.Block>
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

    return (
        <ReplyContext.Provider value={contextValue}>
            <div className='Demo flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title {...questionnaireData.setting}></MB.Title>
                {questionnaireData.questionnaire.map((question, index) => (
                    <React.Fragment key={index}>
                        {renderQuestion(question)}
                    </React.Fragment>
                ))}
            </div>
        </ReplyContext.Provider>
    );
}

export default QuestionnaireRendering;