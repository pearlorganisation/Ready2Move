// import React, { useEffect } from "react";

// import { ArrowRight, Image as MyImage } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import Image from "next/image";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
// import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";
// import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
// import Link from "next/link";

// const FeaturedProjects = () => {
//   const dispatch = useAppDispatch();
//   const { featuredProjects } = useAppSelector((state) => state.featured);

//   useEffect(() => {
//     dispatch(getFeaturedListings());
//   }, []);

//   return (
//     <div className="mt-12 lg:mt-24 ">
//       <div className="flex flex-row justify-between">
//         <div className="ml-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Featured Projects
//           </h2>
//           <div className="h-1.5 w-12 bg-yellow-500 mt-1 rounded-e-md rounded-s-md"></div>
//         </div>
//       </div>
//       <div className="mt-12 relative group px-8">
//         <div
//           className="swiper-button-prev-custom group-hover:opacity-100 opacity-0 sm:opacity-100 transition-opacity duration-300
//                    absolute top-1/2 -translate-y-1/2
//                    left-2 md:left-[-10px] lg:left-[-6px] z-10
//                    cursor-pointer
//                    bg-blue-200 rounded-full shadow-md
//                    w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
//                    text-gray-700 hover:text-blue-600 // Color for Swiper's default icon
//                    after:!text-xl md:after:!text-2xl // Control size of Swiper's default icon
//                    swiper-button-disabled:opacity-30 swiper-button-disabled:cursor-not-allowed"
//         >
//           <span>Prev</span>
//         </div>
//         <div className="p-4">
//           <Swiper
//             modules={[Navigation]}
//             slidesPerView={1}
//             spaceBetween={15}
//             navigation={{
//               nextEl: ".swiper-button-next-custom",
//               prevEl: ".swiper-button-prev-custom",
//             }}
//             className="rounded-lg overflow-hidden mb-8 w-full"
//             breakpoints={{
//               0: {
//                 slidesPerView: 1,
//                 spaceBetween: 15,
//               },

//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//               },

//               768: {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//               },

//               1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 40,
//               },
//             }}
//             style={{
//               paddingLeft: window.innerWidth < 640 ? "40px" : "0px",
//               paddingRight: window.innerWidth < 640 ? "40px" : "0px",
//             }}
//           >
//             {Array.isArray(featuredProjects) && featuredProjects.length > 0 ? (
//               featuredProjects.map((data, index) => (
//                 <SwiperSlide key={data?._id || index}>
//                   <Link href={`/projects/${data?.slug}`}>
//                     <div className="w-full h-full overflow-hidden border-2 rounded-2xl relative mx-auto flex flex-col">
//                       <div className="relative">
//                         {data?.imageGallery?.[0]?.secure_url ? (
//                           <Image
//                             width={320}
//                             height={224}
//                             src={data.imageGallery[0].secure_url}
//                             alt={data?.title || "Project Image"}
//                             className="w-full h-56 object-cover rounded-t-2xl"
//                           />
//                         ) : (
//                           <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-2xl">
//                             <span className="text-gray-500">No Image</span>
//                           </div>
//                         )}

//                         {data?.imageGallery && data.imageGallery.length > 0 && (
//                           <div className="absolute bottom-2 left-3 flex flex-row gap-1 items-center justify-center bg-black bg-opacity-70 px-2 py-1 rounded-md">
//                             <MyImage size={16} color="white" />
//                             <h1 className="text-white text-sm font-medium">
//                               {data.imageGallery.length}
//                             </h1>
//                           </div>
//                         )}
//                       </div>

//                       <div className="p-4 flex flex-col flex-grow">
//                         <h1 className="text-base font-semibold mt-1 mb-2 min-h-[48px] line-clamp-2">
//                           {data?.title || "Untitled Project"}
//                         </h1>
//                         <h1 className="mt-1 mb-2 text-sm text-gray-700 truncate">
//                           {data?.city && data?.state
//                             ? `${data.city}, ${data.state}`
//                             : "Location N/A"}
//                         </h1>
//                         <h1 className="mt-1 mb-2 text-sm">
//                           {data?.areaRange?.min && data?.areaRange?.max
//                             ? `${data.areaRange.min} - ${data.areaRange.max} Sq.ft`
//                             : "Area N/A"}
//                         </h1>
//                         <h1 className="mt-1 font-bold mb-2">
//                           {data?.priceRange?.min && data?.priceRange?.max
//                             ? `₹ ${data.priceRange.min} - ${data.priceRange.max} Cr`
//                             : "Price N/A"}
//                         </h1>

