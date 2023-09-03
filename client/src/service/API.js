
const URL = {
    SIGNIN: `${process.env.REACT_APP_API_KEY}/auth/signin`,
    SIGNUP: `${process.env.REACT_APP_API_KEY}/auth/signup`,
    VERIFY: `${process.env.REACT_APP_API_KEY}/auth/verify`,
    HOME: `${process.env.REACT_APP_API_KEY}/`,
    FORGOT: `${process.env.REACT_APP_API_KEY}/auth/forgot`,
}

const signIn = async function (params, setSuccess, setError) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    };

    await fetch(URL.SIGNIN, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status === 200) {
                setSuccess(response.message.token);
            } else {
                setError(Array.isArray(response.message) ? response.message[0] : response.message);
            }
        })
}

const signUp = async function (params, setSuccess, setError) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    };

    await fetch(URL.SIGNUP, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status === 201) {
                setSuccess(response.message.token);
            } else {
                setError(response.message);
            }
        })
}

const verify = async function (params, setSuccess, setError) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    };

    await fetch(URL.VERIFY, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status === 200) {
                setSuccess(response.message);
            } else {
                setError(response.message);
            }
        })
}

const forgot = async function (params, setSuccess, setError) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    };

    await fetch(URL.FORGOT, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status === 200) {
                setSuccess(response.message.token);
            } else {
                setError(Array.isArray(response.message) ? response.message[0] : response.message);
            }
        })
}

const home = async function (params, setSuccess, setError) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': params
        }
    };

    await fetch(URL.HOME, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status === 200) {
                setSuccess(response.message);
            } else {
                setError(response.message);
            }
        })
}

const API = {
    signIn,
    signUp,
    verify,
    forgot,
    home
}

export default API