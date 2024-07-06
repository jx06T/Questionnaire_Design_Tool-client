import React, { useState, useRef, useEffect } from 'react';

function DDM({ options, callback }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("type ▼");
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (buttonRef.current && !buttonRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        setIsOpen(false);
        callback(option.value);
        setSelectedItem(option.label + " ▼");
    };

    const toggleDropdown = () => {
        if (!isOpen) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const spaceAbove = buttonRect.top;
            const dropdownHeight = options.length * 25; // 估算下拉菜單高度

            if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
                setDropdownPosition('bottom');
            } else {
                setDropdownPosition('top');
            }
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative h-9">
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="bg-slate-200 w-20 p-1 rounded-md text-center hover:bg-slate-300 mb-0"
            >
                {selectedItem}
            </button>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`z-50 absolute ${dropdownPosition === 'bottom' ? 'top-full' : 'bottom-full'} left-0 w-20 mt-0 bg-white border border-gray-300 rounded-md `}
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="p-2 hover:bg-slate-100 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DDM;