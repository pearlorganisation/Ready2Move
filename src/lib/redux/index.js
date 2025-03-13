import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice"

const rootReducer = combineReducers({
    // will add our reducer here
    auth: authReducer
})

export default rootReducer