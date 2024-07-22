import React from 'react';
import MB from '../../components/MethodBank';
import EveryPiece from '../../components/EveryPiece';

function NotFound() {
    return (
        <>
            <div className='edit-home flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title subtitle="JXQDT" title="404"></MB.Title>
                <EveryPiece className="px-6 py-4">
                    <h1 className='text-center text-8xl tracking-[1rem]'> 4</h1>
                    <a className='underline text-right text-xl w-full block mt-4' href='/'>Home</a>
                </EveryPiece>
                <EveryPiece className="px-6 py-4">
                    <h1 className='text-center text-8xl tracking-[1rem]'> 0</h1>
                    <a className='underline text-right text-xl w-full block mt-4' href='/'>Home</a>
                </EveryPiece>
                <EveryPiece className="px-6 py-4">
                    <h1 className='text-center text-8xl tracking-[1rem]'> 4</h1>
                    <a className='underline text-right text-xl w-full block mt-4' href='/'>Home</a>
                </EveryPiece>
            </div>
        </>
    );
}

export default NotFound;
