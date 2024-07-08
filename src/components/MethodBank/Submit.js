import React from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';

function Submit(props) {
  return (
    <EveryPiece>
      <QuestionTitle question={props.title||props.question} description={props.description || ""} required={false}></QuestionTitle>
      <button className='myjx-button2 w-20 h-10'>{props.message||"提交"}</button>
    </EveryPiece>
  );
}

export default Submit;
