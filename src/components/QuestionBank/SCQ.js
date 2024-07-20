import React, { useContext, useEffect } from 'react';
import { useState, useId } from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';
import { ReplyContext } from '../QuestionnaireRendering'
import { changeArray } from '../../utils/changeArray'

function MCQ({ id, ...props }) {
  const { replyContent, setReplyContent } = useContext(ReplyContext);

  const initialValue = replyContent.filter(e => e.id === id)[0]
  const answer = initialValue && initialValue.answer ? initialValue.answer : null
  const [selectedOption, setSelectedOption] = useState(answer);
  
  const uniqueId = useId();
  const options = props.options || [
    { id: 'A', text: '選項 A' },
    { id: 'B', text: '選項 B' },
    { id: 'C', text: '選項 C' },
    { id: 'D', text: '選項 D' },
  ];

  useEffect(() => {
    setReplyContent((p) => changeArray(p, { id: id, answer: selectedOption, question: props.question }))
  }, [selectedOption])

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <EveryPiece>
      <QuestionTitle question={props.question} description={props.description || "選擇一個妳認為適合的答案"} required={props.required}></QuestionTitle>
      <div>
        {options.map((option) => (
          <div key={option.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`mcq-option-${option.id}-${uniqueId}`}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionChange(option.id)}
                className="mr-2 w-[0.95rem] h-[0.95rem] "
              />
              {option.text}
            </label>
          </div>
        ))}
      </div>
    </EveryPiece>
  );
}

export default MCQ;