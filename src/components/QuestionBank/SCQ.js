import React from 'react';
import { useState, useId } from 'react';
import EveryPiece from '../EveryPiece';

function MCQ(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const uniqueId = useId();
  const options = props.options || [
    { id: 'A', text: '選項 A' },
    { id: 'B', text: '選項 B' },
    { id: 'C', text: '選項 C' },
    { id: 'D', text: '選項 D' },
  ];

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <EveryPiece>
      <h2 className={`text-2xl mb-[0.2rem] ${props.required ? "J-required" : ""}`}>{props.question || "這是一道單選題!"}</h2>
      <h2 className='text-sm mb-6'>{props.description || "請選擇一個正確答案"}</h2>
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