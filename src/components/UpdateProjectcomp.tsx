"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import {
  deleteImagesProject,
  getSingleProject,
} from "@/lib/redux/actions/projectAction";
import slugify from "slugify";
import { getFeatures } from "@/lib/redux/actions/featuresAction";
import { useRouter } from "next/navigation";

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
  service: string;
  projectType: string;
  pricePerSqFt: number;
  aminities: string[];
  isFeatured: boolean;
  availability: any;
  bankOfApproval: string[];
  imageGallery: Image[];
  ogMetaField?: {
    ogTitle: string;
    ogDescription: string;
    ogImage: { secure_url: string; public_id: string };
  };
  ogTitle?: string; // For form handling
  ogDescription?: string; // For form handling
  ogImage?: any; // For form handling
}

interface Image {
  secure_url: string;
  public_id: string;
  _id: string;
}

const EditProjectComp = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { singleProjectData } = useAppSelector((state) => state.projects);
  const { featureData } = useAppSelector((state) => state.features);
  const [ogPreview, setOgPreview] = useState<string | null>(null);
  const [generatedSlug, setGeneratedSlug] = useState(slug);
  const [newImages, setNewImages] = useState<File[]>([]);
  const router = useRouter();

  useEffect(() => {
    dispatch(getFeatures());
  }, [dispatch]);

  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<Project>();

  useEffect(() => {
    dispatch(getSingleProject({ slug }));
  }, [dispatch, slug]);

  const handleDelete = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    dispatch(deleteImagesProject({ slug, deleteImages: ids })).then(
      (res: any) => {
        if (res?.payload?.data?.success === true) {
          dispatch(getSingleProject({ slug }));
        }
      }
    );
  };

  useEffect(() => {
    if (singleProjectData?.title) {
      setTitle(singleProjectData.title);
      setGeneratedSlug(slugify(singleProjectData.title, { lower: true }));

      reset({
        title: singleProjectData?.title,
        subTitle: singleProjectData?.subTitle,
        description: singleProjectData?.description,
        locality: singleProjectData?.locality,
        city: singleProjectData?.city,
        state: singleProjectData?.state,
        availability: singleProjectData?.availability?._id,
        areaRange: singleProjectData.areaRange,
        priceRange: singleProjectData.priceRange,
        reraPossessionDate: singleProjectData.reraPossessionDate?.split("T")[0],
        pricePerSqFt: singleProjectData.pricePerSqFt,
        aminities: singleProjectData?.aminities?.map((item: any) => item._id),
        ogTitle: singleProjectData.ogMetaField?.ogTitle || "",
        ogDescription: singleProjectData.ogMetaField?.ogDescription || "",
        bankOfApproval: singleProjectData?.bankOfApproval?.map((item: any) => item?._id),
        imageGallery: singleProjectData?.imageGallery,
        youtubeEmbedLink: singleProjectData?.youtubeEmbedLink,
        reraNumber: singleProjectData?.reraNumber,
        isFeatured: singleProjectData?.isFeatured,
        projectType: singleProjectData?.projectType,
        service: singleProjectData?.service,
        slug: singleProjectData.slug
      });

      if (singleProjectData.ogMetaField?.ogImage?.secure_url) {
        setOgPreview(singleProjectData.ogMetaField.ogImage.secure_url);
      }
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

  const [previewImg, setImagePreview] = useState<string[]>([]);

  const handleNewImagesUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setNewImages((prevImages) => [...prevImages, ...uploadedFiles]);
      const previewImages = uploadedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview((prevPreview) => [...prevPreview, ...previewImages]);
    }
  };

  const onSubmit = async (data: Project) => {
    try {
      const formData = new FormData();
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
      formData.append("ogTitle", data.ogTitle || "");
      formData.append("ogDescription", data.ogDescription || "");

      if (data.ogImage && data.ogImage.length > 0) {
        formData.append("ogImage", data.ogImage[0]);
      }

      formData.append("priceRange[min]", data.priceRange.min.toString());
      formData.append("priceRange[max]", data.priceRange.max.toString());
      formData.append("areaRange[min]", data.areaRange.min.toString());
      formData.append("areaRange[max]", data.areaRange.max.toString());

      if (data.reraPossessionDate) {
        formData.append("reraPossessionDate", data.reraPossessionDate.toString());
      }

      data.aminities.forEach((amenity) => {
        formData.append("aminities", typeof amenity === "string" ? amenity : "");
      });

      if (data.availability) {
        formData.append("availability", data.availability || "");
      }

      if (Array.isArray(data.bankOfApproval)) {
        data.bankOfApproval.forEach((bank) => {
          formData.append("bankOfApproval", bank || "");
        });
      }

      newImages.forEach((file) => {
        formData.append("imageGallery", file);
      });

      formData.append("isFeatured", data?.isFeatured.toString());

      await axiosInstance.patch(`/api/v1/projects/${slug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Project updated successfully!");
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

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
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

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input {...register("subTitle")} placeholder="Project Subtitle" className="w-full p-3 border rounded-md" />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea {...register("description")} placeholder="Description" rows={4} className="w-full p-3 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
          <input {...register("locality")} className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input {...register("city")} className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input {...register("state")} className="w-full p-3 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select {...register("service")} className="w-full p-3 border rounded-md">
            <option value="RENT">RENT</option>
            <option value="SALE">SALE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
          <select {...register("projectType")} className="w-full p-3 border rounded-md">
            <option value="RESIDENTIAL">RESIDENTIAL</option>
            <option value="COMMERCIAL">COMMERCIAL</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Min</label>
          <input {...register("priceRange.min")} type="number" className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Max</label>
          <input {...register("priceRange.max")} type="number" className="w-full p-3 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area Min</label>
          <input {...register("areaRange.min")} type="number" className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area Max</label>
          <input {...register("areaRange.max")} type="number" className="w-full p-3 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">RERA Number</label>
          <input {...register("reraNumber")} className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Possession Date</label>
          <input type="date" {...register("reraPossessionDate")} className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Sq.Ft (₹)</label>
          <input {...register("pricePerSqFt")} className="w-full p-3 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {featureData?.filter((item) => item?.type == "AMENITIES")?.map((category) => (
                <fieldset key={category.type} className="border w-48 border-gray-300 rounded-md p-4">
                  <legend className="px-2 font-medium text-gray-700">{category.type.replace("_", " ")}</legend>
                  {category?.features?.map((feature) => (
                    <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                      <input type="checkbox" id={`amenity-${feature._id}`} {...register("aminities")} value={feature._id} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">{feature.name}</label>
                    </div>
                  ))}
                </fieldset>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Availability</label>
          {featureData?.filter((item) => item?.type === "AVAILABILITY")?.map((category) => (
              <fieldset key={category.type} className="border border-gray-300 w-48 rounded-md p-4">
                <legend className="px-2 font-medium text-gray-700">{category.type.replace("_", " ")}</legend>
                {category?.features?.map((feature) => (
                  <div key={feature._id} className="flex items-center space-x-2 py-1">
                    <input type="radio" id={`availability-${feature._id}`} {...register("availability")} value={feature._id} className="h-4 w-4 text-blue-600 border-gray-300" />
                    <label htmlFor={`availability-${feature._id}`} className="text-sm text-gray-700">{feature.name}</label>
                  </div>
                ))}
              </fieldset>
            ))}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">Bank Approvals</label>
          <div className="grid grid-cols-2 gap-2">
            {featureData?.filter((item) => item?.type === "BANKS")?.flatMap((item) =>
                item?.features?.map((bank) => (
                  <div key={bank?._id} className="flex items-center space-x-2 py-1">
                    <input type="checkbox" id={`bank-${bank?._id}`} {...register("bankOfApproval")} value={bank?._id} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor={`bank-${bank?._id}`} className="text-sm text-gray-700">{bank?.name}</label>
                  </div>
                ))
              )}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
          <input {...register("youtubeEmbedLink")} placeholder="YouTube Link" className="w-full p-3 border rounded-md" />
        </div>

        {/* SEO / OG Meta Section */}
        <div className="col-span-2 border-t pt-6 mt-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Social Media SEO (OG Meta)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input {...register("ogTitle")} placeholder="Social Media Title" className="w-full p-3 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Social Share Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("ogImage")}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setOgPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {ogPreview && (
                <div className="mt-2 relative w-40 aspect-video rounded-md overflow-hidden border">
                  <img src={ogPreview} alt="Social Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea {...register("ogDescription")} placeholder="Brief description for social sharing..." rows={3} className="w-full p-3 border rounded-md" />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image Gallery</label>
          <div className="flex flex-wrap gap-4">
            {singleProjectData?.imageGallery?.map((image: Image, index: number) => (
              <div key={image._id} className="relative w-24 h-24 bg-gray-200">
                <img src={image.secure_url} alt={`Image ${index + 1}`} className="object-cover w-full h-full rounded-md" />
                <button type="button" className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-full" onClick={() => handleDelete(image.public_id)}>X</button>
              </div>
            ))}
            <div>
              <input type="file" multiple onChange={handleNewImagesUpload} className="mt-2 block text-sm text-gray-700" />
            </div>
            {previewImg.map((preview, index) => (
              <div key={index} className="flex flex-row space-x-2">
                <img src={preview} alt={`preview-${index}`} className="w-24 h-24 object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex items-center space-x-3">
          <input type="checkbox" {...register("isFeatured")} className="w-5 h-5" />
          <label className="text-sm text-gray-700">Mark as Featured Project</label>
        </div>

        <div className="col-span-2">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectComp;