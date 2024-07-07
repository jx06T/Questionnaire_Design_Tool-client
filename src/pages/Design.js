import React, { useEffect, useState } from 'react';
import DB from '../components/DesignBank'
// import MB from '../components/MethodBank'
// import QB from '../components/QuestionBank';

function Design() {
    const [elements, setElements] = useState([]);

    const handleAddQuestion = () => {
        setElements(prevElements => [...prevElements, { type: 'question', id: Date.now() }]);
    };

    const handleAddBlock = () => {
        setElements(prevElements => [...prevElements, { type: 'block', id: Date.now() }]);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey && event.shiftKey && event.key === 'A') {
                event.preventDefault();
                handleAddQuestion()
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='Design flex bg-slate-50 flex-col items-center justify-center'>
            <DB.TitleEdit />
            {elements.map((element, index) => (
                element.type === 'question'
                    ? <DB.Question key={element.id}/>
                    : <DB.BlockEdit key={element.id}/>
            ))}
            <DB.AddBlock onAddQuestion={handleAddQuestion} onAddBlock={handleAddBlock} title="設計問卷?"></DB.AddBlock>
        </div>
    );
}

export default Design;