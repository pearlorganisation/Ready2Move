// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   ArrowLeft,
//   ArrowRight,
//   ImageIcon as MyImage,
//   MapPin,
//   IndianRupee,
//   Home,
//   Bath,
//   Car,
//   Maximize,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
// import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";

// const formatPrice = (price: number) => {
//   if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
//   if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
//   return `₹${price.toLocaleString()}`;
// };

// const FeaturedProperties = () => {
//   const dispatch = useAppDispatch();
//   const { featuredProperties, loading } = useAppSelector(
//     (state) => state.featured
//   );
//   const [isClient, setIsClient] = useState(false);

//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   useEffect(() => {
//     dispatch(getFeaturedListings());
//     setIsClient(true);
//   }, [dispatch]);

//   const LoadingSkeleton = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//       {Array.from({ length: 5 }).map((_, idx) => (
//         <div
//           key={idx}
//           className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
//         >
//           <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-40 sm:h-48 md:h-52 w-full"></div>
//           <div className="p-4 space-y-3">
//             <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 rounded"></div>
//             <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 rounded"></div>
//             <div className="grid grid-cols-2 gap-2">
//               <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
//               <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
//             </div>
//             <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <section className="py-16 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-12">
//           <div className="space-y-3">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
//               Featured Properties
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
//               Handpicked premium properties ready for your next investment
//             </p>
//           </div>
//         </div>

//         <div className="relative group">
//           {/* Navigation Buttons */}
//           <button
//             ref={prevRef}
//             aria-label="Previous"
//             className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-6 z-50
//               bg-white shadow-2xl border border-gray-200 rounded-full w-12 h-12
//               items-center justify-center text-gray-700 hover:text-blue-600
//               hover:border-blue-200 hover:scale-110 transition opacity-0 group-hover:opacity-100"
//           >
//             <ArrowLeft size={20} />
//           </button>

//           <button
//             ref={nextRef}
//             aria-label="Next"
//             className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-6 z-50
//               bg-white shadow-2xl border border-gray-200 rounded-full w-12 h-12
//               items-center justify-center text-gray-700 hover:text-blue-600
//               hover:border-blue-200 hover:scale-110 transition opacity-0 group-hover:opacity-100"
//           >
//             <ArrowRight size={20} />
//           </button>

//           <div className="px-1 sm:px-2 lg:px-4">
//             {loading || !isClient ? (
//               <LoadingSkeleton />
//             ) : Array.isArray(featuredProperties) &&
//               featuredProperties.length > 0 ? (
//               <Swiper
//                 modules={[Navigation, Autoplay]}
//                 autoplay={{
//                   delay: 5000,
//                   disableOnInteraction: false,
//                   pauseOnMouseEnter: true,
//                 }}
//                 navigation={{
//                   prevEl: prevRef.current,
//                   nextEl: nextRef.current,
//                 }}
//                 onInit={(swiper) => {
//                   // @ts-ignore
//                   swiper.params.navigation.prevEl = prevRef.current;
//                   // @ts-ignore
//                   swiper.params.navigation.nextEl = nextRef.current;
//                   swiper.navigation.init();
//                   swiper.navigation.update();
//                 }}
//                 breakpoints={{
//                   0: { slidesPerView: 1.1, spaceBetween: 12 },
//                   480: { slidesPerView: 1.3, spaceBetween: 12 },
//                   640: { slidesPerView: 2, spaceBetween: 16 },
//                   768: { slidesPerView: 2.5, spaceBetween: 16 },
//                   1024: { slidesPerView: 3.5, spaceBetween: 20 },
//                   1280: { slidesPerView: 4, spaceBetween: 24 },
//                 }}
//                 className="!overflow-visible"
//               >
//                 {featuredProperties.slice(0, 10).map((property, index) => {
//                   const expectedPrice = property.expectedPrice || 0;
//                   const carpetArea =
//                     property.area?.find((a) => a.name === "CARPET_AREA")
//                       ?.area || 0;

//                   return (
//                     <SwiperSlide key={property._id || index}>
//                       <Link
//                         href={`/properties/${property.slug}`}
//                         className="block group/card"
//                       >
//                         <div className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden border border-gray-100 hover:border-blue-200 transition-all flex flex-col h-full min-h-[420px] sm:min-h-[460px]">
//                           <div className="relative h-40 sm:h-48 md:h-52">
//                             {property?.imageGallery?.[0]?.secure_url ? (
//                               <Image
//                                 src={property.imageGallery[0].secure_url}
//                                 alt={property.title || "Property Image"}
//                                 width={300}
//                                 height={600}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                                 <Home size={32} className="text-gray-400" />
//                               </div>
//                             )}

