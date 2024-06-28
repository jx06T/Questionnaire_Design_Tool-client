import React from 'react';
import { useState, useId } from 'react';
import EveryPiece from '../EveryPiece';

function MCQ() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const uniqueId = useId();
  const options = [
    { id: 'A', text: '選項 A' },
    { id: 'B', text: '選項 B' },
    { id: 'C', text: '選項 C' },
    { id: 'D', text: '選項 D' },
  ];

  const handleOptionChange = (optionId) => {
    setSelectedOptions(prevSelected => {
      if (prevSelected.includes(optionId)) {
        return prevSelected.filter(id => id !== optionId);
      } else {
        return [...prevSelected, optionId];
      }
    });
  };

  return (
    <EveryPiece>
      <h2 className='text-2xl mb-[0.2rem]'>這是一道多選題!</h2>
      <h2 className='text-sm mb-6'>請選擇一個或多個正確答案</h2>
      <div>
        {options.map((option) => (
          <div key={option.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`mcq-option-${option.id}-${uniqueId}`}
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
                className="mr-2 w-[0.95rem] h-[0.95rem]"
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