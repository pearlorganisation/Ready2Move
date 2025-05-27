"use client"

import { type FC, useEffect, useState } from "react"
import { Pencil, Trash2, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { createFeature, deleteFeatures, getFeatures, updateFeature } from "@/lib/redux/actions/featuresAction"
import { useForm } from "react-hook-form"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/free-mode";
import DeleteModal from "./DeletedModal"


interface FeatureItem {
  id: number
  name: string
  slug: string
}

interface FormValues {
  name: string
  type: string
}
interface EditFeature {
  id: string
  name: string
}
 const ListingFeatureComponent: FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("PROPERTY_TYPE")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
const[isEditModalOpen,setisEditModalOpen]=useState(false)
const [editFeature, setIseditFeature] = useState<EditFeature | null>(null)

const [isId, setIsId] = useState<{ id: string }>({ id: "" })
const[editMode,setisEditMode]=useState()
const[openDeleteModal,setDeleteModal]=useState(false)
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

  const featureTypes = [
    "PROPERTY_TYPE",
    "PARKING",
    "FURNISHING",
    "ENTRANCE_FACING",
    "AVAILABILITY",
    "PROPERTY_AGE",
    "OWNERSHIP",
    "AMENITIES",
    "WATER_SOURCE",
    "OTHER_FEATURES",
    "FLOORING",
    "BANKS",
  ]



  useEffect(() => {
    if (featureData && featureData.length > 0) {
      const parkingType = featureData.find((item) => item.type === "PROPERTY_TYPE")
      const defaultType = parkingType ? parkingType.type : featureData[0].type
    
      setValue("type", defaultType)
    }
  }, [featureData, setValue])
  
const CloseModal=()=>{
setDeleteModal(false)
}
const handleDelete=()=>{
  dispatch(deleteFeatures(isId.id))
  setDeleteModal(false)
}
  
//   const onSubmit = (data:any) => {
//     console.log(data,"data")
// dispatch(createFeature(data)).then((res)=>{
// if(res.payload.success){
//   dispatch(getFeatures()) 
// }
// })
//     setIsAddDialogOpen(false)
//     reset() // Reset the form after submission
//   }


const onSubmit = (data: any) => {
  if (editFeature) {
    // Edit mode
    dispatch(updateFeature({ id: editFeature.id, ...data })).then((res) => {
      if (res.payload.success) {
        dispatch(getFeatures())
        reset()
        setIseditFeature(null)
        setisEditModalOpen(false)
      }
    })
  } else {
    // Add mode
    dispatch(createFeature(data)).then((res) => {
      if (res.payload.success) {
        dispatch(getFeatures())
        reset()
        setIsAddDialogOpen(false)
      }
    })
  }
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
    {featureTypes?.map((item, index) => (
      <SwiperSlide key={index} className="!w-auto">
        <button
          className={`whitespace-nowrap px-4 py-2 text-sm font-medium border rounded-md ${
            selectedType === item
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => {setSelectedType(item)
            setValue("type",item)
          }}
        >
          {item.split("_").join(" ")}
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
                        <div className="flex space-x-8">
                        <button
  className="text-amber-500 hover:text-amber-600"
  onClick={() => {
    setIseditFeature({ id: feature._id, name: feature.name })
    setValue("name", feature.name)
    setValue("type", selectedType)
    setisEditModalOpen(true)
  }}
>
  <Pencil className="h-4 w-4" />
</button>
<button className="text-red-500 hover:text-red-600" onClick={()=>{setIsId({id:feature._id})
setDeleteModal(true)}
}>
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


{/* Editmodal */}

{isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium">Update Feature Listing</h3>
              <button
                onClick={() => {
                  setisEditModalOpen(false)
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
                    setisEditModalOpen(false)
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



{
  openDeleteModal &&  (<>
  <DeleteModal  isOpen={openDeleteModal}
  onClose={CloseModal}
  onDelete={handleDelete}/>
  </>)
}
    </div>
  )
}

export default ListingFeatureComponent