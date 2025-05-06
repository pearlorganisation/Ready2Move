import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

export const createLeads = createAsyncThunk(
  "leads/createLeads",
  async (leadData: any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/leads`,
        leadData,
        config
      );
      toast.success("Lead created successfully!", { position: "top-right" });
      return data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message, {
        position: "top-right",
      });
      return rejectWithValue(
        error.response?.data?.message || "Failed to create lead"
      );
    }
  }
);

export const getAllLeads = createAsyncThunk(
  "leads/getAllLeads",
  async (
    {
      page,
      limit,
      status,
      propertyOrProject,
    }: {
      page: number;
      limit: number;
      status?: string;
      propertyOrProject?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/leads`, {
        params: { page, limit, status, propertyOrProject }, // Use `params` for query parameters
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leads"
      );
    }
  }
);

export const deleteLeadById = createAsyncThunk(
  "leads/deleteLeadById",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/v1/leads/${id}`);
      toast.success("Lead deleted successfully!", { position: "top-right" });
      return id; // Return ID to update state
    } catch (error: any) {
      toast.error("Error deleting lead. Try again!", { position: "top-right" });
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete lead"
      );
    }
  }
);

export const GetUserByRoles = createAsyncThunk(
  "allLeads/getUserByRoles",
  async (
    { page, limit, roles }: { page: number; limit: number; roles: string },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/users?page=${page}&limit=${limit}&roles=${roles}`,
        config
      );
      console.log(data, "data");

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users by role"
      );
    }
  }
);

export const updateLeadById = createAsyncThunk(
  "leads/updateLead",
  async (
    { id, updatedData }: { id: string; updatedData: any },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      alert(JSON.stringify(updatedData));
      const { data } = await axiosInstance.patch(
        `/api/v1/leads/${id}`,
        updatedData,
        config
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update lead"
      );
    }
  }
);
