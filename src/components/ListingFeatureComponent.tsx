"use client"

import { type FC, useEffect, useState } from "react"
import { Pencil, Trash2, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { createFeature, getFeatures } from "@/lib/redux/actions/featuresAction"
import { useForm } from "react-hook-form"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/free-mode";


interface FeatureItem {
  id: number
  name: string
  slug: string
}

interface FormValues {
  name: string
  type: string
}

const ListingFeatureComponent: FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("Parking")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { featureData } = useAppSelector((state) => state.features)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({defaultValues:{
    name:"",
    type:selectedType
  }})

  useEffect(() => {
    dispatch(getFeatures())
  }, [dispatch])

  useEffect(() => {
    if (featureData && featureData.length > 0) {
      const parkingType = featureData.find((item) => item.type === "Parking")
      const defaultType = parkingType ? parkingType.type : featureData[0].type
      setSelectedType(defaultType)
      setValue("type", defaultType)
    }
  }, [featureData, setValue])
  
  const onSubmit = (data:any) => {
dispatch(createFeature(data))
    setIsAddDialogOpen(false)
    reset() // Reset the form after submission
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-blue-700">FEATURE LISTING</h1>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add Type
        </button>
      </div>

      <div className="mb-6 px-4">
  <Swiper
    slidesPerView="auto"
    spaceBetween={12}
    className="mySwiper"
  >
    {featureData?.map((item, index) => (
      <SwiperSlide key={index} className="!w-auto">
        <button
          className={`whitespace-nowrap px-4 py-2 text-sm font-medium border rounded-md ${
            selectedType === item.type
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedType(item.type)}
        >
          {item.type.split("_").join(" ")}
        </button>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


      <div className="bg-white rounded-md overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {featureData?.map((featureGroup) =>
              featureGroup.type === selectedType
                ? featureGroup.features.map((feature, i) => (
                    <tr key={feature._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{i + 1}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-base text-gray-900">{feature.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-amber-500 hover:text-amber-600">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : null
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium">Add Feature Listing</h3>
              <button
                onClick={() => {
                  setIsAddDialogOpen(false)
                  reset()
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-4">
                {/* Select Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Type</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {selectedType}
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto">
                        {featureData.map((item, i) => (
                          <div
                            key={i}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedType(item.type)
                              setValue("type", item.type)
                              setIsDropdownOpen(false)
                            }}
                          >
                            {item.type.split("_").join(" ")}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-2 px-6 py-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddDialogOpen(false)
                    reset()
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListingFeatureComponent