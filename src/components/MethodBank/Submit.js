import React from 'react';
import EveryPiece from '../EveryPiece';

function Submit(props) {
  return (
    <EveryPiece>
      <h2 className='text-2xl mb-[0.15rem]'>{props.title||"提交說明!"}</h2>
      <h2 className='text-sm mb-6'>{props.description||"額外的說明!"}</h2>
      <button className='myjx-button2 w-20 h-10'>{props.message||"提交"}</button>
    </EveryPiece>
  );
}

export default Submit;
