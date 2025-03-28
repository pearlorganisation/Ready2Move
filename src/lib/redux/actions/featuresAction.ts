import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFeatures = createAsyncThunk(
    "create/feature",async(formdata,{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get('/api/v1/features', config)
            return data
        } catch (error) {
          return rejectWithValue(error)            
        }
    }
)