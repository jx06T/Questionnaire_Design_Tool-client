import React from 'react';

function DAQ() {
  const UProw = (event) => {
    event.target.rows = Math.max(event.target.value.split("\n").length,3)
  }
  return (
    <div className='bg-slate-200 w-[40rem] m-10 rounded-md p-8'>
      <h2 className='text-2xl mb-[0.2rem]'>這是一道詳答題!</h2>
      <h2 className='text-sm mb-6'>額外的說明!</h2>
      <textarea onInput={UProw} type="text" rows="3" placeholder='照規定寫啊'  className='myjx-textarea' defaultValue=""></textarea>
    </div>
  );
}

export default DAQ;
