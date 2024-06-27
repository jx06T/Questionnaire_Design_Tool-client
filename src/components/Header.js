import { Fragment } from "react";
import React, { useState, useEffect, useRef } from 'react';

function Header() {
    const [showOther, setShowOther] = useState(false);
    const headerRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleOther = () => {
        setShowOther(!showOther);
    };
    const hideOther = () => {
        setShowOther(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                hideOther();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Fragment >
            <header className="bg-slate-500 p-4 text-white flex justify-between rounded-md">
                <h2 className="text-2xl mr-5">Questionnaire Design Tool</h2>
                <nav className='hidden sm:block md:block lg:block mt-1'>
                    <ul className="flex space-x-4 text-right ">
                        <li><a href="/" className="p-1 pr-2 pl-2 rounded-md  hover:bg-slate-600">Home</a></li>
                        <li><a href="/about" className="p-1 pr-2 pl-2 rounded-md  hover:bg-slate-600">About</a></li>
                        <li><a href="/contact" className="p-1 pr-2 pl-2 rounded-md  hover:bg-slate-600">Contact</a></li>
                    </ul>
                </nav>
                <button ref={buttonRef} onClick={toggleOther} className='w-9 h-8 rounded-md sm:hidden mr-2 hover:bg-slate-600'><p style={{ fontSize: "2em", lineHeight: "0px", marginBottom: "0.2em" }}>≡</p></button>
            </header>
            {showOther && (
                <div ref={headerRef} className="bg-slate-500  text-white w-24 h-[7.5rem] top-20 right-3 absolute rounded-md ">
                    <ul className="flex flex-col text-center">
                        <li className="mt-3"><a href="/" className="p-1 pr-3 pl-3 rounded-md  hover:bg-slate-600">Home</a></li>
                        <li className="mt-3"><a href="/about" className="p-1 pr-3 pl-3 rounded-md  hover:bg-slate-600">About</a></li>
                        <li className="mt-3"><a href="/contact" className="p-1 pr-3 pl-3 rounded-md  hover:bg-slate-600">Contact</a></li>
                    </ul>
                </div>
            )}
        </Fragment>
    );
}

export default Header;
