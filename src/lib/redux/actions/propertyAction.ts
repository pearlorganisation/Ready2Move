import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Interface for the structure within the 'area' array
interface AreaDetail {
  name: string;
  area: number;
  areaMeasurement: string;
}

// Interface for the 'landArea' object
interface LandAreaDetail {
  area: number;
  measurement: string;
}

// Main interface for the userdata object
interface UserData {
  id?: string;
  title?: string;
  slug?: string;
  subTitle?: string;
  description?: string;
  service?: string;
  property?: string;
  propertyType?: string;
  apartmentName?: string;
  apartmentNo?: string;
  locality?: string;
  city?: string;
  state?: string;
  area?: AreaDetail[]; // Array of AreaDetail objects
  landArea?: LandAreaDetail; // LandAreaDetail object
  propertyFloor?: number;
  totalFloors?: number;
  roadWidth?: number;
  reraNumber?: string;
  reraPossessionDate?: Date; // Using the built-in Date type
  noOfBedrooms?: number;
  noOfBathrooms?: number;
  noOfBalconies?: number;
  parking?: string;
  furnishing?: string;
  entranceFacing?: string;
  availability?: string;
  propertyAge?: string;
  isOCAvailable?: boolean;
  isCCAvailable?: boolean;
  ownership?: string;
  expectedPrice?: number;
  isPriceNegotiable?: boolean;
  isBrokerageCharge?: boolean;
  brokerage?: number;
  maintenanceCharge?: number;
  maintenanceFrequency?: string;
  bankOfApproval?: string[]; // Array of strings
  amenities?: string[]; // Array of strings
  waterSource?: string;
  otherFeatures?: string[]; // Array of strings
  propertyFlooring?: string;
  powerBackup?: string;
  nearbyLandmarks?: string[]; // Array of strings
  imageGallery?: File[]; // Array of File objects (assuming standard browser File API)
  youtubeEmbedLink?: string;
  isFeatured?: boolean;
}
export const createPropertyByAdmin = createAsyncThunk(
  "create/project",
  async ({ userdata }: { userdata: UserData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      console.log("The form data before is", userdata);
      const formData = new FormData();

      // ✅ Append Basic Details
      formData.append("user", userdata?.id || "");
      formData.append("title", userdata?.title || "");
      formData.append("slug", userdata?.slug || "");
      formData.append("subTitle", userdata?.subTitle || "");
      formData.append("description", userdata?.description || "");
      formData.append("service", userdata?.service || "SELL");
      formData.append("property", userdata?.property || "RESIDENTIAL");
      formData.append("propertyType", userdata?.propertyType || "");

      // ✅ Append Location Details
      formData.append("apartmentName", userdata?.apartmentName || "");
      formData.append("apartmentNo", userdata?.apartmentNo || "");
      formData.append("locality", userdata?.locality || "");
      formData.append("city", userdata?.city || "");
      formData.append("state", userdata?.state || "");

      // ✅ Append Property Size & Configuration
      userdata?.area?.forEach((areaItem, index) => {
        formData.append(`area[${index}][name]`, areaItem.name);
        formData.append(`area[${index}][area]`, areaItem.area.toString());
        formData.append(
          `area[${index}][areaMeasurement]`,
          areaItem.areaMeasurement
        );
      });

      if (userdata?.landArea) {
        formData.append("landArea[area]", userdata.landArea.area.toString());
        formData.append("landArea[measurement]", userdata.landArea.measurement);
      }

      formData.append(
        "propertyFloor",
        userdata?.propertyFloor?.toString() || "0"
      );
      formData.append("totalFloors", userdata?.totalFloors?.toString() || "0");
      formData.append("roadWidth", userdata?.roadWidth?.toString() || "0");

      // ✅ Append Legal & Registration
      if (userdata?.reraNumber)
        formData.append("reraNumber", userdata.reraNumber);
      if (userdata?.reraPossessionDate)
        formData.append(
          "reraPossessionDate",
          userdata.reraPossessionDate.toISOString()
        );

      // ✅ Append Property Features
      formData.append(
        "noOfBedrooms",
        userdata?.noOfBedrooms?.toString() || "0"
      );
      formData.append(
        "noOfBathrooms",
        userdata?.noOfBathrooms?.toString() || "0"
      );
      formData.append(
        "noOfBalconies",
        userdata?.noOfBalconies?.toString() || "0"
      );
      formData.append("parking", userdata?.parking || "");
      formData.append("furnishing", userdata?.furnishing || "");
      formData.append("entranceFacing", userdata?.entranceFacing || "");
      formData.append("availability", userdata?.availability || "");
      formData.append("propertyAge", userdata?.propertyAge || "");
      formData.append(
        "isOCAvailable",
        userdata?.isOCAvailable ? "true" : "false"
      );
      formData.append(
        "isCCAvailable",
        userdata?.isCCAvailable ? "true" : "false"
      );
      formData.append("ownership", userdata?.ownership || "");

      // ✅ Append Pricing & Charges
      formData.append(
        "expectedPrice",
        userdata?.expectedPrice?.toString() || "0"
      );
      formData.append(
        "isPriceNegotiable",
        userdata?.isPriceNegotiable ? "true" : "false"
      );
      formData.append(
        "isBrokerageCharge",
        userdata?.isBrokerageCharge ? "true" : "false"
      );
      formData.append("brokerage", userdata?.brokerage?.toString() || "0");
      formData.append(
        "maintenanceCharge",
        userdata?.maintenanceCharge?.toString() || "0"
      );
      formData.append(
        "maintenanceFrequency",
        userdata?.maintenanceFrequency || ""
      );

      // ✅ Append Financial & Legal
      if (Array.isArray(userdata?.bankOfApproval)) {
        userdata.bankOfApproval.forEach((bank) => {
          formData.append("bankOfApproval", bank);
        });
      }

      // ✅ Append Amenities & Features
      if (Array.isArray(userdata?.amenities)) {
        userdata.amenities.forEach((amenity) => {
          formData.append("amenities", amenity);
        });
      }

      formData.append("waterSource", userdata?.waterSource || "");

      if (Array.isArray(userdata?.otherFeatures)) {
        userdata.otherFeatures.forEach((feature) => {
          formData.append("otherFeatures", feature);
        });
      }

      formData.append("propertyFlooring", userdata?.propertyFlooring || "");
      formData.append("powerBackup", userdata?.powerBackup || "");

      if (Array.isArray(userdata?.nearbyLandmarks)) {
        userdata.nearbyLandmarks.forEach((landmark) => {
          formData.append("nearbyLandmarks", landmark);
        });
      }

      // ✅ Append Media
      if (Array.isArray(userdata?.imageGallery)) {
        userdata.imageGallery.forEach((file) => {
          formData.append("imageGallery", file);
        });
      }

      if (userdata?.youtubeEmbedLink) {
        formData.append("youtubeEmbedLink", userdata.youtubeEmbedLink);
      }

      formData.append("isFeatured", userdata?.isFeatured ? "true" : "false");

      console.log("The formData after is", formData);

      // ✅ Send FormData Instead of Raw Object
      const { data } = await axiosInstance.post(
        "/api/v1/properties",
        formData,
        config
      );
      return data;
    } catch (error) {
      console.error("The error is:", error);
      return rejectWithValue(error);
    }
  }
);

