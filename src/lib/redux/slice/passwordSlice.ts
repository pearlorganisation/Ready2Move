import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, resetPasswordFunction, updateUserPassword } from "../actions/passwordAction";
interface ResetPassowrd{
    isPasswordReset:boolean;
    isPasswordResetFailed:boolean;
    isPasswordResetLoading:boolean
}

/** for when the user is logged in */
export interface PasswordUpdated{
    isUpdated:boolean;
    isLoading:boolean;
    isError:boolean;
}
export interface ForgotPassword {
    isLoading:boolean;
    isSuccess:boolean;
    isError:boolean;
    resetPassword: ResetPassowrd ; // for resetting the password when not logged in
    updatedPassword: PasswordUpdated
}

 

const initialState:ForgotPassword ={
    isLoading:false,
    isSuccess:false,
    isError:false,
    resetPassword:{
        isPasswordReset:false,
        isPasswordResetFailed:false,
        isPasswordResetLoading:false
    },
    updatedPassword:{
        isUpdated:false,
        isLoading:false,
        isError:false
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
        .addCase(updateUserPassword.pending,state=>{
            state.updatedPassword = state.updatedPassword ?? {}
            state.updatedPassword.isError=false
            state.updatedPassword.isLoading=true
            state.updatedPassword.isUpdated=false
        })
        .addCase(updateUserPassword.rejected,state=>{
            state.updatedPassword = state.updatedPassword ?? {}
            state.updatedPassword.isError=true
            state.updatedPassword.isLoading=false
            state.updatedPassword.isUpdated=false
        })
        .addCase(updateUserPassword.fulfilled,state=>{
            state.updatedPassword = state.updatedPassword ?? {}
            state.updatedPassword.isError=false
            state.updatedPassword.isLoading=false
            state.updatedPassword.isUpdated=true
        })

    }
})

export const { resetOtpEmail } = createForgotPasswordSlice.actions;
export default createForgotPasswordSlice.reducer;