"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { deleteImagesProject, getSingleProject } from "@/lib/redux/actions/projectAction";
import slugify from "slugify";


export interface Project {
  _id?: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  priceRange: { min: number; max: number };
  areaRange: { min: number; max: number };
  reraNumber: string;
  reraPossessionDate?: string | Date;
  youtubeEmbedLink: string;
  service: "RENT" | "SALE";
  projectType: "RESIDENTIAL" | "COMMERCIAL";
  pricePerSqFt: number;
  aminities:  string[];
  isFeatured: boolean;
  availability: string;
  bankOfApproval:string;
  imageGallery: Image[];

}
interface Image {
  secure_url: string;
  public_id: string;
  _id: string;
}

interface Amenity {
  _id: string;
  // name: string;
  // type: string; 
 }
interface Availability {
  _id: string; 
}
interface BankApproval {
  _id: string;
  name: string;
  type: string;  
}
const EditProjectComp = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { singleProjectData } = useAppSelector((state) => state.projects);
  console.log(singleProjectData.availability, "avail");
  const { featureData } = useAppSelector((state)=> state.features);

  const [generatedSlug, setGeneratedSlug] = useState(slug);
  const [allAmenities, setAllAmenities] = useState<Amenity[]>([]);
  // const [availability, setAvailability] = useState<Availability | []>();
  // const [bankAproval, setBankAproval] = useState<BankApproval>();
  const [newImages, setNewImages] = useState<File[]>([]);
  console.log("new Images",newImages)
  // console.log(availability, "availability");
  useEffect(() => {
     dispatch(getFeatures())     
    // const fetchAmenities = async () => {
    //   const response = await axiosInstance.get("/api/v1/features");

    //   const amenitiesSection = response.data.data.find(
    //     (item: any) => item.type === "AMENITIES"
    //   );

    //   const safeAmenities = amenitiesSection
    //     ? amenitiesSection.features
    //     : response.data.data.find(
    //         (item: any) =>
    //           Array.isArray(item.features) &&
    //           item.features.length &&
    //           item.features.some((f: any) => f.name?.toLowerCase())
    //       )?.features || [];
    //   console.log("safeAmenities", safeAmenities);

    //   setAllAmenities(safeAmenities);
    //   const availabilityFeature = response.data.data.find(
    //     (item: any) => item.type === "AVAILABILITY"
    //   );

    //   const availabilityOptions = availabilityFeature?.features || [];
    //   setAvailability(availabilityOptions);

    //   const bankFeature = response.data.data.find(
    //     (item: any) => item.type === "BANKS"
    //   );
    //   const bankOptions = bankFeature?.features || [];

    //   setBankAproval(bankOptions);
    // };
    // fetchAmenities();
  }, []);
 
  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<Project>();

  useEffect(() => {
    dispatch(getSingleProject({ slug }));
  }, [dispatch, slug]);
  const handleDelete = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];  // Convert single ID to an array if needed
    dispatch(deleteImagesProject({ slug, deleteImages: ids }));
  };

  useEffect(() => {
    if (singleProjectData?.title) {
      setTitle(singleProjectData.title);
      setGeneratedSlug(slugify(singleProjectData.title, { lower: true }));
       const {areaRange,priceRange,availability,...rest} = singleProjectData;
       console.log("rest",rest);
      reset({
        subTitle:singleProjectData?.subTitle,
        description:singleProjectData?.description,
        locality:singleProjectData?.locality,
        city:singleProjectData?.city,
        state:singleProjectData?.state,
        availability:availability? availability?._id : undefined,
        areaRange,priceRange,
        reraPossessionDate: singleProjectData.reraPossessionDate?.split("T")[0],
        pricePerSqFt: singleProjectData.pricePerSqFt,
        aminities: singleProjectData?.aminities?.map((item) => item._id),
        bankOfApproval:singleProjectData?.bankOfApproval?.[0]?._id,
        imageGallery: singleProjectData?.imageGallery,
        youtubeEmbedLink:singleProjectData?.youtubeEmbedLink,
        reraNumber:singleProjectData?.reraNumber
      })
    }
  }, [singleProjectData, reset]);

  const [title, setTitle] = useState("");
  const [Editslug, setSlug] = useState("");

  useEffect(() => {
    const newSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
    setSlug(newSlug);
  }, [title]);
  const [previewImg, setImagePreview] = useState<string[]>([]); // Stores the preview image URLs

const handleNewImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
    const uploadedFiles = Array.from(event.target.files);
    
    // Update the newImages state with the uploaded files
    setNewImages((prevImages) => [...prevImages, ...uploadedFiles]);

    // Generate image preview URLs and update the previewImg state
    const previewImages = uploadedFiles.map((file) => URL.createObjectURL(file));
    setImagePreview((prevPreview) => [...prevPreview, ...previewImages]);
  }
};


  // const onSubmit = async (data: Project) => {
  //   try {

  //     const formData = new FormData();

  //     // if(data?.imageGallery){
  //     //   formData.append('imageGallery', data?.imageGallery)
  //     // } 
  //     await axiosInstance.patch(`/api/v1/projects/${slug}`, data);
  //     alert("Project updated successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to update project.");
  //   }
  // };

  const onSubmit = async (data: Project) => {
    try {
      const formData = new FormData();
  
      // Append regular fields
      formData.append("title", data.title);
      formData.append("subTitle", data.subTitle);
      formData.append("description", data.description);
      formData.append("locality", data.locality);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("slug", Editslug || data.slug);
      formData.append("service", data.service);
      formData.append("projectType", data.projectType);
      formData.append("reraNumber", data.reraNumber);
      formData.append("youtubeEmbedLink", data.youtubeEmbedLink);
      formData.append("pricePerSqFt", data.pricePerSqFt.toString());
  
      // Nested fields (priceRange, areaRange, etc.)
      formData.append("priceRange[min]", data.priceRange.min.toString());
      formData.append("priceRange[max]", data.priceRange.max.toString());
      formData.append("areaRange[min]", data.areaRange.min.toString());
      formData.append("areaRange[max]", data.areaRange.max.toString());
  
      
      // Optional fields (reraPossessionDate)
      if (data.reraPossessionDate) {
        formData.append("reraPossessionDate", data.reraPossessionDate.toString());
      }
  
      // Amenities
      data.aminities.forEach((amenity) => {
        formData.append("aminities", typeof amenity === "string" ? amenity : "");
      });
  
      // Availability
      if (data.availability) {
        formData.append("availability", data.availability || "");
      }
  
      // Bank Approvals
      // if (Array.isArray(data.bankOfApproval)) {
      //   data.bankOfApproval.forEach((bank) => {
          formData.append("bankOfApproval", data.bankOfApproval);
      //   });
      // }
  
    
  
  
      // New images
      newImages.forEach((file) => {
        formData.append("imageGallery", file);
      });
  
      
      // Send request
      await axiosInstance.patch(`/api/v1/projects/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Project updated successfully!");
      router.push("/admin/superadmin/project")
    } catch (err) {
      console.error(err);
      alert("Failed to update project.");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Edit Project
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            {...register("title")}
            placeholder="Project Title"
            className="w-full p-3 border rounded-md"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValue("title", e.target.value);
            }}
          />
        </div>

        {/* Subtitle */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            {...register("subTitle")}
            placeholder="Project Subtitle"
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Description"
            rows={4}
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Location Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Locality
          </label>
          <input
            {...register("locality")}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register("city")}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            {...register("state")}
            className="w-full p-3 border rounded-md"
          />
        </div>
        {/* Dropdowns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service
          </label>
          <select
            {...register("service")}
            className="w-full p-3 border rounded-md"
          >
            <option value="RENT">Rent</option>
            <option value="SALE">Sale</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Type
          </label>
          <select
            {...register("projectType")}
            className="w-full p-3 border rounded-md"
          >
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
        </div>
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Min
          </label>
          <input
            {...register("priceRange.min")}
            type="number"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Max
          </label>
          <input
            {...register("priceRange.max")}
            type="number"
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Area Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area Min
          </label>
          <input
            {...register("areaRange.min")}
            type="number"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area Max
          </label>
          <input
            {...register("areaRange.max")}
            type="number"
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* RERA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RERA Number
          </label>
          <input
            {...register("reraNumber")}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Possession Date
          </label>
          <input
            type="date"
            {...register("reraPossessionDate")}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Per Sq.Ft (₹)
          </label>
          <input
            {...register("pricePerSqFt")}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {/* {allAmenities.map((option: any, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option._id}
                  {...register("aminities")}
                  defaultChecked={watch("aminities")?.includes(option?.name)}
                />
                <span>{option.name}</span>
              </label>
            ))} */}
          {featureData
                ?.filter((item) => item?.type == "AMENITIES")
                ?.map((category) => (
                  <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                    <legend className="px-2 font-medium text-gray-700">
                      {category.type.replace("_", " ")}
                    </legend>
                    {category?.features?.map((feature) => (
                      <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                        <input
                          type="checkbox"
                          id={`amenity-${feature._id}`}
                          {...register("aminities")}
                          value={feature._id}
                          
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                          {feature.name}
                        </label>
                      </div>
                    ))}
                  </fieldset>
                ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Availability</label>
          {/* {availability?.map((option: any) => (
            <label key={option?._id} className="flex items-center gap-2">
              <input
                type="radio"
                value={option?._id}
                {...register("availability")}
                defaultChecked={
                  singleProjectData?.availability?._id === option._id
                }
              />
              {option.name}
            </label>
          ))} */}

        {featureData
  ?.filter((item) => item?.type === "AVAILABILITY")
  ?.map((category) => (
    <fieldset key={category.type} className="border border-gray-300 w-48 rounded-md p-4">
      <legend className="px-2 font-medium text-gray-700">
        {category.type.replace("_", " ")}
      </legend>
      {category?.features?.map((feature) => (
        <div key={feature._id} className="flex items-center space-x-2 py-1">
          <input
            type="radio"
            id={`availability-${feature._id}`}
            {...register("availability")}
            value={feature._id}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label htmlFor={`availability-${feature._id}`} className="text-sm text-gray-700">
            {feature.name}
          </label>
        </div>
      ))}
    </fieldset>
))}

        </div>

        {/* {singleProjectData?.bankOfApproval?.map((option: any) => (
        <label key={option?._id} className="flex items-center gap-2">
          <input
            type="radio"
            value={option._id}
            {...register("bankOfApproval", { required: true })}
            checked={watch("bankOfApproval") === option._id}  
          />
          {option.name}
        </label>
      ))} */}
  {featureData
                                    ?.filter((item) => item?.type === "BANKS")
                                    ?.flatMap((item) =>
                                      item?.features?.map((bank) => (
                                        <div key={bank?._id} className="flex items-center space-x-2 py-1">
                                          <input
                                             type="checkbox"
                                            id={`bank-${bank?._id}`}
                                            {...register("bankOfApproval")}
                                            value={bank?._id}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <label htmlFor={`bank-${bank?._id}`} className="text-sm text-gray-700">
                                            {bank?.name}
                                          </label>
                                        </div>
                                      )),
                                    )}

        {/* YouTube */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Embed Link
          </label>
          <input
            {...register("youtubeEmbedLink")}
            placeholder="YouTube Link"
            className="w-full p-3 border rounded-md"
          />
        </div>





 


 {/* Image Gallery Section */}
 <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Gallery</label>
        <div className="flex flex-wrap gap-4">
          {/* Display Existing Images */}
          {singleProjectData?.imageGallery?.map((image: Image, index: number) => (
            <div key={image._id} className="relative w-24 h-24 bg-gray-200">
              <img
                src={image.secure_url}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
              /> 
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white p-1  py-1 px-3 rounded-full"
                onClick={() => handleDelete(image.public_id,)}
              >
                X
              </button>
            </div>
          ))}

          {/* File Upload for New Images */}
          <div>
            <input
              type="file"
              multiple
              onChange={handleNewImagesUpload}
              className="mt-2 block text-sm text-gray-700"
            />
          </div>
          {previewImg.map((preview, index) => (
  <div key={index} className="flex flex-row space-x-2">
    <img 
      src={preview} 
      alt={`preview-${index}`} 
      className="w-24 h-24 object-cover" 
    />
  </div>
))}


      {/* Display uploaded files */}
    
        </div>
      </div>


        {/* Checkbox */}
        <div className="col-span-2 flex items-center space-x-3">
          <input
            type="checkbox"
            {...register("isFeatured")}
            className="w-5 h-5"
          />
          <label className="text-sm text-gray-700">
            Mark as Featured Project
          </label>
        </div>

        {/* Submit */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectComp;
