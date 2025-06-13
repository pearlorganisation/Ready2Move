// "use client";

// import { useEffect, useState } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import Image from "next/image";
// import Link from "next/link";
// import "swiper/css";
// import "swiper/css/navigation";

// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
// import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";
// import { ImageIcon, MapPin, Ruler, IndianRupee, Home, Car } from "lucide-react";

// // Format Indian numbers (₹10.5 Cr, 950 sqft)
// const formatNumber = (num: number) =>
//   new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 1,
//   }).format(num);

// // Format price for display
// const formatPrice = (price: number) => {
//   if (price >= 10000000) {
//     return `₹${formatNumber(price / 10000000)} Cr`;
//   } else if (price >= 100000) {
//     return `₹${formatNumber(price / 100000)} L`;
//   } else {
//     return `₹${formatNumber(price)}`;
//   }
// };

// const FeaturedProjects = () => {
//   const dispatch = useAppDispatch();
//   const { featuredProjects, loading } = useAppSelector(
//     (state) => state.featured
//   );
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     dispatch(getFeaturedListings());
//     setIsClient(true);
//   }, [dispatch]);

//   return (
//     <div className="mt-12 lg:mt-24 bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-12">
//           <div className="space-y-3">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
//               Featured Projects
//             </h2>
//             {/* <div className="h-1.5 w-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-sm"></div> */}
//             <p className="text-gray-600 text-lg max-w-2xl">
//               Discover premium real estate projects handpicked for you
//             </p>
//           </div>
//         </div>

//         <div className="relative group">
//           {/* Navigation Buttons */}
//           <button
//             aria-label="Previous Slide"
//             className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-6 z-50
//                      bg-white shadow-xl border border-gray-200 rounded-full w-14 h-14
//                      flex items-center justify-center text-gray-700 hover:text-blue-600
//                      hover:shadow-2xl hover:border-blue-200 transition-all duration-300
//                      opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
//           >
//             <ArrowLeft size={22} strokeWidth={2.5} />
//           </button>

//           <button
//             aria-label="Next Slide"
//             className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-6 z-50
//                      bg-white shadow-xl border border-gray-200 rounded-full w-14 h-14
//                      flex items-center justify-center text-gray-700 hover:text-blue-600
//                      hover:shadow-2xl hover:border-blue-200 transition-all duration-300
//                      opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
//           >
//             <ArrowRight size={22} strokeWidth={2.5} />
//           </button>

//           <div className="px-2">
//             {loading || !isClient ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {Array.from({ length: 4 }).map((_, idx) => (
//                   <div
//                     key={idx}
//                     className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200"
//                   >
//                     <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-56 w-full"></div>
//                     <div className="p-6 space-y-4">
//                       <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 rounded"></div>
//                       <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 rounded"></div>
//                       <div className="grid grid-cols-2 gap-3">
//                         <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
//                         <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
//                       </div>
//                       <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : featuredProjects?.length > 0 ? (
//               <Swiper
//                 modules={[Navigation]}
//                 slidesPerView={4}
//                 spaceBetween={24}
//                 navigation={{
//                   nextEl: ".swiper-button-next-custom",
//                   prevEl: ".swiper-button-prev-custom",
//                 }}
//                 className="!overflow-visible"
//                 breakpoints={{
//                   640: { slidesPerView: 2, spaceBetween: 20 },
//                   768: { slidesPerView: 3, spaceBetween: 24 },
//                   1024: { slidesPerView: 3, spaceBetween: 24 },
//                 }}
//               >
//                 {featuredProjects?.map((project, index) => (
//                   <SwiperSlide key={project?._id || index} className="h-full">
//                     <Link
//                       href={project?.slug ? `/projects/${project.slug}` : "#"}
//                       className="block group/card"
//                     >
//                       <div
//                         className="group/card bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden
//         border border-gray-100 hover:border-blue-200 transition-all duration-300
//         flex flex-col h-full w-full min-h-[440px]"
//                       >
//                         {/* Image Section */}
//                         <div className="relative h-40">
//                           {project?.imageGallery?.[0]?.secure_url ? (
//                             <Image
//                               src={project.imageGallery[0].secure_url}
//                               alt={project?.title || "Project Image"}
//                               width={300}
//                               height={600}
//                               className="w-full h-40 object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
//                               <ImageIcon className="text-gray-400" size={40} />
//                             </div>
//                           )}

//                           {/* Service Badge */}
//                           {project?.service && (
//                             <div className="absolute top-3 left-3">
//                               <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
//                                 {project.service === "SELL"
//                                   ? "For Sell"
//                                   : "For Rent"}
//                               </span>
//                             </div>
//                           )}

//                           {/* Availability Badge */}
//                           {project?.availability?.name && (
//                             <div className="absolute top-3 right-3">
//                               <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
//                                 {project.availability.name}
//                               </span>
//                             </div>
//                           )}

