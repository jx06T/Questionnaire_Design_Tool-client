import React from 'react';
import EveryPiece from '../EveryPiece';

function AddBlock(props) {
  return (
    <EveryPiece color="50" className="p-0 mx-0">
      <div className='flex space-x-3'>
        <button onClick={props.onAddQuestion} className='bg-slate-200 w-[70%] p-2 rounded-md text-center hover:bg-slate-300'>新增問題或說明</button>
        <button onClick={props.onAddBlock} className='bg-slate-200 w-[30%] p-2 rounded-md text-center hover:bg-slate-300'>  新增區塊</button>
      </div>
    </EveryPiece>
  );
}

export default AddBlock;
