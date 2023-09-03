import React, { useState } from 'react'
import Input from './Input'
import Button from './DarkButton'
import { Link } from 'react-router-dom'
import API from '../service/API'
import { useDispatch } from 'react-redux';
import { setModalData } from '../store/modalSlice'

function SignUp() {

    const [fname, setFname] = useState('ABC');
    const [lname, setLname] = useState('DEF');
    const [email, setEmail] = useState('abc.def@gmail.com');
    const [password, setPassword] = useState('123456789');
    const [mobileNo, setMobileNo] = useState('+9112345678');
    const [error, setError] = useState('');
    const [errorKey, setErrorKey] = useState('')
    const dispatch = useDispatch();

    return (
        <>
            <p className='font-bold text-3xl mb-2'>Create an account</p>
            <p className='text-md mb-2'>Already have an account? <span className='text-blue-600'><Link to="../signin">Sign In</Link></span></p>
            <Input
                props={{
                    type: "text",
                    placeHolder: "First Name",
                    setInput: setFname,
                    input: fname,
                    key: 'fname',
                    error: error,
                    errorKey: errorKey
                }} />
            <Input
                props={{
                    type: "text",
                    placeHolder: "Last Name",
                    setInput: setLname,
                    input: lname,
                    key: 'lname',
                    error: error,
                    errorKey: errorKey
                }} />
            <Input
                props={{
                    type: "text",
                    placeHolder: "Email Address",
                    setInput: setEmail,
                    input: email,
                    key: 'email',
                    error: error,
                    errorKey: errorKey
                }} />
            <Input
                props={{
                    type: "text",
                    placeHolder: "Mobile No",
                    setInput: setMobileNo,
                    input: mobileNo,
                    key: 'mobileNo',
                    error: error,
                    errorKey: errorKey
                }} />
            <Input
                props={{
                    type: "password",
                    placeHolder: "Password",
                    setInput: setPassword,
                    input: password,
                    key: 'password',
                    error: error,
                    errorKey: errorKey
                }} />
            <p className='mb-4'>By clicking Sign Up you are indicating that you have read and acknowledged the <span className='text-blue-600'>Terms of Service</span> and <span className='text-blue-600'>Privacy Notice</span></p>
            <Button props={{
                buttonName: "Sign Up",
                onClickFunction: () => {
                    API.signUp({
                        fname: fname,
                        lname: lname,
                        email: email,
                        password: password,
                        mobileNo: mobileNo
                    }, (token) => {
                        dispatch(setModalData({heading: 'Verify Email', text: 'Please verify your account. We have sent an email to arkomaini@gmail.com. If you are unable to find the verification email please contact us at: +91-9380644532', showModal: true, isError: false, redirectTo:`../verify?token=${token}`, modalBtnName: 'Verify'}))
                    }, (error) => {
                        if(error.mobileNo) {
                            setError(error.mobileNo)
                            setErrorKey('mobileNo')
                        } else if(error.email) {
                            setError(error.email)
                            setErrorKey('email')
                        } else if(error.password) {
                            setError(error.password)
                            setErrorKey('password')
                        } else {
                            setError('')
                            setErrorKey('')
                            dispatch(setModalData({heading: 'Error', text: error, showModal: true, isError: true, verify: ''}))
                        }
                        
                    })
                }
            }} />
        </>


    )
}

export default SignUp