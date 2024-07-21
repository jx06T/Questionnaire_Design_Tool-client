import React, { useState, useRef, useEffect } from 'react';

function HeaderTool({
    handleFileDownload,
    handleFileImport,
    handleRelease,
    handleNew,
    handleSettings,
    handleInfo,
}) {
    const [showFileMenu, setShowFileMenu] = useState(false);
    const fileInputRef = useRef(null);
    const fileMenuRef = useRef(null);
    const fileBtnRef = useRef(null);

    const handleFileClick = () => {
        setShowFileMenu(!showFileMenu);
    };

    const handleBtnClick = () => {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
    };

    useEffect(() => {
        const handleAnyClick = (event) => {
            if (event.target != fileMenuRef.current && event.target != fileBtnRef.current) {
                setShowFileMenu(false);
            }
        };
        window.addEventListener('click', handleAnyClick);
        return () => {
            window.removeEventListener('click', handleAnyClick);
        };
    })

    return (
        <header className="bg-slate-500 p-4 text-white flex justify-between rounded-b-md">
            <nav className='mt-1 flex'>
                <ul className="flex text-center text-xl">
                    <li className="relative">
                        <button ref={fileBtnRef} onClick={handleFileClick} className="mx-4 p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600">
                            file
                        </button>
                        {showFileMenu && (
                            <ul ref={fileMenuRef} className="absolute left-0 mt-2 w-48 bg-white text-black shadow-sm rounded-md">
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"><a href="/preview" target="_blank">Preview</a> </button></li>
                                <li><button onClick={handleRelease} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Release</button></li>
                                <li><button onClick={handleBtnClick} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Import</button></li>
                                <li><button onClick={handleFileDownload} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Download</button></li>
                                <li><button onClick={handleNew} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">New</button></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button onClick={handleSettings} className="mx-4 p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600">
                            settings
                        </button>
                    </li>
                    <li>
                        <button onClick={handleInfo} className="mx-4 p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600">
                            Info
                        </button>
                    </li>
                </ul>
            </nav>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImport}
                className="hidden"
            />
        </header>
    );
}

export default HeaderTool;