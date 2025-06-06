// // "use client";

// // import { useState } from "react";
// // import {
// //   ChevronLeft,
// //   ChevronRight,
// //   Heart,
// //   MapPin,
// //   Phone,
// //   Check,
// // } from "lucide-react";
// // import Link from "next/link";
// // import { SingleProject } from "@/lib/Interfaces/project";

// // export default function PropertyCard({ project }: { project: SingleProject }) {
// //   console.log("Received Project", project);
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [isFavorite, setIsFavorite] = useState(false);

// //   const propertyData = {
// //     title: project?.title,
// //     subTitle: project?.subTitle,
// //     locality: project?.locality,
// //     city: project?.city,
// //     state: project?.state,
// //     service: project?.service,
// //     projectType: project?.projectType,
// //     priceRange: {
// //       min: project?.priceRange?.min,
// //       max: project?.priceRange?.max,
// //     },
// //     areaRange: {
// //       min: project?.areaRange?.min,
// //       max: project?.areaRange?.max,
// //     },
// //     pricePerSqFt: project?.pricePerSqFt,
// //     reraNumber: project?.reraNumber,
// //     reraPossessionDate: project?.reraPossessionDate,
// //     availability: project?.availability?.name,

// //     isFeatured: project?.isFeatured,

// //     aminities: project?.aminities?.map((bank) => bank.name),
// //     bankOfApproval: project?.bankOfApproval?.map((bank) => bank.name),
// //     youtubeEmbedLink: project?.youtubeEmbedLink,
// //     imageGallery: project?.imageGallery.map((img) => img.secure_url),
// //   };

// //   //   const propertyData = project;
// //   const formatPrice = (price: number) => {
// //     if (price >= 10000000) {
// //       return `₹${(price / 10000000).toFixed(2)} Cr`;
// //     } else if (price >= 100000) {
// //       return `₹${(price / 100000).toFixed(2)} Lac`;
// //     } else {
// //       return `₹${price.toLocaleString()}`;
// //     }
// //   };

// //   const nextImage = () => {
// //     setCurrentImageIndex((prevIndex) =>
// //       prevIndex === propertyData.imageGallery.length - 1 ? 0 : prevIndex + 1
// //     );
// //   };

// //   const prevImage = () => {
// //     setCurrentImageIndex((prevIndex) =>
// //       prevIndex === 0 ? propertyData.imageGallery.length - 1 : prevIndex - 1
// //     );
// //   };

// //   const toggleFavorite = () => {
// //     setIsFavorite(!isFavorite);
// //   };

// //   return (
// //     <div className="font-sans max-w-3xl mx-auto my-5 bg-white rounded-lg shadow-md overflow-hidden">
// //       <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg">
// //         {/* Image Section */}
// //         <div className="relative md:w-2/5">
// //           <div className="relative h-full">
// //             <img
// //               src={
// //                 propertyData?.imageGallery[currentImageIndex] ||
// //                 "/placeholder.svg"
// //               }
// //               //   alt={${propertyData.title} - Image ${currentImageIndex + 1}}
// //               alt={`${propertyData?.title} - Image ${currentImageIndex + 1}`}
// //               className="w-full h-full object-cover"
// //             />

// //             {/* RERA Badge */}
// //             {propertyData?.isFeatured && (
// //               <div className="absolute top-3 left-3 bg-blue-700 text-white px-2 py-0.5 rounded text-xs font-bold">
// //                 Featured
// //               </div>
// //             )}

// //             {/* Favorite Button */}
// //             <button
// //               className="absolute top-3 right-3 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
// //               onClick={toggleFavorite}
// //               aria-label="Add to favorites"
// //             >
// //               <Heart
// //                 className={
// //                   isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
// //                 }
// //                 size={18}
// //               />
// //             </button>

// //             {/* Image Counter */}
// //             <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
// //               {currentImageIndex + 1}/{propertyData?.imageGallery?.length}
// //             </div>

