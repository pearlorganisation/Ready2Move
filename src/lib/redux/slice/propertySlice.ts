import { createSlice } from "@reduxjs/toolkit"
import { createPropertyByAdmin, getAllProperties } from "../actions/propertyAction"
import { Paginate } from "@/lib/util/paginateInterface"
interface Property{
    isLoading:boolean,
    isSuccess:boolean,
    isError: boolean
    propertyData: any[]
    paginate:Paginate
}

const initialState : Property={
    isLoading:false,
    isSuccess:false,
    isError:false,
    propertyData:[],
    paginate: {
        total: 0,
        current_page: 0,
        limit: 0,
        next: null,
        prev: null,
        pages:[]
    }
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
        .addCase(getAllProperties.pending,state=>{
            state.isLoading= true
        })
        .addCase(getAllProperties.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.propertyData= []
            state.paginate={
                    total: 0,
                    current_page: 0,
                    limit: 0,
                    next: null,
                    prev: null,
                    pages:[]
                }
        })
        .addCase(getAllProperties.fulfilled,(state, action)=>{
            state.isLoading= false
            state.isError= false
            state.isSuccess= true
            state.propertyData= action.payload.data
            state.paginate = action.payload.pagination
        })
    }
})

export default createPropertySlice.reducer