import React, { useEffect, useState } from 'react';
import QuestionnaireRendering from '../components/QuestionnaireRendering'
import { useParams } from 'react-router-dom';
import { saveQuestionnaire, getQuestionnaireById, listAllQuestionnaires } from '../services/MGDB';
import Loading from '../components/Loading';
import EveryPiece from '../components/EveryPiece';

function Public(props) {
    const { id } = useParams();
    const [questionnaireData, setQuestionnaireData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    async function fetchData() {
        setIsLoading(true)
        try {
            const getResult = await getQuestionnaireById(id);
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

            console.log(getResult)

            if (!getResult.success) {
                throw new Error(getResult.error);
            } else {
                if (getResult.data) {
                    setQuestionnaireData(getResult.data)
                    setIsLoading(false)
                } else {
                    setIsError(true)
                }
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            setIsError(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (isError) return (
        <div className='editJ flex bg-slate-50 flex-col items-center justify-center'>
            <EveryPiece className="h-36 text-lg">
                    這份問卷可能已經被刪除，請聯絡問卷連結的提供者。
            </EveryPiece>
        </div>
    );
    if (!questionnaireData) return <Loading />;

    return (
        <>
            {isLoading && <Loading />}
            <QuestionnaireRendering data={questionnaireData} />
        </>
    );
}

export default Public;

