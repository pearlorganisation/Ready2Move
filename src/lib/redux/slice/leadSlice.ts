
import { createSlice } from "@reduxjs/toolkit";
import { deleteLeadById, getAllLeads, GetUserByRoles } from "../actions/leadsAction";


interface Lead {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
    status: "PENDING" | "CALLING" | "QUALIFIED" | "UNQUALIFIED";
    assignedTo?: string;
    feedBack?: string;
    project?: string;
    property?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}
  interface Pagination {
    total: number;
    current_page: number;
    limit: number;
    next?: number;
    prev?: number;
    pages: number[];
  }
  
  interface LeadsState {
    leads: Lead[];
    loading: boolean;
    error: string | null;
    pagination: Pagination | null;
    users:User[];
  }
  
  const initialState: LeadsState = {
    leads: [],
    loading: false,
    error: null,
    pagination: null,
    users: [],
  };
  
  const leadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllLeads.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllLeads.fulfilled, (state, action) => {
          state.loading = false;
          state.leads = action.payload.data;
          state.pagination = action.payload.pagination;
        })
        .addCase(getAllLeads.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(deleteLeadById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteLeadById.fulfilled, (state, action) => {
          state.loading = false;
          state.leads = state.leads.filter((lead)=>lead._id!==action.meta.arg);
          
        
        })
        .addCase(deleteLeadById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(GetUserByRoles.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(GetUserByRoles.fulfilled, (state, action) => {
         
          state.users = action.payload.data;
          state.pagination = action.payload.pagination;
          state.loading = false;
        
        })
        .addCase(GetUserByRoles.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  }
  );
  

export default leadSlice.reducer;
