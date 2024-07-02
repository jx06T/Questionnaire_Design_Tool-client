import React from 'react';
import EveryPiece from '../EveryPiece';

function Block(props) {
  return (
    <div className='block'>
      {!props.noI && <EveryPiece color="300">
        <h2 className='text-2xl mb-[0.2rem]'>這是一個區塊的說明!</h2>
        <h2 className='text-sm mb-6'>額外的說明!</h2>
      </EveryPiece>}
      {props.children}
      <hr />
    </div>
  );
}

export default Block;
