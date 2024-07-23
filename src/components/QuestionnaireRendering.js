import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { changeArray } from '../utils/changeArray';

import QB from './QuestionBank'
import MB from './MethodBank'
import EveryPiece from './EveryPiece';
import Loading from './Loading';

export const ReplyContext = React.createContext(null);


function getCurrentFormattedTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function scrollToCenter(element, y) {
    // console.log(element)
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    // const middle = absoluteElementTop - (window.innerHeight / 2) - y + 250 + 310;
    const middle = absoluteElementTop - (window.innerHeight / 2) - y + 660;
    window.scrollTo({
        top: middle,
        behavior: 'smooth'
    });
}

function QuestionnaireRendering(props) {
    const editRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('p')) || 1);

    const [questionnaireData, setQuestionnaireData] = useState(props.data);

    const savedReplies = localStorage.getItem(`questionnaireReplies-${questionnaireData.setting.id}`);
    const [replyContent, setReplyContent] = useState(
        savedReplies ? JSON.parse(savedReplies) : []
    );


    const savedQuestionnaires = localStorage.getItem(`savedQuestionnaires`);
    const [questionnairesList, setQuestionnairesList] = useState(
        savedQuestionnaires ? JSON.parse(savedQuestionnaires) : []
    );

    const questionnairesListME = questionnairesList.filter(e => e.id == props.data.setting.id)
    let isDone0 = "undone"
    if (questionnairesListME.length > 0) {
        isDone0 = questionnairesListME[0].state === "done"
    } else {
        setQuestionnairesList((p) => changeArray(p, { id: props.data.setting.id, state: "undone", time: Date.now() }))
    }

    const [state, setState] = useState(isDone0);

    const previousPage = useRef(null)
    const finishPage = useRef(null)

    const contextValue = useMemo(() => ({
        replyContent,
        setReplyContent
    }))

    useEffect(() => {
        localStorage.setItem(`questionnaireReplies-${questionnaireData.setting.id}`, JSON.stringify(replyContent));
        console.log(replyContent)
    }, [replyContent])

    useEffect(() => {
        localStorage.setItem(`savedQuestionnaires`, JSON.stringify(questionnairesList));
        // console.log(questionnairesList)
    }, [questionnairesList])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage])

    useEffect(() => {
        if (props.data) {
            setQuestionnaireData(props.data);
            const savedReplies = localStorage.getItem(`questionnaireReplies-${questionnaireData.setting.id}`);
            // console.log(JSON.parse(savedReplies))
            if (savedReplies) {
                setReplyContent(JSON.parse(savedReplies));
            }
        }
        // setQuestionnairesList((p) => changeArray(p, { id: props.data.setting.id, state: "undone", time: Date.now() }))
    }, [props.data]);

    const confirmRequired = () => {
        const unfilledI = []
        const unfilled = questionnaireData.questionnaire.filter((element, i) => {
            if (rangeList[i] === currentPage && element.params.required === true && (replyContent.filter(e => (e.id === element.id && e.answer.toString().trim() !== '')).length === 0)) {
                unfilledI.push(i)
                return true;
            }
            return false;
        });
        console.log(replyContent)
        if (unfilledI.length > 0) {
            const allQ = editRef.current.querySelectorAll(".every-piece")
            for (let i = allQ.length - 1; i > 0; i--) {
                const e = allQ[i]
                if (unfilledI.includes(i + rangeList.lastIndexOf(currentPage - 1))) {
                    scrollToCenter(e, 500)
                    e.classList.add("unfilled")
                } else {
                    e.classList.remove("unfilled")
                }
            }
        }

        return unfilled.length > 0
    }

    const getRangeList = () => {
        let count = 1;
        let first = false
        return questionnaireData.questionnaire.map((element, i) => {
            if (element.type === "block" && i !== 0) {
                if (first) {
                    count++;
                }
            }
            if (element.type === "block") {
                first = true
            }
            const currentCount = count;
            return currentCount;
        });
    };

    const goToNextPage = () => {
        if (confirmRequired()) {
            return
        }
        const totalBlocks = questionnaireData.questionnaire.filter(q => q.type === 'block').length;
        if (currentPage < totalBlocks) {
            setIsLoading(true);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            setSearchParams({ p: nextPage.toString() });
            setTimeout(() => setIsLoading(false), 400);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setIsLoading(true);
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            setSearchParams({ p: prevPage.toString() });
            setTimeout(() => setIsLoading(false), 400);
        }
    };

    const modifyAnswer = () => {
        setCurrentPage(1);
        setSearchParams({ p: "1" });
        setIsLoading(true);
        setState("undone")
        setQuestionnairesList((p) => changeArray(p, { id: props.data.setting.id, state: "undone", time: Date.now() }))

        setTimeout(() => {
            setIsLoading(false);
            window.location.reload();
        }, 300);
    }

    const submit = () => {
        if (confirmRequired()) {
            return
        }
        setIsLoading(true);

        if (props.isDemo) {
            setIsLoading(false);
            setState("demo")
            return
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                answers: replyContent,
                time: getCurrentFormattedTime(),
                id: props.data.setting.id
            }),
            redirect: "follow"
        };

        fetch(props.data.setting.replyURL, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((result) => {
                console.log("提交成功", result);
                setQuestionnairesList((p) => changeArray(p, { id: props.data.setting.id, state: "done", time: Date.now() }))
                setState("done")
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("提交失敗", error)
                setIsLoading(false);
                setState("erroe")
            });
    };

    const renderQuestion = (question, index) => {
        if (rangeList[index] != currentPage) {
            if (question.type === "block" && rangeList[index] - 1 === currentPage && previousPage.current) {
                return <MB.NextPage goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage} {...previousPage.current} key={previousPage.current.id + "-next"} id={previousPage.current.id + "-next"}></MB.NextPage>
            }
            return null
        }


        const q = () => {
            switch (question.type) {
                case 'SAQ':
                    return <QB.SAQ {...question.params} key={question.id} id={question.id} />;
                case 'DAQ':
                    return <QB.DAQ {...question.params} key={question.id} id={question.id} />;
                case 'SCQ':
                    return <QB.SCQ {...question.params} key={question.id} id={question.id} />;
                case 'MCQ':
                    return <QB.MCQ {...question.params} key={question.id} id={question.id} />;
                case 'LSQ':
                    return <QB.LSQ {...question.params} key={question.id} id={question.id} />;
                case 'UDQ':
                    return <QB.UDQ {...question.params} key={question.id} id={question.id} />;
                case 'block':
                    previousPage.current = { ...question.params }
                    return (
                        <MB.Block {...question.params} key={question.id} id={question.id} />
                    );
                case 'submit':
                    return (
                        <MB.Submit {...question.params} key={question.id} id={question.id}></MB.Submit>
                    );
                case 'description':
                    return (
                        <MB.Description {...question.params} key={question.id} id={question.id}></MB.Description>
                    );
                case 'finish':
                    finishPage.current = <MB.Description {...question.params} key={question.id} id={question.id}></MB.Description>
                    return <EveryPiece className=" hidden "></EveryPiece>;
                default:
                    return null;
            }
        }
        if (index === questionnaireData.questionnaire.length - 1) {
            if (!previousPage.current) {
                previousPage.current = {
                    id: Date.now(),
                    questionN: "提交",
                    message1: "",
                    message2: "提交"
                }
            }
            return (
                <>
                    {q()}
                    <MB.NextPage goToPreviousPage={goToPreviousPage} goToNextPage={submit} {...previousPage.current} key={previousPage.current.id + "-next"} id={previousPage.current.id + "-next"}></MB.NextPage>
                </>
            )
        } else {
            return q()
        }

    };

    previousPage.current = null
    const rangeList = getRangeList()
    let temp = null

    // console.log(state, finishPage.current, rangeList)
    if (state === "erroe") {
        temp = <>
            <EveryPiece className="text-right">
                <button onClick={modifyAnswer} className='underline '>提交失敗，點此再試一次</button>
            </EveryPiece>
        </>

    } else if (state === "demo" || state) {
        finishPage.current = questionnaireData.questionnaire.map(((question, i) => (
            question.type === "finish" ? <MB.Description {...question.params} key={question.id} id={question.id}></MB.Description> : null
        )))

        temp = <>
            {finishPage.current && finishPage.current}
            <EveryPiece className="text-right">
                {state === "demo" ? <a href='/demo' className='underline '>展示問卷無法提交，點此返回展示列表</a> :
                    <button onClick={modifyAnswer} className='underline '>已提交，點此修改答案</button>}
            </EveryPiece>
        </>

    } else {
        temp = <>
            {questionnaireData.questionnaire.map((question, index) => (
                <React.Fragment key={index}>
                    {renderQuestion(question, index)}
                </React.Fragment>
            ))}
        </>
    }

    return (
        <ReplyContext.Provider value={contextValue}>
            {isLoading && <Loading />}
            <div ref={editRef} className='edit flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title {...questionnaireData.setting} page={currentPage}></MB.Title>
                {temp}
            </div>
        </ReplyContext.Provider >
    );
}
export default QuestionnaireRendering;