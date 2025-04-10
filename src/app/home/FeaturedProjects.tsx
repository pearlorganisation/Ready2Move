import React from "react";

import { ArrowRight, Image as MyImage } from "lucide-react";
import Image from "next/image";
import { FaCity } from "react-icons/fa";

const daata = [
  {
    areaRange: {
      min: 700,
      max: 850,
    },
    priceRange: {
      min: 75,
      max: 90,
    },
    _id: "67de8b02c4fc88bcf618b420",
    user: "67d182f68452b45f45443c91",
    title: "Luxurious 3 BHK Apartment in Bandra West",
    slug: "luxurious-3bhk-apartment-bandra-west",
    subTitle: "By DreamHomes",
    description:
      "Luxurious 2 BHK apartment with sea-facing views and modern amenities in a prime location.",
    locality: "Bandra West, Mumbai, Maharashtra 400050, India",
    city: "Mumbai",
    state: "Maharashtra",
    pricePerSqFt: 79,
    reraNumber: "RERA-67890-ABC",
    availability: {
      _id: "67dd2953886eaf35ad7d5c94",
      name: "Under Construction",
      type: "AVAILABILITY",
    },
    reraPossessionDate: "2026-06-20T10:30:00.000Z",
    aminities: [
      {
        _id: "67dd2a8a075436266c1f85fb",
        name: "Swimming Pool",
        type: "AMENITIES",
      },
      {
        _id: "67dd2a7e075436266c1f85f9",
        name: "Club House",
        type: "AMENITIES",
      },
    ],
    bankOfApproval: [
      {
        _id: "67dd2b47075436266c1f860d",
        name: "HDFC",
        type: "BANKS",
      },
    ],
    imageGallary: [
      {
        secure_url:
          "https://res.cloudinary.com/dapjyizvj/image/upload/v1742623587/R2M/Project/rifl5fasce8o1rfiogdr.jpg",
        public_id: "DreamHomes/Project/bandra_apartment",
        _id: "67de8b02c4fc88bcf618b421",
      },
    ],
    isFeatured: true,
    youtubeLink: "https://youtu.be/sample_video_1",
    createdAt: "2025-03-22T10:00:00.000Z",
    updatedAt: "2025-03-22T10:00:00.000Z",
    __v: 0,
  },
  {
    areaRange: {
      min: 80,
      max: 100,
    },
    priceRange: {
      min: 0.9,
      max: 1.1,
    },
    _id: "67de9c03c4fc88bcf618b430",
    user: "67d182f68452b45f45443c92",
    title: "Luxury Apartments in Mumbai",
    slug: "luxury-apartments-mumbai",
    subTitle: "By EliteResidences",
    description:
      "A stunning penthouse with a rooftop terrace, private elevator, and breathtaking ocean views.",
    locality: "Juhu, Mumbai, Maharashtra 400049, India",
    city: "Mumbai",
    state: "Maharashtra",
    pricePerSqFt: 105,
    reraNumber: "RERA-54321-XYZ",
    availability: {
      _id: "67dd2953886eaf35ad7d5c95",
      name: "Ready to Move",
      type: "AVAILABILITY",
    },
    reraPossessionDate: "2024-12-15T15:00:00.000Z",
    aminities: [
      {
        _id: "67dd2a8a075436266c1f85fc",
        name: "Private Elevator",
        type: "AMENITIES",
      },
      {
        _id: "67dd2a7e075436266c1f85fd",
        name: "Sky Lounge",
        type: "AMENITIES",
      },
    ],
    bankOfApproval: [
      {
        _id: "67dd2b47075436266c1f860e",
        name: "ICICI",
        type: "BANKS",
      },
    ],
    imageGallary: [
      {
        secure_url:
          "https://res.cloudinary.com/dapjyizvj/image/upload/v1742623587/R2M/Project/rifl5fasce8o1rfiogdr.jpg",
        public_id: "EliteResidences/Project/juhu_penthouse",
        _id: "67de9c03c4fc88bcf618b431",
      },
    ],
    isFeatured: true,
    youtubeLink: "https://youtu.be/sample_video_2",
    createdAt: "2025-03-22T11:30:00.000Z",
    updatedAt: "2025-03-22T11:30:00.000Z",
    __v: 0,
  },
];

const FeaturedProjects = () => {
  return (
    <div className="mt-4">
      <div className="flex flex-row justify-between px-12">
        <div className="">
          <h1 className="text-2xl font-mono font-semibold">
            Featured Projects
          </h1>
          <div className="h-1.5 w-12 bg-yellow-500 mt-1 rounded-e-md rounded-s-md"></div>
        </div>

        <h1 className="text-red-500 flex flex-row gap-2">
          <span className="">See All Projects</span>
          <ArrowRight size={24} />
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-20 mt-12">
        {daata.map((data, index) => (
          <div className="" key={index}>
            <div className="w-80 overflow-hidden  min-h-72 border-2  rounded-2xl relative">
              <Image
                width={200}
                height={200}
                src={data?.imageGallary[0]?.secure_url}
                alt="sfsadf"
                className="w-full max-h-56 min-h-56 rounded-t-2xl transition-transform duration-500 ease-in-out transform scale-105 hover:scale-100"
              />

              <div className="absolute top-[172px] left-3 flex flex-row gap-1 items-center justify-center bg-black px-1 py-1 rounded-md">
                <MyImage size={16} color="white" />
                <h1 className="text-white text-base">
                  {data?.imageGallary.length}
                </h1>
              </div>

              <div className="px-4">
                <h1 className="text-base font-semibold mt-2 mb-2 min-h-12">
                  {data?.title}
                </h1>

                <h1 className="mt-2 mb-2 text-sm text-gray-700">
                  {data?.city} , {data.state}
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
