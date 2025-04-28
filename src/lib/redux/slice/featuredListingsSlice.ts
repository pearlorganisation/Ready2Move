import { createSlice } from "@reduxjs/toolkit";
import { getFeaturedListings } from "../actions/featuredListingsAction";
export interface Area {
  _id: string;
  name: string;
  area: number;
  areaMeasurement: string;
}

export interface Image {
  secure_url: string;
  public_id: string;
  _id: string;
}

export interface FeaturedProperty {
  _id: string;
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  service: string;
  property: string;
  propertyType: string;
  apartmentName: string;
  apartmentNo: string;
  locality: string;
  city: string;
  state: string;
  area: Area[];
  reraNumber: string;
  reraPossessionDate: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  parking: string;
  furnishing: string;
  entranceFacing: string;
  availability: { name: string };
  propertyAge: string;
  isOCAvailable: boolean;
  isCCAvailable: boolean;
  ownership: string;
  expectedPrice: number;
  isPriceNegotiable: boolean;
  isBrokerageCharge: boolean;
  brokerage: number;
  bankOfApproval: string[];
  aminities: string[];
  waterSource: string;
  otherFeatures: string[];
  propertyFlooring: string;
  imageGallery: Image[];
  isFeatured: boolean;
  youtubeEmbedLink: string;
}

export interface ProjectImage {
  secure_url: string;
  public_id: string;
  _id: string;
}

export interface Range {
  min: number;
  max: number;
}

export interface FeaturedProject {
  _id: string;
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
  pricePerSqFt: number;
  reraNumber: string;
  availability: {name:string};
  reraPossessionDate: string;
  aminities: string[];
  bankOfApproval: string[];
  imageGallery: ProjectImage[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  youtubeEmbedLink: string;
  areaRange: Range;
  priceRange: Range;
}

interface FeaturedState {
  featuredProperties: FeaturedProperty[];
  featuredProjects: FeaturedProject[];
  loading: boolean;
  error: string | null;
}

const initialState: FeaturedState = {
  featuredProperties: [],
  featuredProjects: [],
  loading: false,
  error: null,
};

const featuredSlice = createSlice({
  name: "featured",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeaturedListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedListings.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProperties = action.payload.featuredProperties || [];
        state.featuredProjects = action.payload.featuredProjects || [];
      })
      .addCase(getFeaturedListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default featuredSlice.reducer;
