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
  const answer = initialValue && initialValue.answer ? initialValue.answer : []
  const [selectedOptions, setSelectedOptions] = useState(typeof (answer) === 'string' ? [] : answer);

  const options = props.options || [
    { id: 'A', text: '選項 A' },
    { id: 'B', text: '選項 B' },
    { id: 'C', text: '選項 C' },
    { id: 'D', text: '選項 D' },
  ];
  const optionsID = options.map(e => e.id)

  useEffect(() => {
    if (props.else && selectedOptions.includes("ELSE")) {
      setReplyContent((p) => changeArray(p, {
        id: id, answer: [...selectedOptions.filter(e => (e !== "ELSE" && optionsID.includes(e))), elseValue], question: props.question
      }))
    } else {
      setReplyContent((p) => changeArray(p, { id: id, answer: selectedOptions.filter(e => optionsID.includes(e)), question: props.question }))
    }
  }, [selectedOptions, elseValue])

  useEffect(() => {
    let temp = null
    setReplyContent((p) => changeArray(p, {
      id: id,
      answer: selectedOptions.filter(e => {
        if (!optionsID.includes(e) && optionsID.includes("ELSE")) {
          temp = e
        }
        return optionsID.includes(e)
      }),
      question: props.question
    }))
    setTimeout(() => {
      if (temp !== null) {
        setElseValue(temp)
        setSelectedOptions([...selectedOptions, "ELSE"])
      }
    }, 100);
  }, [])

  const handleOptionChange = (optionId) => {
    setSelectedOptions(prevSelected => {
      if (prevSelected.includes(optionId)) {
        return prevSelected.filter(id => id !== optionId);
      } else {
        return [...prevSelected, optionId];
      }
    });
  };

  const handleElseValueChange = (e) => {
    setElseValue(e.target.value)
  }

  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "選擇一個或多個妳認為適合的答案"} required={props.required}></QuestionTitle>
      <div>
        {options.map((option, i) => (
          <div key={option.id + "-" + i} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`mcq-option-${option.id}`}
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
                className="mr-2 w-[0.95rem] h-[0.95rem]"
              />
              {option.text}
            </label>
          </div>
        ))}
        {props.else &&
          <div key={"ELSE"} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`mcq-option-${"ELSE"}`}
                checked={selectedOptions.includes("ELSE")}
                onChange={() => handleOptionChange("ELSE")}
                className="mr-2 w-[1.17rem] h-[1.17rem]"
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