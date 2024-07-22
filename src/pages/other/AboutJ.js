import React from 'react';
import MB from '../../components/MethodBank';

const myUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://questionnaire-design-tool-client.vercel.app"
const description =
    `
# 功能介紹

- ## 設計問卷
1. 點擊 **Design** 後點選創建問卷，進入到設計頁面開始設計。

- 基礎編輯
1. 輸入標題副標題等等
3. 撰寫問題或新增區塊 *[**[問題範例與選項]**](${myUrl+"/edit/cp7xbs5jn1dq?t=x4rcky8igsbhdobkabvoxlhb"})
4. 調整問題的位置或設定必填問題等
6. 點擊 **file** ⇒ **Preview** 預覽問卷

- 發布
5. 前往 **settings** 填寫作者名稱
5. 前往 **settings** 設定回調連結 *[**[回調連結]**]()
6. 點擊 **file** ⇒ **Release** 發布問卷 ***這將會強制的更新雲端的版本**
6. 前往 **Info** 複製公開連結讓使用者填寫

- 進階設定
1. 前往 **Info** 將編輯連結複製給協作者 *[**[協作]**]()
5. 前往 **settings** 設定是否將此問卷的副本作為無提交功能的公開展示 [**[Demo]**](${myUrl+"/demo"})
6. 點擊 **file** ⇒ **Download** 或 **Import** 匯出成本地檔案或由本地檔案匯入

- ## 接收回應
可以利用 **google 試算表** 接收回應 *[**[回調連結]**]()

- ## 填寫問卷
擁有公開連結的使用者能填寫問卷

# 代辦事項
- 上傳檔案的邏輯

# 更新日誌
- ### v 1.0
完整功能實現，2024/7/22 發布。
- ### v 0.x
測試版。

# 貢獻者
- [jx06T](https://github.com/jx06T)
`
function About() {
    return (
        <>
            <div className='edit-home flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title subtitle="JXQDT" title="About"></MB.Title>
                <MB.Description description={description} title="關於問卷設計工具"></MB.Description>
                </div>
        </>
    );
}

export default About;
