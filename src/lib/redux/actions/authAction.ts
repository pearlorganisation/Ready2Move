import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../constants/axiosInstance"
export const registerUser=createAsyncThunk(
    "register/user",async(userData, {rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }
            const data = await axiosInstance.post(`/api/v1/auth/register`, userData, config)
        } catch (error) {
            
        }
    }
)