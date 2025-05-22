"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { createLeads } from "@/lib/redux/actions/leadsAction";
import { getSingleProperty } from "@/lib/redux/actions/propertyAction";
import ImageGallery from "./ImageGallery";

const MySlugProperty = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSingleProperty({ slug: slug }));
  }, [slug]);

  const { singlePropertyData } = useAppSelector((state) => state.property);

  console.log(singlePropertyData, "the single property data is");

  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message,
      };

      if (singlePropertyData?.propertyType) {
        payload.property = singlePropertyData?._id;
      } else {
        payload.project = singlePropertyData._id;
      }

      await dispatch(createLeads(payload)).unwrap();

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err: any) {
      setError("Failed to submit. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/properties" className="group">
        <button className="mb-6 flex items-center text-blue-600 group-hover:text-[#0010A3] transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4 transition-colors" />
          Back to Properties
        </button>
      </Link>
      <div className="min-h-screen bg-gray-50">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          className="rounded-lg overflow-hidden mb-8"
        >
          {singlePropertyData?.imageGallery?.slice(0, 4).map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[300px] md:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                <Image
                  src={image?.secure_url}
                  alt={`Property Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                  priority={index === 0}
                />

                {singlePropertyData?.isFeatured && (
                  <div className="absolute top-0 left-0 px-2 py-6 md:px-2 md:py-2 z-20 text-white">
                    <h1 className="text-sm md:text-sm text-white font-bold bg-blue-700 rounded-md px-2 py-1">
                      {singlePropertyData?.isFeatured ? "Featured" : ""}
                    </h1>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {singlePropertyData?.title}
                  </h1>
                  <p className="text-lg md:text-xl mt-2">
                    {singlePropertyData?.subTitle}
                  </p>
                </div>

                <div className="absolute bottom-0 right-0 p-6 md:p-10 z-20 text-white text-right">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    Expected Price
                  </h1>
                  <p className="text-xl md:text-2xl font-bold">
                    ₹{singlePropertyData?.expectedPrice}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <hr className="mb-6" />

          <p className="text-gray-700">{singlePropertyData?.description}</p>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Overview</h2>
                </div>
                <hr className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.availability?.name}
                    </p>
                    <p className="text-sm text-gray-500">Availability</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.waterSource?.name}
                    </p>
                    <p className="text-sm text-gray-500">Water Source</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {moment(singlePropertyData?.reraPossessionDate).format(
                        "DD MMM YYYY"
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      RERA Possession Date
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.propertyType?.name}
                    </p>
                    <p className="text-sm text-gray-500">Property Category</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.reraNumber}
                    </p>
                    <p className="text-sm text-gray-500">Rera Number</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.city}, {singlePropertyData?.state}
                    </p>
                    <p className="text-sm text-gray-500">Location</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">{singlePropertyData?.property}</p>
                    <p className="text-sm text-gray-500">Property Type</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">{singlePropertyData?.service}</p>
                    <p className="text-sm text-gray-500">Service Type</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">{singlePropertyData?.locality}</p>
                    <p className="text-sm text-gray-500">Locality</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Important Features</h2>
                </div>
                <hr className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.noOfBedrooms}
                    </p>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.noOfBathrooms}
                    </p>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.noOfBalconies}
                    </p>
                    <p className="text-sm text-gray-500"> Balconies</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.parking?.name}
                    </p>
                    <p className="text-sm text-gray-500"> Parking</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.furnishing?.name}
                    </p>
                    <p className="text-sm text-gray-500">Furnishing</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.entranceFacing?.name}
                    </p>
                    <p className="text-sm text-gray-500">Entrance Facing</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.propertyAge?.name}
                    </p>
                    <p className="text-sm text-gray-500">Age of Property</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.ownership?.name}
                    </p>
                    <p className="text-sm text-gray-500"> Ownership</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">
                      {singlePropertyData?.propertyFlooring?.name}
                    </p>
                    <p className="text-sm text-gray-500">Flooring</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Amenities</h2>
                </div>
                <hr className="mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {singlePropertyData?.aminities?.map((bank, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-xl border border-blue-500 bg-white text-blue-800 font-medium shadow-md px-2 py-1 transition hover:bg-blue-500 hover:text-white"
                    >
                      {bank?.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Other Features</h2>
                </div>
                <hr className="mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {singlePropertyData?.otherFeatures?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-xl border border-blue-500 bg-white text-blue-800 font-medium shadow-md px-2 py-1 transition hover:bg-blue-500 hover:text-white"
                    >
                      {feature?.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Area Features</h2>
                </div>
                <hr className="mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {singlePropertyData?.area?.map((areaa, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-blue-500 bg-white text-blue-800 shadow-md p-4 transition hover:bg-blue-500 hover:text-white"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-center">
                        {areaa?.name.replace(/_/g, " ")}
                      </h3>
                      <p className="text-center text-2xl font-bold">
                        {areaa?.area}{" "}
                        <span className="text-sm font-medium">
                          {areaa?.areaMeasurement}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Things to Know
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Apartment Name:</span>{" "}
                    {singlePropertyData?.apartmentName}
                  </li>
                  <li>
                    <span className="font-medium">Apartment No:</span>{" "}
                    {singlePropertyData?.apartmentNo}
                  </li>
                  <li>
                    <span className="font-medium">OC Available:</span>{" "}
                    <span
                      className={
                        singlePropertyData?.isOCAvailable
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {singlePropertyData?.isOCAvailable ? "Yes" : "No"}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">CC Available:</span>{" "}
                    <span
                      className={
                        singlePropertyData?.isCCAvailable
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {singlePropertyData?.isCCAvailable ? "Yes" : "No"}
                    </span>
                  </li>
                  <li>
                    <span className="font-medium">Price Negotiable:</span>{" "}
                    <span
                      className={
                        singlePropertyData?.isPriceNegotiable
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {singlePropertyData?.isPriceNegotiable ? "Yes" : "No"}
                    </span>
                  </li>
                  {singlePropertyData?.isBrokerageCharge && (
                    <li>
                      <span className="font-medium">Brokerage:</span>{" "}
                      {singlePropertyData?.brokerage}%
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Banks</h2>
                </div>
                <hr className="mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {singlePropertyData?.bankOfApproval?.map((bank, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-xl border border-blue-500 bg-white text-blue-800 font-medium shadow-md px-2 py-1 transition hover:bg-blue-500 hover:text-white"
                    >
                      {bank?.name}
                    </div>
                  ))}
                </div>
              </div>

    <div className="px-8 py-4 mb-8 bg-white rounded-lg shadow-sm">
                <h1 className="font-bold text-2xl mt-4 mb-4">Image Gallery </h1>
                <div className="flex flex-row gap-2">
                  {/* {singleProjectData?.imageGallery
                    ?.slice(0, 5)
                    .map((image, index) => (
                      <div className="">
                        <img
                          src={image?.secure_url}
                          alt="Image "
                          className="w-40 h-40"
                        />
                      </div>
                    ))} */}
                    <ImageGallery images={singlePropertyData?.imageGallery} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Property Video</h2>
                <hr className="mb-6" />
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-0 pb-[56.25%] relative bg-gray-200">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={singlePropertyData?.youtubeEmbedLink}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-center mb-6 text-blue-600">
                  Contact Seller
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    // className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
                  >
                    {loading ? "Submitting..." : "  Enquiry Now"}
                  </button>

                  <div className="text-center mt-4 text-sm text-gray-600">
                    <p>I agree to Ready2move T&C</p>
                  </div>
                </form>

                <div className="fixed bottom-6 right-6 flex flex-col gap-4">
                  <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg relative">
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      1
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySlugProperty;