// //             {/* Carousel Buttons */}
// //             <button
// //               className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
// //               onClick={prevImage}
// //               aria-label="Previous image"
// //             >
// //               <ChevronLeft size={20} />
// //             </button>
// //             <button
// //               className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
// //               onClick={nextImage}
// //               aria-label="Next image"
// //             >
// //               <ChevronRight size={20} />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Details Section */}
// //         <div className="p-4 md:w-3/5">
// //           {/* Property Header */}
// //           <div className="mb-3">
// //             <h2 className="text-lg font-semibold text-gray-800 m-0">
// //               {propertyData?.title}
// //             </h2>
// //             <div className="flex items-center text-gray-600 text-sm">
// //               <MapPin size={14} className="mr-1" />
// //               <span>
// //                 {propertyData?.locality}, {propertyData?.city}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Property Specs */}
// //           <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-gray-100">
// //             {/* Price Section */}
// //             <div className="flex flex-col">
// //               <span className="text-xs text-gray-500">Price Range</span>
// //               <span className="text-base font-semibold text-gray-800">
// //                 {formatPrice(propertyData?.priceRange?.min)} -{" "}
// //                 {formatPrice(propertyData?.priceRange?.max)}
// //               </span>
// //               <span className="text-xs text-gray-500 mt-1">
// //                 ₹{propertyData?.pricePerSqFt?.toLocaleString()}/sqft
// //               </span>
// //             </div>

// //             {/* Area Section */}
// //             <div className="flex flex-col">
// //               <span className="text-xs text-gray-500">Area Range</span>
// //               <span className="text-base font-semibold text-gray-800">
// //                 {propertyData?.areaRange?.min?.toLocaleString()} -{" "}
// //                 {propertyData?.areaRange?.max?.toLocaleString()} sqft
// //               </span>
// //             </div>

// //             {/* Type Section */}
// //             <div className="flex flex-col">
// //               <span className="text-xs text-gray-500">Type</span>
// //               <span className="text-base font-semibold text-gray-800">
// //                 {propertyData?.projectType}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Property Highlights */}
// //           <div className="mb-4">
// //             <h3 className="text-sm font-semibold text-gray-800 mb-2">
// //               Highlights:
// //             </h3>
// //             <ul className="flex flex-wrap gap-2">
// //               <li className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
// //                 <Check size={14} className="mr-1 text-teal-500" />{" "}
// //                 {propertyData?.availability}
// //               </li>
// //               <li className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
// //                 <Check size={14} className="mr-1 text-teal-500" /> Possession:{" "}
// //                 {new Date(propertyData?.reraPossessionDate).toLocaleDateString(
// //                   "en-IN",
// //                   {
// //                     year: "numeric",
// //                     month: "short",
// //                   }
// //                 )}
// //               </li>
// //               <li className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
// //                 <Check size={14} className="mr-1 text-teal-500" /> RERA:{" "}
// //                 {propertyData?.reraNumber}
// //               </li>
// //               {propertyData?.aminities?.map((amenity, index) => (
// //                 <li
// //                   key={index}
// //                   className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
// //                 >
// //                   <Check size={14} className="mr-1 text-teal-500" /> {amenity}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           <div className="mb-4">
// //             <h3 className="text-sm font-semibold text-gray-800 mb-2">Banks:</h3>
// //             <ul className="flex flex-wrap gap-2">
// //               {propertyData?.bankOfApproval?.map((amenity, index) => (
// //                 <li
// //                   key={index}
// //                   className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
// //                 >
// //                   <Check size={14} className="mr-1 text-teal-500" /> {amenity}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Property Description */}
// //           <div className="mb-4 text-sm text-gray-600">
// //             <p>{propertyData?.subTitle}</p>
// //           </div>

// //           {/* Action Buttons */}
// //           <Link
// //             href={`/projects/${project?.slug}`}
// //             key={project._id}
// //             className="flex gap-3"
// //           >
// //             <button className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-blue-500 text-white border-none rounded font-semibold text-sm hover:bg-blue-600 transition-colors">
// //               View Details
// //             </button>
// //           </Link>
// //         </div>
// //       </div>
// //     </div>

