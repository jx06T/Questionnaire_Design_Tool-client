import React, { useEffect, useState } from 'react';
import DB from '../components/DesignBank'
import MB from '../components/MethodBank'
import QB from '../components/QuestionBank';

function Design() {
    const [elements, setElements] = useState([]);
    const handleAddQuestion = () => {
        setElements(prevElements => [...prevElements, { type: 'question', id: Date.now() }]);
    };

    const handleAddBlock = () => {
        setElements(prevElements => [...prevElements, { type: 'block', id: Date.now() }]);
    };

    return (
        <div className='Design flex bg-slate-50 flex-col items-center justify-center'>
            <MB.Title title="設計問卷?"></MB.Title>
            {elements.map(element => (
                element.type === 'question'
                    ? <DB.Question key={element.id} />
                    : <DB.BlockEdit key={element.id} />
            ))}
            <DB.AddBlock onAddQuestion={handleAddQuestion} onAddBlock={handleAddBlock} title="設計問卷?"></DB.AddBlock>
        </div>
    );
}

export default Design;