//                             {/* Badges */}
//                             <div className="absolute top-3 left-3">
//                               <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
//                                 {property.service === "SELL"
//                                   ? "For Sale"
//                                   : "For Rent"}
//                               </span>
//                             </div>
//                             <div className="absolute top-3 right-3">
//                               <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
//                                 {property.availability?.name || "Available"}
//                               </span>
//                             </div>

//                             {/* Image Count */}
//                             {property?.imageGallery?.length > 0 && (
//                               <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
//                                 <MyImage size={12} />
//                                 <span>{property.imageGallery.length}</span>
//                               </div>
//                             )}
//                           </div>

//                           {/* Content */}
//                           <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
//                             <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover/card:text-blue-600">
//                               {property.title || "Untitled Property"}
//                             </h3>

//                             <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-1 mb-3">
//                               <MapPin size={14} className="text-red-500" />
//                               <span className="truncate">
//                                 {property.city && property.state
//                                   ? `${property.city}, ${property.state}`
//                                   : "Location N/A"}
//                               </span>
//                             </div>

//                             <div className="grid grid-cols-2 gap-2 mb-3 text-xs sm:text-sm text-gray-600">
//                               {property.noOfBedrooms > 0 && (
//                                 <div className="flex items-center gap-1">
//                                   <Home size={14} className="text-blue-500" />
//                                   <span>{property.noOfBedrooms} BHK</span>
//                                 </div>
//                               )}
//                               {property.noOfBathrooms > 0 && (
//                                 <div className="flex items-center gap-1">
//                                   <Bath size={14} className="text-cyan-500" />
//                                   <span>{property.noOfBathrooms} Bath</span>
//                                 </div>
//                               )}
//                               {carpetArea > 0 && (
//                                 <div className="flex items-center gap-1">
//                                   <Maximize
//                                     size={14}
//                                     className="text-green-500"
//                                   />
//                                   <span>
//                                     {carpetArea.toLocaleString()} sq.ft
//                                   </span>
//                                 </div>
//                               )}
//                               {property.parking && (
//                                 <div className="flex items-center gap-1">
//                                   <Car size={14} className="text-purple-500" />
//                                   <span>Parking</span>
//                                 </div>
//                               )}
//                             </div>

//                             <div className="bg-green-50 rounded-lg p-3">
//                               <div className="flex items-center justify-between">
//                                 <div>
//                                   <p className="text-xs text-gray-500 mb-1">
//                                     Price
//                                   </p>
//                                   <p className="text-base sm:text-lg font-bold text-green-700 flex items-center gap-1">
//                                     <IndianRupee size={16} />
//                                     {formatPrice(expectedPrice)}
//                                   </p>
//                                 </div>
//                                 {property.isPriceNegotiable && (
//                                   <span className="animate-pulse px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
//                                     Negotiable
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   );
//                 })}
//               </Swiper>
//             ) : (
//               <div className="flex flex-col justify-center items-center h-40 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center space-y-6 border border-gray-200">
//                 <div className="p-6 bg-white rounded-full shadow-lg">
//                   <Home size={48} className="text-gray-400" />
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-xl sm:text-2xl font-bold text-gray-700">
//                     No Featured Properties
//                   </p>
//                   <p className="text-gray-500 max-w-md">
//                     We're constantly adding new premium properties. Check back
//                     soon!
//                   </p>
//                 </div>
//                 <Link
//                   href="/properties"
//                   className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
//                 >
//                   <Home size={20} />
//                   Explore All Properties
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProperties;

"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon as MyImage,
  MapPin,
  IndianRupee,
  Home,
  Bath,
  Car,
  Maximize,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeaturedListings } from "@/lib/redux/actions/featuredListingsAction";

