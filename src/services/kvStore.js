import { kv } from '@vercel/kv';

// import dotenv from 'dotenv';
// dotenv.config();


export  async function saveQuestionnaire(questionnaireData) {
    try {
        const id = questionnaireData.setting.id;
        const key = `questionnaire:${id}`;
        await kv.set(key, JSON.stringify(questionnaireData));

        console.log(`問卷 ${id} 已成功儲存`);
        return { success: true, id };
    } catch (error) {
        console.error('儲存問卷時發生錯誤:', error);
        return { success: false, error: error.message };
    }
}

export  async function getQuestionnaireById(id) {
    try {
        const key = `questionnaire:${id}`;
        const data = await kv.get(key);
        if (data) {
            return { success: true, data: JSON.parse(data) };
        } else {
            return { success: false, error: '找不到問卷' };
        }
    } catch (error) {
        console.error('查詢問卷時發生錯誤:', error);
        return { success: false, error: error.message };
    }
}

export  async function listAllQuestionnaires() {
    try {
        const keys = await kv.keys('questionnaire:*');
        const questionnaires = await Promise.all(
            keys.map(async (key) => {
                const data = await kv.get(key);
                return JSON.parse(data);
            })
        );
        return { success: true, data: questionnaires };
    } catch (error) {
        console.error('列出問卷時發生錯誤:', error);
        return { success: false, error: error.message };
    }
}

export  async function exampleUsage() {
    const questionnaire = {
        setting: { id: '123', title: '示例問卷' },
        questionnaire: []
    };
    await saveQuestionnaire(questionnaire);

    const result = await getQuestionnaireById('123');
    console.log(result);

    const allQuestionnaires = await listAllQuestionnaires();
    console.log(allQuestionnaires);
}

// exampleUsage();
