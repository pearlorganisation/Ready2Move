"use client"
 
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeatures } from "@/lib/redux/actions/featuresAction";
import { createProjectsByBuilder } from "@/lib/redux/actions/projectAction";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import slugify from "slugify"
export type ProjectFormInputs = {
    id:string,
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  service: "SELL" | "RENT";
  projectType: "RESIDENTIAL" | "COMMERCIAL";
  areaRangeMin: number;
  areaRangeMax: number;
  priceRangeMin: number;
  priceRangeMax: number;
  pricePerSqFt: number;
  reraNumber: string;
  availability: string;
  reraPossessionDate: string;
  aminities?: string[];
  bankOfApproval?: string[];
  imageGallary?: File[];
  isFeatured?: boolean;
  youtubeLink?: string;
};

const createProject = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ProjectFormInputs>();


  const { featureData } = useAppSelector((state) => state.features);
  const { userData } = useAppSelector(state=> state.user)
  const [previewImages, setPreviewImages] = useState<string[]>([]);
const [selectedImages, setSelectedImages] = useState<File[]>([]);

// Handle image preview
const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files) as File[];
    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
};
  const title = watch("title")
 
  useEffect(()=>{
    if(title){
        let titleSlug = slugify(title)
        setValue("slug", titleSlug)
    }
  },[title])

  const submitForm = (data: ProjectFormInputs) => {
    const formData = {...data, id:userData?._id, 
        areaRange:{min:data.areaRangeMin, max:data.areaRangeMax}, 
        priceRange:{
        min: data.priceRangeMin,
        max: data.priceRangeMax
     },
        imageGallary: selectedImages
  };
  try{
    dispatch(createProjectsByBuilder({ userdata: formData }))
  }catch(error){
    console.log("the error is", error)
  }

   };

  useEffect(() => {
    dispatch(getFeatures())
  }, [dispatch])

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Project</h1>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          {/* Title Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input 
              {...register("title", { required: "Title is required" })} 
              placeholder="Title" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          
          {/* Slug Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input 
              {...register("slug", { required: "Slug is required" })} 
              placeholder="Slug" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
          </div>
          
          {/* Sub Title Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sub Title</label>
            <input 
              {...register("subTitle")} 
              placeholder="Sub Title" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {/* Description Field - Full Width */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            {...register("description", { required: "Description is required" })} 
            placeholder="Description" 
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

         <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Rera Possession Date</label>
          <input
             type="date"
            {...register("reraPossessionDate", { required: "Rera is required" })} 
            placeholder="reraPossessionDate" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.reraPossessionDate && <p className="text-red-500 text-sm">{errors.reraPossessionDate.message}</p>}
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rera Number</label>
            <input
                type="number"
                onWheel={(e) => (e.target as HTMLInputElement).blur()} // ✅ Prevent scrolling from changing the number
                {...register("reraNumber", { required: "Rera Number is required" })} 
                placeholder="reraNumber" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.reraNumber && <p className="text-red-500 text-sm">{errors.reraNumber.message}</p>}
            </div>
 
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Minimum area</label>
            <input
                type="number"
                onWheel={(e) => (e.target as HTMLInputElement).blur()} // ✅ Prevent scrolling from changing the number
                {...register("areaRangeMin", { required: "areaRangeMin Number is required" })} 
                placeholder="areaRangeMin" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.areaRangeMin && <p className="text-red-500 text-sm">{errors.areaRangeMin.message}</p>}
            </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">areaRangeMax</label>
            <input
                type="number"
                onWheel={(e) => (e.target as HTMLInputElement).blur()} // ✅ Prevent scrolling from changing the number
                {...register("areaRangeMax", { required: "areaRangeMax Number is required" })} 
                placeholder="areaRangeMax" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.areaRangeMax && <p className="text-red-500 text-sm">{errors.areaRangeMax.message}</p>}
            </div>

             <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">priceRangeMax</label>
            <input
                type="number"
                onWheel={(e) => (e.target as HTMLInputElement).blur()} // ✅ Prevent scrolling from changing the number
                {...register("priceRangeMax", { required: "priceRangeMax Number is required" })} 
                placeholder="priceRangeMax" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.priceRangeMax && <p className="text-red-500 text-sm">{errors.priceRangeMax.message}</p>}
            </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">priceRangeMin</label>
            <input
                type="number"
                onWheel={(e) => (e.target as HTMLInputElement).blur()} // ✅ Prevent scrolling from changing the number
                {...register("priceRangeMin", { required: "priceRangeMin Number is required" })} 
                placeholder="priceRangeMin" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.priceRangeMin && <p className="text-red-500 text-sm">{errors.priceRangeMin.message}</p>}
            </div>
        {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Locality</label>
            <input 
              {...register("locality", { required: "Locality is required" })} 
              placeholder="Locality" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.locality && <p className="text-red-500 text-sm">{errors.locality.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input 
              {...register("city", { required: "City is required" })} 
              placeholder="City" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input 
              {...register("state", { required: "State is required" })} 
              placeholder="State" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>
        </div>
        
        {/* Service and Project Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Service Type</label>
            <select 
              {...register("service", { required: "Service type is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Service</option>
              <option value="SELL">Sell</option>
              <option value="RENT">Rent</option>
            </select>
            {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Project Type</label>
            <select 
              {...register("projectType", { required: "Project type is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Project Type</option>
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
            {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType.message}</p>}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureData?.map((category) =>
                {
                  console.log("the category data is", category)
                  return (
                <fieldset key={category.type} className="border border-gray-300 rounded-md p-4">
                    <legend className="px-2 font-medium text-gray-700">{category.type.replace("_", " ")}</legend>
                    {/* Uncomment when ready to display features */}
                    {category.features.map((feature) => (
                    <label key={feature._id} className="flex items-center space-x-2 py-1">
                        <input 
                        type="checkbox" 
                        {...register("aminities")} 
                        value={feature._id} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                        /> 
                        <span>{feature.name}</span>
                    </label>
                    ))}
                </fieldset>
                )})}
          </div>
        </div>
         <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Bank Approved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureData
              ?.filter((item) => item?.type === "BANKS")
              ?.flatMap((item) =>
              item?.features?.map((bank) => (
                <label key={bank?._id} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  {...register("bankOfApproval")}
                  value={bank?._id}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>{bank?.name}</span>
                </label>
              ))
              )}
          </div>
          </div>
        {/** image gallery */}
        <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add images</h2>
           <input
                type="file"
                multiple
                {...register("imageGallary", { required: "At least one image is required" })}
                className="w-full border p-2 rounded mt-1"
                onChange={(e) => {
                    handleImagePreview(e);
                }}
            />
             {/* Image Preview */}
                <div className="flex gap-2 mt-2">
                    {previewImages.map((src, index) => (
                        <img key={index} src={src} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
                    ))}
                </div>
          </div>

          {/** youtube link field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Youtube Link</label>
             <input 
              {...register("youtubeLink", { required: "youtubeLink is required" })} 
              placeholder="youtubeLink" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            {errors.youtubeLink && <p className="text-red-500 text-sm">{errors.youtubeLink.message}</p>}
          </div>
        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  )
}

export default createProject