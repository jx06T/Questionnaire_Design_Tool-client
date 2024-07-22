const API_URL = process.env.REACT_APP_KV_REST_API_URL;
const API_TOKEN = process.env.REACT_APP_KV_REST_API_TOKEN;
const AUTH_HEADER = `Bearer ${API_TOKEN}`;

export async function saveQuestionnaire(questionnaireData) {
    try {
        const id = questionnaireData.setting.id;
        const key = `questionnaire:${id}`;
        const response = await fetch(`${API_URL}/set/${key}`, {
            method: 'POST',
            headers: {
                Authorization: AUTH_HEADER,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionnaireData),
        });

        if (response.ok) {
            console.log(`問卷 ${id} 已成功保存`);
            return { success: true, id };
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('保存问卷时发生错误:', error);
        return { success: false, error: error.message };
    }
}

export async function getQuestionnaireById(id) {
    try {
        const key = `questionnaire:${id}`;
        const response = await fetch(`${API_URL}/get/${key}`, {
            method: 'GET',
            headers: {
                Authorization: AUTH_HEADER,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data: JSON.parse(data.result) };
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('查询问卷时发生错误:', error);
        return { success: false, error: error.message };
    }
}

export async function listAllQuestionnaires() {
    try {
        const response = await fetch(`${API_URL}/keys/questionnaire:*`, {
            method: 'GET',
            headers: {
                Authorization: AUTH_HEADER,
            },
        });

        if (response.ok) {
            const keys = await response.json();

            const questionnaires = await Promise.all(
                keys.result.map(async (key) => {
                    console.log("!",key)
                    return key;
                })
            );

            return { success: true, data: questionnaires };
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('列出问卷时发生错误:', error);
        return { success: false, error: error.message };
    }
}