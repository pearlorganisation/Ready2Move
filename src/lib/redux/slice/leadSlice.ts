import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createLeads,
  deleteLeadById,
  getAllLeads,
  GetUserByRoles,
} from "../actions/leadsAction";
import { Paginate } from "@/lib/util/paginateInterface";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: "PENDING" | "CALLING" | "QUALIFIED" | "UNQUALIFIED";
  assignedTo?: string;
  assignedRole?: string;
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
//   interface Pagination {
//     total: number;
//     current_page: number;
//     limit: number;
//     next?: number ;
//     prev?: number;
//     pages: number[];
//   }

interface LeadsState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  pagination: Paginate;
  users: User[];
}

const initialState: LeadsState = {
  leads: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    current_page: 0,
    limit: 0,
    next: null,
    prev: null,
    pages: [],
  },
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
        state.leads = state.leads.filter(
          (lead) => lead._id !== action.meta.arg
        );
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
      })

      .addCase(createLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.unshift(action.payload.data); // Add new lead to the beginning
      })
      .addCase(createLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leadSlice.reducer;
