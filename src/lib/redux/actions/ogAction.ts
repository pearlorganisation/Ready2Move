import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface OgField {
  _id: string;
  ogType: "property" | "project" | "blog";
  ogTitle: string;
  ogDescription: string;

  ogImage: {
    secure_url: string;
    public_id: string;
  };

  createdAt?: string;
  updatedAt?: string;
}



export const fetchOGFields = createAsyncThunk(
  "og/fetchOGFields",

  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/v1/meta/all");

      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const createOGField = createAsyncThunk(
  "og/createOGField",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/meta/og",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateOGField = createAsyncThunk(
  "og/updateOGField",
  async (
    { id, data }: { id: string; data: FormData },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/meta/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteOGField = createAsyncThunk(
  "og/deleteOGField",

  async (id: string, thunkAPI) => {
    try {
      await axiosInstance.delete(`/api/v1/meta/delete/${id}`);

      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);