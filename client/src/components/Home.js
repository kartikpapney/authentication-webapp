import React, { useEffect, useState } from 'react'
import Button from './DarkButton';
import { Link } from 'react-router-dom';
import API from '../service/API';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../store/tokenSlice';
function Home() {
    const token = useSelector((store) => store.token.token)
    const [authorized, setAuthorized] = useState(false);
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(false)
        API.home(
            token,
            (response) => {
                setLoading(true)
                setAuthorized(true);
                setMessage(response)
            },
            (response) => {
                setLoading(true)
                setAuthorized(false);
                setMessage(response);
            })
    }, [token])
    if(!loading) return;
    return (
        <div>
            <p className='font-bold text-4xl mb-2'>Welcome to WisdomCircle</p>
            {
                authorized
                    ?
                    <div>
                        <p className='text-xl mb-2'>{message}</p>
                        <Button props={{
                            buttonName: "Sign Out",
                            onClickFunction: () => {
                                dispatch(clearToken());
                            }
                        }} />
                    </div>
                    :
                    <div>
                        <p className='text-xl mb-2'>You are unauthorized</p>
                        <Link to="./signin">
                            <Button props={{
                                buttonName: "Sign In"
                            }} />
                        </Link>
                        <Link to="./signup">
                            <Button props={{
                                buttonName: "Sign Up"
                            }} />
                        </Link>

                    </div>
}</div>
        
    )
}

export default Home