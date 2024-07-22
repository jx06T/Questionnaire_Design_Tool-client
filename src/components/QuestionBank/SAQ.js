import React, { useContext } from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';
import { ReplyContext } from '../QuestionnaireRendering'
import { changeArray } from '../../utils/changeArray'

function SAQ({ id, ...props }) {
  const { replyContent, setReplyContent } = useContext(ReplyContext);

  const handleInput = (e) => {
    if (props.regex) {
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
      <QuestionTitle question={props.question} description={props.description || "簡單敘述你的想法"} required={props.required}></QuestionTitle>
      <input onInput={handleInput} type="text" className='myjx-input' placeholder={props.placeholder || '依照說明填寫'} defaultValue={answer}></input>
    </EveryPiece>
  );
}

export default SAQ;