const formatPrice = (price: number) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString()}`;
};

const FeaturedProperties = () => {
  const dispatch = useAppDispatch();
  const { featuredProperties, loading } = useAppSelector(
    (state) => state.featured
  );
  const [isClient, setIsClient] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(getFeaturedListings());
    setIsClient(true);
  }, [dispatch]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-40 sm:h-48 md:h-52 w-full"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 rounded"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 rounded"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Featured Properties
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
              Handpicked premium properties ready for your next investment
            </p>
          </div>
        </div>

        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-6 z-50 
              bg-white shadow-2xl border border-gray-200 rounded-full w-12 h-12 
              items-center justify-center text-gray-700 hover:text-blue-600 
              hover:border-blue-200 hover:scale-110 transition opacity-0 group-hover:opacity-100"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            ref={nextRef}
            aria-label="Next"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-6 z-50 
              bg-white shadow-2xl border border-gray-200 rounded-full w-12 h-12 
              items-center justify-center text-gray-700 hover:text-blue-600 
              hover:border-blue-200 hover:scale-110 transition opacity-0 group-hover:opacity-100"
          >
            <ArrowRight size={20} />
          </button>

          <div className="px-1 sm:px-2 lg:px-4">
            {loading || !isClient ? (
              <LoadingSkeleton />
            ) : Array.isArray(featuredProperties) &&
              featuredProperties.length > 0 ? (
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
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
                  0: { slidesPerView: 1.1, spaceBetween: 12 },
                  480: { slidesPerView: 1.3, spaceBetween: 12 },
                  640: { slidesPerView: 2, spaceBetween: 16 },
                  768: { slidesPerView: 2.5, spaceBetween: 16 },
                  1024: { slidesPerView: 3.5, spaceBetween: 20 },
                  1280: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="!overflow-visible"
              >
                {featuredProperties.slice(0, 10).map((property, index) => {
                  const expectedPrice = property.expectedPrice || 0;
                  const carpetArea =
                    property.area?.find((a) => a.name === "CARPET_AREA")
                      ?.area || 0;

                  return (
                    <SwiperSlide key={property._id || index}>
                      <Link
                        href={`/properties/${property.slug}`}
                        className="block group/card"
                      >
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden border border-gray-100 hover:border-blue-200 transition-all flex flex-col h-full min-h-[420px] sm:min-h-[460px]">
                          <div className="relative h-40 sm:h-48 md:h-52">
                            {property?.imageGallery?.[0]?.secure_url ? (
                              <Image
                                src={property.imageGallery[0].secure_url}
                                alt={property.title || "Property Image"}
                                width={300}
                                height={600}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Home size={32} className="text-gray-400" />
                              </div>
                            )}

                            {/* Badges */}
                            <div className="absolute top-3 left-3">
                              <span className="bg-[#1E3D9C] text-white px-2 py-1 rounded-md text-xs font-medium">
                                {property.service === "SELL"
                                  ? "For Sell"
                                  : "For Rent"}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                                {property.availability?.name || "Available"}
                              </span>
                            </div>

                            {/* Image Count */}
                            {property?.imageGallery?.length > 0 && (
                              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                <MyImage size={12} />
                                <span>{property.imageGallery.length}</span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover/card:text-blue-600">
                              {property.title || "Untitled Property"}
                            </h3>

                            <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-1 mb-3">
                              <MapPin size={14} className="text-red-500" />
                              <span className="truncate">
                                {property.city && property.state
                                  ? `${property.city}, ${property.state}`
                                  : "Location N/A"}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-3 text-xs sm:text-sm text-gray-600">
                              {property.noOfBedrooms > 0 && (
                                <div className="flex items-center gap-1">
                                  <Home size={14} className="text-blue-500" />
                                  <span>{property.noOfBedrooms} BHK</span>
                                </div>
                              )}
                              {property.noOfBathrooms > 0 && (
                                <div className="flex items-center gap-1">
                                  <Bath size={14} className="text-cyan-500" />
                                  <span>{property.noOfBathrooms} Bath</span>
                                </div>
                              )}
                              {carpetArea > 0 && (
                                <div className="flex items-center gap-1">
                                  <Maximize
                                    size={14}
                                    className="text-green-500"
                                  />
                                  <span>
                                    {carpetArea.toLocaleString()} sq.ft
                                  </span>
                                </div>
                              )}
                              {property.parking && (
                                <div className="flex items-center gap-1">
                                  <Car size={14} className="text-purple-500" />
                                  <span>Parking</span>
                                </div>
                              )}
                            </div>

                            <div className="bg-green-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    Price
                                  </p>
                                  <p className="text-base sm:text-lg font-bold text-green-700 flex items-center gap-1">
                                    <IndianRupee size={16} />
                                    {formatPrice(expectedPrice)}
                                  </p>
                                </div>
                                {property.isPriceNegotiable && (
                                  <span className="animate-pulse px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
                                    Negotiable
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="flex flex-col justify-center items-center h-40 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center space-y-6 border border-gray-200">
                <div className="p-6 bg-white rounded-full shadow-lg">
                  <Home size={48} className="text-gray-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl sm:text-2xl font-bold text-gray-700">
                    No Featured Properties
                  </p>
                  <p className="text-gray-500 max-w-md">
                    We're constantly adding new premium properties. Check back
                    soon!
                  </p>
                </div>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                >
                  <Home size={20} />
                  Explore All Properties
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
