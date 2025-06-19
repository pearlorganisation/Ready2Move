import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, loginUser, registerUser } from "../actions/authAction";
interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  users: any[];
  pagination: Paginate;
}
interface Paginate {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages: number[]; // this can be removed if you're calculating total pages
}
const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  users: [],
  pagination: {
    total: 0,
    current_page: 0,
    limit: 0,
    next: null,
    prev: null,
    pages: [],
  },
};

const registerSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {
    resetRegister: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getAllUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
