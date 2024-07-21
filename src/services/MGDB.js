import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_MD_SERVER_URL;

export async function saveQuestionnaire(questionnaireData) {
    const id = questionnaireData.setting.id;
    try {
        const data = JSON.stringify({ questionnaireData: questionnaireData });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: SERVER_URL + "saveQuestionnaire",
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        const response = await axios.request(config);
        return { ...response.data };

    } catch (error) {
        console.error(`保存問卷(${id})時發生錯誤:`, error);
        return { success: false, error: error.message };
    }
}

export async function getQuestionnaireById(id) {
    try {
        const data = JSON.stringify({ id: id });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: SERVER_URL + "getQuestionnaireById",
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        const response = await axios.request(config);
        return { ...response.data };

    } catch (error) {
        console.error(`查詢問卷(${id})時發生錯誤:`, error);
        return { success: false, error: error.message };
    }
}

export async function listAllQuestionnaires() {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: SERVER_URL + "listAllQuestionnaires",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.request(config);
        return { ...response.data };

    } catch (error) {
        console.error(`查詢問卷時發生錯誤:`, error);
        return { success: false, error: error.message };
    }
}