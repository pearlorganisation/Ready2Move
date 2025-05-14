import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../actions/blogAction";

// Interfaces
export interface ThumbImage {
  public_id: string;
  secure_url: string;
}

export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbImage: ThumbImage;
  author: Author;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages: number[];
}

export interface BlogState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  blogs: Blog[];
  singleBlog: Blog | null;
  pagination: Pagination | null;
}

const initialState: BlogState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  blogs: [],
  singleBlog: null,
  pagination: null,
};

const BlogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(
        getBlogs.fulfilled,
        (
          state,
          action: PayloadAction<{ data: Blog[]; pagination: Pagination }>
        ) => {
          state.isError = false;
          state.isSuccess = true;
          state.isLoading = false;
          state.blogs = action.payload.data;
          state.pagination = action.payload.pagination;
          toast.success("All Blogs received", {
            position: "top-right",
          });
        }
      )

      // Get Single Blog
      .addCase(getSingleBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlog.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(
        getSingleBlog.fulfilled,
        (state, action: PayloadAction<Blog>) => {
          state.isError = false;
          state.isSuccess = true;
          state.isLoading = false;
          state.singleBlog = action.payload;
          toast.success("Single Blog received", {
            position: "top-right",
          });
        }
      )

      // Add Blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Blog created Successfully", {
          position: "top-right",
        });
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.meta.arg
        );
        toast.success("Blog deleted Successfully", {
          position: "top-right",
        });
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
        toast.success("Blog updated successfully", {
          position: "top-right",
        });
      });
  },
});

export default BlogsSlice.reducer;
