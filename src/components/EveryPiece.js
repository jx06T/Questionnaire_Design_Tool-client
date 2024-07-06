import React from "react";
import classNames from 'classnames';


function EveryPiece(props) {
  const bgColorClass = classNames({
    'bg-slate-200': !props.color,
    'bg-slate-100': props.color == 100,
    'bg-slate-300': props.color == 300,
    'bg-slate-400': props.color == 400,
    'bg-slate-500': props.color == 500,
    'bg-slate-600': props.color == 600,
  });

  return (
    <div className={bgColorClass + " w-[20rem] sm:w-[30rem] md:w-[40rem] my-6 mx-0 rounded-md p-8 " + props.className || ""}>
      {props.children}
    </div>
  );
}

export default EveryPiece;