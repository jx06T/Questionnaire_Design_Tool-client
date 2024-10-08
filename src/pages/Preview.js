import React, { useEffect, useState } from 'react';
import QuestionnaireRendering from '../components/QuestionnaireRendering'
import Loading from '../components/Loading';

function Preview() {
    const questionnaireData0 = localStorage.getItem('questionnaireData')
    const [questionnaireData, setQuestionnaireData] = useState(questionnaireData0 ? JSON.parse(questionnaireData0) : {
        setting: {
            theme: "默認主題",
            language: "中文",
            title: "",
            subtitle: ""
        },
        questionnaire: []
    });

    useEffect(() => {
        const updateQuestionnaireData = () => {
            const storedData = localStorage.getItem('questionnaireData');
            if (storedData) {
                setQuestionnaireData(JSON.parse(storedData));
            }
        };

        window.addEventListener('storage', updateQuestionnaireData);

        return () => {
            window.removeEventListener('storage', updateQuestionnaireData);
        };
    }, []);

    if (!questionnaireData) return <Loading />;

    return (
        <QuestionnaireRendering source="Preview" data={questionnaireData} />
    );
}

export default Preview;

