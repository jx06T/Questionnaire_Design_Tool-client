import React from 'react';
import MB from '../../components/MethodBank';

const description =
    `
此工具提供簡單的協作服務，只要知道 **編輯網址** 就能進行編輯，但請注意任何一方的 **發布(Release)** 都會直接覆蓋雲端的檔案。
故若有兩人同時編輯，發布前請先到 **公開連結** 查看雲端的最新版本，並手動進行合併後在將本地版本發布。

*2024/7/22*`

function Cooperation() {
    return (
        <>
            <div className='edit-home flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title subtitle="JXQDT" title="協作說明"></MB.Title>
                <MB.Description description={description} title="協作"></MB.Description>
            </div>
        </>
    );
}

export default Cooperation;
