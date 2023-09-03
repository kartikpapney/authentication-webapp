import {configureStore} from '@reduxjs/toolkit'
import modalReducer from './modalSlice';
import tokenReducer from './tokenSlice'
const appStore = configureStore({
    reducer: {
        modal: modalReducer,
        token: tokenReducer
    }
})
export default appStore;