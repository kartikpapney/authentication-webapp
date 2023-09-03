import React, { useState } from 'react'
import DarkButton from './DarkButton'
import LightButton from './LightButton'
import Input from './Input'
import { Link } from 'react-router-dom'
import API from '../service/API'
import { useDispatch } from 'react-redux'
import { setModalData } from '../store/modalSlice'
function ForgotPassword() {
    const [email, setEmail] = useState('abc.def@gmail.com')
    const [error, setError] = useState('')
    const [errorKey, setErrorKey] = useState('')
    const dispatch = useDispatch();
    return (
        <>
            <p className='font-bold text-3xl mb-2'>Forgot Password</p>
            <p className='text-md mb-2'>We’ll send you a reset password link to your registered email address</p>
            <Input
                props={{
                    type: "text",
                    placeHolder: "Registered Email",
                    input: email,
                    setInput: setEmail,
                    key: 'email',
                    error: error,
                    errorKey: errorKey
                }} />
            <DarkButton props={{
                buttonName: "Email me a recovery link",
                onClickFunction: () => {
                    API.forgot({
                        email: email
                    }, (token) => {
                        dispatch(setModalData({heading: 'Reset Password', text: 'Thank you! We have sent you a link to reset your password. Please check your email.', showModal: true, isError: false, redirectTo:`../reset?token=${token}`, modalBtnName: 'Verify'}))
                    }, (error) => {
                        if (error.email) {
                            setErrorKey('email')
                            setError(error.email)
                        } else {
                            setErrorKey('')
                            dispatch(setModalData({ heading: 'Error', text: error, showModal: true, isError: true }))
                        }
                    })
                }
            }} />
            <Link to="../signin">
                <LightButton props={{
                    buttonName: "Return to sign In"
                }} />
            </Link>
        </>
    )
}

export default ForgotPassword