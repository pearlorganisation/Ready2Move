"use client";

import React, { useEffect } from "react";

import { ArrowRight, Image as MyImage } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";

const FeaturedProjects = () => {
  const dispatch = useAppDispatch();
  const { featuredProjects } = useAppSelector((state) => state.featured);

  useEffect(() => {
    dispatch(getFeaturedListings());
  }, []);

  console.log("The featured projects are", featuredProjects);
  return (
    <div className="mt-4">
      <div className="flex flex-row justify-between px-12">
        <div className="">
          Featured Projects{" "}
          <div className="h-1.5 w-12 bg-yellow-500 mt-1 rounded-e-md rounded-s-md">
            {" "}
          </div>
        </div>

        <h1 className="text-red-500 flex flex-row gap-2">
          <span className="">See All Projects</span>
          <ArrowRight size={24} />
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-20 mt-12">
        {Array.isArray(featuredProjects) &&
          featuredProjects?.map((data, index) => (
            <div className="" key={index}>
              <div className="w-80 overflow-hidden  min-h-72 border-2  rounded-2xl relative">
                <Image
                  width={200}
                  height={200}
                  src={data?.imageGallery[0]?.secure_url}
                  alt="sfsadf"
                  className="w-full max-h-56 min-h-56 rounded-t-2xl transition-transform duration-500 ease-in-out transform scale-105 hover:scale-100"
                />

                <div className="absolute top-[172px] left-3 flex flex-row gap-1 items-center justify-center bg-black px-1 py-1 rounded-md">
                  <MyImage size={16} color="white" />
                  <h1 className="text-white text-base">
                    {data?.imageGallery?.length}
                  </h1>
                </div>

                <div className="px-4">
                  <h1 className="text-base font-semibold mt-2 mb-2 min-h-12">
                    {data?.title}
                  </h1>

                  <h1 className="mt-2 mb-2 text-sm text-gray-700">
                    {data?.city} , {data?.state}
                  </h1>

                  <h1 className="mt-2 mb-2 text-sm">
                    {" "}
                    {data?.areaRange?.min} - {data?.areaRange?.max} Sq.ft
                  </h1>

                  <h1 className="mt-2 font-bold">
                    {" "}
                    ₹ {data?.priceRange?.min} - {data?.priceRange?.max} Cr
                  </h1>

                  <div className="bg-blue-500 rounded-full w-fit text-white mt-2 px-1 py-1 mb-1">
                    <h1 className=" px-1 py-1">{data?.availability?.name}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
