"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { getAllProjects } from "@/lib/redux/actions/projectAction"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { ProjectData } from "@/lib/redux/slice/projectSlice"
import PaginationMainComponent from "@/components/PaginationMain"

const Page = () => {
  const dispatch = useAppDispatch()
  const { projectData, paginate } = useAppSelector((state) => state.projects)
   const [currentPage, setCurrentPage] = useState<number>(1)
  const totalPages = Math.ceil(paginate?.total/paginate?.limit)
 
  const handlePageClick = (page:number)=>{
    if(page >0 && page < totalPages){
        setCurrentPage(page)
    }
  }

  useEffect(() => {
    dispatch(getAllProjects({page: currentPage, limit:10}))
  }, [dispatch, currentPage])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-36">
       {Array.isArray(projectData) && projectData?.map((project: any) => (
     <div
      key={project._id}
      className="bg-white border rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
     >
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        className="w-full h-48"
      >
        {project?.imageGallery?.map((image: any) => (
          <SwiperSlide key={image?._id}>
            <img
              src={image?.secure_url}
              alt="Project Image"
              className="w-full h-48 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
        <p className="text-gray-600 mt-1">🏗️ Type: <span className="font-medium">{project.projectType}</span></p>
        <p className="text-gray-600 mt-1">📦 Availability: <span className="font-medium">{project.availability?.name}</span></p>
        <p className="text-gray-600 mt-1">📍 Locality: <span className="font-medium">{project.locality}</span></p>

        <div className="mt-3 flex justify-between items-center">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {project.projectType}
          </span>
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
            {project.availability?.name}
          </span>
        </div>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          View Details
          </button>
        </div>
      </div>
    ))}
   
  </div>
   <PaginationMainComponent totalPages={totalPages} currentPage={currentPage} paginate={paginate} handlePageClick={handlePageClick} />
</div>
  )
}

export default Page
