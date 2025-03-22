import { createSlice } from "@reduxjs/toolkit";
import { getBanner } from "../actions/bannerAction";

interface BgImage {
  secure_url: string;
  public_id: string;
}

interface BannerData {
    _id:string,
  bgImage: BgImage;
  headline: string;
  quote: string;
}

interface BannerState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  bannerData: BannerData;
}

const initialState: BannerState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  bannerData: {
    _id:"",
    bgImage: {
      secure_url: "",
      public_id: "",
    },
    headline: "",
    quote: "",
  },
};


const createBannerSlice = createSlice({
    name:"banner",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getBanner.pending,state=>{
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
        })
        .addCase(getBanner.rejected,(state,action)=>{
            state.isLoading = false
            state.isError= true
            state.isSuccess= false
            state.bannerData = {
                _id:"",   
                bgImage: {secure_url: "", public_id: "",},
                headline: "",
                quote: "",}
        })
        .addCase(getBanner.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isSuccess= true
            state.isError = false
            state.bannerData = action.payload.data[0]
        })
    }
}) 


export default createBannerSlice.reducer