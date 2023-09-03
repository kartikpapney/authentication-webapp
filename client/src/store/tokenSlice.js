import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        token: localStorage.getItem('token')
    },
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload.token)
            return {...state, ...{token: localStorage.getItem('token')}};
        },
        clearToken: (state, action) => {
            localStorage.removeItem('token');
            return {...state, ...{token: ''}}
        }
    }
})

export const { setToken, clearToken } = tokenSlice.actions
export default tokenSlice.reducer;