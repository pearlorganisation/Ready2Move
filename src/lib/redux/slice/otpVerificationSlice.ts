import { createSlice } from "@reduxjs/toolkit"
import { verifyOtp } from "../actions/otpAction"
interface OtpState{
    isLoading: boolean,
    isSuccess: boolean,
    isError:boolean,
    // isPasswordReset:boolean
}

const initialState:OtpState ={
     isLoading:false,
     isSuccess:false,
     isError:false,
    //  isPasswordReset:false
}



const verificationSlice = createSlice({
name:"otpverification",
initialState,
reducers:{
    resetOtpState:(state)=>{
        Object.assign(state, initialState)
    }
},
extraReducers:(builder)=>{
    builder
    .addCase(verifyOtp.pending,state=>{
        state.isLoading= true
        state.isSuccess=false
        state.isError= false
    })
    .addCase(verifyOtp.rejected,(state,action)=>{
        state.isLoading= false
        state.isSuccess=false
        state.isError= true
       })
    .addCase(verifyOtp.fulfilled,(state,action)=>{
        state.isLoading= false
        state.isSuccess=true
        state.isError= false
    })
  }
})
export const { resetOtpState } = verificationSlice.actions;
export default verificationSlice.reducer