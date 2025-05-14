"use client";

import React, { useEffect } from "react";

import { ArrowRight, Image as MyImage } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const FeaturedProjects = () => {
  const dispatch = useAppDispatch();
  const { featuredProjects } = useAppSelector((state) => state.featured);

  useEffect(() => {
    dispatch(getFeaturedListings());
  }, []);

  return (
    <div className="mt-12 lg:mt-4 px-6">
      <div className="flex flex-row justify-between">
        <div className="mt-4 text-2xl px-12">
          Featured Projects{" "}
          <div className="h-1.5 w-12 bg-yellow-500 mt-1 rounded-e-md rounded-s-md">
            {" "}
          </div>
        </div>
      </div>
      <div className="mt-12 relative group px-8">
        <div
          className="swiper-button-prev-custom group-hover:opacity-100 opacity-0 sm:opacity-100 transition-opacity duration-300
                   absolute top-1/2 -translate-y-1/2
                   left-2 md:left-[-10px] lg:left-[-6px] z-10
                   cursor-pointer
                   bg-blue-200 rounded-full shadow-md
                   w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                   text-gray-700 hover:text-blue-600 // Color for Swiper's default icon
                   after:!text-xl md:after:!text-2xl // Control size of Swiper's default icon
                   swiper-button-disabled:opacity-30 swiper-button-disabled:cursor-not-allowed"
        >
          <span>Prev</span>
        </div>
        <div className="p-4">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={15}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            className="rounded-lg overflow-hidden mb-8 w-full"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 15,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },

              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            style={{
              paddingLeft: window.innerWidth < 640 ? "40px" : "0px",
              paddingRight: window.innerWidth < 640 ? "40px" : "0px",
            }}
          >
            {Array.isArray(featuredProjects) && featuredProjects.length > 0 ? (
              featuredProjects.map((data, index) => (
                <SwiperSlide key={data?._id || index}>
                  <div className="w-full h-full overflow-hidden border-2 rounded-2xl relative mx-auto flex flex-col">
                    <div className="relative">
                      {data?.imageGallery?.[0]?.secure_url ? (
                        <Image
                          width={320}
                          height={224}
                          src={data.imageGallery[0].secure_url}
                          alt={data?.title || "Project Image"}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}

                      {data?.imageGallery && data.imageGallery.length > 0 && (
                        <div className="absolute bottom-2 left-3 flex flex-row gap-1 items-center justify-center bg-black bg-opacity-70 px-2 py-1 rounded-md">
                          <MyImage size={16} color="white" />
                          <h1 className="text-white text-sm font-medium">
                            {data.imageGallery.length}
                          </h1>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h1 className="text-base font-semibold mt-1 mb-2 min-h-[48px] line-clamp-2">
                        {data?.title || "Untitled Project"}
                      </h1>
                      <h1 className="mt-1 mb-2 text-sm text-gray-700 truncate">
                        {data?.city && data?.state
                          ? `${data.city}, ${data.state}`
                          : "Location N/A"}
                      </h1>
                      <h1 className="mt-1 mb-2 text-sm">
                        {data?.areaRange?.min && data?.areaRange?.max
                          ? `${data.areaRange.min} - ${data.areaRange.max} Sq.ft`
                          : "Area N/A"}
                      </h1>
                      <h1 className="mt-1 font-bold mb-2">
                        {data?.priceRange?.min && data?.priceRange?.max
                          ? `₹ ${data.priceRange.min} - ${data.priceRange.max} Cr`
                          : "Price N/A"}
                      </h1>

                      <div className="mt-auto pt-2">
                        {data?.availability?.name && (
                          <div className="bg-blue-500 rounded-full w-fit text-white px-2 py-0.5 text-xs font-medium">
                            {data.availability.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="flex justify-center items-center h-72 text-gray-500">
                  No featured projects available.
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <div
          className="swiper-button-next-custom group-hover:opacity-100 opacity-0 sm:opacity-100 transition-opacity duration-300
                   absolute top-1/2 -translate-y-1/2
                   right-1 md:right-[-10px] lg:right-[1px] z-10
                   cursor-pointer
                   bg-blue-200 rounded-full shadow-md
                   w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                   text-gray-700 hover:text-blue-600 // Color for Swiper's default icon
                   after:!text-xl md:after:!text-2xl // Control size of Swiper's default icon
                   swiper-button-disabled:opacity-30 swiper-button-disabled:cursor-not-allowed"
        >
          <span>Next</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
