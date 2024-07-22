import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveQuestionnaire } from '../services/MGDB';
import EveryPiece from '../components/EveryPiece';
import Loading from '../components/Loading';
import MB from '../components/MethodBank';

function getRandId() {
    // return "seca4xhmeo9s"
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
            const demoId = getRandId()
            const token = getRandId() + getRandId()
            const dummyQuestionnaire = {
                "setting": {
                    "theme": "默認主題",
                    "language": "中文",
                    "title": "",
                    "subtitle": "",
                    "id": id,
                    "demoId": demoId,
                    "token": token,
                    "replyURL": "https://script.google.com/macros/s/AKfycbxEEzGhUcbu2bTZ-BX2EB3jg8bNa7MZA17O2Ks-JX73kstcF91iT8zgOHgoY60gDfpU/exec",
                    "author": "Anonymous",
                    "demo": false
                },
                "questionnaire": []
            };

            const getResult = await saveQuestionnaire(dummyQuestionnaire);
            // const getResult = { success: true };
            if (!getResult.success) {
                throw new Error(getResult.error);
            } else {
                setTimeout(() => {
                    setIsLoading(false)
                    navigate(`/edit/${id}?t=${token}`)
                }, 200);
            }

        } catch (err) {
            setTimeout(() => {
                setIsLoading(false)
                navigate('/edit')
            }, 200);
        }
    }

    useEffect(() => {
        if (searchParams.get('n') === "t") {
            fetchData()
        }
    }, [])

    return (
        <>
            {isLoading && <Loading />}
            <div className='edit-home flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title subtitle="創建後請記住編輯網址，你需要他來編輯你的問卷" title="創建問卷"></MB.Title>
                <EveryPiece className="h-32 items-center flex justify-center">
                    <button onClick={fetchData} className='text-lg underline'>
                        Create new questionnaire
                    </button>
                </EveryPiece>
            </div>
        </>
    );
}

export default EditHome;
