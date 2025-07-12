import { UserData } from "@/components/DetailsModal";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "login/user",
  async (loginData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/auth/login`,
        loginData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/users/me`);
      console.log("the returned by the action is", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/** for updating the user */

export const updateUser = createAsyncThunk(
  "update/profile",
  async ({ userdata }: { userdata: UserData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axiosInstance.patch(
        `/api/v1/users/me`,
        userdata,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "Application/json",
        },
      };
      const data = await axiosInstance.post(`/api/v1/auth/logout`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DelUserData = createAsyncThunk(
  "delete/UserData",
  async (id: string, { rejectWithValue }) => {
    console.log("iddd", id);
    try {
      const { data } = await axiosInstance.delete(`/api/v1/users/${id}`);

      toast.success("User deleted successfully ✅"); // ✅ Toast here
      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "User deletion failed";

      toast.error(message); // ❌ Error toast
      return rejectWithValue(message);
    }
  }
);
