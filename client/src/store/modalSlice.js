import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showModal: false,
        heading: '',
        text: '',
        isError: false,
        redirectTo: '',
        modalBtnName: '',
    },
    reducers: {
        setModalData: (state, action) => {
            return {
                ...{
                    showModal: false,
                    heading: '',
                    text: '',
                    isError: false,
                    redirectTo: '',
                    modalBtnName: ''
                }, ...action.payload
            }
        }
    }
})

export const { setModalData } = modalSlice.actions
export default modalSlice.reducer;