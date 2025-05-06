import { createSlice } from "@reduxjs/toolkit";
import {
  createPropertyByAdmin,
  getAllProperties,
  getAllSearchedProperties,
  getSingleProperty,
} from "../actions/propertyAction";
import { Paginate } from "@/lib/util/paginateInterface";
import { SimpleType } from "@/lib/Interfaces/property";
import { stat } from "fs/promises";

export interface AreaRange {
  min: string;
  max: string;
}

export interface PriceRange {
  min: string;
  max: string;
}

export interface PropertyData {
  _id: string;
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  service: string;
  property: string;
  propertyType: SimpleType;
  apartmentName: string;
  apartmentNo: string;
  locality: string;
  city: string;
  state: string;
  area: {
    _id: string;
    name: string;
    area: number;
    areaMeasurement: string;
  }[];
  reraNumber: string;
  reraPossessionDate: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  parking: string;
  furnishing: string;
  entranceFacing: string;
  availability: string;
  propertyAge: string;
  isOCAvailable: boolean;
  isCCAvailable: boolean;
  ownership: string;
  expectedPrice: number;
  isPriceNegotiable: boolean;
  isBrokerageCharge: boolean;
  brokerage: number;
  bankOfApproval?: string[];
  aminities?: string[];
  waterSource?: string;
  otherFeatures?: string[];
  propertyFlooring?: string;
  imageGallery?: [
    {
      secure_url: string;
      public_id: string;
    }
  ];
  isFeatured?: boolean;
  youtubeEmbedLink?: string;
}

export interface SearchedPropertyData {
  _id: string;
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  service: string;
  property: string;
  propertyType: SimpleType;
  apartmentName: string;
  apartmentNo: string;
  locality: string;
  city: string;
  state: string;
  area: {
    _id: string;
    name: string;
    area: number;
    areaMeasurement: string;
  }[];
  reraNumber: string;
  reraPossessionDate: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  parking: string;
  furnishing: string;
  entranceFacing: string;
  availability: string;
  propertyAge: string;
  isOCAvailable: boolean;
  isCCAvailable: boolean;
  ownership: string;
  expectedPrice: number;
  isPriceNegotiable: boolean;
  isBrokerageCharge: boolean;
  brokerage: number;
  bankOfApproval?: string[];
  aminities?: string[];
  waterSource?: string;
  otherFeatures?: string[];
  propertyFlooring?: string;
  imageGallery?: [
    {
      secure_url: string;
      public_id: string;
    }
  ];
  isFeatured?: boolean;
  youtubeEmbedLink?: string;
}
export interface ImageGallery {
  secure_url: string;
  public_id: string;
  _id: string;
}

export interface SimpleField {
  _id: string;
  name: string;
  type: string;
}

export interface AreaField {
  // _id: string;
  name: string;
  area: number;
  areaMeasurement: string;
}

export interface SingleProperty {
  _id: string;
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  service: string;
  property: string;
  propertyType: SimpleType;
  apartmentName: string;
  apartmentNo: string;
  locality: string;
  city: string;
  state: string;
  area: AreaField[];
  reraNumber: string;
  reraPossessionDate: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  parking: SimpleField;
  furnishing: SimpleField;
  entranceFacing: SimpleField;
  availability: SimpleField;
  propertyAge: SimpleField;
  isOCAvailable: boolean;
  isCCAvailable: boolean;
  ownership: SimpleField;
  expectedPrice: number;
  isPriceNegotiable: boolean;
  isBrokerageCharge: boolean;
  brokerage: number;
  bankOfApproval: SimpleField[];
  aminities: SimpleField[];
  waterSource: SimpleField;
  otherFeatures: SimpleField[];
  propertyFlooring: SimpleField;
  imageGallery: ImageGallery[];
  isFeatured: boolean;
  youtubeEmbedLink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PropertyState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  propertyData: PropertyData[];
  searchedPropertyData: SearchedPropertyData;
  singlePropertyData: SingleProperty;
  paginate: Paginate;
}

