import React from 'react';
import EveryPiece from '../EveryPiece';
import MDBlock from '../MDBlock';

function TitleEdit(props) {
    return (
        <EveryPiece color="400">
            <div className='flex flex-col'>
                <input className='myjx-input2 text-center text-3xl mb-[1rem] myjx-inputP' placeholder="輸入問卷標題"></input>
                <input className='myjx-input2 text-center text-lg -mb-2 myjx-inputP' placeholder='輸入副標題等等等'></input>
            </div>
        </EveryPiece>
    );
}

export default TitleEdit;
