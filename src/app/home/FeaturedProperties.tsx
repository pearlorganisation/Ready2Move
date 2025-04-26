"use client";

import React, { useEffect } from "react";
import { ArrowRight, Image as MyImage } from "lucide-react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";

const FeaturedProperties = () => {
  const dispatch = useAppDispatch();
  const { featuredProperties } = useAppSelector((state) => state.featured);

  useEffect(() => {
    dispatch(getFeaturedListings());
  }, [dispatch]);

  return (
    <div className="mt-24">
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Properties
          </h2>
          <div className="h-1.5 w-16 bg-yellow-500 mt-1 rounded-full" />
        </div>

        {/* <button className="flex items-center gap-2 text-red-600 font-medium hover:underline transition">
          <span>See All Properties</span>
          <ArrowRight size={20} />
        </button> */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-20 mt-12">
        {Array.isArray(featuredProperties) &&
          featuredProperties?.slice(0, 3).map((data, index) => {
            // const carpetArea =
            //   data.area?.find((a) => a.name === "CARPET_AREA")?.area || "N/A";
            // const superArea =
            //   data.area?.find((a) => a.name === "SUPER_AREA")?.area || "N/A";
            const minArea = Math.min(...data.area.map((a) => a.area));
            const maxArea = Math.max(...data.area.map((a) => a.area));
            const minPrice = (data.expectedPrice / 10000000).toFixed(2);
            const maxPrice = ((data.expectedPrice * 1.1) / 10000000).toFixed(2);

            return (
              <div
                key={index}
                className="transition hover:scale-105 duration-300"
              >
                <div className="w-80 shadow-lg border border-gray-200 rounded-2xl overflow-hidden bg-white relative min-h-72">
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
                    <p className="text-sm text-gray-600 mt-1">
                      {minArea} - {maxArea} Sq.ft
                    </p>
                    <p className="text-md font-bold text-green-700 mt-1">
                      ₹ {minPrice} - {maxPrice} Cr
                    </p>

                    <div className="bg-blue-600 rounded-full mt-3 px-3 py-1 inline-block text-white text-sm font-medium shadow-sm">
                      {data?.availability?.name || "Available"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FeaturedProperties;
