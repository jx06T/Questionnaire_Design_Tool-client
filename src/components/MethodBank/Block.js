import React from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';

function Block(props) {
  return (
    // <hr className='my-8 w-[110%] -ml-[5%] bg-slate-200 h-[1.8px] max-w-[98vw]' />
    <EveryPiece color="300">
      <QuestionTitle question={props.question} description={props.description||"額外的說明"} required={props.required}></QuestionTitle>
    </EveryPiece>
  );
}

export default Block;
