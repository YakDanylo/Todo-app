import { createSlice } from "@reduxjs/toolkit";

const respSlice = createSlice({
    name:'resp',
    initialState: {wasClicked:false},
    reducers: {
        wasClicked(state)
        {
            state.wasClicked = !state.wasClicked
        }
    }
})

export default respSlice
export const respActions = respSlice.actions