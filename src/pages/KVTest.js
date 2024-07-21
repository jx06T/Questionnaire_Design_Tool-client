import React, { useState, useEffect } from 'react';
import { saveQuestionnaire, getQuestionnaireById, listAllQuestionnaires } from '../services/kvStore';

const dummyQuestionnaire = {
    "setting": {
        "theme": "默認主題",
        "language": "中文",
        "title": "【新北市立文山國民中學112學年度畢業學生升學就業動向調查】",
        "subtitle": "輔導處113.06.07",
        "id": "53v3xmra7zb9xw3j254mto"
    },
    "questionnaire": [
        {
            "type": "description",
            "params": {
                "question": "前言",
                "description": "#### 親愛的同學們：\n　　恭喜大家完成國中學業，即將邁入新的里程碑！學校希望了解大家畢業後的規劃，做為未來活動安排或升學輔導上的參考，請協助於**7月22**日**星期一**前完成此份問卷，**感謝**。\n\n輔導處*113.06.07*",
                "required": false,
                "placeholder": "",
                "originalData": ""
            },
            "id": 1721489269733
        },
        {
            "type": "block",
            "params": {
                "question": "第一部分：基本資料",
                "description": "",
                "questionN": "繼續填寫：「畢業後規劃」",
                "descriptionN": "",
                "required": false,
                "originalData": "[b]喔這不能點喔\n[n]繼續",
                "message1": "喔這不能點喔",
                "message2": "繼續"
            },
            "id": 1721489574821
        },
        {
            "type": "SAQ",
            "params": {
                "question": "班級/座號/姓名",
                "description": "Ex:901/05/王大明",
                "required": true,
                "placeholder": "Ex:901/05/王大明",
                "originalData": "Ex:901/05/王大明\n/^\\d{3}\\/\\d{2}\\/[\\u4e00-\\u9fa5]{2,4}$/",
                "regex": "/^\\d{3}\\/\\d{2}\\/[\\u4e00-\\u9fa5]{2,4}$/"
            },
            "id": 1721489687183
        }
    ]
};

function KVTest() {
    const [error, setError] = useState(null);
    const [questionnaireIds, setQuestionnaireIds] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // 儲存假資料
                const saveResult = await saveQuestionnaire(dummyQuestionnaire);
                if (!saveResult.success) {
                    throw new Error(saveResult.error);
                }

                // 列出所有問卷 ID
                const listResult = await listAllQuestionnaires();
                if (!listResult.success) {
                    throw new Error(listResult.error);
                }
                setQuestionnaireIds(listResult.data);

                //查詢
                const getResult = await getQuestionnaireById("53v3xmra7zb9xw3j254mto");
                if (!getResult.success) {
                    throw new Error(getResult.error);
                }

            } catch (err) {
                setError(err.message);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="mt-6 bg-red-400">KV</h2>
            <ul>
                {questionnaireIds.map(id => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
        </div>
    );
}

export default KVTest;
