import React from "react";


function EveryPiece(props) {
    return (
      <div className='bg-slate-200 w-[20rem] sm:w-[30rem] md:w-[40rem] m-10 rounded-md p-8'>
        {props.children}
      </div>
    );
  }
  
  export default EveryPiece;