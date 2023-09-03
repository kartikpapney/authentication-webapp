import React, { useState } from 'react'
import Input from './Input'
import Button from './DarkButton'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import API from '../service/API';
import { setModalData } from '../store/modalSlice';
import { setToken } from '../store/tokenSlice';


function SignIn() {

    const [id, setId] = useState('abc.def@gmail.com');
    const [password, setPassword] = useState('123456789');
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const [errorKey, setErrorKey] = useState('')
    const navigate = useNavigate();
    return (
        <>
            <p className='font-bold text-3xl mb-2'>Sign In to WisdomCircle</p>
            <p className='text-md mb-2'>
                Don’t have an account? <span className='text-blue-600'>
                    <Link to="../signup">Sign Up</Link>
                </span>
            </p>
            <Input
                props={{
                    type: "text",
                    placeHolder: "Email or Mobile Number",
                    input: id,
                    key: 'id',
                    error: error,
                    errorKey: errorKey,
                    setInput: setId
                }} />
            <Input
                props={{
                    type: "password",
                    placeHolder: "Password",
                    input: password,
                    key: 'password',
                    error: error,
                    errorKey: errorKey,
                    setInput: setPassword
                }} />
            <p className='text-right mb-4'><span className='text-blue-600'><Link to="../forgot">Forgot Password</Link></span></p>
            <Button props={{
                buttonName: "Sign In",
                onClickFunction: () => {
                    API.signIn({
                        id: id,
                        password: password
                    }, (token) => {
                        dispatch(setToken({ token }))
                        navigate('../');
                    }, (error) => {
                        if (error.id) {
                            setErrorKey('id')
                            setError(error.id)
                        } else if (error.password) {
                            setErrorKey('password')
                            setError(error.password)
                        } else {
                            setErrorKey('')
                            dispatch(setModalData({ heading: 'Error', text: error, showModal: true, isError: true }))
                        }
                    })
                }
            }} />
        </>
    )
}

export default SignIn