// //     // <div className=""> Hello </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   MapPin,
//   Phone,
//   Check,
//   Star,
//   Calendar,
//   Home,
//   Maximize2,
//   IndianRupee,
// } from "lucide-react";
// import Link from "next/link";

// interface SingleProject {
//   _id: string;
//   slug: string;
//   title: string;
//   subTitle: string;
//   locality: string;
//   city: string;
//   state: string;
//   service: string;
//   projectType: string;
//   priceRange: { min: number; max: number };
//   areaRange: { min: number; max: number };
//   pricePerSqFt: number;
//   reraNumber: string;
//   reraPossessionDate: string;
//   availability: { name: string };
//   isFeatured: boolean;
//   aminities: { name: string }[];
//   bankOfApproval: { name: string }[];
//   youtubeEmbedLink: string;
//   imageGallery: { secure_url: string }[];
// }

// export default function PropertyCard({ project }: { project: SingleProject }) {
//   console.log("Received Project", project);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

//   const propertyData = {
//     title: project?.title,
//     subTitle: project?.subTitle,
//     locality: project?.locality,
//     city: project?.city,
//     state: project?.state,
//     service: project?.service,
//     projectType: project?.projectType,
//     priceRange: {
//       min: project?.priceRange?.min,
//       max: project?.priceRange?.max,
//     },
//     areaRange: {
//       min: project?.areaRange?.min,
//       max: project?.areaRange?.max,
//     },
//     pricePerSqFt: project?.pricePerSqFt,
//     reraNumber: project?.reraNumber,
//     reraPossessionDate: project?.reraPossessionDate,
//     availability: project?.availability?.name,
//     isFeatured: project?.isFeatured,
//     aminities: project?.aminities?.map((bank) => bank.name),
//     bankOfApproval: project?.bankOfApproval?.map((bank) => bank.name),
//     youtubeEmbedLink: project?.youtubeEmbedLink,
//     imageGallery: project?.imageGallery.map((img) => img.secure_url),
//   };

//   const formatPrice = (price: number) => {
//     if (price >= 10000000) {
//       return `₹${(price / 10000000).toFixed(2)} Cr`;
//     } else if (price >= 100000) {
//       return `₹${(price / 100000).toFixed(2)} Lac`;
//     } else {
//       return `₹${price.toLocaleString()}`;
//     }
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === propertyData.imageGallery.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? propertyData.imageGallery.length - 1 : prevIndex - 1
//     );
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
//       <div className="flex flex-col lg:flex-row">
//         {/* Image Section */}
//         <div className="relative lg:w-2/5 h-64 lg:h-auto">
//           <div className="relative h-full overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
//             <img
//               src={
//                 propertyData?.imageGallery[currentImageIndex] ||
//                 "/placeholder.svg?height=300&width=400"
//               }
//               alt={`${propertyData?.title} - Image ${currentImageIndex + 1}`}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//             />

//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

//             {/* Featured Badge */}
//             {propertyData?.isFeatured && (
//               <div className="absolute top-4 left-4 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
//                 <Star className="w-3 h-3 fill-current" />
//                 Featured
//               </div>
//             )}

//             {/* Service Type Badge */}
//             <div className="absolute top-4 right-16 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
//               {propertyData?.service}
//             </div>

//             {/* Favorite Button */}
//             <button
//               className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg"
//               onClick={toggleFavorite}
//               aria-label="Add to favorites"
//             >
//               <Heart
//                 className={`w-5 h-5 transition-colors ${
//                   isFavorite
//                     ? "fill-red-500 text-red-500"
//                     : "text-gray-600 hover:text-red-500"
//                 }`}
//               />
//             </button>

//             {/* Image Counter */}
//             <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
//               {currentImageIndex + 1}/{propertyData?.imageGallery?.length}
//             </div>

