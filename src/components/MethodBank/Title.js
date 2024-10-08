import React from 'react';
import EveryPiece from '../EveryPiece';

function Title(props) {
    return (
        <EveryPiece color="400">
            <h2 className='text-3xl mb-[1rem] text-center'>{props.title || "這是問卷標題!"}</h2>
            <h2 className='text-lg -mb-2 text-center'>{props.subtitle || "副標題等等等"}</h2>
        </EveryPiece>
    );
}

export default Title;
