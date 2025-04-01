import { createSlice } from "@reduxjs/toolkit"
import { createPropertyByAdmin } from "../actions/propertyAction"
interface Property{
    isLoading:boolean,
    isSuccess:boolean,
    isError: boolean
}

const initialState : Property={
    isLoading:false,
    isSuccess:false,
    isError:false
}
const createPropertySlice = createSlice({
    name:"property",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createPropertyByAdmin.pending,(state)=>{
            state.isLoading= true
            state.isSuccess=false
            state.isError= false
        })
        .addCase(createPropertyByAdmin.rejected,(state)=>{
            state.isLoading= false
            state.isSuccess=false
            state.isError= true
        })
        .addCase(createPropertyByAdmin.fulfilled,(state)=>{
            state.isLoading= false
            state.isSuccess=true
            state.isError= false
        })
    }
})

export default createPropertySlice.reducer