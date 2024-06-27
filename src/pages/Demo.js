import React from 'react';
import SAQ from '../components/SAQ';
import DAQ from '../components/DAQ';
import {useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    return (
        <div className='Demo flex bg-slate-50 flex-col  items-center justify-center'>
            <SAQ>
            </SAQ >
            <DAQ>
            </DAQ >
        </div >
    );
}

export default Home;