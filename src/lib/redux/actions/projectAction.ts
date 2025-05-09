import { ProjectFormInputs } from "@/components/CreateProjectByBuilder";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

export const createProjectsByBuilder = createAsyncThunk(
  "create/project",
  async (
    { userdata }: { userdata: ProjectFormInputs },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("the form data before is", userdata);
      const formData = new FormData();

      // ✅ Append Image Gallery
      if (Array.isArray(userdata?.imageGallary)) {
        userdata.imageGallary.forEach((file) => {
          formData.append("imageGallery", file);
        });
      }

      // ✅ Append Basic Data with Optional Chaining
      formData.append("user", userdata?.id || "");
      formData.append("title", userdata?.title || "");
      formData.append("slug", userdata?.slug || "");
      formData.append("subTitle", userdata?.subTitle || "");
      formData.append("description", userdata?.description || "");
      formData.append("locality", userdata?.locality || "");
      formData.append("city", userdata?.city || "");
      formData.append("state", userdata?.state || "");
      formData.append("service", userdata?.service || "");
      formData.append("projectType", userdata?.projectType || "");
      formData.append("reraNumber", userdata?.reraNumber.toString());
      formData.append("reraPossessionDate", userdata?.reraPossessionDate);
      // ✅ Append Area Range
      if (
        userdata?.areaRangeMin !== undefined &&
        userdata?.areaRangeMax !== undefined
      ) {
        formData.append("areaRange[min]", userdata.areaRangeMin.toString());
        formData.append("areaRange[max]", userdata.areaRangeMax.toString());
      }

      // ✅ Append Price Range
      if (
        userdata?.priceRangeMin !== undefined &&
        userdata?.priceRangeMax !== undefined
      ) {
        formData.append("priceRange[min]", userdata.priceRangeMin.toString());
        formData.append("priceRange[max]", userdata.priceRangeMax.toString());
      }

      // ✅ Append Other Fields
      formData.append(
        "pricePerSqFt",
        userdata?.pricePerSqFt?.toString() || "0"
      );

      formData.append(
        "availability",
        userdata?.availability || "67d90f7c24424477265974a7"
      ); // sending temporarry

      formData.append("isFeatured", userdata?.isFeatured ? "true" : "false");

      // ✅ Append YouTube Link if Exists
      if (userdata?.youtubeEmbedLink) {
        formData.append("youtubeEmbedLink", userdata.youtubeEmbedLink);
      }

      // ✅ Append Amenities (Array or Single Value)
      if (Array.isArray(userdata?.aminities)) {
        userdata.aminities.forEach((amenity) => {
          formData.append("aminities", amenity);
        });
      } else if (userdata?.aminities) {
        formData.append("aminities", userdata.aminities);
      }

      // ✅ Append Bank Approvals (Array or Single Value)
      if (Array.isArray(userdata?.bankOfApproval)) {
        userdata.bankOfApproval.forEach((bank) => {
          formData.append("bankOfApproval", bank);
        });
      } else if (userdata?.bankOfApproval) {
        formData.append("bankOfApproval", userdata.bankOfApproval);
      }
      console.log("the formdata after is", formData);
      // ✅ Send FormData Instead of Raw Object
      const { data } = await axiosInstance.post(
        "/api/v1/projects",
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

export const getAllProjects = createAsyncThunk(
  "get/allprojects",
  async (
    {
      page,
      limit,
      priceRange,
      areaRange,
      q,
      service,
      projectType,
    }: {
      page?: number;
      limit?: number;
      priceRange?: string;
      areaRange?: string;
      q?: string;
      service?: "RENT" | "SELL";
      projectType?: "RESIDENTIAL" | "COMMERCIAL";
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
      if (q) queryParams.append("q", q);
      if (service) queryParams.append("service", service);
      if (projectType) queryParams.append("projectType", projectType);

      const response = await axiosInstance.get(
        `/api/v1/projects?${queryParams.toString()}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllSearchProjects = createAsyncThunk(
  "get/allsearchprojects",
  async (
    {
      page,
      limit,
      priceRange,
      areaRange,
      q,
      service,
      projectType,
    }: {
      page: number;
      limit: number;
      priceRange?: string;
      areaRange?: string;
      q?: string;
      service?: "RENT" | "SELL";
      projectType?: "RESIDENTIAL" | "COMMERCIAL";
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
      if (q) queryParams.append("q", q);
      if (service) queryParams.append("service", service);
      if (projectType) queryParams.append("projectType", projectType);

      const response = await axiosInstance.get(
        `/api/v1/projects/search?${queryParams.toString()}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleProject = createAsyncThunk(
  "get/singleproject",
  async ({ slug }: { slug: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axiosInstance.get(`/api/v1/projects/${slug}`, config);
      toast.success("fetched succcessfully ")

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const updateProject = createAsyncThunk(
  "patch/updateProject",
  async ({ slug }: { slug: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axiosInstance.get(`/api/v1/projects/${slug}`, config);
      if (data && data.status === 200) {
        toast.success("Project updated successfully!");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteImagesProject = createAsyncThunk(
  "delete/Images",
  async ({ slug, deleteImages }: { slug: string; deleteImages: string[] }, { rejectWithValue }) => {
    console.log(slug,"i",deleteImages)
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      // Sending the array of image IDs (deleteImages) in the request body
      const data = await axiosInstance.patch(`/api/v1/projects/${slug}`, { deleteImages }, config);
      toast.success("Images deleted succcessfully ")
      return data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete Project");
      return rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "delete/Project",
  async (id: string, { rejectWithValue }) => {
    console.log("Deleting project with id:", id);

    try {
      const data = await axiosInstance.delete(`/api/v1/projects/${id}`);
      toast.success("Project deleted successfully");
      return data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete project");
      return rejectWithValue(error);
    }
  }
);



