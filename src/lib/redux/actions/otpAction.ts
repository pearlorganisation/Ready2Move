import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface verification {
    otp: number,
    email:string
}
export const verifyOtp = createAsyncThunk(
    "verify/otp",async(userData:verification,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }

            const { data } = await axiosInstance.post(`/api/v1/auth/verify-otp`,userData, config)
            console.log("the daata is", data)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)