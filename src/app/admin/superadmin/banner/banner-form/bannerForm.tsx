"use client";

import { useForm } from "react-hook-form";
import { Plus, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks/dispatchHook";
import { createBanner, deleteBanner } from "@/lib/redux/actions/bannerAction";

interface Slide {
  headline: string;
quote: string;
  bgImage: string;
}

export default function AddBannerImage({ onclose }: { onclose: () => void }) {

    const [loading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors },
  } = useForm();
  const dispatch= useAppDispatch()
  const [previewImage, setPreviewImage] = useState<string | null>(null);



  const onSubmit = async (data: any) => {
    console.log("data", data);
    const file = data.bgImage?.[0];
    const formData = new FormData();
    formData.append("headline", data.headline);
    formData.append("quote", data.quote);
    if (file) {
      formData.append("bgImage", file);
    }
  
    setIsLoading(true);
    try {
      await dispatch(createBanner(formData));
      reset(); // Optional: clear the form after success
    } catch (err) {
      console.error("Banner creation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
const bgImageFile = watch("bgImage");

useEffect(() => {
  if (bgImageFile && bgImageFile.length > 0) {
    const file = bgImageFile[0];
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

   
    return () => URL.revokeObjectURL(previewURL);
  }
}, [bgImageFile]);






  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="container mx-auto p-6 max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add Banner</h1> <button
  type="button"
  onClick={onclose}
  className="text-sm px-3 py-1.5 text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors duration-200"
>
  Cancel
</button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Headline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  {...register("headline", { required: "Title is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter slide title"
                />
           
              </div>

              {/* Quote */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("quote", { required: "Description is required" })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter slide description"
                />
              
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt="Slide Image"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2 bg-gray-50 border-t flex flex-col items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      {...register("bgImage", { required: "Image is required" })}
                      className="hidden"
                      id="upload-image"
                    />
                    <label
                      htmlFor="upload-image"
                      className="cursor-pointer flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </label>
                  
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">


<button
  type="submit"
  disabled={loading}

  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors
    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}
  `}
>

  {loading ? "Loading" : "Submit"}
</button>



              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
