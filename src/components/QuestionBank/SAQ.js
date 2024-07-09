import React from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';

function SAQ(props) {
  const handleInput = (e) => {
    if (props.regex) {
      const regex = new RegExp(props.regex.slice(1, props.regex.length - 1))
      if (!regex.test(e.target.value)) {
        e.target.classList.add("myjx-input3")
        e.target.classList.remove("myjx-input")
      }else{
        e.target.classList.add("myjx-input")
        e.target.classList.remove("myjx-input3")
      }
      console.log(regex, regex.test(e.target.value))
    }
  }
  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "簡單的回答"} required={props.required}></QuestionTitle>
      <input onInput={handleInput} type="text" className='myjx-input' placeholder={props.placeholder || '依照說明填寫'} defaultValue={props.defaultValue || ""}></input>
    </EveryPiece>
  );
}

export default SAQ;
