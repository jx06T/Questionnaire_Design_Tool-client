import React, { useState, useRef, useEffect } from 'react';

function HeaderTool({
    handleFileDownload,
    handleFileImport,
    handleRelease,
    handleNew,
    handleSettings,
    handleInfo,
    handleReset,
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
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImport}
                className="hidden w-0"
            />
            <nav className='mt-1 flex-1 w-0'>
                <ul className="flex text-xl">
                    <li className="relative">
                        <button ref={fileBtnRef} onClick={handleFileClick} className="mx-4 p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600">
                            file
                        </button>
                        {showFileMenu && (
                            <ul ref={fileMenuRef} className="absolute left-0 mt-2 w-48 bg-white text-black shadow-sm rounded-md">
                                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"><a href="/preview" target="_blank">Preview</a> </button></li>
                                {handleRelease && <li><button onClick={handleRelease} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Release</button></li>}
                                <li><button onClick={handleBtnClick} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Import</button></li>
                                <li><button onClick={handleFileDownload} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Download</button></li>
                                {handleNew && <li><button onClick={handleNew} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">New</button></li>}
                                {handleReset && <li><button onClick={handleReset} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Reset</button></li>}
                            </ul>
                        )}
                    </li>
                    {handleSettings && <li>
                        <button onClick={handleSettings} className="mx-4 p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600">
                            settings
                        </button>
                    </li>}
                    {handleInfo && <li>
                        <button onClick={handleInfo} className="mx-4 p-1 pr-2 pl-2 rounded-sm border-b border-slate-400 hover:border-slate-600">
                            Info
                        </button>
                    </li>}
                    {!handleInfo && <li className="flex-1 w-0">
                        <span className='scrolling-text text-right block mt-[0.4rem] ml-3 text-base'>這是本地編輯器，不會在雲端建立任何東西，若要建立供其他人填寫的問卷請至
                            <a href='/edit' className=" ml-[2px] text-base mr-2 mt-[0.34rem] underline">
                                此
                            </a>
                        </span>
                    </li>}
                </ul>
            </nav>
        </header>
    );
}

export default HeaderTool;