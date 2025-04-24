
"use client"


import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getAllProjects } from "@/lib/redux/actions/projectAction";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import PaginationMainComponent from "@/components/PaginationMain";
import { Delete } from "lucide-react";
import { getAllProperties } from "@/lib/redux/actions/propertyAction";
import { SubmitHandler, useForm } from "react-hook-form";
import { SingleProperty } from "@/lib/redux/slice/propertySlice";


const ProjectListing = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState(true);
  const { propertyData, paginate } = useAppSelector((state) => state.property)
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false)
  const [updatingData, setDataForUpdating] = useState<SingleProperty | null >(null)
  console.log("propertyData", propertyData)
  const dispatch = useAppDispatch();
  const {register,setValue, handleSubmit, formState:{errors}} = useForm()

  const totalPages = Math.ceil(paginate?.total/paginate?.limit)
  const limit = paginate?.limit
  const handlePageClick = (page:number)=>{
    if(page >0 && page < totalPages){
        setCurrentPage(page)
    }
  }
  
  const handleOpen = (project:SingleProperty)=>{
    console.log("the data is", project)
    setDataForUpdating(project) 
    setIsUpdateOpen(!isUpdateOpen)
  }

  useEffect(()=>{
      if(updatingData){
        setValue("title", updatingData?.title)
        setValue("subTitle", updatingData?.subTitle)
        setValue("state", updatingData?.state)
        setValue("slug", updatingData?.slug)
        setValue("service", updatingData?.service)
        setValue("reraPossessionDate", updatingData?.reraPossessionDate)
        setValue("reraNumber", updatingData?.reraNumber)
        setValue("apartmentName", updatingData?.apartmentName)
        setValue("apartmentNo", updatingData?.apartmentNo)
        setValue("brokerage", updatingData?.brokerage)
        setValue("city", updatingData?.city)
        setValue("description", updatingData?.description)
        setValue("expectedPrice", updatingData?.expectedPrice)
        setValue("isBrokerageCharge", updatingData?.isBrokerageCharge)
        setValue("isCCAvailable", updatingData?.isCCAvailable)
        setValue("isFeatured", updatingData?.isFeatured)
        setValue("isOCAvailable", updatingData?.isOCAvailable)
        setValue("isPriceNegotiable", updatingData?.isPriceNegotiable)
        setValue("locality", updatingData?.locality)
        setValue("noOfBalconies", updatingData?.noOfBalconies)
        setValue("noOfBathrooms", updatingData?.noOfBathrooms)
        setValue("noOfBedrooms", updatingData?.noOfBedrooms)
        setValue("property", updatingData?.property)
        setValue("youtubeEmbedLink", updatingData?.youtubeEmbedLink)

      }
  },[updatingData])

  useEffect(() => {
    dispatch(getAllProperties({page:currentPage, limit:50,priceRange:0 ,bedRooms:0, bathRooms:0}))
  }, [dispatch, currentPage])

  const onSubmit:SubmitHandler<any> =(data)=>{

  }
  
  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Property</h2>
      <table className="w-full table-auto border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3 border">S No.</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Image</th>
            <th className="p-3 border text-nowrap">Property Type</th>        
            <th className="p-3 border">Locality</th>
            <th className="p-3 border">RERA Number</th>
            <th className="p-3 border">Services</th>
            <th className="p-3 border">Featured</th>
          
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(propertyData)&& propertyData?.map((project: any,index:any) => (
              <tr key={project?._id} className="border-t">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{project?.title}</td>
                <td className="p-3 border">{project.imageGallery.slice(0,1).map((img:any)=>{
                  return <img key={img} src={img.secure_url} alt="image" className="w-20 h-20 rounded-md" />
                })}</td> 
                <td className="p-3 border">{project?.propertyType?.name}</td>
                <td className="p-3 border">{project.city} {project.locality} {project.state}</td>
                <td className="p-3 border">{project?.reraNumber}</td>         
                <td className="p-3 border">{project?.service}</td>  
                  

                <td className="p-3 border">
                  {project.isFeatured ? (
                    <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">YES</span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-gray-400 text-white">NO</span>
                  )}
                </td>
              
                <td className="p-3 flex justify-center items-center mt-6 gap-4">
                  <button onClick={()=>handleOpen(project)} className="bg-yellow-400 p-2 rounded text-white hover:bg-yellow-500">
                   
                    <FaEdit />
                  </button>
                  <button className="bg-red-500 p-2 rounded text-white hover:bg-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      
      <div className="mt-12 flex justify-center">
     <PaginationMainComponent
      totalPages={totalPages}
      currentPage={currentPage}
      paginate={paginate}
      handlePageClick={handlePageClick}
     /></div>
    
     <div>
    {isUpdateOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white w-full h-full p-6 overflow-auto relative">
              {/* Your content here */}
              <button
                className="absolute top-4 right-4 text-black bg-gray-200 rounded px-3 py-1"
                onClick={() => setIsUpdateOpen(false)}
              >
                Close
              </button>
              <h2 className="text-2xl font-bold">Update Modal</h2>
              {/* More content */}
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input {...register('title')} placeholder="Title" className="border p-2 w-full" />
                  <input {...register('subTitle')} placeholder="Subtitle" className="border p-2 w-full" />
                  <input {...register('slug')} placeholder="Slug" className="border p-2 w-full" />
                  <input {...register('service')} placeholder="Service" className="border p-2 w-full" />
                  <input {...register('reraPossessionDate')} placeholder="RERA Possession Date" type="date" className="border p-2 w-full" />
                  <input {...register('reraNumber')} placeholder="RERA Number" className="border p-2 w-full" />
                  <input {...register('apartmentName')} placeholder="Apartment Name" className="border p-2 w-full" />
                  <input {...register('apartmentNo')} placeholder="Apartment Number" className="border p-2 w-full" />
                  <input {...register('brokerage')} placeholder="Brokerage" className="border p-2 w-full" />
                  <input {...register('city')} placeholder="City" className="border p-2 w-full" />
                  <input {...register('state')} placeholder="State" className="border p-2 w-full" />
                  <textarea {...register('description')} placeholder="Description" className="border p-2 w-full" />
                  <input type="number" {...register('expectedPrice')} placeholder="Expected Price" className="border p-2 w-full" />
                  <input type="checkbox" {...register('isBrokerageCharge')} /> Brokerage Charge?
                  <input type="checkbox" {...register('isCCAvailable')} /> CC Available?
                  <input type="checkbox" {...register('isOCAvailable')} /> OC Available?
                  <input type="checkbox" {...register('isFeatured')} /> Featured?
                  <input type="checkbox" {...register('isPriceNegotiable')} /> Price Negotiable?
                  <input {...register('locality')} placeholder="Locality" className="border p-2 w-full" />
                  <input type="number" {...register('noOfBalconies')} placeholder="Number of Balconies" className="border p-2 w-full" />
                  <input type="number" {...register('noOfBathrooms')} placeholder="Number of Bathrooms" className="border p-2 w-full" />
                  <input type="number" {...register('noOfBedrooms')} placeholder="Number of Bedrooms" className="border p-2 w-full" />
                  <input {...register('property')} placeholder="Property Type" className="border p-2 w-full" />
                  <input {...register('youtubeEmbedLink')} placeholder="YouTube Embed Link" className="border p-2 w-full" />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit
            </button>
    </form>
            </div>
          </div>
        )}
     </div>



   </div>
   
  );
};

export default ProjectListing;
