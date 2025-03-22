import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBanner = createAsyncThunk(
    "get/banner",async(_,{rejectWithValue})=>{
        try {
            const config  ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get('/api/v1/banners', config)
            return data
        } catch (error) {
          return rejectWithValue(error)            
        }
    }
)

