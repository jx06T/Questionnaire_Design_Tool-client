import React from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';

function NextPage(props) {
    const handleButtonClick = (e) => {

    }
    return (
        <>
            <EveryPiece>
                <QuestionTitle question={props.questionN || "前往下一個區段"} description={props.descriptionN || ""} required={false}></QuestionTitle>
                <button onClick={handleButtonClick} className='myjx-button2 w-20 h-10 mr-5'>{props.message || props.message1 || "返回"}</button>
                <button onClick={handleButtonClick} className='myjx-button2 w-20 h-10'>{props.message2 || "繼續"}</button>
            </EveryPiece>
            <hr className='my-8 w-full bg-slate-200 h-[1.8px]' />
        </>
    );
}

export default NextPage;
