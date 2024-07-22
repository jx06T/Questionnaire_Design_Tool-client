import React, { useState } from "react";
import { FileDuplicate, IcRoundStar, IcBaselineDelete, ArrowDownwardRounded, ArrowUpwardRounded } from '../Icons';

function Buttons({ ShowRequired, defaultValue, handleDuplicate, handleRequired, handleDelete, handleUp, handleDown, id }) {
    const [required, setRequired] = useState(defaultValue)
    const handleRequiredI = () => {
        handleRequired(id, !required)
        setRequired(!required)
    }
    return (
        <div className="flex space-x-3 justify-end -mb-3">
            {ShowRequired &&
                <button
                    onClick={handleRequiredI}
                    className={`bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center ${required ? "text-red-600 hover:text-red-700" : "text-stone-600 hover:text-stone-700"}`}
                ><IcRoundStar /></button>
            }
            <button
                onClick={() => handleDelete(id)}
                className="bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center text-red-800 hover:text-red-900"
            ><IcBaselineDelete /></button>
            <button
                onClick={(e) => handleDuplicate(id, e)}
                className="bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center text-blue-600 hover:text-blue-700"
            ><FileDuplicate /></button>
            <button
                onClick={(e) => handleDown(id, e)}
                className="bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center text-blue-600 hover:text-blue-800"
            ><ArrowDownwardRounded /></button>
            <button
                onClick={() => handleUp(id)}
                className="bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center text-blue-600 hover:text-blue-800"
            ><ArrowUpwardRounded /></button>
        </div>
    )
}

export default Buttons