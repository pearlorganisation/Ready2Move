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

// Format price for Indian currency
const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} L`;
  } else {
    return `₹${price.toLocaleString()}`;
  }
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 w-full"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 rounded-lg"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 rounded-lg"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 w-2/3 rounded-lg"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 w-16 rounded-full"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 w-16 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Featured Properties
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-sm"></div>
            <p className="text-gray-600 text-lg max-w-2xl">
              Handpicked premium properties ready for your next investment
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="relative group">
          {/* Enhanced Navigation Buttons */}
          <button
            ref={prevRef}
            aria-label="Previous Properties"
            className="absolute top-1/2 -translate-y-1/2 -left-6 z-50 
                     bg-white shadow-2xl border border-gray-200 rounded-full w-14 h-14 
                     flex items-center justify-center text-gray-700 hover:text-blue-600 
                     hover:shadow-3xl hover:border-blue-200 
                     opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed
                     backdrop-blur-sm hover:scale-110"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>

          <button
            ref={nextRef}
            aria-label="Next Properties"
            className="absolute top-1/2 -translate-y-1/2 -right-6 z-50 
                     bg-white shadow-2xl border border-gray-200 rounded-full w-14 h-14 
                     flex items-center justify-center text-gray-700 hover:text-blue-600 
                     hover:shadow-3xl hover:border-blue-200 
                     opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed
                     backdrop-blur-sm hover:scale-110"
          >
            <ArrowRight size={22} strokeWidth={2.5} />
          </button>

          <div className="px-2">
            {loading || !isClient ? (
              <LoadingSkeleton />
            ) : Array.isArray(featuredProperties) &&
              featuredProperties.length > 0 ? (
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
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
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 24 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                  1280: { slidesPerView: 4, spaceBetween: 24 },
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
                        href={`/properties/${property?.slug}`}
                        className="block group/card"
                      >
                        <div className="group/card bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-200 hover:border-blue-300">
                          {/* Image Section */}
                          <div className="relative">
                            {property?.imageGallery?.[0]?.secure_url ? (
                              <Image
                                src={
                                  property.imageGallery[0].secure_url ||
                                  "/placeholder.svg"
                                }
                                alt={property?.title || "Property Image"}
                                width={400}
                                height={280}
                                className="w-full h-48 object-cover"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <Home size={48} className="text-gray-400" />
                              </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/card:opacity-100" />

                            {/* Badges */}
                            {property?.imageGallery?.length > 0 && (
                              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-md">
                                <MyImage size={16} />
                                <span>{property.imageGallery.length}</span>
                              </div>
                            )}
                            <div className="absolute top-4 right-4">
                              <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-400 shadow-sm">
                                {property?.availability?.name || "Available"}
                              </span>
                            </div>
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                                {property.service === "SELL"
                                  ? "For Sale"
                                  : "For Rent"}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 space-y-4">
                            {/* Title & Location */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3rem] group-hover/card:text-blue-600">
                                {property?.title || "Untitled Property"}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500 gap-1">
                                <MapPin size={16} className="text-red-500" />
                                <span>
                                  {property?.city && property?.state
                                    ? `${property.city}, ${property.state}`
                                    : "Location N/A"}
                                </span>
                              </div>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                              {property.noOfBedrooms > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Home size={16} className="text-blue-500" />
                                  <span>{property.noOfBedrooms} BHK</span>
                                </div>
                              )}
                              {property.noOfBathrooms > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Bath size={16} className="text-cyan-500" />
                                  <span>{property.noOfBathrooms} Bath</span>
                                </div>
                              )}
                              {carpetArea > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Maximize
                                    size={16}
                                    className="text-green-500"
                                  />
                                  <span>
                                    {carpetArea.toLocaleString()} sq.ft
                                  </span>
                                </div>
                              )}
                              {property.parking && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Car size={16} className="text-purple-500" />
                                  <span>Parking</span>
                                </div>
                              )}
                            </div>

                            {/* Price */}
                            <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-gray-500">Price</p>
                                  <p className="text-xl font-bold text-green-700 flex items-center gap-1">
                                    <IndianRupee size={18} />
                                    {formatPrice(expectedPrice)}
                                  </p>
                                </div>
                                {property.isPriceNegotiable && (
                                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                                    Negotiable
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* CTA */}
                            <div>
                              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl opacity-0 group-hover/card:opacity-100 shadow hover:shadow-lg">
                                View Property Details
                              </button>
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
                  <p className="text-2xl font-bold text-gray-700">
                    No Featured Properties
                  </p>
                  <p className="text-gray-500 max-w-md">
                    We're constantly adding new premium properties. Check back
                    soon for exciting opportunities!
                  </p>
                </div>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
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
