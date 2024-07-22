import React from 'react';
// import home_img from '../images/home.png'
import frog1 from '../images/frog1.png'
import frog2 from '../images/frog2.png'
import frog3 from '../images/frog3.png'
import Content from '../components/Content';
// import { useNavigate } from 'react-router-dom';


function Home() {
    // const navigate = useNavigate();
    return (
        <div className='Home max-w-[1100px] mx-auto bg-slate-50'>
            <Content img={frog1}>
                開源的問卷設計工具!
                <br />
                <p>自行部署掌握所有東西!</p>
            </Content >
            <Content img={frog2} direction='L'>
                查看線上的問卷範本
                <br />
                <button className='mt-3 myjx-button w-[7rem]'><a className='w-full h-full block' href='/demo'>GO!</a></button>
            </Content >
            <Content img={frog3}>
                開始設計你的第一份問卷!
                <br />
                <button className='mt-3 myjx-button w-[7rem]'><a className='w-full h-full block' href='/edit'>GO!</a></button>
            </Content >
        </div >
    );
}

export default Home;