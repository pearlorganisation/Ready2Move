import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import otpReducer from "./slice/authSlice"
const rootReducer = combineReducers({
    auth: authReducer, // Add other reducers here
    otp: otpReducer
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;
