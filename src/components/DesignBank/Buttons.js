import React, { useState } from "react";
import { IcRoundStar, IcBaselineDelete, ArrowDownwardRounded, ArrowUpwardRounded } from '../Icons';

function Buttons({ handlerequired, handleDelete, handleUp, handleDown, id }) {
    const [required, setRequired] = useState(null)
    const handlerequiredI = () => {
        handlerequired(id,!required)
        setRequired(!required)
    }
    return (
        <div className="flex space-x-3 justify-end -mb-3">
            <button
                onClick={handlerequiredI}
                className={`bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center ${required ? "text-red-600 hover:text-red-700" : "text-stone-600 hover:text-stone-700"}`}
            ><IcRoundStar /></button>
            <button
                onClick={() => handleDelete(id)}
                className="bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center text-red-800 hover:text-red-900"
            ><IcBaselineDelete /></button>
            <button
                onClick={() => handleDown(id)}
                className="bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center text-blue-600 hover:text-blue-900"
            ><ArrowDownwardRounded /></button>
            <button
                onClick={() => handleUp(id)}
                className="bg-slate-300 text-2xl w-8 h-8 rounded-[50%] flex items-center justify-center text-blue-600 hover:text-blue-900"
            ><ArrowUpwardRounded /></button>
        </div>
    )
}

export default Buttons