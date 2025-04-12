import { createSlice } from "@reduxjs/toolkit";
import {
  createProjectsByBuilder,
  getAllProjects,
  getSingleProject,
} from "../actions/projectAction";
import { Paginate } from "@/lib/util/paginateInterface";
import { SingleProject } from "@/lib/Interfaces/project";
import { boolean } from "yup";
export interface ProjectData {
  id: string;
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  service: string;
  projectType: string;
  areaRange: {
    min: string;
    max: string;
  };
  priceRange: {
    min: string;
    max: string;
  };
  pricePerSqFt: number;
  reraNumber: string;
  availability: string;
  reraPossessionDate: string;
  aminities?: string[];
  bankOfApproval?: string[];
  imageGallary?: File[];
  isFeatured?: boolean;
  youtubeLink?: string;
}
export interface Project {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  projectData: ProjectData;
  singleProjectData:SingleProject;
  paginate: Paginate;
}
const initialState: Project = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  projectData: {
    id: "",
    user: "",
    title: "",
    slug: "",
    subTitle: "",
    description: "",
    locality: "",
    city: "",
    state: "",
    service: "",
    projectType: "",
    areaRange: { min: "", max: "" },
    priceRange: { min: "", max: "" },
    pricePerSqFt: 0,
    reraNumber: "",
    availability: "",
    reraPossessionDate: "",
    aminities: [],
    bankOfApproval: [],
    imageGallary: [],
    isFeatured: false,
    youtubeLink: "",
  },
  singleProjectData:{
      _id: "",
          user: "",
          title: "",
          slug: "",
          subTitle: "",
          description: "",
          locality: "",
          city: "",
          state: "",
          service: "",
          projectType: "",
          areaRange: { min: 0, max: 0 },
          priceRange: { min: 0, max: 0 },
          pricePerSqFt: 0,
          reraNumber: "",
          availability: {
            _id: "",
            name: "",
            type: "",
          },
          reraPossessionDate: "",
          aminities: [],
          bankOfApproval: [],
          imageGallery: [],
          isFeatured: false,
          youtubeEmbedLink: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
  },
  paginate: {
    total: 0,
    current_page: 0,
    limit: 0,
    next: null,
    prev: null,
    pages: [],
  },
};
const createProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProjectsByBuilder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createProjectsByBuilder.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(createProjectsByBuilder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getAllProjects.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.projectData = {
          id: "",
          user: "",
          title: "",
          slug: "",
          subTitle: "",
          description: "",
          locality: "",
          city: "",
          state: "",
          service: "",
          projectType: "",
          areaRange: { min: "", max: "" },
          priceRange: { min: "", max: "" },
          pricePerSqFt: 0,
          reraNumber: "",
          availability: "",
          reraPossessionDate: "",
          aminities: [],
          bankOfApproval: [],
          imageGallary: [],
          isFeatured: false,
          youtubeLink: "",
        };
        state.paginate = {
          total: 0,
          current_page: 0,
          limit: 0,
          next: null,
          prev: null,
          pages: [],
        };
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.projectData = action.payload.data;
        state.paginate = action.payload.pagination;
      })

      .addCase(getSingleProject.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleProjectData= action.payload.data.data
        // state.projectData = action.payload.data; 
        // assuming `data` is in `data.data`
      })
      .addCase(getSingleProject.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.singleProjectData = {
          _id: "",
          user: "",
          title: "",
          slug: "",
          subTitle: "",
          description: "",
          locality: "",
          city: "",
          state: "",
          service: "",
          projectType: "",
          areaRange: { min: 0, max: 0 },
          priceRange: { min: 0, max: 0 },
          pricePerSqFt: 0,
          reraNumber: "",
          availability: {
            _id: "",
            name: "",
            type: "",
          },
          reraPossessionDate: "",
          aminities: [],
          bankOfApproval: [],
          imageGallery: [],
          isFeatured: false,
          youtubeEmbedLink: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
        };
        // state.projectData = {
        //   id: "",
        //   user: "",
        //   title: "",
        //   slug: "",
        //   subTitle: "",
        //   description: "",
        //   locality: "",
        //   city: "",
        //   state: "",
        //   service: "",
        //   projectType: "",
        //   areaRange: { min: "", max: "" },
        //   priceRange: { min: "", max: "" },
        //   pricePerSqFt: 0,
        //   reraNumber: "",
        //   availability: "",
        //   reraPossessionDate: "",
        //   aminities: [],
        //   bankOfApproval: [],
        //   imageGallary: [],
        //   isFeatured: false,
        //   youtubeLink: "",
        // };
      });
  },
});

export default createProjectSlice.reducer;
