import React, { useEffect, useState } from 'react';
import QuestionnaireRendering from '../components/QuestionnaireRendering'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

function Demo(props) {
    const { name } = useParams();
    const [currentPage, setCurrentPage] = useState(name);
    const [questionnaireData, setQuestionnaireData] = useState(null);

    useEffect(() => {
        const loadQuestionnaire = async () => {
            try {
                const data = await import(`./${name}.json`);
                setQuestionnaireData(data);
            } catch (error) {
                console.warn(`Failed to load ${name}.json, falling back to test.json`);
                try {
                    const data = await import('./test.json');
                    setQuestionnaireData(data);
                } catch (fallbackError) {
                    console.error('Error loading questionnaire:', fallbackError);
                }
            }
        };

        loadQuestionnaire();
    }, []);

    if (!questionnaireData) return <Loading/>;

    return (
        <QuestionnaireRendering data={questionnaireData} />
    );
}

export default Demo;