//                         <div className="mt-auto pt-2">
//                           {data?.availability?.name && (
//                             <div className="bg-blue-500 rounded-full w-fit text-white px-2 py-0.5 text-xs font-medium">
//                               {data.availability.name}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))
//             ) : (
//               <SwiperSlide>
//                 <div className="flex justify-center items-center h-72 text-gray-500">
//                   No featured projects available.
//                 </div>
//               </SwiperSlide>
//             )}
//           </Swiper>
//         </div>

//         <div
//           className="swiper-button-next-custom group-hover:opacity-100 opacity-0 sm:opacity-100 transition-opacity duration-300
//                    absolute top-1/2 -translate-y-1/2
//                    right-1 md:right-[-10px] lg:right-[1px] z-10
//                    cursor-pointer
//                    bg-blue-200 rounded-full shadow-md
//                    w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
//                    text-gray-700 hover:text-blue-600 // Color for Swiper's default icon
//                    after:!text-xl md:after:!text-2xl // Control size of Swiper's default icon
//                    swiper-button-disabled:opacity-30 swiper-button-disabled:cursor-not-allowed"
//         >
//           <span>Next</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProjects;
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";

// Format Indian numbers (₹10.5 Cr, 950 sqft)
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(num);

const FeaturedProjects = () => {
  const dispatch = useAppDispatch();
  const { featuredProjects, loading } = useAppSelector(
    (state) => state.featured
  );
  const [isClient, setIsClient] = useState(false); // for hydration error prevention

  useEffect(() => {
    dispatch(getFeaturedListings());
    setIsClient(true);
  }, [dispatch]);

  return (
    <div className="mt-12 lg:mt-24">
      <div className="flex justify-between px-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Projects
          </h2>
          <div className="h-1.5 w-12 bg-yellow-500 mt-2 rounded-full"></div>
        </div>
      </div>

      <div className="mt-8 relative group">
        {/* Custom Swiper Nav Buttons */}
        <button
          aria-label="Previous Slide"
          className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-4 z-50 bg-slate-400 shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-black hover:text-blue-600 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          aria-label="Next Slide"
          className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-4 z-50 bg-slate-300 shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-black hover:text-blue-600 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowRight size={20} />
        </button>

        <div className="px-6">
          {loading || !isClient ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="bg-gray-200 h-48 w-full rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
                  <div className="h-3 bg-gray-200 w-1/2 mb-2 rounded"></div>
                  <div className="h-3 bg-gray-200 w-1/3 rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredProjects?.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={20}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              className="!overflow-visible"
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
            >
              {featuredProjects.map((project) => (
                <SwiperSlide key={project?._id}>
                  <Link
                    href={project?.slug ? `/projects/${project.slug}` : "#"}
                    className="block"
                  >
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                      {/* Image Section */}
                      <div className="relative">
                        {project?.imageGallery?.[0]?.secure_url ? (
                          <Image
                            src={project.imageGallery[0].secure_url}
                            alt={project?.title || "Project Image"}
                            width={400}
                            height={240}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="text-gray-400" size={32} />
                          </div>
                        )}

                        {/* Image Count Badge */}
                        {project?.imageGallery?.length > 0 && (
                          <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md flex items-center gap-1">
                            <ImageIcon size={14} />
                            <span className="text-sm font-medium">
                              {project.imageGallery.length}
                            </span>
                          </div>
                        )}

                        {/* Availability Badge */}
                        {project?.availability?.name && (
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                project.availability.name === "Ready to Move"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {project.availability.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
                          {project?.title || "Untitled Project"}
                        </h3>

                        <div className="text-sm text-gray-600">
                          {project?.city && project?.state
                            ? `${project.city}, ${project.state}`
                            : "Location N/A"}
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {project?.areaRange?.min
                                ? `${formatNumber(project.areaRange.min)} sqft`
                                : "Area N/A"}
                            </span>
                            <p className="text-md font-bold text-green-700 mt-1">
                              {project?.priceRange?.min
                                ? `₹${formatNumber(project.priceRange.min)} Cr`
                                : "Price N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col justify-center items-center h-72 text-gray-500 bg-gray-50 rounded-xl text-center space-y-2">
              <ImageIcon size={40} className="text-gray-300" />
              <p className="text-lg font-semibold">No Featured Projects</p>
              <Link
                href="/projects"
                className="text-blue-600 underline text-sm hover:text-blue-800"
              >
                Browse all projects
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
