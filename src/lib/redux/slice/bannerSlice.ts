import { createSlice } from "@reduxjs/toolkit";
import { createBanner, deleteBanner, getBanner, updateBanner } from "../actions/bannerAction";

interface BgImage {
  secure_url: string;
  public_id: string;
}

interface BannerData {
  _id: string;
  bgImage: BgImage;
  headline: string;
  quote: string;
}

interface BannerState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  bannerData: BannerData[]; // Changed to array
  Banner: BannerData;

}

const initialState: BannerState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  bannerData: [], // Changed from single object to array
  Banner:{
    _id:'',
    bgImage:{
      secure_url:'',
      public_id:''
    },
    headline:"",quote:""
  }
};


const createBannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getBanner.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.bannerData = [];
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bannerData = action.payload.data; // All banners
      })
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bannerData.push(action.payload.data); // Append new banner
      })
      .addCase(createBanner.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })

      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Banner = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(deleteBanner.pending,(state,action)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false
      })
      .addCase(deleteBanner.fulfilled,(state,action)=>{
        state.isSuccess=true;
        state.bannerData=state.bannerData.filter((item:any)=>item._id !== action.meta.arg)
      })
      .addCase(deleteBanner.rejected,(state)=>{
        state.isError=true;
        state.isSuccess=false
      })
  },
});

export default createBannerSlice.reducer;
