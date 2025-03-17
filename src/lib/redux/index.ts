import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import otpReducer from "./slice/otpVerificationSlice"
import userReducer from "./slice/userSlice"
const rootReducer = combineReducers({
    auth: authReducer, // Add other reducers here
    otp: otpReducer,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;
