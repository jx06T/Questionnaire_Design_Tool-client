import { Fragment } from "react";
import React, { useState, useEffect, useRef } from 'react';

function HeaderTool({ handleFileDownload, handleFileImport }) {
    const fileInputRef = useRef(null);
    const handleBtnClick = () => {
        fileInputRef.current.click()
    }

    return (
        <Fragment >
            <header className="bg-slate-500 p-4 text-white flex justify-center rounded-md">
                <nav className='mt-1 flex justify-center'>
                    <ul className="flex space-x-24 text-center text-xl">
                        <li><a href="/preview" target="_blank" className="p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600">Preview</a></li>
                        <li><a onClick={handleFileDownload} target="_blank" className="p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600 cursor-pointer">Download</a></li>
                        <li><a onClick={handleBtnClick} className="p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600 cursor-pointer">Import</a></li>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileImport}
                            className="hidden"
                        />
                    </ul>
                </nav>
            </header>

        </Fragment>
    );
}

export default HeaderTool;
