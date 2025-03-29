"use client"

import type React from "react"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { getFeatures } from "@/lib/redux/actions/featuresAction"
import { createProjectsByBuilder } from "@/lib/redux/actions/projectAction"
import { useEffect, useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import slugify from "slugify"

export type ProjectFormInputs = {
  id: string
  user: string
  title: string
  slug: string
  subTitle: string 
  description: string
  locality: string
  city: string
  state: string
  service: "SELL" | "RENT"
  projectType: "RESIDENTIAL" | "COMMERCIAL"
  areaRangeMin: number
  areaRangeMax: number
  priceRangeMin: number
  priceRangeMax: number
  pricePerSqFt: number
  reraNumber: string
  availability: string
  reraPossessionDate: string
  aminities?: string[]
  bankOfApproval?: string[]
  imageGallary?: File[]
  isFeatured?: boolean
  youtubeLink?: string
}

const CreateProject = () => {
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = useState(0)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProjectFormInputs>()

  const { featureData } = useAppSelector((state) => state.features)
  const { userData } = useAppSelector((state) => state.user)

  // Handle image preview
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files) as File[]
    setSelectedImages(files)

    const previews = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const title = watch("title")
  const service = watch("service")
  const projectType = watch("projectType")

  useEffect(() => {
    if (title) {
      const titleSlug = slugify(title)
      setValue("slug", titleSlug)
    }
  }, [title, setValue])

  const submitForm = (data: ProjectFormInputs) => {
    const formData = {
      ...data,
      id: userData?._id,
      areaRange: { min: data.areaRangeMin, max: data.areaRangeMax },
      priceRange: {
        min: data.priceRangeMin,
        max: data.priceRangeMax,
      },
      imageGallary: selectedImages,
    }
    try {
      dispatch(createProjectsByBuilder({ userdata: formData }))
    } catch (error) {
      console.log("the error is", error)
    }
  }

  useEffect(() => {
    dispatch(getFeatures())
  }, [dispatch])

  const steps = [
    {
      id: "basic-details",
      title: "Basic Details",
      subtitle: "Add basic details",
    },
    {
      id: "property-location",
      title: "Property Location",
      subtitle: "Where is your property located?",
    },
    {
      id: "property-details",
      title: "Property Details",
      subtitle: "Tell us about your property",
    },
    {
      id: "price-details",
      title: "Price Details",
      subtitle: "Add pricing and details",
    },
    {
      id: "amenities-details",
      title: "Amenities Details",
      subtitle: "Add amenities / unique features",
    },
    {
      id: "photo-gallery",
      title: "Photo Gallery",
      subtitle: "Add photos of your property",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-4">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative border-l-4 pb-6 ${
                index === steps.length - 1 ? "border-transparent" : ""
              } ${currentStep === index ? "border-blue-600" : "border-slate-200"}`}
            >
              <div
                className="ml-4 hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                onClick={() => setCurrentStep(index)}
              >
                <h3 className={`font-medium text-sm ${currentStep === index ? "text-blue-600" : "text-slate-500"}`}>
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit(submitForm)} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            {/* Step Content */}
            <div className="p-6">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Basic Details</h2>
                    <p className="text-slate-500 text-sm">Add basic details</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Title
                      </label>
                      <input
                        id="title"
                        placeholder="e.g. 2 BHK Apartment for Sale in Rustomjee Global City"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("title", { required: "Title is required" })}
                      />
                      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                        Slug
                      </label>
                      <input
                        id="slug"
                        placeholder="slug"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-50"
                        {...register("slug")}
                        readOnly
                      />
                    </div>

                    <div>
                      <label htmlFor="subTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Subtitle (optional)
                      </label>
                      <input
                        id="subTitle"
                        placeholder="e.g. Kandivali West, Mumbai, Mahavir Nagar"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("subTitle")}
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Description
                      </label>
                      <textarea
                        id="description"
                        placeholder="Describe your property in detail"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                        {...register("description", { required: "Description is required" })}
                      />
                      {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">You're looking to</label>
                      <div className="flex space-x-6 mt-2">
                        <Controller
                          name="service"
                          control={control}
                          defaultValue="SELL"
                          render={({ field }) => (
                            <>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="sell"
                                  value="SELL"
                                  checked={field.value === "SELL"}
                                  onChange={() => field.onChange("SELL")}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor="sell" className="ml-2 block text-sm text-gray-700">
                                  SELL
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="rent"
                                  value="RENT"
                                  checked={field.value === "RENT"}
                                  onChange={() => field.onChange("RENT")}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor="rent" className="ml-2 block text-sm text-gray-700">
                                  RENT
                                </label>
                              </div>
                            </>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                      <div className="flex space-x-6 mt-2">
                        <Controller
                          name="projectType"
                          control={control}
                          defaultValue="RESIDENTIAL"
                          render={({ field }) => (
                            <>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="residential"
                                  value="RESIDENTIAL"
                                  checked={field.value === "RESIDENTIAL"}
                                  onChange={() => field.onChange("RESIDENTIAL")}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor="residential" className="ml-2 block text-sm text-gray-700">
                                  RESIDENTIAL
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="commercial"
                                  value="COMMERCIAL"
                                  checked={field.value === "COMMERCIAL"}
                                  onChange={() => field.onChange("COMMERCIAL")}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor="commercial" className="ml-2 block text-sm text-gray-700">
                                  COMMERCIAL
                                </label>
                              </div>
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Property Location</h2>
                    <p className="text-slate-500 text-sm">Where is your property located?</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-1">
                        Locality
                      </label>
                      <input
                        id="locality"
                        placeholder="e.g. Andheri"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("locality", { required: "Locality is required" })}
                      />
                      {errors.locality && <p className="text-red-500 text-xs mt-1">{errors.locality.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        placeholder="Enter city name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("city", { required: "City is required" })}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        id="state"
                        placeholder="Enter state name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("state", { required: "State is required" })}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Property Details</h2>
                    <p className="text-slate-500 text-sm">Tell us about your property</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="areaRangeMin" className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Area (Sq.Ft)
                        </label>
                        <input
                          id="areaRangeMin"
                          type="number"
                          placeholder="Minimum area"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          {...register("areaRangeMin", {
                            required: "Minimum area is required",
                            valueAsNumber: true,
                          })}
                        />
                        {errors.areaRangeMin && (
                          <p className="text-red-500 text-xs mt-1">{errors.areaRangeMin.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="areaRangeMax" className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Area (Sq.Ft)
                        </label>
                        <input
                          id="areaRangeMax"
                          type="number"
                          placeholder="Maximum area"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          {...register("areaRangeMax", {
                            required: "Maximum area is required",
                            valueAsNumber: true,
                          })}
                        />
                        {errors.areaRangeMax && (
                          <p className="text-red-500 text-xs mt-1">{errors.areaRangeMax.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reraNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        RERA Number
                      </label>
                      <input
                        id="reraNumber"
                        placeholder="Enter RERA Number"
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("reraNumber", { required: "RERA Number is required" })}
                      />
                      {errors.reraNumber && <p className="text-red-500 text-xs mt-1">{errors.reraNumber.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="reraPossessionDate" className="block text-sm font-medium text-gray-700 mb-1">
                        RERA Possession Date
                      </label>
                      <input
                        id="reraPossessionDate"
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("reraPossessionDate", { required: "RERA Possession Date is required" })}
                      />
                      {errors.reraPossessionDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.reraPossessionDate.message}</p>
                      )}
                    </div>

                    {/* <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                        Availability
                      </label>
                      <select
                        id="availability"
                        {...register("availability", { required: "Availability is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Availability</option>
                        <option value="Ready2move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="More Than 10 Years">More Than 10 Years</option>
                      </select>
                      {errors.availability && (
                        <p className="text-red-500 text-xs mt-1">{errors.availability.message}</p>
                      )}
                    </div> */}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Price Details</h2>
                    <p className="text-slate-500 text-sm">Add pricing and details</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="priceRangeMin" className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Price (₹)
                        </label>
                        <input
                          id="priceRangeMin"
                          type="number"
                          placeholder="Minimum price"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          {...register("priceRangeMin", {
                            required: "Minimum price is required",
                            valueAsNumber: true,
                          })}
                        />
                        {errors.priceRangeMin && (
                          <p className="text-red-500 text-xs mt-1">{errors.priceRangeMin.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="priceRangeMax" className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Price (₹)
                        </label>
                        <input
                          id="priceRangeMax"
                          type="number"
                          placeholder="Maximum price"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          {...register("priceRangeMax", {
                            required: "Maximum price is required",
                            valueAsNumber: true,
                          })}
                        />
                        {errors.priceRangeMax && (
                          <p className="text-red-500 text-xs mt-1">{errors.priceRangeMax.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pricePerSqFt" className="block text-sm font-medium text-gray-700 mb-1">
                        Price Per Sq.Ft (₹)
                      </label>
                      <input
                        id="pricePerSqFt"
                        type="number"
                        placeholder="Price per square foot"
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("pricePerSqFt", {
                          required: "Price per sq.ft is required",
                          valueAsNumber: true,
                        })}
                      />
                      {errors.pricePerSqFt && (
                        <p className="text-red-500 text-xs mt-1">{errors.pricePerSqFt.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Amenities Details</h2>
                    <p className="text-slate-500 text-sm">Add amenities / unique features</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {featureData
                          ?.filter((item) => item?.type !== "BANKS")
                          ?.map((category) => (
                            <fieldset key={category.type} className="border border-gray-300 rounded-md p-4">
                              <legend className="px-2 font-medium text-gray-700">
                                {category.type.replace("_", " ")}
                              </legend>
                              {category.features.map((feature) => (
                                <div key={feature._id} className="flex items-center space-x-2 py-1">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank Approvals</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Photo Gallery</h2>
                    <p className="text-slate-500 text-sm">Add photos of your property</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700 mb-1">
                        Youtube Embed Link
                      </label>
                      <input
                        id="youtubeLink"
                        placeholder="e.g. https://www.youtube.com/embed/abcdefg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("youtubeLink")}
                      />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isFeatured"
                          {...register("isFeatured")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isFeatured" className="text-sm text-gray-700">
                          Featured Property
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Gallery</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          id="imageGallary"
                          multiple
                          accept="image/*"
                          className="hidden"
                          ref={(e) => {
                            fileInputRef.current = e;
                            register("imageGallary").ref(e);
                          }}
                          onChange={handleImagePreview}
                        />
                        <label
                          htmlFor="imageGallary"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-slate-500">
                            Drag and drop some files here, or click to select files
                          </p>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Select Files
                          </button>
                        </label>
                      </div>

                      {/* Preview uploaded images */}
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {previewImages.map((src, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={src || "/placeholder.svg"}
                                alt="Property"
                                className="h-24 w-full object-cover rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center p-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                Back
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Project
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject

