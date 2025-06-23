import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface CityWithLocalities {
  city: string;
  localities: string[];
}

interface CityLocalityResponse {
  projectsCityWithLocality: CityWithLocalities[];
  propertiesCityWithLocality: CityWithLocalities[];
}

export const getAllCityData = createAsyncThunk(
  "/get/cityData",
  async ({limit}:{limit:number}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axiosInstance.get(`/api/v1/footer/cityWithLocality?limit=${limit}`, config);
      console.log("API Response:", response.data);

      // Extract the required data from the response
      const { projectsCityWithLocality, propertiesCityWithLocality } = response.data;

      return {
        projectsCityWithLocality,
        propertiesCityWithLocality,
      };
    } catch (error: any) {
      // Handle errors appropriately
      console.error("Error fetching city data:", error);
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }
);
