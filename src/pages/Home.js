import React from 'react';
import home_img from '../images/home.png'
import ContentL from '../components/ContentL';
import ContentR from '../components/ContentR';
import {useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    return (
        <div className='Home'>
            <ContentL img={home_img}>
                開源的問卷設計工具!
                <br/>
                自行部署掌握所有東西!
            </ContentL >
            <ContentR img={home_img}>
                查看線上的問卷範本
                <br/>
                <button className='mt-3 myjx-button w-[7rem]' onClick={()=>{navigate('/demo')}}>GO!</button>
            </ContentR >
            <ContentL img={home_img}>
                開始設計你的第一份問卷!
                <br/>
                <button className='mt-3 myjx-button w-[7rem]'>GO!</button>
            </ContentL >
        </div >
    );
}

export default Home;