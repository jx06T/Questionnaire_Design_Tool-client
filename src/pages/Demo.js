import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import QB from '../components/QuestionBank'
import MB from '../components/MethodBank'


function Home() {
    const navigate = useNavigate();

    return (
        <div className='Demo flex bg-slate-50 flex-col  items-center justify-center'>
            <MB.Block>
                <QB.SAQ>
                </QB.SAQ >
                <QB.DAQ>
                </QB.DAQ >
            </MB.Block>
            <MB.Block>
                <MB.Illustrate>
                </MB.Illustrate>
                <QB.SCQ>
                </QB.SCQ >
                <QB.SCQ>
                </QB.SCQ >
                <QB.MCQ>
                </QB.MCQ >
                <MB.Submit>
                </MB.Submit>
            </MB.Block>
        </div >
    );
}

export default Home;