import { ForgotEmail } from "@/app/(auth)/forgotpassword/page";
import { ResetPasswordForm } from "@/app/(auth)/resetpassword/page";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

/** for requesting the otp */
export const forgotPassword = createAsyncThunk(
    "send/forgot-password",async(formdata:ForgotEmail,{rejectWithValue})=>{
        try {
            const config ={
             headers:{
                "Content-Type":"Application/json"
             }
            }
            const data = await axiosInstance.post(`/api/v1/auth/forgot-password`,formdata,config)
            return data
        } catch (error) {
            return rejectWithValue(error)            
        }
    }
)

/** for resetting when user is not logged in */
export const resetPasswordFunction = createAsyncThunk(
    "reset/password",async(formdata:ResetPasswordForm,{rejectWithValue})=>{
        try {
            const config={
                headers:{
                    "Content-Type":"Application/json"
                }
            }
            const data = await axiosInstance.patch(`/api/v1/auth/reset-password`,formdata, config)
            return data
        } catch (error) {
           return rejectWithValue(error);           
        }
    }
)

/** for when user is logged in and wants to update the password */

export const updateUserPassword = createAsyncThunk(
    "updated/user-password",async({password}:{password:string},{rejectWithValue})=>{
        try {
            const config ={
                headers:{
          "Content-Type": "application/json",
                }
            }
            const data = await axiosInstance.patch(`/api/v1/users/me`, {password},config)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)