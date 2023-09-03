import React from 'react'

function LightButton({props}) {
    const {buttonName} = props;
    return (
        <button className="bg-white w-full border-[#c79e24] border-2 text-[#c79e24] font-bold py-2 px-4 rounded mb-2">
            {buttonName}
        </button>
    )
}

export default LightButton