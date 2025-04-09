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
    if(page >0 && page <= totalPages){
        setCurrentPage(page)
    }
  }

  useEffect(() => {
    dispatch(getAllProjects({page: currentPage, limit:10}))
  }, [dispatch, currentPage])

  return (
<div className="px-4 sm:px-6 lg:px-20 mt-32">
  <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">Featured Projects</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
    {Array.isArray(projectData) &&
      projectData.map((project: any) => (
        <div
          key={project._id}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {/* Image Carousel */}
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            className="h-56"
          >
            {project?.imageGallery?.map((image: any) => (
              <SwiperSlide key={image?._id}>
                <img
                  src={image?.secure_url}
                  alt="Project"
                  className="w-full h-56 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{project.title}</h3>
            
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p><span className="font-medium text-gray-700">🏗️ Type:</span> {project.projectType}</p>
              <p><span className="font-medium text-gray-700">📦 Availability:</span> {project.availability?.name}</p>
              <p><span className="font-medium text-gray-700">📍 Locality:</span> {project.locality}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {project.projectType}
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {project.availability?.name}
              </span>
            </div>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2.5 rounded-xl font-semibold shadow-sm transition-all duration-200">
              View Details
            </button>
          </div>
        </div>
      ))}
  </div>

  {/* Pagination */}
  <div className="mt-12 flex justify-center">
    <PaginationMainComponent
      totalPages={totalPages}
      currentPage={currentPage}
      paginate={paginate}
      handlePageClick={handlePageClick}
    />
  </div>
</div>

  )
}

export default Page
