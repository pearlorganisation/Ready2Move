"use client";

import { useDebounce } from "@/lib/hooks/debounceHook";
import { useAppDispatch, useAppSelector,  } from "@/lib/hooks/dispatchHook";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties, getAllLocations } from "@/lib/redux/actions/propertyAction";
import { ChevronRight, MapPin, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";



import {
  FaSearch,
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaHeart,
  FaShare,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTh,
  FaList,
} from "react-icons/fa";

const PropertiesPage = () => {
  const dispatch = useAppDispatch();
  const { propertyData, paginate } = useAppSelector((state) => state.property);
  const { allLocations, isLoading } = useAppSelector((state) => state.property);

  const [service, setService] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
const locationRef = useRef<HTMLDivElement>(null);



const locality = useSearchParams().get("locality");


//    useEffect(() => {
//   dispatch(getAllLocations());
// }, [dispatch]);

const uniqueLocations = Array.from(new Set(allLocations?.map(l => l.fullLocation)))
  .map(full => allLocations.find(l => l.fullLocation === full));


  // Debounced values
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const debouncedBedRoom = useDebounce(bedrooms, 500);
  const debouncedBathRoom = useDebounce(bathrooms, 500);
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Pagination
  const totalPages = Math.ceil(paginate?.total / paginate?.limit) || 0;
  const itemsPerPage = 6;
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
      setIsLocationOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
 
  // Single Source of Truth for fetching properties
useEffect(() => {
  dispatch(
    getAllProperties({
      page: currentPage,
      limit: itemsPerPage,
      service: service?.toUpperCase() as any,
      propertyType: propertyType?.toUpperCase() as any,
      // 'q' is the query parameter used in your backend for searching
      q: debouncedSearch || undefined, 
       locality: locality || undefined,
      priceRange: debouncedPriceRange,
      bedRooms: debouncedBedRoom,
      bathRooms: debouncedBathRoom,
    })
  );
}, [
  dispatch,
  currentPage,
  service,
  propertyType,
  debouncedSearch,
  locality, // Selection from dropdown OR typing in search bar triggers this
  debouncedPriceRange,
  debouncedBedRoom,
  debouncedBathRoom,
]);


  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const resetFilters = () => {
    setService("");
    setPropertyType("");
    setSearchQuery("");
    setPriceRange(0);
    setBedrooms(0);
    setBathrooms(0);
    setActiveFilter("all");
  };

//   useEffect(() => {
//   dispatch(
//     getAllProperties({
//       page: currentPage,
//       limit: itemsPerPage,
//       service: service?.toUpperCase() as any,
//       propertyType: propertyType?.toUpperCase() as any,
//       // CHANGE HERE: Map the search query specifically to the location field
//       location: debouncedSearch || undefined, 
//       priceRange: debouncedPriceRange,
//       bedRooms: debouncedBedRoom,
//       bathRooms: debouncedBathRoom,
//     })
//   );
// }, [
//   dispatch,
//   currentPage,
//   service,
//   propertyType,
//   debouncedSearch, // This now triggers location-based search
//   debouncedPriceRange,
//   debouncedBedRoom,
//   debouncedBathRoom,
// ]);


  // Fetch properties
  // useEffect(() => {
  //   dispatch(
  //     getAllProperties({
  //       page: currentPage,
  //       limit: itemsPerPage,
  //       service: service?.toUpperCase() as "RENT" | "BUY", // ✅ Fix here
  //       propertyType: propertyType?.toUpperCase() as
  //         | "RESIDENTIAL"
  //         | "COMMERCIAL",
  //       q: debouncedSearch || undefined,
  //       priceRange: debouncedPriceRange,
  //       bedRooms: debouncedBedRoom,
  //       bathRooms: debouncedBathRoom,
  //     })
  //   );
  // }, [
  //   dispatch,
  //   currentPage,
  //   service,
  //   propertyType,
  //   debouncedSearch,
  //   debouncedPriceRange,
  //   debouncedBedRoom,
  //   debouncedBathRoom,
  // ]);

  const filterOptions = [
    { id: "all", label: "All Properties", count: paginate?.total || 0 },
    { id: "buy", label: "Buy", count: 0 },
    { id: "rent", label: "Rent", count: 0 },
    // { id: "commercial", label: "Commercial", count: 0 },
    // { id: "residential", label: "Residential", count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">





      {/* Header */}
      <header className="bg-white shadow-sm border-b  top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Property Marketplace
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover your perfect home or investment
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid"
                          ? "bg-white text-blue-800 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <FaTh size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list"
                          ? "bg-white text-blue-800 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <FaList size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search properties by location, title..."
                className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
  setActiveFilter(filter.id);

  if (filter.id === "buy") {
    setService("BUY");
    setPropertyType("");
  } else if (filter.id === "rent") {
    setService("RENT");
    setPropertyType("");
  } else if (filter.id === "commercial") {
    setPropertyType("COMMERCIAL");
  } else if (filter.id === "residential") {
    setPropertyType("RESIDENTIAL");
  } else if (filter.id === "all") {
    setService("");
    setPropertyType("");
  }

  setCurrentPage(1);
}}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? "bg-[#1E3D9C] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-[#1E3D9C]"
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 text-xs opacity-75">
                    {/* ({filter.count}) */}
                  </span>
                </button>
              ))}
            </div>

            {service && (
  <div className="flex flex-wrap items-center gap-3 mb-4">
    <span className="text-sm font-medium text-gray-600">Property Type:</span>

    <button
      onClick={() => {
        setPropertyType("RESIDENTIAL");
        setCurrentPage(1);
      }}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        propertyType === "RESIDENTIAL"
          ? "bg-[#1E3D9C] text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-[#1E3D9C]"
      }`}
    >
      Residential
    </button>

    <button
      onClick={() => {
        setPropertyType("COMMERCIAL");
        setCurrentPage(1);
      }}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        propertyType === "COMMERCIAL"
          ? "bg-[#1E3D9C] text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-[#1E3D9C]"
      }`}
    >
      Commercial
    </button>
  </div>
)}

            {/* Advanced Filters */}
          {/* Advanced Filters */}
