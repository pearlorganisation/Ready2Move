import { createSlice } from "@reduxjs/toolkit";
import { getDashboardData } from "../actions/dashboardAction";

// Define TypeScript Interfaces
interface Project {
  _id: string;
  title: string;
}

interface AssignedTo {
  _id: string;
  name: string;
  role: string;
}

interface RecentLead {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: string;
  project: Project | null;
  property: any;  // Update this if needed
  createdAt: string;
  updatedAt: string;
  assignedTo: AssignedTo;
  feedBack: string;
}

interface DashboardMetrics {
  totalUsers: number;
  totalLeads: number;
  totalProjects: number;
  totalProperties: number;
  recentLeads: RecentLead[];
}

interface DashboardState {
  loading: boolean;
  error: string | null;
  data: DashboardMetrics | null;
}

// ✅ Fix Initial State (Correct Type)
const initialState: DashboardState = {
  loading: false,
  error: null,
  data: {
    totalUsers: 0,
    totalLeads: 0,
    totalProjects: 0,
    totalProperties: 0,
    recentLeads: [],
  },
};


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {}, // No reducers yet

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Assign API response data
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch dashboard data";
      });
  },
});

export default dashboardSlice.reducer;
