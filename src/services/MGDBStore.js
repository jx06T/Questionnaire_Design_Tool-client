import axios from 'axios';

const Authorization = process.env.REACT_APP_MD_API_ACCESS_TOKEN;

export async function saveQuestionnaire(questionnaireData) {
    const id = questionnaireData.setting.id;
    try {
        const { setting, questionnaire } = questionnaireData;
        const data = JSON.stringify({
            collection: "all-questionnaires-collection",
            database: "all-questionnaires-database",
            dataSource: "main-cluster",
            filter: { "setting.id": id },
            update: {
                $set: {
                    setting: setting,
                    questionnaire: questionnaire
                }
            },
            upsert: true
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ygstmyn/endpoint/data/v1/action/updateOne',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Request-Headers': '*',
                'Authorization': Authorization
            },
            data: data
        };

        const response = await axios.request(config);
        // return { success: true, id, result: JSON.stringify(response.data) };
        return { success: true, id: id, ...response.data };

    } catch (error) {
        console.error(`保存問卷(${id})時發生錯誤:`, error);
        return { success: false, error: error.message };
    }
}

export async function getQuestionnaireById(id) {
    try {
        const data = JSON.stringify({
            collection: "all-questionnaires-collection",
            database: "all-questionnaires-database",
            dataSource: "main-cluster",
            filter: { "setting.id": id },
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ygstmyn/endpoint/data/v1/action/findOne',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Request-Headers': '*',
                'Authorization': Authorization
            },
            data: data
        };

        const response = await axios.request(config);
        // return { success: true, id, data: response.data.document, result: JSON.stringify(response.data) };
        return { success: true, id, data: response.data.document };

    } catch (error) {
        console.error(`查詢問卷(${id})時發生錯誤:`, error);
        return { success: false, error: error.message };
    }
}

export async function listAllQuestionnaires() {
    try {
        const data = JSON.stringify({
            collection: "all-questionnaires-collection",
            database: "all-questionnaires-database",
            dataSource: "main-cluster",
            projection: { "setting.id": 1, "_id": 0 }
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ygstmyn/endpoint/data/v1/action/find',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Request-Headers': '*',
                'Authorization': Authorization
            },
            data: data
        };

        const response = await axios.request(config);
        const questionnaireIds = response.data.documents.map(doc => doc.setting.id);

        return { success: true, data: questionnaireIds };

    } catch (error) {
        console.error(`查詢問卷時發生錯誤:`, error);
        return { success: false, error: error.message };
    }
}