//                           {/* Image Count */}
//                           {project?.imageGallery?.length > 0 && (
//                             <div className="absolute bottom-2 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
//                               <ImageIcon size={12} />
//                               <span>{project.imageGallery.length}</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Content Section */}
//                         <div className="p-4 py-2 flex flex-col justify-between flex-grow">
//                           {/* Title */}
//                           <h3 className="text-lg font-bold text-gray-800 group-hover/card:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
//                             {project?.title || "Untitled Project"}
//                           </h3>

//                           {/* Location */}
//                           <div className="flex items-center text-gray-600 gap-2 text-sm mt-1">
//                             <MapPin size={16} className="text-red-500" />
//                             <span>
//                               {project?.city && project?.state
//                                 ? `${project.city}, ${project.state}`
//                                 : "Location N/A"}
//                             </span>
//                           </div>

//                           {/* Grid Info */}
//                           <div className="grid grid-cols-2 gap-3 py-3 text-sm">
//                             <div className="flex items-start gap-2 text-gray-700">
//                               <Ruler size={16} className="text-blue-500 mt-1" />
//                               <div>
//                                 <span className="text-xs text-gray-500 block">
//                                   Area
//                                 </span>
//                                 <span className="font-semibold">
//                                   {project?.areaRange?.min
//                                     ? `${formatNumber(
//                                         project.areaRange.min
//                                       )} sq ft`
//                                     : "N/A"}
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex items-start gap-2 text-gray-700">
//                               <Home size={16} className="text-green-500 mt-1" />
//                               <div>
//                                 <span className="text-xs text-gray-500 block">
//                                   Type
//                                 </span>
//                                 <span className="font-semibold">
//                                   {project?.projectType || "N/A"}
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex items-start gap-2 text-gray-700">
//                               <MapPin
//                                 size={16}
//                                 className="text-purple-500 mt-1"
//                               />
//                               <div>
//                                 <span className="text-xs text-gray-500 block">
//                                   Locality
//                                 </span>
//                                 <span className="font-semibold truncate">
//                                   {project?.locality || "N/A"}
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex items-start gap-2 text-gray-700">
//                               <Car size={16} className="text-orange-500 mt-1" />
//                               <div>
//                                 <span className="text-xs text-gray-500 block">
//                                   RERA
//                                 </span>
//                                 <span className="font-semibold text-xs truncate">
//                                   {project?.reraNumber || "N/A"}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Price */}
//                           <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-inner mt-auto">
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <p className="text-sm text-gray-500 mb-1">
//                                   Price
//                                 </p>
//                                 <p className="text-sm font-bold text-green-700 flex items-center gap-1">
//                                   <IndianRupee size={12} />
//                                   {project?.priceRange?.min
//                                     ? `${formatNumber(
//                                         project.priceRange.min
//                                       )} Cr`
//                                     : "Price on Request"}
//                                 </p>
//                               </div>
//                               {/* <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
//                                 Negotiable
//                               </div> */}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             ) : (
//               <div className="flex flex-col justify-center items-center h-80 text-gray-500 bg-white rounded-2xl text-center space-y-4 border border-gray-200 shadow-sm">
//                 <div className="p-4 bg-gray-50 rounded-full">
//                   <ImageIcon size={48} className="text-gray-400" />
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-xl font-bold text-gray-700">
//                     No Featured Projects
//                   </p>
//                   <p className="text-gray-500">
//                     Check back later for exciting new projects
//                   </p>
//                 </div>
//                 <Link
//                   href="/projects"
//                   className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
//                 >
//                   <Home size={18} />
//                   Browse All Projects
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProjects;

"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  MapPin,
  Ruler,
  IndianRupee,
  Home,
  Car,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";

// Format Indian numbers (₹10.5 Cr, 950 sqft)
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 1,
  }).format(num);

