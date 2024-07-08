import React, { useEffect, useState } from 'react';
import QB from '../components/QuestionBank'
import MB from '../components/MethodBank'

function Demo(props) {
    const questionnaireData0 = localStorage.getItem('questionnaireData')
    const questionnaireData = questionnaireData0 ? JSON.parse(questionnaireData0) : {
        setting: {
            theme: "默認主題",
            language: "中文",
            title: "",
            subtitle: ""
        },
        questionnaire: []
    }
    console.log(questionnaireData)
    const renderQuestion = (question) => {
        switch (question.type) {
            case 'SAQ':
                return <QB.SAQ {...question.params} />;
            case 'DAQ':
                return <QB.DAQ {...question.params} />;
            case 'SCQ':
                return <QB.SCQ {...question.params} />;
            case 'MCQ':
                return <QB.MCQ {...question.params} />;
            case 'LSQ':
                return <QB.LSQ {...question.params} />;
            case 'UDQ':
                return <QB.UDQ {...question.params} />;
            case 'block':
                return (
                    <MB.Block {...question.params}>
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
                    <MB.Submit {...question.params}></MB.Submit>
                );
            case 'Description':
                return (
                    <MB.Description {...question.params}></MB.Description>
                );
            default:
                return null;
        }
    };

    if (!questionnaireData) return <div>Loading...</div>;

    return (
        <div className='Demo flex bg-slate-50 flex-col items-center justify-center'>
            <MB.Title {...questionnaireData.setting}></MB.Title>
            {questionnaireData.questionnaire.map((question, index) => (
                <React.Fragment key={index}>
                    {renderQuestion(question)}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Demo;