<div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm relative">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
    
    {/* 1. Price Range */}
    {/* <div className="flex flex-col">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Max Price: <span className="text-[#1E3D9C]">₹{priceRange.toLocaleString()}</span>
      </label>
      <div className="h-[42px] flex items-center">
        <input
          type="range"
          min="0"
          max="200000000"
          step="50000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1E3D9C]"
        />
      </div>
    </div> */}

    {/* 2. Bedrooms */}
    <div className="flex flex-col">
      <label className="block text-sm font-semibold text-gray-700 mb-3">Bedrooms</label>
      <div className="flex items-center space-x-3 h-[42px]">
        <button
          onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-[#1E3D9C] transition-all flex items-center justify-center shadow-sm"
        >-</button>
        <span className="w-6 text-center font-bold text-gray-800">{bedrooms}</span>
        <button
          onClick={() => setBedrooms(bedrooms + 1)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-[#1E3D9C] transition-all flex items-center justify-center shadow-sm"
        >+</button>
      </div>
    </div>

    {/* 3. Bathrooms */}
    {/* <div className="flex flex-col">
      <label className="block text-sm font-semibold text-gray-700 mb-3">Bathrooms</label>
      <div className="flex items-center space-x-3 h-[42px]">
        <button
          onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-[#1E3D9C] transition-all flex items-center justify-center shadow-sm"
        >-</button>
        <span className="w-6 text-center font-bold text-gray-800">{bathrooms}</span>
        <button
          onClick={() => setBathrooms(bathrooms + 1)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-[#1E3D9C] transition-all flex items-center justify-center shadow-sm"
        >+</button>
      </div>
    </div> */}

    {/* 4. Custom Location Picker (FORCED DOWNWARD) */}
    <div className="flex flex-col relative" ref={locationRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
      <div 
        onClick={() => setIsLocationOpen(!isLocationOpen)}
        className="flex items-center bg-white border border-gray-200 rounded-lg px-3 h-[42px] shadow-sm cursor-pointer hover:border-[#1E3D9C] transition-all group"
      >
        <MapPin className="text-[#1E3D9C] w-5 h-5 shrink-0 mr-2" />
        <span className="text-gray-700 text-sm font-medium truncate flex-1">
          {searchQuery || "All Locations"}
        </span>
        <ChevronDown className={`text-gray-400 w-4 h-4 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Forced Dropdown Menu */}
      {isLocationOpen && (
        <div className="absolute top-[110%] left-0 w-full max-h-60 bg-white border border-gray-200 rounded-xl shadow-xl z-[999] overflow-y-auto py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div 
            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm font-medium text-[#1E3D9C]"
            onClick={() => { setSearchQuery(""); setIsLocationOpen(false); }}
          >
            All Locations
          </div>
          {allLocations && allLocations.length > 0 ? (
            allLocations.map((loc: any, index: number) => (
              <div 
                key={index}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-t border-gray-50"
                onClick={() => {
                  setSearchQuery(loc.locality);
                  setIsLocationOpen(false);
                }}
              >
                {loc.fullLocation}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-400">Loading locations...</div>
          )}
        </div>
      )}
    </div>

    {/* 5. Reset Button */}
    <div className="flex flex-col">
      <button
        onClick={resetFilters}
        className="w-full h-[42px] bg-[#1E3D9C] text-white font-semibold rounded-lg hover:bg-[#182F7A] transition-all shadow-md active:scale-95"
      >
        Reset Filters
      </button>
    </div>
  </div>
</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {paginate?.total || 0} Properties Available
            </h2>
            <p className="text-gray-600 mt-1">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        {/* Property Grid */}
        {propertyData?.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {propertyData?.map((property) => (
              <div
                key={property._id}
                className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div
                  className={`relative ${
                    viewMode === "list" ? "w-80 flex-shrink-0" : ""
                  }`}
                >
                  <img
                    src={
                      property?.imageGallery?.[0]?.secure_url ||
                      "/placeholder.svg?height=300&width=400"
                    }
                    alt={property.title}
                    className={`w-full object-cover ${
                      viewMode === "list" ? "h-full" : "h-64"
                    }`}
                  />

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-[#1E3D9C] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property?.expectedPrice?.toLocaleString()}
                    </div>
                  </div>

                  {/* Service Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property?.service == "SELL"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-blue-800"
                      }`}
                    >
                      {property?.service == "SELL" ? "For Sell " : "Rent"}
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {property?.title}
                    </h3>
                    <Link href={`/properties/${property?.slug}`}>
                      <button className="p-2 text-gray-400  transition-colors">
                        <FaEye size={18} />
                      </button>
                    </Link>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-blue-800" size={14} />
                    <span className="text-sm line-clamp-1">
                      {property?.locality}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaBed className="mr-1 text-blue-800" />
                      <span>{property?.noOfBedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-1 text-blue-800" />
                      <span>{property.noOfBathrooms} Baths</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {property?.propertyType?.name}
                    </span>
                    <Link href={`/properties/${property?.slug}`}>
                      <button className="text-blue-800  text-sm font-medium">
                        View Details →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FaSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any properties matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-[#1E3D9C] text-white rounded-lg hover:bg-[#182F7A]
               transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaChevronLeft />
              </button>

              <div className="flex space-x-1">
                {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                  let pageNumber;
                  if (totalPages <= 7) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 4) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNumber = totalPages - 6 + i;
                  } else {
                    pageNumber = currentPage - 3 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handlePageClick(pageNumber)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-[#1E3D9C] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaChevronRight />
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertiesPage;