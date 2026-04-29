import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";


import { createOGField, deleteOGField, fetchOGFields, OgField, updateOGField } from "../actions/ogAction";



interface OgState {
  loading: boolean;
  ogData: OgField[];
  error: string | null;
}

const initialState: OgState = {
  loading: false,
  ogData: [],
  error: null,
};

const ogSlice = createSlice({
  name: "og",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchOGFields.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchOGFields.fulfilled,
        (state, action: PayloadAction<OgField[]>) => {
          state.loading = false;
          state.ogData = action.payload;
        }
      )

      .addCase(fetchOGFields.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(
        createOGField.fulfilled,
        (state, action: PayloadAction<OgField>) => {
          state.ogData.push(action.payload);
        }
      )

      // UPDATE
      .addCase(
        updateOGField.fulfilled,
        (state, action: PayloadAction<OgField>) => {
          state.ogData = state.ogData.map((item) =>
            item._id === action.payload._id
              ? action.payload
              : item
          );
        }
      )

      // DELETE
      .addCase(
        deleteOGField.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.ogData = state.ogData.filter(
            (item) => item._id !== action.payload
          );
        }
      );
  },
});

export default ogSlice.reducer;