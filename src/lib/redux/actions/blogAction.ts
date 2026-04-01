import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBlogs = createAsyncThunk(
  "blogs/getAll",
  async (
    // 1. Added sort?: string here
    { page, limit, sort }: { page: number; limit: number; sort?: string },
    { rejectWithValue }
  ) => {
    try {
      // 2. Build the URL dynamically to include sort if it exists
      let url = `/api/v1/blogs?page=${page}&limit=${limit}`;
      if (sort) {
        url += `&sort=${sort}`;
      }

      const { data } = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data; 
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch blogs.";
      return rejectWithValue(message);
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
        error.response?.data?.message || "failed to create blog"
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
  async (id: string, { rejectWithValue }) => {
    try {
      // Note: Delete usually doesn't need multipart/form-data
      await axiosInstance.delete(`/api/v1/blogs/${id}`);
      return id;
    } catch (error: any) {
      // IMPORTANT: Added 'return' here, otherwise Redux won't catch the error properly
      return rejectWithValue(error.response?.data?.message || "Failed to delete");
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "get/single-blog",
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/blogs/${slug}`);
      return data.data;
    } catch (error: any) {
      // IMPORTANT: Added 'return' here
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blog");
    }
  }
);