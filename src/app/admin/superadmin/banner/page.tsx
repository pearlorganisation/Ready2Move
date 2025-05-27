'use client'

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/dispatchHook'
import { deleteBanner, getBanner, updateBanner } from '@/lib/redux/actions/bannerAction'
import AddBannerImage from './banner-form/bannerForm'
import Image from 'next/image'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Upload } from 'lucide-react'

const Page = () => {
  const dispatch = useAppDispatch()
  const { bannerData } = useAppSelector((state) => state.banner)
  console.log(bannerData,"bannerData")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updateModalOpen,setupdateModal]=useState(false)
const[id,setId]=useState<string|null>(null)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    dispatch(getBanner()) 
  }

  const {
    register,
handleSubmit,
watch,
formState:{errors}

  } = useForm();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log("orkjk",previewImage)
  useEffect(() => {
    dispatch(getBanner())
  }, [dispatch])

  const handleDelete=(id:any)=>{
   if(id) {
      dispatch(deleteBanner(id)); }

  }

const bgImageFile = watch("bgImage");

useEffect(()=>{
  if(bgImageFile && bgImageFile.length>0){
const file= bgImageFile[0]
const previewURL = URL.createObjectURL(file)
setPreviewImage(previewURL)
return () => URL.revokeObjectURL(previewURL);

  }

},[bgImageFile])
const handleUpdate=(id:string)=>{
setupdateModal(!updateModalOpen)
setId(id)

}
const [selectedImage,setSelecteImage]= useState<File | null>(null);
console.log(selectedImage,"selectedimg")
const handleSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelecteImage(file);
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
  }
};
console.log(id,"isssid")
const onSubmit = async (data: any) => {

  // const formData = new FormData();

const formdata ={ bgImage:selectedImage, id:id} 
  dispatch(updateBanner(formdata))
  
  
}


  return (
    <div className="p-6">
      {/* Header & Add Banner Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Banners</h1>
        <button
          className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add Banner
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg p-4 max-w-3xl w-full shadow-xl overflow-y-auto max-h-[90vh]">
            <AddBannerImage onclose={handleCloseModal} />
          </div>
        </div>
      )}

      {/* Banner Grid */}
      {bannerData?.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Image</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Headline</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quote</th>
          <th className='px-6 py-3 text-left text-sm font-medium text-gray-700'>Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {bannerData?.map((banner: any) => (
          <tr key={banner?._id}>
            <td className="px-6 py-4">
              {banner.bgImage?.secure_url ? (
                <Image
                  src={banner?.bgImage.secure_url}
                  alt="Banner"
                  width={120}
                  height={60}
                  className="rounded object-cover w-28 h-16"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </td>
            <td className="px-6 py-4 text-sm text-gray-800">{banner.headline}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{banner.quote}</td>
        
            
            <td className="p-3 flex justify-center items-center mt-6 gap-4">
                  <button className="bg-yellow-400 p-2 rounded text-white hover:bg-yellow-500" onClick={()=>handleUpdate(banner?._id)}>
                    <FaEdit />
                  </button>
                  <button className="bg-red-500 p-2 rounded text-white hover:bg-red-600" onClick={()=>handleDelete(banner._id)}>
                    <FaTrash />
                  </button>
                </td>
           
          </tr>
        ))}
      </tbody>
    </table>
    {updateModalOpen &&(
      <>
      <form onSubmit={handleSubmit(onSubmit)}>  
              <div className='bg-white w-full'>
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
                      // {...register("bgImage", { required: "Image is required" })}
                      className="hidden"
                      onChange={(e)=>handleSelectedImage(e)}
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
              <button type='submit'className='bg-blue-500 hover:bg-blue-600 text-white  mt-4 flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors '>submit</button></form>


      </>
    )}

  </div>
) : (
  <p className="text-gray-500">No banners found.</p>
)}



    </div>
  )
}

export default Page
