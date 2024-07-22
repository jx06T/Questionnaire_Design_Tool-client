import React, { useContext, useEffect, useRef } from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';
import { ReplyContext } from '../QuestionnaireRendering'
import { changeArray } from '../../utils/changeArray'


function DAQ({ id, ...props }) {
  const { replyContent, setReplyContent } = useContext(ReplyContext);
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current.value == "") {
      textareaRef.current.value = textareaRef.current.placeholder
      textareaRef.current.value = ""
    }
    UProw()
  }, [])

  const UProw = (e) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 4}px`;
    }
    if (!e) return
    
    if (props.regex) {
      console.log(props.regex)
      const regex = new RegExp(props.regex.slice(1, props.regex.length - 1))
      if (!regex.test(e.target.value)) {
        e.target.classList.add("myjx-input3")
        e.target.classList.remove("myjx-input")
      } else {
        e.target.classList.add("myjx-input")
        e.target.classList.remove("myjx-input3")
      }
      // console.log(regex, regex.test(e.target.value))
    }
    setReplyContent((p) => changeArray(p, { id: id, answer: e.target.value, question: props.question }))
  }

  const initialValue = replyContent.filter(e => e.id === id)[0]
  const answer = initialValue && initialValue.answer ? initialValue.answer : null
  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "詳細寫下你的想法"} required={props.required}></QuestionTitle>
      <textarea ref={textareaRef} onInput={UProw} type="text" placeholder={props.placeholder || '依照說明填寫'} className='myjx-textarea' defaultValue={answer}></textarea>
    </EveryPiece>
  );
}

export default DAQ;