//             {/* Carousel Navigation */}
//             {propertyData?.imageGallery?.length > 1 && (
//               <>
//                 <button
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
//                   onClick={prevImage}
//                   aria-label="Previous image"
//                 >
//                   <ChevronLeft className="w-5 h-5 text-gray-700" />
//                 </button>
//                 <button
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
//                   onClick={nextImage}
//                   aria-label="Next image"
//                 >
//                   <ChevronRight className="w-5 h-5 text-gray-700" />
//                 </button>
//               </>
//             )}

//             {/* Image Dots Indicator */}
//             {propertyData?.imageGallery?.length > 1 && (
//               <div className="absolute bottom-4 left-4 flex gap-1.5">
//                 {propertyData.imageGallery.slice(0, 5).map((_, index) => (
//                   <button
//                     key={index}
//                     className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                       index === currentImageIndex ? "bg-white" : "bg-white/50"
//                     }`}
//                     onClick={() => setCurrentImageIndex(index)}
//                   />
//                 ))}
//                 {propertyData.imageGallery.length > 5 && (
//                   <span className="text-white text-xs ml-1">
//                     +{propertyData.imageGallery.length - 5}
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="flex-1 p-6 lg:p-8">
//           {/* Header */}
//           <div className="mb-6">
//             <div className="flex items-start justify-between mb-2">
//               <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
//                 {propertyData?.title}
//               </h2>
//               <div className="flex items-center gap-1 text-amber-500 ml-4">
//                 <Star className="w-4 h-4 fill-current" />
//                 <span className="text-sm font-medium text-gray-700">4.5</span>
//               </div>
//             </div>
//             <div className="flex items-center text-gray-600 mb-3">
//               <MapPin className="w-4 h-4 mr-2 text-gray-500" />
//               <span className="text-sm">
//                 {propertyData?.locality}, {propertyData?.city},{" "}
//                 {propertyData?.state}
//               </span>
//             </div>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               {propertyData?.subTitle}
//             </p>
//           </div>

//           {/* Key Metrics */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//             {/* Price */}
//             <div className="text-center sm:text-left">
//               <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
//                 <IndianRupee className="w-4 h-4 text-green-600" />
//                 <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                   Price Range
//                 </span>
//               </div>
//               <div className="font-bold text-lg text-gray-900">
//                 {formatPrice(propertyData?.priceRange?.min)} -{" "}
//                 {formatPrice(propertyData?.priceRange?.max)}
//               </div>
//               <div className="text-xs text-gray-500 mt-1">
//                 ₹{propertyData?.pricePerSqFt?.toLocaleString()}/sqft
//               </div>
//             </div>

//             {/* Area */}
//             <div className="text-center sm:text-left">
//               <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
//                 <Maximize2 className="w-4 h-4 text-blue-600" />
//                 <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                   Area Range
//                 </span>
//               </div>
//               <div className="font-bold text-lg text-gray-900">
//                 {propertyData?.areaRange?.min?.toLocaleString()} -{" "}
//                 {propertyData?.areaRange?.max?.toLocaleString()}
//               </div>
//               <div className="text-xs text-gray-500 mt-1">sq ft</div>
//             </div>

//             {/* Type */}
//             <div className="text-center sm:text-left">
//               <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
//                 <Home className="w-4 h-4 text-purple-600" />
//                 <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                   Property Type
//                 </span>
//               </div>
//               <div className="font-bold text-lg text-gray-900">
//                 {propertyData?.projectType}
//               </div>
//               <div className="text-xs text-gray-500 mt-1">
//                 {propertyData?.availability}
//               </div>
//             </div>
//           </div>

