import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBanner = createAsyncThunk(
  "get/banner",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get("/api/v1/banners", config);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createBanner = createAsyncThunk(
  "create/banner",
  async (formdata: FormData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axiosInstance.post(
        "/api/v1/banners",
        formdata,
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "failed to create banner"
      );
    }
  }
);
export const updateBanner = createAsyncThunk(
  "update/banner",
  async (
    formdata: { bgImage: File | null; id: string | null },
    { rejectWithValue }
  ) => {
    try {
      const { bgImage, id } = formdata;

      if (!id) {
        throw new Error("Banner ID is required");
      }

      const newFormData = new FormData();

      if (bgImage) {
        newFormData.append("bgImage", bgImage);
      }

      const response = await axiosInstance.patch(
        `/api/v1/banners/${id}`,
        newFormData
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update banner"
      );
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "delete/banner",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/banners/${id}`,
        config
      );
      return data;
    } catch (error: any) {
      rejectWithValue(error.response.data.message);
    }
  }
);
