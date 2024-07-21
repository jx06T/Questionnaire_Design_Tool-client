import React, { useEffect, useRef, useState } from 'react';
import DB from '../components/DesignBank'
import HeaderTool from '../components/HeaderTool'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { saveQuestionnaire, getQuestionnaireById, listAllQuestionnaires } from '../services/kvStore';
import InfoBlock from '../components/InfoBlock';
import CopyableText from '../components/CopyableText';

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
        question: undefined,
        description: undefined,
        questionN: undefined,
        descriptionN: undefined,
    },
}

function getRandId() {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charsetLength = charset.length;
    const bytes = window.crypto.getRandomValues(new Uint8Array(12));
    return Array.from(bytes).map(byte => charset[byte % charsetLength]).join('');
    // return Math.random().toString(36).substring(2.9) + Math.random().toString(36).substring(2.9)
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

function Edit() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [questionnaireData, setQuestionnaireData] = useState(null)
    const questionDivRef = useRef(null)

    const [searchParams, setSearchParams] = useSearchParams();

    const [showSetting, setShowSetting] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    async function fetchData() {
        try {
            // const getResult = await getQuestionnaireById(id);
            const getResult = id == "seca4xhmeo9s" ? {
                success: true,
                data: {
                    setting: {
                        theme: '默認主題',
                        language: '中文',
                        title: '55',
                        subtitle: '',
                        id: "seca4xhmeo9s",
                        token: "seca4xhmeo9sseca4xhmeo9s",
                    },
                    questionnaire: []
                }
            } : {
                success: true,
                data: null
            };

            console.log(getResult)
            if (!getResult.success) {
                throw new Error(getResult.error);
            }
            if (getResult.data) {
                if (getResult.data.setting.token === searchParams.get('t')) {
                    setIsLoading(false)
                    setQuestionnaireData(getResult.data)
                } else {
                    navigate(`/public/${getResult.data.setting.id}`)
                }
            } else {
                navigate('/edit')
            }

        } catch (err) {
            navigate('/edit')
        }
    }
    // ----------------------------------------------------------

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
            const newQuestionnaire = [...prevData.questionnaire, { ...Ablock, id: id }];
            return { ...prevData, questionnaire: newQuestionnaire };
        });
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

    // ---------------------------------------------------------------------------------

    useEffect(() => {
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

    const handleNew = () => {
        setIsLoading(true)
        setTimeout(() => {
            navigate('/edit?n=t')
        }, 100);
    }

    const handleRelease = () => {
        try {
            // const getResult = await saveQuestionnaire(questionnaireData);
            const getResult = { success: true };
            if (!getResult.success) {
                throw new Error(getResult.error);
            } else {
                console.log("發布")
            }
        } catch (err) {
            console.log("發布失敗", err)
        }
    }

    const handleInfo = () => {
        setShowInfo(p => !p)
        setShowSetting(p => false)
    }

    const handleSettings = () => {
        setShowInfo(p => false)
        setShowSetting(p => !p)
    }

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
            // console.log(index)
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
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
                    scrollToCenter(questionDivRef.current.getElementsByClassName('a-question')[index], 100)
                }, 1);
                return { ...prevData, questionnaire: newQuestionnaire };
            });
        }
    }

    useEffect(() => {
        if (!questionnaireData) {
            fetchData();
        }
        const handleBeforeUnload = (event) => {
            handleRelease()
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    console.log(process.env)
    
    if (!questionnaireData) {
        return (<Loading />)
    }
    
    return (
        <>
            {showInfo && <InfoBlock close={handleInfo} title='Info'>
                <duv className="grid grid-cols-custom jx-1">
                    <span className='my-1 w-24 border-b border-b-slate-100 '>Id</span>
                    <span className='my-1 mr-1 w-4 '>：</span>
                    <CopyableText text={questionnaireData.setting.id} />
                    <span className='my-1 w-24 border-b border-b-slate-100 '>Edit link</span>
                    <span className='my-1 mr-1 w-4 '>：</span>
                    <CopyableText text={`${questionnaireData.setting.id}`} />
                    <span className='my-1 w-24 border-b border-b-slate-100 '>Public link</span>
                    <span className='my-1 mr-1 w-4 '>：</span>
                    <CopyableText text={questionnaireData.setting.id} />
                </duv>
            </InfoBlock>}
            {showSetting && <InfoBlock close={handleSettings} title='setting'>
            </InfoBlock>}

            {isLoading && <Loading />}
            <HeaderTool handleInfo={handleInfo} handleSettings={handleSettings} handleRelease={handleRelease} handleNew={handleNew} handleFileDownload={handleFileDownload} handleFileImport={handleFileImport} />
            <div ref={questionDivRef} className='Design flex bg-slate-50 flex-col items-center justify-center'>
                <DB.TitleEdit createNewQuestionnaire={handleNew} defaultSubtitle={questionnaireData.setting.subtitle} defaultTitle={questionnaireData.setting.title} onUpdate={updateTitleData} />

                {questionnaireData.questionnaire.map((element, index) => (
                    element.type !== "block"
                        ? <DB.Question type={element.type} key={element.id} id={element.id} buttonsFUN={{ ...buttonsFUN, id: index, defaultValue: element.params.required }} onUpdateB={(data) => updateQuestionnaireData(index, data)} {...element.params} />
                        : <DB.BlockEdit key={element.id} id={element.id} buttonsFUN={{ ...buttonsFUN, id: index, defaultValue: element.params.required }} onUpdateB={(data) => updateQuestionnaireData(index, data)} {...element.params} isFirst={index === 0} />
                ))}
                <DB.AddBlock onAddQuestion={handleAddQuestion} onAddBlock={handleAddBlock}></DB.AddBlock>
            </div>
            <br />
        </>
    );
}

export default Edit;

const Loading = () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-85 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-white">這可能需要幾秒鐘，請不要關閉頁面。</p>
    </div>
);