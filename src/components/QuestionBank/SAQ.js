import React from 'react';
import EveryPiece from '../EveryPiece';

function SAQ(props) {
  return (
    <EveryPiece>
      <h2 className='text-2xl mb-[0.2rem]'>{props.question||"這是一道簡答題!"}</h2>
      <h2 className='text-sm mb-6'>{props.description||"額外的說明!"}</h2>
      <input type="text" className='myjx-input' placeholder={props.placeholder||'照規定寫啊'} defaultValue={props.defaultValue||""}></input>
    </EveryPiece>
  );
}

export default SAQ;
