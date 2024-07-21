import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveQuestionnaire, getQuestionnaireById, listAllQuestionnaires } from '../services/kvStore';
import EveryPiece from '../components/EveryPiece';

function getRandId() {
    return "seca4xhmeo9s"
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charsetLength = charset.length;
    const bytes = window.crypto.getRandomValues(new Uint8Array(12));
    return Array.from(bytes).map(byte => charset[byte % charsetLength]).join('');
    // return Math.random().toString(36).substring(2.9) + Math.random().toString(36).substring(2.9)
}


function EditHome() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    async function fetchData() {
        setIsLoading(true)
        try {
            const id = getRandId()
            const token = getRandId() + getRandId()
            const dummyQuestionnaire = {
                "setting": {
                    "theme": "默認主題",
                    "language": "中文",
                    "title": "",
                    "subtitle": "",
                    "id": id,
                    "token": token
                },
                "questionnaire": []
            };

            // const getResult = await saveQuestionnaire(dummyQuestionnaire);
            const getResult = { success: true };
            if (!getResult.success) {
                throw new Error(getResult.error);
            } else {
                setTimeout(() => {
                    setIsLoading(false)
                    navigate(`/edit/${id}?t=${token}`)
                }, 300);
            }

        } catch (err) {
            setTimeout(() => {
                setIsLoading(false)
                navigate('/edit')
            }, 300);
        }
    }

    useEffect(() => {
        if (searchParams.get('n') == "t") {
            fetchData()
        }
    }, [])

    return (
        <>
            {isLoading && <Loading />}
            <div className='editJ flex bg-slate-50 flex-col items-center justify-center'>
                <EveryPiece className="h-36 items-center flex justify-center">
                    <button onClick={fetchData} className='text-lg underline'>
                        Create new questionnaire
                    </button>
                </EveryPiece>
            </div>
        </>
    );
}

export default EditHome;

const Loading = () => (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-85 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-white">這可能需要幾秒鐘，請不要關閉頁面。</p>
    </div>
);