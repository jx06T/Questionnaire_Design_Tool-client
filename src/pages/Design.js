import React, { useEffect, useState } from 'react';
import DB from '../components/DesignBank'
// import Demo from '../pages/Demo'


function Design() {
    const [elements, setElements] = useState([]);

    const handleAddQuestion = () => {
        setElements(prevElements => [...prevElements, { type: 'question', id: Date.now() }]);
    };

    const handleAddBlock = () => {
        setElements(prevElements => [...prevElements, { type: 'block', id: Date.now() }]);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey && event.shiftKey && event.key === 'A') {
                event.preventDefault();
                handleAddQuestion()
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [questionnaireData, setQuestionnaireData] = useState({
        setting: {
            theme: "默認主題",
            language: "中文",
            title: "",
            subtitle: ""
        },
        questionnaire: []
    })
    
    useEffect(() => {
        localStorage.setItem('questionnaireData', JSON.stringify(questionnaireData));
    }, [questionnaireData]);
    
    const updateQuestionnaireData = (index, data) => {
        setQuestionnaireData(prevData => {
            const newQuestionnaire = [...prevData.questionnaire];
            newQuestionnaire[index] = data;
            return { ...prevData, questionnaire: newQuestionnaire };
        });
    };

    const updateTitleData = (title, subtitle) => {
        setQuestionnaireData(prevData => ({
            ...prevData,
            setting: { ...prevData.setting, title, subtitle }
        }));
    }
    return (
        <>
            <div className='Design flex bg-slate-50 flex-col items-center justify-center'>
                <DB.TitleEdit onUpdate={updateTitleData} />
                {elements.map((element, index) => (
                    element.type === 'question'
                        ? <DB.Question key={element.id} onUpdate={(data) => updateQuestionnaireData(index, data)} />
                        : <DB.BlockEdit key={element.id} onUpdate={(data) => updateQuestionnaireData(index, data)} />
                ))}
                <DB.AddBlock onAddQuestion={handleAddQuestion} onAddBlock={handleAddBlock} title="設計問卷?"></DB.AddBlock>
            </div>
            <br />
            {/* <Demo questionnaireDataL={questionnaireData} /> */}
        </>
    );
}

export default Design;