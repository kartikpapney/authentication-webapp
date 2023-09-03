import React from 'react'

function DarkButton({ props }) {
    const {buttonName, onClickFunction} = props;
    return (
        <button 
        className="bg-[#F1C12B] w-full hover:bg-[#f6bd11] text-black font-bold py-2 px-4 rounded mb-2"
        onClick={onClickFunction}>
            {buttonName}
        </button>
    )
}

export default DarkButton