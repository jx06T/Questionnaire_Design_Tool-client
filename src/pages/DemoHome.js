import React, { useEffect, useState, startTransition, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MB from '../components/MethodBank';
import { listAllDemoQuestionnaires } from '../services/MGDB';


function DemoHome(props) {
    const navigate = useNavigate();
    const localDemos = [
        {
            title: "【新北市立文山國民中學112學年度畢業學生升學就業動向調查】仿造版",
            subtitle: "輔導處113.06.07",
            id: "53v3xmra7zb9xw3j254mto",
            location: "local",
            source: "further-education",
            author: "jx06_t"
        },
        {
            title: "問題範例與選項",
            subtitle: "document",
            id: "cp7xbs5jn1dqcp7xbs5jn1dq",
            location: "local",
            source: "sample",
            author: "jx06_t"
        }
    ]

    const [allQestionnaires, setAllQestionnaires] = useState(localDemos)

    const loadDemoQuestionnaires = async () => {
        try {
            const getResult = await listAllDemoQuestionnaires();
            if (!getResult.success) {
                throw new Error(getResult.error);
            }
            setAllQestionnaires([...localDemos, ...getResult.data])
        } catch (error) {
            console.warn(`Failed to load json, falling back to test.json`);
        }
    };

    const handleClick = useCallback((e) => {
        startTransition(() => {
            navigate(`/demo/${e.source}?l=${e.location}`);
        });
    }, [navigate]);

    useEffect(() => {
        loadDemoQuestionnaires()
    })

    return (
        <div className='Demo flex bg-slate-50 flex-col items-center justify-center'>
            <MB.Title subtitle="點擊下面問卷以查看" title="問卷範本"></MB.Title>
            {allQestionnaires.map((e) => (
                <div key={e.id} onClick={() => handleClick(e)} className="w-[20rem] sm:w-[30rem] md:w-[40rem] my-6 mx-0 rounded-md p-4 px-6 bg-slate-200 hover:bg-slate-300 cursor-pointer">
                    <p className='text-2xl ml-1 cursor-pointer text-center'>{e.title}</p>
                    <p className='text-lg ml-1 mt-2 cursor-pointer text-center'>{e.subtitle}</p>
                    <p className='text-sm cursor-pointer -mb-1 -mr-1 text-right'>by<span className='text-base ml-2 underline'>{e.author || "Anonymous"}</span></p>
                </div>
            ))}
        </div>
    );
}

export default DemoHome;