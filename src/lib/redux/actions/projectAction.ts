import { ProjectFormInputs } from "@/app/admin/builder/addproject/page";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProjectsByBuilder = createAsyncThunk(
  "create/project",
  async ({ userdata }: { userdata: ProjectFormInputs }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
console.log("the form data before is", userdata)
      const formData = new FormData();

      // ✅ Append Image Gallery
      if (Array.isArray(userdata?.imageGallary)) {
        userdata.imageGallary.forEach((file) => {
          formData.append("imageGallary", file);
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
      formData.append("reraNumber", userdata?.reraNumber.toString())
      formData.append("reraPossessionDate", userdata?.reraPossessionDate)
      // ✅ Append Area Range
      if (userdata?.areaRangeMin !== undefined && userdata?.areaRangeMax !== undefined) {
        formData.append("areaRange[min]", userdata.areaRangeMin.toString());
        formData.append("areaRange[max]", userdata.areaRangeMax.toString());
      }

      // ✅ Append Price Range
      if (userdata?.priceRangeMin !== undefined && userdata?.priceRangeMax !== undefined) {
        formData.append("priceRange[min]", userdata.priceRangeMin.toString());
        formData.append("priceRange[max]", userdata.priceRangeMax.toString());
      }

      // ✅ Append Other Fields
      formData.append("pricePerSqFt", userdata?.pricePerSqFt?.toString() || "0");
 
      formData.append("availability", userdata?.availability || "67d90f7c24424477265974a7"); // sending temporarry
  
      formData.append("isFeatured", userdata?.isFeatured ? "true" : "false");

      // ✅ Append YouTube Link if Exists
      if (userdata?.youtubeLink) {
        formData.append("youtubeLink", userdata.youtubeLink);
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
console.log("the formdata after is", formData)
      // ✅ Send FormData Instead of Raw Object
      const { data } = await axiosInstance.post("/api/v1/projects", formData, config);
      return data;
    } catch (error) {
      console.error("The error is:", error);
      return rejectWithValue(error);
    }
  }
);

