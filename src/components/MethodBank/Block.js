import React from 'react';
import EveryPiece from '../EveryPiece';

function Block(props) {
  return (
    <div className='flex flex-col mt-10 mx-0'>
      {!props.noI && <EveryPiece color="300">
        <h2 className='text-2xl mb-[0.2rem]'>{props.title || "這是一個區塊的說明!"}</h2>
        <h2 className='text-sm mb-6'>{props.description || "額外的說明!"}</h2>
      </EveryPiece>}
      {props.children}
      <hr className='my-8 w-[110%] -ml-[5%] bg-slate-200 h-[1.8px] max-w-[98vw]' />
    </div>
  );
}

export default Block;
