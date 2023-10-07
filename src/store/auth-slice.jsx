import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState: {email:'', uid:'', token:''},
    reducers: {
        setUser(state,action)
        {
            state.email = action.payload.email
            state.uid = action.payload.uid
            state.token = action.payload.token
        },
    }
})

export default authSlice
export const authActions = authSlice.actions