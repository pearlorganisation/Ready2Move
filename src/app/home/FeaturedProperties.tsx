// "use client";

// import React, { useEffect } from "react";
// import { ArrowLeft, ArrowRight, Image as MyImage } from "lucide-react";
// import Image from "next/image";

// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
// import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";
// import Link from "next/link";

// const FeaturedProperties = () => {
//   const dispatch = useAppDispatch();
//   const { featuredProperties } = useAppSelector((state) => state.featured);

//   useEffect(() => {
//     dispatch(getFeaturedListings());
//   }, [dispatch]);

//   return (
//     <div className="mt-24">
//       {/* Header */}
//       <div className="flex flex-row justify-between items-center px-12">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Featured Properties
//           </h2>
//           <div className="h-1.5 w-16 bg-yellow-500 mt-1 rounded-full" />
//         </div>

//         {/* <button className="flex items-center gap-2 text-red-600 font-medium hover:underline transition">
//           <span>See All Properties</span>
//           <ArrowRight size={20} />
//         </button> */}
//       </div>

//       <button
//         aria-label="Previous Slide"
//         className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-blue-600 shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <ArrowLeft size={20} />
//       </button>

//       <button
//         aria-label="Next Slide"
//         className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <ArrowRight size={20} />
//       </button>
//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 mx-auto px-8 lg:grid-cols-4 gap-18  mt-12">
//         {Array.isArray(featuredProperties) &&
//           featuredProperties?.slice(0, 3).map((data, index) => {
//             const expectedPrice = data.expectedPrice || 0;
//             return (
//               <div
//                 key={index}
//                 className="transition hover:scale-105 duration-300"
//               >
//                 <Link href={`/properties/${data?.slug}`}>
//                   <div className="w-80 shadow-lg border border-gray-200 rounded-2xl overflow-hidden bg-white relative min-h-72">
//                     {/* Image */}
//                     <Image
//                       width={200}
//                       height={200}
//                       src={data?.imageGallery?.[0]?.secure_url}
//                       alt={data?.title || "Property Image"}
//                       className="w-full h-56 object-cover rounded-t-2xl"
//                     />

//                     {/* Image count */}
//                     <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-md">
//                       <MyImage size={16} color="white" />
//                       <span className="text-white text-sm font-medium">
//                         {data?.imageGallery?.length}
//                       </span>
//                     </div>

//                     {/* Info */}
//                     <div className="px-4 py-4">
//                       <h3 className="text-lg font-semibold text-gray-800 min-h-[3rem] line-clamp-2">
//                         {data?.title}
//                       </h3>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {data?.city}, {data?.state}
//                       </p>
//                       {/* <p className="text-sm text-gray-600 mt-1">
//                       {minArea} - {maxArea} Sq.ft
//                     </p> */}
//                       <p className="text-md font-bold text-green-700 mt-1">
//                         ₹ {expectedPrice}
//                       </p>

//                       <div className="bg-blue-600 rounded-full mt-3 px-3 py-1 inline-block text-white text-sm font-medium shadow-sm">
//                         {data?.availability?.name || "Available"}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProperties;

"use client";

import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Image as MyImage } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";

const FeaturedProperties = () => {
  const dispatch = useAppDispatch();
  const { featuredProperties } = useAppSelector((state) => state.featured);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(getFeaturedListings());
  }, [dispatch]);

  return (
    <div className="mt-24 relative group">
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Properties
          </h2>
          <div className="h-1.5 w-16 bg-yellow-500 mt-1 rounded-full" />
        </div>
      </div>

      {/* Swiper Navigation Buttons */}
      <button
        ref={prevRef}
        aria-label="Previous Slide"
        className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-blue-600 shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-white hover:text-blue-600 hover:bg-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        ref={nextRef}
        aria-label="Next Slide"
        className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ArrowRight size={20} />
      </button>

      {/* Swiper Slider */}
      <div className="px-8 mt-12">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={24}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {Array.isArray(featuredProperties) &&
            featuredProperties.slice(0, 10).map((data, index) => {
              const expectedPrice = data.expectedPrice || 0;
              return (
                <SwiperSlide key={index}>
                  <Link href={`/properties/${data?.slug}`}>
                    <div className="w-80 shadow-lg border border-gray-200 rounded-2xl overflow-hidden bg-white relative min-h-72 transition hover:scale-105 duration-300">
                      {/* Image */}
                      <Image
                        width={200}
                        height={200}
                        src={data?.imageGallery?.[0]?.secure_url}
                        alt={data?.title || "Property Image"}
                        className="w-full h-56 object-cover rounded-t-2xl"
                      />

                      {/* Image count */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-md">
                        <MyImage size={16} color="white" />
                        <span className="text-white text-sm font-medium">
                          {data?.imageGallery?.length}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="px-4 py-4">
                        <h3 className="text-lg font-semibold text-gray-800 min-h-[3rem] line-clamp-2">
                          {data?.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {data?.city}, {data?.state}
                        </p>
                        <p className="text-md font-bold text-green-700 mt-1">
                          ₹ {expectedPrice}
                        </p>

                        <div className=" absolute top-3 right-4 bg-blue-600 rounded-full mt-3 px-3 py-1 inline-block text-white text-sm font-medium shadow-sm">
                          {data?.availability?.name || "Available"}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProperties;
