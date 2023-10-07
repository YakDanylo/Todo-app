import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name:'UI',
    initialState:{isModalOpen:false},
    reducers:{
        showModal(state)
        {
            state.isModalOpen = true
        },
        hideModal(state)
        {
            state.isModalOpen = false
        }
    }
})

export default uiSlice;
export const uiActions = uiSlice.actions