//           {/* Key Information */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
//               <Calendar className="w-5 h-5 text-blue-600" />
//               <div>
//                 <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                   Possession
//                 </div>
//                 <div className="font-semibold text-gray-900">
//                   {new Date(
//                     propertyData?.reraPossessionDate
//                   ).toLocaleDateString("en-IN", {
//                     year: "numeric",
//                     month: "short",
//                   })}
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
//               <Check className="w-5 h-5 text-green-600" />
//               <div>
//                 <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                   RERA
//                 </div>
//                 <div className="font-semibold text-gray-900">
//                   {propertyData?.reraNumber}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Amenities */}
//           {propertyData?.aminities && propertyData.aminities.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                 <Check className="w-4 h-4 text-green-600" />
//                 Key Amenities
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {propertyData.aminities.slice(0, 6).map((amenity, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200"
//                   >
//                     <Check className="w-3 h-3" />
//                     {amenity}
//                   </span>
//                 ))}
//                 {propertyData.aminities.length > 6 && (
//                   <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                     +{propertyData.aminities.length - 6} more
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Bank Approvals */}
//           {propertyData?.bankOfApproval &&
//             propertyData.bankOfApproval.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <Check className="w-4 h-4 text-blue-600" />
//                   Bank Approvals
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {propertyData.bankOfApproval
//                     .slice(0, 4)
//                     .map((bank, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
//                       >
//                         <Check className="w-3 h-3" />
//                         {bank}
//                       </span>
//                     ))}
//                   {propertyData.bankOfApproval.length > 4 && (
//                     <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                       +{propertyData.bankOfApproval.length - 4} more
//                     </span>
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
//             <Link
//               href={`/projects/${project?.slug}`}
//               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-center hover:shadow-lg hover:shadow-blue-600/25"
//             >
//               View Full Details
//             </Link>
//             <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-md">
//               <Phone className="w-4 h-4" />
//               Contact
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Phone,
  Check,
  Star,
  Calendar,
  Home,
  Maximize2,
  IndianRupee,
  Share2,
  Eye,
  Bookmark,
  TrendingUp,
  Award,
} from "lucide-react";
import Link from "next/link";

interface SingleProject {
  _id: string;
  slug: string;
  title: string;
  subTitle: string;
  locality: string;
  city: string;
  state: string;
  service: string;
  projectType: string;
  priceRange: { min: number; max: number };
  areaRange: { min: number; max: number };
  pricePerSqFt: number;
  reraNumber: string;
  reraPossessionDate: string;
  availability: { name: string };
  isFeatured: boolean;
  aminities: { name: string }[];
  bankOfApproval: { name: string }[];
  youtubeEmbedLink: string;
  imageGallery: { secure_url: string }[];
}

export default function PropertyCard({ project }: { project: SingleProject }) {
  console.log("Received Project", project);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
    aminities: project?.aminities?.map((amenity) => amenity.name),
    bankOfApproval: project?.bankOfApproval?.map((bank) => bank.name),
    youtubeEmbedLink: project?.youtubeEmbedLink,
    imageGallery: project?.imageGallery.map((img) => img.secure_url),
  };

  const formatPrice = (price: number) => {
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

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row">
        {/* Enhanced Image Section */}
        <div className="relative lg:w-2/5 h-72 lg:h-auto">
          <div className="relative h-full overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
            <img
              src={
                propertyData?.imageGallery[currentImageIndex] ||
                "/placeholder.svg?height=400&width=600"
              }
              alt={`${propertyData?.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

            {/* Top Badges Row */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                {/* Featured Badge */}
                {propertyData?.isFeatured && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                    <Award className="w-3 h-3 fill-current" />
                    FEATURED
                  </div>
                )}

                {/* Service Type Badge */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  FOR {propertyData?.service}
                </div>

                {/* Trending Badge */}
                <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  <TrendingUp className="w-3 h-3" />
                  TRENDING
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  className="bg-white/90 backdrop-blur-sm rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
                  onClick={toggleFavorite}
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </button>

                <button
                  className="bg-white/90 backdrop-blur-sm rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
                  onClick={toggleBookmark}
                  aria-label="Bookmark property"
                >
                  <Bookmark
                    className={`w-5 h-5 transition-colors ${
                      isBookmarked
                        ? "fill-blue-500 text-blue-500"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                  />
                </button>

                <button className="bg-white/90 backdrop-blur-sm rounded-full w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg hover:scale-110">
                  <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
                </button>
              </div>
            </div>

            {/* Bottom Info Row */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              {/* Image Dots Indicator */}
              {propertyData?.imageGallery?.length > 1 && (
                <div className="flex gap-2">
                  {propertyData.imageGallery.slice(0, 5).map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                  {propertyData.imageGallery.length > 5 && (
                    <span className="text-white text-xs ml-2 bg-black/50 px-2 py-1 rounded-full">
                      +{propertyData.imageGallery.length - 5}
                    </span>
                  )}
                </div>
              )}

              {/* Image Counter */}
              <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {currentImageIndex + 1}/{propertyData?.imageGallery?.length}
              </div>
            </div>

            {/* Enhanced Carousel Navigation */}
            {propertyData?.imageGallery?.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="flex-1 p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-blue-900 transition-colors">
                {propertyData?.title}
              </h2>
              <div className="flex items-center gap-1 text-amber-500 ml-4 bg-amber-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-amber-700">4.8</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-base font-medium">
                {propertyData?.locality}, {propertyData?.city},{" "}
                {propertyData?.state}
              </span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              {propertyData?.subTitle}
            </p>
          </div>

          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
            {/* Price */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Price Range
                </span>
              </div>
              <div className="font-bold text-xl text-gray-900 mb-1">
                {formatPrice(propertyData?.priceRange?.min)} -{" "}
                {formatPrice(propertyData?.priceRange?.max)}
              </div>
              <div className="text-sm text-green-600 font-semibold">
                ₹{propertyData?.pricePerSqFt?.toLocaleString()}/sqft
              </div>
            </div>

            {/* Area */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Maximize2 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Area Range
                </span>
              </div>
              <div className="font-bold text-xl text-gray-900 mb-1">
                {propertyData?.areaRange?.min?.toLocaleString()} -{" "}
                {propertyData?.areaRange?.max?.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600 font-semibold">sq ft</div>
            </div>

            {/* Type */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Home className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Property Type
                </span>
              </div>
              <div className="font-bold text-xl text-gray-900 mb-1">
                {propertyData?.projectType}
              </div>
              <div className="text-sm text-purple-600 font-semibold">
                {propertyData?.availability}
              </div>
            </div>
          </div>

          {/* Enhanced Key Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Possession
                </div>
                <div className="font-bold text-lg text-gray-900">
                  {new Date(
                    propertyData?.reraPossessionDate
                  ).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="p-3 bg-green-100 rounded-xl">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  RERA Approved
                </div>
                <div className="font-bold text-lg text-gray-900">
                  {propertyData?.reraNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Amenities */}
          {propertyData?.aminities && propertyData.aminities.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                Premium Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {propertyData.aminities.slice(0, 6).map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl text-sm font-semibold border border-green-200 hover:shadow-md transition-all duration-200"
                  >
                    <Check className="w-4 h-4" />
                    {amenity}
                  </span>
                ))}
                {propertyData.aminities.length > 6 && (
                  <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                    +{propertyData.aminities.length - 6} more amenities
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Bank Approvals */}
          {propertyData?.bankOfApproval &&
            propertyData.bankOfApproval.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                  Bank Loan Approved
                </h3>
                <div className="flex flex-wrap gap-3">
                  {propertyData.bankOfApproval
                    .slice(0, 4)
                    .map((bank, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-200 hover:shadow-md transition-all duration-200"
                      >
                        <Check className="w-4 h-4" />
                        {bank}
                      </span>
                    ))}
                  {propertyData.bankOfApproval.length > 4 && (
                    <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                      +{propertyData.bankOfApproval.length - 4} more banks
                    </span>
                  )}
                </div>
              </div>
            )}

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Link
              href={`/projects/${project?.slug}`}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 text-center hover:shadow-lg hover:shadow-blue-600/25 transform hover:scale-105"
            >
              View Complete Details
            </Link>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:shadow-md transform hover:scale-105">
              <Phone className="w-5 h-5" />
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
