import React, { useEffect, useState } from 'react';
import DB from '../components/DesignBank'
import HeaderTool from '../components/HeaderTool'


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

    const handleDownload = () => {
        const dataStr = JSON.stringify(questionnaireData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'questionnaire_data.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleDelete = (index) => {
        setQuestionnaireData(prevData => {
            const newQuestionnaire = [...prevData.questionnaire];
            newQuestionnaire.splice(index, 1);
            return { ...prevData, questionnaire: newQuestionnaire };
        });

        setElements(prevElements => {
            const newElements = [...prevElements];
            newElements.splice(index, 1);
            return newElements;
        });
    }

    const handleUp = (index) => {
        if (index > 0) {
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
                [newQuestionnaire[index - 1], newQuestionnaire[index]] = [newQuestionnaire[index], newQuestionnaire[index - 1]];
                return { ...prevData, questionnaire: newQuestionnaire };
            });

            setElements(prevElements => {
                const newElements = [...prevElements];
                [newElements[index - 1], newElements[index]] = [newElements[index], newElements[index - 1]];
                return newElements;
            });
        }
    };

    const handleDown = (index) => {
        setQuestionnaireData(prevData => {
            const newQuestionnaire = [...prevData.questionnaire];
            if (index < newQuestionnaire.length - 1) {
                [newQuestionnaire[index], newQuestionnaire[index + 1]] = [newQuestionnaire[index + 1], newQuestionnaire[index]];
            }
            return { ...prevData, questionnaire: newQuestionnaire };
        });

        setElements(prevElements => {
            const newElements = [...prevElements];
            if (index < newElements.length - 1) {
                [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
            }
            return newElements;
        });
    };

    const handlerequired = (index, r) => {
        setQuestionnaireData(prevData => {
            const newQuestionnaire = [...prevData.questionnaire];
            newQuestionnaire[index].params.required = r
            return { ...prevData, questionnaire: newQuestionnaire };
        });
    };

    const handleFileImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    setQuestionnaireData(jsonData);
                    
                    console.log('File imported successfully');
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                }
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <HeaderTool download={handleDownload} handleFileImport={handleFileImport} />
            <div className='Design flex bg-slate-50 flex-col items-center justify-center'>
                <DB.TitleEdit onUpdate={updateTitleData} />
                {elements.map((element, index) => (
                    element.type === 'question'
                        ? <DB.Question key={element.id} buttonsFUN={{ handlerequired: handlerequired, handleUp: handleUp, handleDown: handleDown, handleDelete: handleDelete, id: index }} onUpdate={(data) => updateQuestionnaireData(index, data)} />
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