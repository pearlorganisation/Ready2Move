import { createSlice } from "@reduxjs/toolkit"
import { registerUser } from "../actions/authAction"
interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const initialState:AuthState = {
    isLoading : false,
    isError: false,
    isSuccess: false,
}

const registerSlice = createSlice({
    name: "registerUser",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, state=>{
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
        })
    }
})


export default registerSlice.reducer