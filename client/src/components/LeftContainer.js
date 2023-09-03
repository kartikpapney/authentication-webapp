import React from 'react'

function LeftContainer() {
  return (
    <div className='hidden sm:flex flex-col bg-[#404555] w-2/5 h-screen p-2'>
        <div className='flex h-1/2 justify-center items-center'>
          <img src="logo.png" alt='logo'/>
        </div>
        <div className='flex h-1/2 p-2'>
          <div className='flex flex-col-reverse w-full'>
            <img src="pose.png"  alt='pose'/>
          </div>
          <div className='flex flex-col justify-between text-white p-3'>
            <div>
                <p className='font-bold text-4xl'>Welcome Back</p>
                <p className='text-md mt-3'>Sign In to find opportunities that match your interests. We have both part-time and full-time roles that can be done online and in-person.</p> 
            </div>
            <div>
                <p className='text-md'>Please contact us at +91-9380644532 if you need any assistance.</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LeftContainer