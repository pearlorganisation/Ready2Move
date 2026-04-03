import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API = "/api/v1/localities";

export const getLocalities = createAsyncThunk(
  "locality/getAll",
  async ({ page, limit }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${API}/get-localities`, { params: { page, limit } });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch");
    }
  }
);

export const createLocality = createAsyncThunk(
  "locality/create",
  async (locality: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API}/create-locality`, { locality });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Duplicate or Invalid Locality");
    }
  }
);

export const updateLocality = createAsyncThunk(
  "locality/update",
  async ({ id, locality }: { id: string; locality: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API}/update-locality/${id}`, { locality });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const deleteLocality = createAsyncThunk(
  "locality/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API}/delete-locality/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);