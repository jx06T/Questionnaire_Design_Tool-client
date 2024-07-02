import React, { useEffect, useState } from 'react';
import QB from '../components/QuestionBank'
import MB from '../components/MethodBank'

function Demo() {
    const [questionnaireData, setQuestionnaireData] = useState(null);

    useEffect(() => {
        // 在實際應用中，你可能會從API或文件中獲取這個JSON
        // 這裡我們假設直接導入
        import('./demo.json')
            .then(data => setQuestionnaireData(data))
            .catch(error => console.error('Error loading questionnaire:', error));
    }, []);

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
            case 'BLOCK':
                return (
                    <MB.Block>
                        <MB.Title>{question.params.title}</MB.Title>
                        <MB.Illustrate>{question.params.description}</MB.Illustrate>
                        {question.params.subQuestions.map((subQ, index) => (
                            <React.Fragment key={index}>
                                {renderQuestion(subQ)}
                            </React.Fragment>
                        ))}
                    </MB.Block>
                );
            default:
                return null;
        }
    };

    if (!questionnaireData) return <div>Loading...</div>;

    return (
        <div className='Demo flex bg-slate-50 flex-col items-center justify-center'>
            {questionnaireData.questionnaire.map((question, index) => (
                <React.Fragment key={index}>
                    {renderQuestion(question)}
                </React.Fragment>
            ))}
            <MB.Submit>{questionnaireData.setting.submitButtonText}</MB.Submit>
        </div>
    );
}

export default Demo;