import { createSlice } from "@reduxjs/toolkit"
 import { createProjectsByBuilder } from "../actions/projectAction"

interface ProjectData {
      id:string,
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
   areaRange:{min: string, max:string}, 
        priceRange:{
        min: string,
        max: string
     },
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
 interface Project{
    isLoading:boolean,
    isSuccess:boolean,
    isError: boolean,
    projectData:ProjectData
}

const initialState : Project={
    isLoading:false,
    isSuccess:false,
    isError:false,
    projectData:{
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
        youtubeLink: ""
    }
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