import React from 'react';
import MB from '../../components/MethodBank';

const description =
    `
回調連結可以接收使用者的表單回覆

- 回調方式如下：
\`\`\`
curl -X POST \\
  -H "Content-Type: text/plain" \\
  -d '{
    "answers": "'"$replyContent"'",
    "time": "%Y-%m-%d %H:%M:%S"",
    "id": "'"$id"'"
}' \\
"$replyURL"
\`\`\`

- **replyContent** 格式如下：
\`\`\`
 [
    {
        "id": <id>,
        "answer": <答案>,
        "question": <題目>,
        "type": <SAQ,DAQ,SCQ,LSQ,UDQ>
    },
    {
        "id": <id>,
        "answer": [
            <答案>,
            <答案>,
            <答案>
        ],
        "question": <題目>,
        "type": <MCQ>
    }
],
\`\`\`

可以使用 google app script 與 google 試算表製作回調連結，見[[**範例程式**](https://script.google.com/d/1gCNvEw1Ny0AkUBI914sVFTqA_cxY8m6ApampVu03dW_mW8BSB6U0oV5F/edit?usp=sharing)]
開啟後請另存副本到雲端硬碟，並填入 **試算表 id** 後部署。

*2024/7/22*`

function CallbackDescription() {
    return (
        <>
            <div className='edit-home flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title subtitle="JXQDT" title="回調連結說明"></MB.Title>
                <MB.Description description={description} title="回調連結"></MB.Description>
            </div>
        </>
    );
}

export default CallbackDescription;
