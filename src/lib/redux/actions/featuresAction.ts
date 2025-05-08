import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const getFeatures = createAsyncThunk(
    "get/feature",
    async (formdata, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const { data } = await axiosInstance.get("/api/v1/features", config);
        return data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || error.message || "Something went wrong";
        return rejectWithValue(message);
      }
    }
  );
  
  export const createFeature = createAsyncThunk(
    "create/feature",
    async (data1, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const { data } = await axiosInstance.post("/api/v1/features", data1, config);
        return data;
      } catch (error: any) {
        console.log(error)
        const message =
          error?.response?.data?.message || error.message || "Something went wrong";
        return rejectWithValue(message);
      }
    }
  );


// featuresAction.ts
export const updateFeature = createAsyncThunk(
    "features/updateFeature",
    async (updatedFeature: { id: string; name: string; type: string }) => {
      const response = await axiosInstance.patch(`/api/v1/features/${updatedFeature.id}`, updatedFeature)
      return response.data
    }
  )
  
  export const deleteFeatures = createAsyncThunk(
    "features/delete",
    async (id:string) => {
      console.log("id,cde",id)
      const response = await axiosInstance.delete(`/api/v1/features/${id}`)
      return response.data
    }
  )
  