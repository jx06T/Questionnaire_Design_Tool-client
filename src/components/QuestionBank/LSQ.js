import React, { useRef, useEffect } from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';

function LSQ(props) {
  const InputRef = useRef(null);
  props = { ...props, min: props.min || "-105", max: props.max || "105", capture: props.capture || 5 };

  const options = props.options || [
    { "value": "-100", "text": "非常不同意" },
    { "value": "-50", "text": "不同意" },
    { "value": "0", "text": "無意見" },
    { "value": "50", "text": "同意" },
    { "value": "100", "text": "非常同意" }
  ]

  const correction = (e) => {
    const I = InputRef.current
    options.forEach(option => {
      const difference = Math.abs(parseInt(option.value) - parseInt(I.value));
      if (difference < props.capture) {
        I.value = option.value
      }
    });
  }

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.style.background = `
      repeating-linear-gradient(to right, #e2e8f0, #e2e8f0 3px, transparent 4px, transparent ${100 / (options.length - 1)}%),
      linear-gradient(to right, #94a3b8 0%, #cbd5e1 50%, #94a3b8 100%)
      `;
      InputRef.current.style.backgroundPosition = `45% 0%, 0% 0%`;
      InputRef.current.style.backgroundSize = `${((parseInt(options[options.length - 1].value) - parseInt(options[0].value)) / (parseInt(props.max) - parseInt(props.min))) * 100 - 1}% 100%, 100% 100%`;
    }
  }, [props.options]);


  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "點選或拖動到最符合妳感受的刻度"} required={props.required}></QuestionTitle>

      <div id="LS-Option" className='myjx-datalist'>
        {options.map(option => (
          <span key={option.value} className='text-xs sm:text-base' value={option.value}>
            {option.text}
          </span>
        ))}

      </div>
      <input ref={InputRef} onChange={correction} className='myjx-LS range-wrap w-[104%] -ml-[2%] md:w-[96%] md:ml-[2%] lg:w-[96%] lg:ml-[2%]' type="range" name="range" min={props.min || "-105"} max={props.max || "105"} defaultValue="0" />
    </EveryPiece>
  );
}

export default LSQ;
