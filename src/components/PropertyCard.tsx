"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Phone,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function PropertyCard({ project }) {
  console.log("Received Project", project);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const propertyData = {
    title: project?.title,
    subTitle: project?.subTitle,
    locality: project?.locality,
    city: project?.city,
    state: project?.state,
    service: project?.service,
    projectType: project?.projectType,
    priceRange: {
      min: project?.priceRange?.min,
      max: project?.priceRange?.max,
    },
    areaRange: {
      min: project?.areaRange?.min,
      max: project?.areaRange?.max,
    },
    pricePerSqFt: project?.pricePerSqFt,
    reraNumber: project?.reraNumber,
    reraPossessionDate: project?.reraPossessionDate,
    availability: project?.availability?.name,

    isFeatured: project?.isFeatured,

    aminities: project?.aminities?.map((bank) => bank.name),
    bankOfApproval: project?.bankOfApproval?.map((bank) => bank.name),
    youtubeEmbedLink: project?.youtubeEmbedLink,
    imageGallery: project?.imageGallery.map((img) => img.secure_url),
  };

  //   const propertyData = project;
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === propertyData.imageGallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? propertyData.imageGallery.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="font-sans max-w-3xl mx-auto my-5 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg">
        {/* Image Section */}
        <div className="relative md:w-2/5">
          <div className="relative h-full">
            <img
              src={
                propertyData?.imageGallery[currentImageIndex] ||
                "/placeholder.svg"
              }
              //   alt={${propertyData.title} - Image ${currentImageIndex + 1}}
              alt={`${propertyData?.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* RERA Badge */}
            {propertyData?.isFeatured && (
              <div className="absolute top-3 left-3 bg-blue-700 text-white px-2 py-0.5 rounded text-xs font-bold">
                Featured
              </div>
            )}

            {/* Favorite Button */}
            <button
              className="absolute top-3 right-3 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={toggleFavorite}
              aria-label="Add to favorites"
            >
              <Heart
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                }
                size={18}
              />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
              {currentImageIndex + 1}/{propertyData?.imageGallery?.length}
            </div>

            {/* Carousel Buttons */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 md:w-3/5">
          {/* Property Header */}
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-800 m-0">
              {propertyData?.title}
            </h2>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={14} className="mr-1" />
              <span>
                {propertyData?.locality}, {propertyData?.city}
              </span>
            </div>
          </div>

          {/* Property Specs */}
          <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-gray-100">
            {/* Price Section */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Price Range</span>
              <span className="text-base font-semibold text-gray-800">
                {formatPrice(propertyData?.priceRange?.min)} -{" "}
                {formatPrice(propertyData?.priceRange?.max)}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                ₹{propertyData?.pricePerSqFt?.toLocaleString()}/sqft
              </span>
            </div>

            {/* Area Section */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Area Range</span>
              <span className="text-base font-semibold text-gray-800">
                {propertyData?.areaRange?.min?.toLocaleString()} -{" "}
                {propertyData?.areaRange?.max?.toLocaleString()} sqft
              </span>
            </div>

            {/* Type Section */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Type</span>
              <span className="text-base font-semibold text-gray-800">
                {propertyData?.projectType}
              </span>
            </div>
          </div>

          {/* Property Highlights */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Highlights:
            </h3>
            <ul className="flex flex-wrap gap-2">
              <li className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                <Check size={14} className="mr-1 text-teal-500" />{" "}
                {propertyData?.availability}
              </li>
              <li className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                <Check size={14} className="mr-1 text-teal-500" /> Possession:{" "}
                {new Date(propertyData?.reraPossessionDate).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "short",
                  }
                )}
              </li>
              <li className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                <Check size={14} className="mr-1 text-teal-500" /> RERA:{" "}
                {propertyData?.reraNumber}
              </li>
              {propertyData?.aminities?.map((amenity, index) => (
                <li
                  key={index}
                  className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
                >
                  <Check size={14} className="mr-1 text-teal-500" /> {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Banks:</h3>
            <ul className="flex flex-wrap gap-2">
              {propertyData?.bankOfApproval?.map((amenity, index) => (
                <li
                  key={index}
                  className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
                >
                  <Check size={14} className="mr-1 text-teal-500" /> {amenity}
                </li>
              ))}
            </ul>
          </div>

          {/* Property Description */}
          <div className="mb-4 text-sm text-gray-600">
            <p>{propertyData?.subTitle}</p>
          </div>

          {/* Action Buttons */}
          <Link
            href={`/projects/${project?.slug}`}
            key={project._id}
            className="flex gap-3"
          >
            <button className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-blue-500 text-white border-none rounded font-semibold text-sm hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>

    // <div className=""> Hello </div>
  );
}
