import React from 'react';
import EveryPiece from '../EveryPiece';
import QuestionTitle from '../QuestionTitle';

function Description(props) {
    return (
        <EveryPiece color="300">
            <QuestionTitle question={props.title||props.question} description={props.description || ""} required={false}></QuestionTitle>
        </EveryPiece>
    );
}

export default Description;
