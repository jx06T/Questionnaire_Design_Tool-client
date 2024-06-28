import React from 'react';
import home_img from '../images/home.png'
import Content from '../components/Content';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    return (
        <div className='Home'>
            <Content img={home_img}>
                開源的問卷設計工具!
                <br />
                <p>自行部署掌握所有東西!</p>
            </Content >
            <Content img={home_img} direction='L'>
                查看線上的問卷範本
                <br />
                <button className='mt-3 myjx-button w-[7rem]' onClick={() => { navigate('/demo') }}>GO!</button>
            </Content >
            <Content img={home_img}>
                開始設計你的第一份問卷!
                <br />
                <button className='mt-3 myjx-button w-[7rem]'>GO!</button>
            </Content >
        </div >
    );
}

export default Home;