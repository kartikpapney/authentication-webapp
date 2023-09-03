import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Verification from './Verification';
import NotFound from './NotFound';
import Modal from './Modal';
function RightContainer() {
    return (
        <div className='flex flex-col flex-grow justify-center items-center'>
            <div className='flex sm:hidden justify-center'>
                    <img src="/logo2.png" alt="logo"/>
                </div>
            <div className='p-2 sm:w-1/2'>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/forgot' element={<ForgotPassword />} />
                        <Route path='/reset' element={<ResetPassword />} />
                        <Route path='/verify' element={<Verification />} />
                        <Route path="/*" element={<NotFound/>}/>
                    </Routes>
                    <Modal/>
                </Router>
            </div>
        </div>

    )
}

export default RightContainer