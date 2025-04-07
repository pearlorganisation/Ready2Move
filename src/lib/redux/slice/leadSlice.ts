import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  
  interface Lead {
    // Define your Lead structure here
  }
  
  interface LeadsState {
    leads: Lead[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    users: User[];
  }
  
  const initialState: LeadsState = {
    leads: [],
    loading: false,
    error: null,
    pagination: {
      total: 0,
      current_page: 1,
      limit: 10,
      next: undefined,
      prev: undefined,
      pages: [],
    },
    users: [],
  };
const leadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            if (state.pagination) {
                state.pagination.current_page = action.payload;
            }
        },
    },
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
                state.leads = state.leads.filter((lead) => lead._id !== action.meta.arg);
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
                state.loading = false;
                state.users = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(GetUserByRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPage } = leadSlice.actions;
export default leadSlice.reducer;
