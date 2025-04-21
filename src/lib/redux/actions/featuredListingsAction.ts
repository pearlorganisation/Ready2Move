import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getFeaturedListings = createAsyncThunk(
  "get/featuredListings",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get("/api/v1/featured", config);
      return data.data;
    } catch (error) {
      toast.error("Failed to fetch featured listings", {
        position: "top-right",
      });
      return rejectWithValue(error);
    }
  }
);