// Format price for display
const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹${formatNumber(price / 10000000)} Cr`;
  } else if (price >= 100000) {
    return `₹${formatNumber(price / 100000)} L`;
  } else {
    return `₹${formatNumber(price)}`;
  }
};

const FeaturedProjects = () => {
  const dispatch = useAppDispatch();
  const { featuredProjects, loading } = useAppSelector(
    (state) => state.featured
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    dispatch(getFeaturedListings());
    setIsClient(true);
  }, [dispatch]);

  return (
    <div className="mt-12 lg:mt-24 bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Discover premium real estate projects handpicked for you
            </p>
          </div>
        </div>

        <div className="relative group">
          {/* Navigation Buttons (only on md and above) */}
          <button
            aria-label="Previous Slide"
            className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-50 
                       bg-white shadow-xl border border-gray-200 rounded-full w-10 h-10 md:w-14 md:h-14 
                       hidden md:flex items-center justify-center text-gray-700 hover:text-blue-600 
                       hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
          >
            <ArrowLeft size={18} className="md:size-5" strokeWidth={2.5} />
          </button>

          <button
            aria-label="Next Slide"
            className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-50 
                       bg-white shadow-xl border border-gray-200 rounded-full w-10 h-10 md:w-14 md:h-14 
                       hidden md:flex items-center justify-center text-gray-700 hover:text-blue-600 
                       hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
          >
            <ArrowRight size={18} className="md:size-5" strokeWidth={2.5} />
          </button>

          <div className="px-2">
            {loading || !isClient ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200"
                  >
                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-56 w-full"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 rounded"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 rounded"></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                      </div>
                      <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredProjects?.length > 0 ? (
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                slidesPerView={1}
                spaceBetween={16}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                className="!overflow-visible"
                breakpoints={{
                  640: { slidesPerView: 1.2, spaceBetween: 16 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                  1280: { slidesPerView: 3, spaceBetween: 24 },
                }}
              >
                {featuredProjects?.map((project, index) => (
                  <SwiperSlide key={project?._id || index} className="h-full">
                    <Link
                      href={project?.slug ? `/projects/${project.slug}` : "#"}
                      className="block group/card"
                    >
                      <div className="group/card bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col h-full w-full min-h-[440px]">
                        {/* Image Section */}
                        <div className="relative h-40 sm:h-48 md:h-52">
                          {project?.imageGallery?.[0]?.secure_url ? (
                            <Image
                              src={project.imageGallery[0].secure_url}
                              alt={project?.title || "Project Image"}
                              width={300}
                              height={600}
                              className="w-full h-full "
                            />
                          ) : (
                            <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                              <ImageIcon className="text-gray-400" size={40} />
                            </div>
                          )}

                          {project?.service && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-[#1E3D9C] text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                                {project.service === "SELL"
                                  ? "For Sell"
                                  : "For Rent"}
                              </span>
                            </div>
                          )}

                          {project?.availability?.name && (
                            <div className="absolute top-3 right-3">
                              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                                {project.availability.name}
                              </span>
                            </div>
                          )}

                          {project?.imageGallery?.length > 0 && (
                            <div className="absolute bottom-2 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                              <ImageIcon size={12} />
                              <span>{project.imageGallery.length}</span>
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="p-4 py-2 flex flex-col justify-between flex-grow">
                          <h3 className="text-lg font-bold text-gray-800 group-hover/card:text-blue-800 transition-colors line-clamp-2 min-h-[3rem]">
                            {project?.title || "Untitled Project"}
                          </h3>

                          <div className="flex items-center text-gray-600 gap-2 text-sm mt-1">
                            <MapPin size={16} className="text-red-500" />
                            <span>
                              {project?.city && project?.state
                                ? `${project.city}, ${project.state}`
                                : "Location N/A"}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 py-3 text-sm">
                            <div className="flex items-start gap-2 text-gray-700">
                              <Ruler size={16} className="text-blue-800 mt-1" />
                              <div>
                                <span className="text-xs text-gray-500 block">
                                  Area
                                </span>
                                <span className="font-semibold">
                                  {project?.areaRange?.min
                                    ? `${formatNumber(
                                        project.areaRange.min
                                      )} sq ft`
                                    : "N/A"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 text-gray-700">
                              <Home size={16} className="text-green-500 mt-1" />
                              <div>
                                <span className="text-xs text-gray-500 block">
                                  Type
                                </span>
                                <span className="font-semibold">
                                  {project?.projectType || "N/A"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 text-gray-700">
                              <MapPin
                                size={16}
                                className="text-purple-500 mt-1"
                              />
                              <div>
                                <span className="text-xs text-gray-500 block">
                                  Locality
                                </span>
                                <span className="font-semibold truncate">
                                  {project?.locality || "N/A"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 text-gray-700">
                              <Car size={16} className="text-orange-500 mt-1" />
                              <div>
                                <span className="text-xs text-gray-500 block">
                                  RERA
                                </span>
                                <span className="font-semibold text-xs truncate">
                                  {project?.reraNumber || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-inner mt-auto">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">
                                  Price
                                </p>
                                <p className="text-sm font-bold text-green-700 flex items-center gap-1">
                                  <IndianRupee size={12} />
                                  {project?.priceRange?.min
                                    ? `${formatNumber(
                                        project.priceRange.min
                                      )} Cr`
                                    : "Price on Request"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex flex-col justify-center items-center h-80 text-gray-500 bg-white rounded-2xl text-center space-y-4 border border-gray-200 shadow-sm">
                <div className="p-4 bg-gray-50 rounded-full">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-gray-700">
                    No Featured Projects
                  </p>
                  <p className="text-gray-500">
                    Check back later for exciting new projects
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                >
                  <Home size={18} />
                  Browse All Projects
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
