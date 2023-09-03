import DarkButton from './DarkButton'
import Input from './Input'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import API from '../service/API';
import { useDispatch } from 'react-redux';
import { setModalData } from '../store/modalSlice';
function ResetPassword() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');
    const [password, setPassword] = useState('123456789');
    const [confirmPassword, setConfirmPassword] = useState('123456789');
    const [error, setError] = useState('')
    const [errorKey, setErrorKey] = useState('')
    const dispatch = useDispatch();
    return (
        <>
            <p className='font-bold text-3xl mb-2'>Reset Password</p>
            <p className='text-md mb-2'>Enter new password you haven’t used before</p>
            <Input
                props={{
                    type: "password",
                    placeHolder: "New Password",
                    input: password,
                    setInput: setPassword,
                    key: 'password',
                    error: error,
                    errorKey: errorKey
                }} />
            <Input
                props={{
                    type: "password",
                    placeHolder: "Confirm New Password",
                    input: confirmPassword,
                    setInput: setConfirmPassword,
                    key: 'confirmPassword',
                    error: error,
                    errorKey: errorKey
                }} />
            <DarkButton props={{
                buttonName: "Reset Password",
                onClickFunction: () => {
                    if (password.length < 8) {
                        setError('Password must be atleast 8 characters');
                        setErrorKey('password')
                    } else if (password !== confirmPassword) {
                        setError("Sorry! Password isn't matching");
                        setErrorKey('confirmPassword')
                    } else {
                        API.verify({
                            token: token,
                            password: password
                        },
                            (response) => {
                                dispatch(setModalData({heading: 'Successful', text: response, showModal: true, isError: false, redirectTo:`../signIn`, modalBtnName: 'Sign In'}))
                            },
                            (response) => {
                                dispatch(setModalData({heading: 'Error', text: response, showModal: true, isError: false, redirectTo:`../forgot`, modalBtnName: 'Forgot Password'}))
                            })
                    }

                }
            }} />
        </>
    )
}

export default ResetPassword