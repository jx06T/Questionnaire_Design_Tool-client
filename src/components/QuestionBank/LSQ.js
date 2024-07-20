import React, { useRef, useEffect, useContext, useCallback } from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';
import { ReplyContext } from '../QuestionnaireRendering'
import { changeArray } from '../../utils/changeArray'

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function LSQ({ id, ...props }) {
  const { replyContent, setReplyContent } = useContext(ReplyContext);

  const InputRef = useRef(null);
  props = { ...props, min: props.min || "-105", max: props.max || "105", capture: props.capture || 5 };

  const options = props.options || [
    { "value": "-100", "text": "非常不同意" },
    { "value": "-50", "text": "不同意" },
    { "value": "0", "text": "無意見" },
    { "value": "50", "text": "同意" },
    { "value": "100", "text": "非常同意" }
  ]

  const sendReplyContent = useCallback(
    debounce((n) => {
      setReplyContent((p) => changeArray(p, n))
    }, 300), [])

  const correction = (e) => {
    const I = InputRef.current
    options.forEach(option => {
      const difference = Math.abs(parseInt(option.value) - parseInt(I.value));
      if (difference < props.capture) {
        sendReplyContent({ id: id, answer: e.target.value, question: props.question })
        I.value = option.value
      }
    });
    sendReplyContent({ id: id, answer: e.target.value, question: props.question })
  }

  const getStripes = (max, min, options) => {
    const stripes = options.map((i) => {
      const percentage = ((i.value - min) / (max - min) * 100).toFixed(2)
      return `transparent calc(${percentage}% - 1.5px) , #e2e8f0 calc(${percentage}% - 1.5px) , #e2e8f0 calc(${percentage}% + 1.5px) , transparent calc(${percentage}% + 1.5px)`
    })
    // return `repeating-linear-gradient(to right,${stripes.join(",")}, transparent 100%)`
    return `linear-gradient(to right,${stripes.join(",")}, transparent 100%)`

  }

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.style.background = `
      ${getStripes(props.max, props.min, options)},
      linear-gradient(to right, #94a3b8 0%, #cbd5e1 50%, #94a3b8 100%)
      `;
      InputRef.current.style.backgroundSize = `98% 100%, 100% 100%`;
      InputRef.current.style.backgroundPosition = `54% 0%, 0% 0%`;
    }
  }, [props.options]);

  const initialValue = replyContent.filter(e => e.id === id)[0]
  const answer = initialValue && initialValue.answer ? initialValue.answer : 0
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
      <input ref={InputRef} onChange={correction} className='myjx-LS range-wrap w-[104%] -ml-[2%] md:w-[96%] md:ml-[2%] lg:w-[96%] lg:ml-[2%]' type="range" name="range" min={props.min || "-105"} max={props.max || "105"} defaultValue={answer} />
    </EveryPiece>
  );
}

export default LSQ;
