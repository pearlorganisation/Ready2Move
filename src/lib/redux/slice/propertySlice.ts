import { createSlice } from "@reduxjs/toolkit";
import {
  createPropertyByAdmin,
  getAllProperties,
  getSingleProperty,
} from "../actions/propertyAction";
import { Paginate } from "@/lib/util/paginateInterface";
import { getSingleProject } from "../actions/projectAction";
interface Property {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  propertyData: any[];
  paginate: Paginate;
}

const initialState: Property = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  propertyData: [],
  paginate: {
    total: 0,
    current_page: 0,
    limit: 0,
    next: null,
    prev: null,
    pages: [],
  },
};
const createPropertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPropertyByAdmin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createPropertyByAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(createPropertyByAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getAllProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.propertyData = [];
        state.paginate = {
          total: 0,
          current_page: 0,
          limit: 0,
          next: null,
          prev: null,
          pages: [],
        };
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.propertyData = action.payload.data;
        state.paginate = action.payload.pagination;
      })

      .addCase(getSingleProperty.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.propertyData = action.payload.data;
      })
      .addCase(getSingleProperty.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.propertyData = [];
      });
  },
});

export default createPropertySlice.reducer;
