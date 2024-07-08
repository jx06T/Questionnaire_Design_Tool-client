import React from 'react';
import EveryPiece from '../EveryPiece';

function Description(props) {
    return (
        <EveryPiece color="300">
            <h2 className='text-2xl mb-[0.2rem]'>{props.title || props.question || "這是說明!"}</h2>
            <h2 className='text-sm mb-6'>{props.description || "額外的說明!"}</h2>
        </EveryPiece>
    );
}

export default Description;
