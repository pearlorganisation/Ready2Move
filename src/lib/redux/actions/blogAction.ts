import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBlogs = createAsyncThunk(
  "get/blogs",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get("/api/v1/blogs", config);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  "create/blog",
  async (formdata: FormData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axiosInstance.post(
        "/api/v1/blogs",
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

export const updateBlog = createAsyncThunk(
  "update/blog",
  async (
    {
      slug,
      updatedData,
    }: {
      slug: string | undefined;
      updatedData: FormData;
    },
    { rejectWithValue }
  ) => {
    try {
      if (!slug) {
        throw new Error("Blog Slug is required");
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosInstance.patch(
        `/api/v1/blogs/${slug}`,
        updatedData,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update blog"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "delete/blog",
  async (id:string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/blogs/${id}`,
        config
      );
      return id;
    } catch (error: any) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "get/single-blog",
  async (slug: string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/api/v1/blogs/${slug}`, config);
      return data.data;
    } catch (error: any) {
      rejectWithValue(error.response.data.message);
    }
  }
);
