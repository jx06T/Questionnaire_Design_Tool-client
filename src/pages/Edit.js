import React, { useEffect, useRef, useState } from 'react';
import DB from '../components/DesignBank'
import HeaderTool from '../components/HeaderTool'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { saveQuestionnaire, getQuestionnaireByToken } from '../services/MGDB';
import InfoBlock from '../components/InfoBlock';
import CopyableText from '../components/CopyableText';
import Loading from '../components/Loading';

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
        question: "區塊說明",
        description: undefined,
        questionN: "前往下一個區塊",
        descriptionN: undefined,
        originalData: "[b]返回\n[n]繼續",
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
            const getResult = await getQuestionnaireByToken(id,searchParams.get('t'));
            // const getResult = id == "seca4xhmeo9s" ? {
            //     success: true,
            //     data: {
            //         setting: {
            //             theme: '默認主題',
            //             language: '中文',
            //             title: '55',
            //             subtitle: '',
            //             id: "seca4xhmeo9s",
            //             token: "seca4xhmeo9sseca4xhmeo9s",
            //         },
            //         questionnaire: []
            //     }
            // } : {
            //     success: true,
            //     data: null
            // };

            // console.log(getResult)
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
                    setQuestionnaireData(p => {
                        const newSetting = { ...jsonData.setting, id: p.setting.id, token: p.setting.token }
                        const newData = { ...jsonData, setting: newSetting }
                        // console.log(newData)
                        return newData
                    });
                    // setQuestionnaireData(jsonData);

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

    const handleRelease = async () => {
        setIsLoading(true)
        try {
            const getResult = await saveQuestionnaire(questionnaireData);
            // const getResult = { success: true };
            if (!getResult.success) {
                throw new Error(getResult.error);
            } else {
                console.log("發布成功")
            }
        } catch (err) {
            console.error("發布失敗", err)
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 200);
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
            // console.log(index,questionnaireData)
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
                newQuestionnaire[index].params.required = r
                return { ...prevData, questionnaire: newQuestionnaire };
            });
        },

        handleDuplicate: (index, event) => {
            setQuestionnaireData(prevData => {
                const newQuestionnaire = [...prevData.questionnaire];
                newQuestionnaire.splice(index + 1, 0, { ...newQuestionnaire[index], params: { ...newQuestionnaire[index].params }, id: Date.now() })
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
            event.preventDefault()
            event.returnValue = "";
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    if (!questionnaireData) {
        return (<Loading />)
    }

    const changeSetting = (k, v) => {
        setQuestionnaireData(prevData => {
            const newSetting = { ...prevData.setting, [k]: v };
            return { ...prevData, setting: newSetting };
        });
    }

    const myUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://questionnaire-design-tool-client.vercel.app"
    return (
        <>
            {showInfo && <InfoBlock close={handleInfo} title='Info'>
                <div className="flex flex-col">
                    <CopyableText label="Id" text={questionnaireData.setting.id} />
                    <CopyableText label="Edit link" text={`${myUrl}/edit/${questionnaireData.setting.id}?t=${questionnaireData.setting.token}`} />
                    <CopyableText label="Public link" text={`${myUrl}/public/${questionnaireData.setting.id}`} />
                </div>
            </InfoBlock>}
            {showSetting && <InfoBlock close={handleSettings} title='setting'>
                <div className="flex flex-col">
                    <span className=''>Reply URL：</span>
                    <input onInput={(e) => changeSetting("replyURL", e.target.value)} defaultValue={questionnaireData.setting.replyURL} className='w-full bg-transparent outline-none'></input>
                    <hr className='mb-1 w-full bg-slate-300 h-[1.8px]' />
                    <span className=''>author：</span>
                    <input onInput={(e) => changeSetting("author", e.target.value)} defaultValue={questionnaireData.setting.author} className='w-full bg-transparent outline-none'></input>
                    <hr className='mb-1 w-full bg-slate-300 h-[1.8px]' />
                    <span className=''>make the copy as a demo?</span>
                    <span className='text-xs'>*The copy cannot be submitted</span>
                    <span onClick={(e) => {
                        e.target.textContent = e.target.textContent === "false" ? "true" : "false"
                        changeSetting("demo", e.target.textContent)
                    }} className='w-full bg-transparent outline-none cursor-pointer'>{questionnaireData.setting.demo + ""}</span>
                    <hr className='mb-1 w-full bg-slate-300 h-[1.8px]' />
                </div>
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

