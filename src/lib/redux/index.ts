import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import otpReducer from "./slice/otpVerificationSlice"
import userReducer from "./slice/userSlice"
import bannerReducer  from "./slice/bannerSlice"
import featureReducer from "./slice/featuresSlice"
import projectReducer from "./slice/projectSlice"
const rootReducer = combineReducers({
    auth: authReducer, // Add other reducers here
    otp: otpReducer,
    user: userReducer,
    banner: bannerReducer,
    features: featureReducer,
    projects:projectReducer
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;
