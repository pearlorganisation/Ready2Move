import { createSlice } from "@reduxjs/toolkit"
 import { createProjectsByBuilder } from "../actions/projectAction"
interface Project{
    isLoading:boolean,
    isSuccess:boolean,
    isError: boolean
}

const initialState : Project={
    isLoading:false,
    isSuccess:false,
    isError:false
}
const createProjectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createProjectsByBuilder.pending,(state)=>{
            state.isLoading= true
            state.isSuccess=false
            state.isError= false
        })
        .addCase(createProjectsByBuilder.rejected,(state)=>{
            state.isLoading= false
            state.isSuccess=false
            state.isError= true
        })
        .addCase(createProjectsByBuilder.fulfilled,(state)=>{
            state.isLoading= false
            state.isSuccess=true
            state.isError= false
        })
    }
})

export default createProjectSlice.reducer