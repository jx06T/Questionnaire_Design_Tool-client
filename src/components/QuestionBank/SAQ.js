import React from 'react';
import EveryPiece from '../EveryPiece';

function SAQ() {
  return (
    <EveryPiece>
      <h2 className='text-2xl mb-[0.2rem]'>這是一道簡答題!</h2>
      <h2 className='text-sm mb-6'>額外的說明!</h2>
      <input type="text" className='myjx-input' placeholder='照規定寫啊' defaultValue="這是預設內容"></input>
    </EveryPiece>
  );
}

export default SAQ;
