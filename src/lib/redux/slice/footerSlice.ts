import { createSlice } from "@reduxjs/toolkit";
import { getAllCityData } from "../actions/footerAction";

interface CityWithLocalities {
  city: string;
  localities: string[];
}

interface CityLocalityState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  projectsCityWithLocality: CityWithLocalities[];
  propertiesCityWithLocality: CityWithLocalities[];
}

const initialState: CityLocalityState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  projectsCityWithLocality: [],
  propertiesCityWithLocality: [],
};

const cityLocalitySlice = createSlice({
  name: "cityLocality",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCityData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllCityData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectsCityWithLocality = action.payload.projectsCityWithLocality;
        state.propertiesCityWithLocality = action.payload.propertiesCityWithLocality;
      })
      .addCase(getAllCityData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export default cityLocalitySlice.reducer;
