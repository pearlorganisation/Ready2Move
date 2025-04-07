"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { getAllProjects } from "@/lib/redux/actions/projectAction"
import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { ProjectData } from "@/lib/redux/slice/projectSlice"

const Page = () => {
  const dispatch = useAppDispatch()
  const { projectData, paginate } = useAppSelector((state) => state.projects)

  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(projectData) && projectData?.map((project:any) => (
        <div
          key={project._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <Swiper spaceBetween={10} slidesPerView={1}
           >
            {project?.imageGallery?.map((image:any) => (
              <SwiperSlide key={image?._id}>
                <img
                  src={image?.secure_url}
                  alt="Project Image"
                  className="w-full h-64 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="p-4">
            <h2 className="text-xl font-bold mb-1">{project.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              Type: <span className="font-medium">{project.projectType}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Availability: <span className="font-medium">{project.availability.name}</span>
            </p>
            <p className="text-sm text-gray-600">
              Locality: <span className="font-medium">{project.locality}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Page
