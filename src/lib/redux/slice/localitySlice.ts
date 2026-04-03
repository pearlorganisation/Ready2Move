import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  getLocalities,
  createLocality,
  updateLocality,
  deleteLocality,
} from "../actions/localityAction";

// Interface
export interface Locality {
  _id: string;
  locality: string; 
  createdAt?: string;
}

// Pagination (same as your blog)
export interface Pagination {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages: number[];
}

export interface LocalityState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  localities: Locality[];
  pagination: Pagination | null;
}

const initialState: LocalityState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  localities: [],
  pagination: {
    total: 0,
    current_page: 0,
    limit: 0,
    next: null,
    prev: null,
    pages: [],
  },
};

const localitySlice = createSlice({
  name: "locality",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ================= GET LOCALITIES =================
      .addCase(getLocalities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocalities.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(
        getLocalities.fulfilled,
        (
          state,
          action: PayloadAction<{
            localities: Locality[];
            pagination: Pagination;
          }>
        ) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.localities = action.payload.localities;
          state.pagination = action.payload.pagination;

          toast.success("Localities fetched successfully", {
            position: "top-right",
          });
        }
      )

      // ================= CREATE =================
      .addCase(createLocality.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLocality.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(createLocality.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        // add new locality instantly
        state.localities.unshift(action.payload.locality);

        toast.success("Locality created successfully", {
          position: "top-right",
        });
      })

      // ================= DELETE =================
      .addCase(deleteLocality.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLocality.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteLocality.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.localities = state.localities.filter(
          (loc) => loc._id !== action.payload
        );

        toast.success("Locality deleted successfully", {
          position: "top-right",
        });
      })

      // ================= UPDATE =================
      .addCase(updateLocality.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocality.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateLocality.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        const updated = action.payload.locality;

        state.localities = state.localities.map((loc) =>
          loc._id === updated._id ? updated : loc
        );

        toast.success("Locality updated successfully", {
          position: "top-right",
        });
      });
  },
});

export default localitySlice.reducer;