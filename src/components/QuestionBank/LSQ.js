import React from 'react';
import EveryPiece from '../EveryPiece';

function LSQ() {
  return (
    <EveryPiece>
      <h2 className='text-2xl mb-[0.2rem]'>這是一個李克特量表!</h2>
      <h2 className='text-sm mb-6'>額外的說明!</h2>
      {/* <div className="flex flex-col items-center range-wrap"> */}
        <datalist id="LS-Option" className='myjx-datalist'>
          <option value="-100" label="強烈反對"></option>
          <option value="-50" label="反對"></option>
          <option value="0" label="不反對也不同意"></option>
          <option value="50" label="同意"></option>
          <option value="100" label="強烈同意"></option>
        </datalist>
        <input className='myjx-LS range-wrap' type="range" name="range" min="-105" max="105" list="LS-Option" defaultValue="50" />
      {/* </div> */}
    </EveryPiece>
  );
}

export default LSQ;
