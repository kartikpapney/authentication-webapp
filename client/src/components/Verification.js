import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import API from '../service/API';
import DarkButton from './DarkButton';

function Verification() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');

    const [msg, setMsg] = useState('');
    useEffect(() => {
        API.verify({
            token: token
        },
            (response) => {
                setMsg(response)
            },
            (response) => {
                setMsg(response)
            })
    }, [token]);
    return (
        msg
            ?
            <div>
                <p className='text-xl mb-2 text-center'>{msg}</p>
                <Link to='../signin'>
                    <DarkButton props={{
                        buttonName: "Sign In",
                    }} />
                </Link>
            </div>
            :
            <></>
    )
}

export default Verification