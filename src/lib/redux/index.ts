import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";

const rootReducer = combineReducers({
    auth: authReducer, // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;
