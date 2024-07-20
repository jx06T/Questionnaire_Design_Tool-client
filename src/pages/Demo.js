import React, { useEffect, useState } from 'react';
import QuestionnaireRendering from '../components/QuestionnaireRendering'

function Demo(props) {
    const [questionnaireData, setQuestionnaireData] = useState(null);

    useEffect(() => {
        import('./demo3.json')
            .then(data => setQuestionnaireData(data))
            .catch(error => console.error('Error loading questionnaire:', error));
    }, []);
    
    if (!questionnaireData) return <div>Loading...</div>;

    return (
        <QuestionnaireRendering data = {questionnaireData}/>
    );
}

export default Demo;