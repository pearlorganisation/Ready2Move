import { createSlice } from "@reduxjs/toolkit"
import { createFeature, getFeatures } from "../actions/featuresAction"

interface Features{
     featureData:[
        {
        features:[{
            _id:string,
            name:string,
        }]
        type: string
     }],
    isLoading:boolean,
    isSuccess: boolean,
    isError: boolean
}

const initialState: Features={
    isLoading: false,
    isSuccess: false,
    isError: false,
    featureData: [{
        features:[{
            _id:"",
            name:""
        }],
        type:""
    }]
}

const createFeatureSlice = createSlice({
    name:"features",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getFeatures.pending,state=>{
            state.isLoading=true
            state.isSuccess=false
            state.isError= false
        })
        .addCase(getFeatures.rejected,(state,action)=>{
            state.isLoading= false
            state.isError= true
            state.isSuccess= false
            state.featureData = [{
              features:[{
            _id:"",
            name:""}], 
            type:""
            }]
        })
      .addCase(getFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.featureData = action.payload.data
     })
        .addCase(createFeature.pending,state=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError= false;
        })
        .addCase(createFeature.rejected,(state)=>{
            state.isLoading= false;
            state.isError= true;
            state.isSuccess= false;
        })
        .addCase(createFeature.fulfilled,(state)=>{
            state.isLoading = false;
            state.isError= false;
            state.isSuccess= true;
         })
    }
})

export default createFeatureSlice.reducer