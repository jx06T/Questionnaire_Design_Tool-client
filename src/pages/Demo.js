import React, { useEffect, useState } from 'react';
import QuestionnaireRendering from '../components/QuestionnaireRendering'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { getDemoQuestionnaireById } from '../services/MGDB';


function Demo(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const { name } = useParams();
    const [questionnaireData, setQuestionnaireData] = useState(null);

    const loadQuestionnaire = async () => {
        try {
            if (searchParams.get('l') === "local") {
                const data = await import(`./questionnaireJson/${name}.json`);
                setQuestionnaireData(data);
            } else {
                const getResult = await getDemoQuestionnaireById(name);
                if (!getResult.success) {
                    throw new Error(getResult.error);
                }
                setQuestionnaireData(getResult.data ? getResult.data : "Failed")
            }
        } catch (error) {
            console.warn(`Failed to load ${name}.json, falling back to test.json`);
            navigate('/demo')
        }
    };

    useEffect(() => {
        loadQuestionnaire();
    }, [name]);

    if (!questionnaireData) return <Loading />;

    return (
        <QuestionnaireRendering source="Demo" isDemo={true} data={questionnaireData} />
    );
}

export default Demo;