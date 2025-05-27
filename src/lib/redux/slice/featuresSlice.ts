import { createSlice } from "@reduxjs/toolkit";
import { createFeature, deleteFeatures, getFeatures, updateFeature } from "../actions/featuresAction";
import { toast } from "react-toastify";
import { features } from "process";


interface Feature {
  _id: string;
  name: string;
}

interface FeatureGroup {
  type: string;
  features: Feature[];
}

interface FeaturesState {
  featureData: FeatureGroup[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: FeaturesState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  featureData: [
    {
      features: [
        {
          _id: "",
          name: ""
        }
      ],
      type: ""
    }
  ]
};

const createFeatureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET FEATURES
      .addCase(getFeatures.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.featureData = [
          {
            features: [
              {
                _id: "",
                name: ""
              }
            ],
            type: ""
          }
        ];
        toast.error("Failed to load features");
      })
      .addCase(getFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.featureData = action.payload.data;
      })

      // CREATE FEATURE
      .addCase(createFeature.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload as string); 
      })
      .addCase(createFeature.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success("Feature created successfully");
      })
      .addCase(updateFeature.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload as string); 
      })
      .addCase(updateFeature.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success("Feature updated successfully");
      })
      .addCase(deleteFeatures.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload as string); 
      })
      .addCase(deleteFeatures.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.featureData = state.featureData.map((group) => ({
          ...group,
          features: group.features.filter((feature:any) => feature._id !== deletedId)
        }));
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success("Feature deleted successfully");
      });
  }
});

export default createFeatureSlice.reducer;
