import React from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from './QuestionTitle';

function SAQ(props) {
  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description||"簡單的回答"} required={props.required}></QuestionTitle>
      <input type="text" className='myjx-input' placeholder={props.placeholder||'照規定寫啊'} defaultValue={props.defaultValue||""}></input>
    </EveryPiece>
  );
}

export default SAQ;
