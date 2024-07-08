import React, { useEffect, useRef } from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';


function DAQ(props) {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current.value == "") {
      textareaRef.current.value = textareaRef.current.placeholder
      UProw()
      textareaRef.current.value = ""
    }
  }, [])

  const UProw = (event) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 1}px`;
    }
  }
  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "這是一道詳答題!"} required={props.required}></QuestionTitle>
      <textarea ref={textareaRef} onInput={UProw} type="text" placeholder={props.placeholder || '提示內容照規定寫啊'} className='myjx-textarea' defaultValue={props.defaultValue || ""}></textarea>
    </EveryPiece>
  );
}

export default DAQ;
