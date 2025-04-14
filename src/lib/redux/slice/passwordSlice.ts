import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, resetPasswordFunction } from "../actions/passwordAction";
interface ResetPassowrd{
    isPasswordReset:boolean;
    isPasswordResetFailed:boolean;
    isPasswordResetLoading:boolean
}

export interface ForgotPassword {
    isLoading:boolean;
    isSuccess:boolean;
    isError:boolean;
    resetPassword: ResetPassowrd ; // for resetting the password
}

const initialState:ForgotPassword ={
    isLoading:false,
    isSuccess:false,
    isError:false,
    resetPassword:{
        isPasswordReset:false,
        isPasswordResetFailed:false,
        isPasswordResetLoading:false
    }
}

const createForgotPasswordSlice = createSlice({
    name:"forgot-password",
    initialState,
    reducers:{
        resetOtpEmail:(state)=>{
            Object.assign(state, initialState)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(forgotPassword.pending,state=>{
            state.isLoading=true
        })
        .addCase(forgotPassword.rejected,state=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
        })
        .addCase(forgotPassword.fulfilled,state=>{
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
        })
        .addCase(resetPasswordFunction.pending,state=>{
            state.resetPassword = state.resetPassword ?? {}
            state.resetPassword.isPasswordResetLoading = true
        })
        .addCase(resetPasswordFunction.rejected,state=>{
            state.resetPassword = state.resetPassword ?? {}
            state.resetPassword.isPasswordReset=false
            state.resetPassword.isPasswordResetLoading=false
            state.resetPassword.isPasswordResetFailed=true
        })
        .addCase(resetPasswordFunction.fulfilled,state=>{
            state.resetPassword = state.resetPassword ?? {}
            state.resetPassword.isPasswordResetLoading= false
            state.resetPassword.isPasswordReset= true
            state.resetPassword.isPasswordResetFailed= false
        })
    }
})

export const { resetOtpEmail } = createForgotPasswordSlice.actions;
export default createForgotPasswordSlice.reducer;