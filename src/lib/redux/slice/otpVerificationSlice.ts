import { createSlice } from "@reduxjs/toolkit"
import { verifyOtp } from "../actions/otpAction"
interface OtpState{
    isLoading: boolean,
    isSuccess: boolean,
    isError:boolean
}

const initialState:OtpState ={
     isLoading:false,
     isSuccess:false,
     isError:false
}



const verificationSlice = createSlice({
name:"otpverification",
initialState,
reducers:{},
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

export default verificationSlice.reducer