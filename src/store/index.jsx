import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from './tasks-slice'
import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import respSlice from "./resp-slice";
const store = configureStore({
    reducer:{
        tasks:tasksSlice.reducer,
        UI:uiSlice.reducer,
        auth:authSlice.reducer,
        resp:respSlice.reducer,
    }
})

export default store