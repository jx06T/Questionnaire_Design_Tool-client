import React, { useEffect, useRef, useState } from 'react';
import DB from '../components/DesignBank'
import HeaderTool from '../components/HeaderTool'


const Aquestion = {
    type: "SAQ",
    params: {
        question: undefined,
        description: undefined,
        required: false,
        placeholder: undefined,
        originalData: undefined,
    }
}

const Ablock = {
    type: "block",
    params: {
        title: "個人興趣調查區塊",
        description: "以下問題旨在了解您的個人興趣",
    },
}

function scrollToCenter(element, y) {
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    // const middle = absoluteElementTop - (window.innerHeight / 2) - y + 250 + 310;
    const middle = absoluteElementTop - (window.innerHeight / 2) - y + 660;
    window.scrollTo({
        top: middle,
        behavior: 'smooth'
    });
}

function Design() {
    const questionDivRef = useRef(null)

    const questionnaireData0 = localStorage.getItem('questionnaireData')
    const questionnaireData1 = questionnaireData0 ? JSON.parse(questionnaireData0) : {
        setting: {
            theme: "默認主題",
            language: "中文",
            title: "",
            subtitle: ""
        },
        questionnaire: []
    }

    const [questionnaireData, setQuestionnaireData] = useState(questionnaireData1)

    const handleAddQuestion = () => {
        const id = Date.now()
        setQuestionnaireData(prevData => {
            const newQuestionnaire = [...prevData.questionnaire, { ...Aquestion, id: id }];
            return { ...prevData, questionnaire: newQuestionnaire };
        });
    };

    const handleAddBlock = () => {
        const id = Date.now()
        setQuestionnaireData(prevData => {
            const newQuestionnaire = [...prevData.questionnaire, { ...Ablock, idT: id }];
            return { ...prevData, questionnaire: newQuestionnaire };
        });
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey && event.shiftKey && event.key === 'A') {
                event.preventDefault();
                handleAddQuestion()
            }
            // console.log(event)
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // ---------------------------------------------------------------------------------

    useEffect(() => {
        // console.log("-----------------------", questionnaireData)
        localStorage.setItem('questionnaireData', JSON.stringify(questionnaireData));
    }, [questionnaireData]);

    const handleFileDownload = () => {
        const dataStr = JSON.stringify(questionnaireData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'questionnaire_data.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
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

    // ---------------------------------------------------------------------------------

    const updateTitleData = (title, subtitle) => {
        setQuestionnaireData(prevData => ({
            ...prevData,
            setting: { ...prevData.setting, title, subtitle }
        }));
    }

    // ---------------------------------------------------------------------------------

    const updateQuestionnaireData = (index, data) => {
        setQuestionnaireData(prevData => {
            const newQuestionnaire = [...prevData.questionnaire];
            if (JSON.stringify(newQuestionnaire[index]) !== JSON.stringify(data)) {
                newQuestionnaire[index] = data;
                return { ...prevData, questionnaire: newQuestionnaire };
            }
            return prevData;
        });
    };

    const buttonsFUN = {
        handleDelete: (index) => {
            console.log(index)
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
                console.log(index)
                newQuestionnaire.splice(index, 1);
                return { ...prevData, questionnaire: newQuestionnaire };
            });
        },
        handleUp: (index) => {
            if (index > 0) {
                setQuestionnaireData(prevData => {
                    const newQuestionnaire = [...prevData.questionnaire];
                    [newQuestionnaire[index - 1], newQuestionnaire[index]] = [newQuestionnaire[index], newQuestionnaire[index - 1]];
                    return { ...prevData, questionnaire: newQuestionnaire };
                });
            }
        },
        handleDown: (index, event) => {
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
                if (index < newQuestionnaire.length - 1) {
                    [newQuestionnaire[index], newQuestionnaire[index + 1]] = [newQuestionnaire[index + 1], newQuestionnaire[index]];

                    setTimeout(() => {
                        // console.log(questionDivRef.current.getElementsByClassName('a-question')[index + 1])
                        scrollToCenter(questionDivRef.current.getElementsByClassName('a-question')[index + 1], event.clientY)
                    }, 1);
                }
                return { ...prevData, questionnaire: newQuestionnaire };
            });
        },
        handleRequired: (index, r) => {
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
                newQuestionnaire[index].params.required = r
                return { ...prevData, questionnaire: newQuestionnaire };
            });
        },
        handleDuplicate: (index, event) => {
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
                newQuestionnaire.splice(index, 0, { ...newQuestionnaire[index], id: Date.now() })
                setTimeout(() => {
                    scrollToCenter(questionDivRef.current.getElementsByClassName('a-question')[index],100)
                }, 1);
                return { ...prevData, questionnaire: newQuestionnaire };
            });
        }
    }
    return (
        <>
            <HeaderTool handleFileDownload={handleFileDownload} handleFileImport={handleFileImport} />
            <div ref={questionDivRef} className='Design flex bg-slate-50 flex-col items-center justify-center'>
                <DB.TitleEdit defaultSubtitle={questionnaireData.setting.subtitle} defaultTitle={questionnaireData.setting.title} onUpdate={updateTitleData} />

                {questionnaireData.questionnaire.map((element, index) => (
                    element.type !== 'block'
                        ? <DB.Question type={element.type} key={element.id} id={element.id} buttonsFUN={{ ...buttonsFUN, id: index, defaultValue: element.params.required }} onUpdateB={(data) => updateQuestionnaireData(index, data)} {...element.params} />
                        : <DB.BlockEdit key={element.id} onUpdate={(data) => updateQuestionnaireData(index, data)} />
                ))}

                <DB.AddBlock onAddQuestion={handleAddQuestion} onAddBlock={handleAddBlock}></DB.AddBlock>
            </div>
            <br />
        </>
    );
}

export default Design;