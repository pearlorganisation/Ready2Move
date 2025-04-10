import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getDashboardData = createAsyncThunk("getDashboard/data",async(_,{rejectWithValue})=>{

    try{
    const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        const{data}= await axiosInstance.get(`/api/v1/dashboard/metrics`,config)
        return data
    }catch(error:any){

        return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard data");
    }
}
)