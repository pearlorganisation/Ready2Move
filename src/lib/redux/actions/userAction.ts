import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "login/user",async(loginData,{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.post(`/api/v1/auth/login`, loginData, config)
            return data
        } catch (error) {
          return rejectWithValue(error)           
         }
    }
)

