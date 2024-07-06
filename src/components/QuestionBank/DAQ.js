import React from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from './QuestionTitle';


function DAQ(props) {
  const UProw = (event) => {
    event.target.rows = Math.max(event.target.value.split("\n").length, 3)
  }
  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description||"這是一道詳答題!"} required={props.required}></QuestionTitle>
      <textarea onInput={UProw} type="text" rows="3" placeholder={props.placeholder||'提示內容照規定寫啊'} className='myjx-textarea' defaultValue={props.defaultValue||""}></textarea>
    </EveryPiece>
  );
}

export default DAQ;