export const initialPropertyState: PropertyState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  propertyData: [{
    _id: "",
    user: "",
    title: "",
    slug: "",
    subTitle: "",
    description: "",
    service: "",
    property: "",
    propertyType: {
      _id: "",
      name: "",
      type: "",
    },
    apartmentName: "",
    apartmentNo: "",
    locality: "",
    city: "",
    state: "",
    area: [],
    reraNumber: "",
    reraPossessionDate: "",
    noOfBedrooms: 0,
    noOfBathrooms: 0,
    noOfBalconies: 0,
    parking: "",
    furnishing: "",
    entranceFacing: "",
    availability: "",
    propertyAge: "",
    isOCAvailable: false,
    isCCAvailable: false,
    ownership: "",
    expectedPrice: 0,
    isPriceNegotiable: false,
    isBrokerageCharge: false,
    brokerage: 0,
    bankOfApproval: [],
    aminities: [],
    waterSource: "",
    otherFeatures: [],
    propertyFlooring: "",
    imageGallery: [
      {
        secure_url: "",
        public_id: "",
      },
    ],
    isFeatured: false,
    youtubeEmbedLink: "",
  }],
  searchedPropertyData: {
    _id: "",
    user: "",
    title: "",
    slug: "",
    subTitle: "",
    description: "",
    service: "",
    property: "",
    propertyType: {
      _id: "",
      name: "",
      type: "",
    },
    apartmentName: "",
    apartmentNo: "",
    locality: "",
    city: "",
    state: "",
    area: [],
    reraNumber: "",
    reraPossessionDate: "",
    noOfBedrooms: 0,
    noOfBathrooms: 0,
    noOfBalconies: 0,
    parking: "",
    furnishing: "",
    entranceFacing: "",
    availability: "",
    propertyAge: "",
    isOCAvailable: false,
    isCCAvailable: false,
    ownership: "",
    expectedPrice: 0,
    isPriceNegotiable: false,
    isBrokerageCharge: false,
    brokerage: 0,
    bankOfApproval: [],
    aminities: [],
    waterSource: "",
    otherFeatures: [],
    propertyFlooring: "",
    imageGallery: [{ secure_url:"", public_id:""}],
    isFeatured: false,
    youtubeEmbedLink: "",
  },
  singlePropertyData: {
    _id: "",
    user: "",
    title: "",
    slug: "",
    subTitle: "",
    description: "",
    service: "",
    property: "",
    propertyType: {
      _id: "",
      name: "",
      type: "",
    },
    apartmentName: "",
    apartmentNo: "",
    locality: "",
    city: "",
    state: "",
    area: [{ name: "", area: 0, areaMeasurement: "" }],
    reraNumber: "",
    reraPossessionDate: "",
    noOfBedrooms: 0,
    noOfBathrooms: 0,
    noOfBalconies: 0,
    parking: { _id: "", name: "", type: "" },
    furnishing: { _id: "", name: "", type: "" },
    entranceFacing: { _id: "", name: "", type: "" },
    availability: { _id: "", name: "", type: "" },
    propertyAge: { _id: "", name: "", type: "" },
    isOCAvailable: false,
    isCCAvailable: false,
    ownership: { _id: "", name: "", type: "" },
    expectedPrice: 0,
    isPriceNegotiable: false,
    isBrokerageCharge: false,
    brokerage: 0,
    bankOfApproval: [],
    aminities: [],
    waterSource: { _id: "", name: "", type: "" },
    otherFeatures: [],
    propertyFlooring: { _id: "", name: "", type: "" },
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
 
const createPropertySlice = createSlice({
  name: "property",
  initialState: initialPropertyState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPropertyByAdmin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createPropertyByAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(createPropertyByAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getAllProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.propertyData = initialPropertyState.propertyData;

        state.paginate = initialPropertyState.paginate;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.propertyData = action.payload.data;
        state.paginate = action.payload.pagination;
      })

      .addCase(getAllSearchedProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSearchedProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.searchedPropertyData = initialPropertyState.searchedPropertyData;

        state.paginate = initialPropertyState.paginate;
      })
      .addCase(getAllSearchedProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.searchedPropertyData = action.payload.data;
        state.paginate = action.payload.pagination;
      })

      .addCase(getSingleProperty.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singlePropertyData = action.payload.data;
      })
      .addCase(getSingleProperty.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.singlePropertyData = initialPropertyState.singlePropertyData;
      });
      
  },
});

export default createPropertySlice.reducer;
