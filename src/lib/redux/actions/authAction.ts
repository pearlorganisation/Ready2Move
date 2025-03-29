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
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



export const loginUser=createAsyncThunk(
    "login/user",async(userData, {rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }
            const data = await axiosInstance.post(`/api/v1/auth/login`, userData, config)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