// export const getAllProperties = createAsyncThunk(
//   "get/allproperty",
//   async (
//     {
//       page,
//       limit,
//       priceRange,
//       bedRooms,
//       bathRooms,
//     }: {
//       page: number;
//       limit: number;
//       priceRange: number;
//       bedRooms: number;
//       bathRooms: number;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axiosInstance.get(
//         `/api/v1/properties?page=${page}&limit=${limit}&priceRange=${priceRange}&bedRooms=${bedRooms}&bathRooms=${bathRooms}`,
//         config
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const getAllProperties = createAsyncThunk(
  "get/allproperties",
  async (
    {
      page,
      limit,
      priceRange,
      bedRooms,
      bathRooms,
      areaRange,
      q,
      service,
      propertyType,
    }: {
      page: number;
      limit: number;
      priceRange?: number;
      areaRange?: string;
      bedRooms: number;
      bathRooms: number;
      q?: string;
      service?: "RENT" | "SELL";
      propertyType?: "RESIDENTIAL" | "COMMERCIAL";
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const queryParams = new URLSearchParams();

      if (page) queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString());
      if (priceRange) queryParams.append("priceRange", priceRange.toString());
      if (areaRange) queryParams.append("areaRange", areaRange);
      if (bedRooms) queryParams.append("bedrooms", bedRooms.toString());
      if (bathRooms) queryParams.append("areaRange", bathRooms.toString());
      if (q) queryParams.append("q", q);
      if (service) queryParams.append("service", service);
      if (propertyType) queryParams.append("propertyType", propertyType);

      const response = await axiosInstance.get(
        `/api/v1/properties?${queryParams.toString()}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllSearchedProperties = createAsyncThunk(
  "get/allsearchproperties",
  async (
    {
      page,
      limit,
      priceRange,
      bedRooms,
      bathRooms,
      areaRange,
      q,
      service,
      propertyType,
    }: {
      page: number;
      limit: number;
      priceRange?: string;
      areaRange?: string;
      bedRooms: number;
      bathRooms: number;
      q?: string;
      service?: "RENT" | "SELL";
      propertyType?: "RESIDENTIAL" | "COMMERCIAL";
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const queryParams = new URLSearchParams();

      if (page) queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString());
      if (priceRange) queryParams.append("priceRange", priceRange);
      if (areaRange) queryParams.append("areaRange", areaRange);
      if (bedRooms) queryParams.append("bedrooms", bedRooms.toString());
      if (bathRooms) queryParams.append("areaRange", bathRooms.toString());
      if (q) queryParams.append("q", q);
      if (service) queryParams.append("service", service);
      if (propertyType) queryParams.append("propertyType", propertyType);

      const response = await axiosInstance.get(
        `/api/v1/properties/search?${queryParams.toString()}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleProperty = createAsyncThunk(
  "get/singleproperty",
  async ({ slug }: { slug: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axiosInstance.get(
        `/api/v1/properties/${slug}`,
        config
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteProperty = createAsyncThunk(
  "delete/Project",
  async (id: string, { rejectWithValue }) => {
    console.log("Deleting project with id:", id);

    try {
      const data = await axiosInstance.delete(`/api/v1/properties/${id}`);
      toast.success("Project deleted successfully");
      return data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete project");
      return rejectWithValue(error);
    }
  }
);