import React from 'react';
import MB from '../../components/MethodBank';

const description =
    `
- instagram : [Jasper_Jx06（@jx06_t）](https://www.instagram.com/jx06_t/)
- email : 50313tjx06@gmail.com

我們會盡快回應您的請求。

*2024/7/22*`

function Contact() {
    return (
        <>
            <div className='edit-home flex bg-slate-50 flex-col items-center justify-center'>
                <MB.Title subtitle="JXQDT" title="Contact"></MB.Title>
                <MB.Description description={description} title="聯絡我們"></MB.Description>
            </div>
        </>
    );
}

export default Contact;
