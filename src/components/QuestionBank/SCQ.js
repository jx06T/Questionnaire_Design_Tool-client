import React, { useContext, useEffect } from 'react';
import { useState, useId } from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';
import { ReplyContext } from '../QuestionnaireRendering'
import { changeArray } from '../../utils/changeArray'

function MCQ({ id, ...props }) {
  const [elseValue, setElseValue] = useState("");

  const { replyContent, setReplyContent } = useContext(ReplyContext);

  const initialValue = replyContent.filter(e => e.id === id)[0]
  const answer = initialValue && initialValue.answer ? initialValue.answer : null
  const [selectedOption, setSelectedOption] = useState(answer);

  const options = props.options || [
    { id: 'A', text: '選項 A' },
    { id: 'B', text: '選項 B' },
    { id: 'C', text: '選項 C' },
    { id: 'D', text: '選項 D' },
  ];
  const optionsID = options.map(e => e.id)

  useEffect(() => {
    if (props.else && selectedOption == "ELSE") {
      setReplyContent((p) => changeArray(p, { id: id, answer: elseValue, question: props.question }))
    } else {
      setReplyContent((p) => changeArray(p, { id: id, answer: selectedOption, question: props.question }))
    }
  }, [selectedOption, elseValue])


  useEffect(() => {
    if (!optionsID.includes(selectedOption)) {
      setElseValue(selectedOption || "")
      setSelectedOption("ELSE")
    }
  }, [])

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleElseValueChange = (e) => {
    setElseValue(e.target.value)
  }

  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "選擇一個妳認為適合的答案"} required={props.required}></QuestionTitle>
      <div>
        {options.map((option, i) => (
          <div key={option.id + "-" + i} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`mcq-option-${option.id}`}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionChange(option.id)}
                className="mr-2 w-[0.95rem] h-[0.95rem] "
              />
              {option.text}
            </label>
          </div>
        ))}
        {props.else &&
          <div key={"ELSE"} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`mcq-option-${"ELSE"}`}
                checked={selectedOption === "ELSE"}
                onChange={() => handleOptionChange("ELSE")}
                className="mr-2 w-[1.17rem] h-[1.17rem] "
              />
              ELSE：
              <input
                type="text"
                name={`mcq-option-${"ELSE"}`}
                value={elseValue}
                onChange={handleElseValueChange}
                className="myjx-input mx-2 w-full "
              />
            </label>
          </div>}
      </div>
    </EveryPiece>
  );
}

export default MCQ;