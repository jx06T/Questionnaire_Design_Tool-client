import React from 'react';
import EveryPiece from '../EveryPiece';

function DAQ(props) {
  const UProw = (event) => {
    event.target.rows = Math.max(event.target.value.split("\n").length, 3)
  }
  return (
    <EveryPiece>
      <h2 className={`text-2xl mb-[0.2rem] ${props.required ? "J-required" : ""}`}>{props.question || "這是一道詳答題!"}</h2>
      <h2 className='text-sm mb-6'>{props.description || "額外的說明!"}</h2>
      <textarea onInput={UProw} type="text" rows="3" placeholder={props.placeholder||'提示內容照規定寫啊'} className='myjx-textarea' defaultValue={props.defaultValue||""}></textarea>
    </EveryPiece>
  );
}

export default DAQ;
