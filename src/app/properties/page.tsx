// // //  https://www.oracle.com/corporate/

"use client";

import PaginationMainComponent from "@/components/PaginationMain";
import { useDebounce } from "@/lib/hooks/debounceHook";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllProperties } from "@/lib/redux/actions/propertyAction";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const PropertiesPage = () => {
  const dispatch = useAppDispatch();
  const { propertyData, paginate } = useAppSelector((state) => state.property);

  const [service, setService] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // returned values from the custom debounce hook
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const debouncedBedRoom = useDebounce(bedrooms, 500);
  const debouncedBathRoom = useDebounce(bathrooms, 500);
  // console.log("the price range is", priceRange);
  // console.log("the no of bedrooms are", bedrooms);
  // console.log("the bathrooms are", bathrooms);

  /** for the dynamic data */
  const totalPages = Math.ceil(paginate?.total / paginate?.limit);

  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    dispatch(
      getAllProperties({
        page: currentPage,
        limit: 5,
        priceRange: debouncedPriceRange,
        bedRooms: debouncedBedRoom,
        bathRooms: debouncedBathRoom,
      })
    );
  }, [currentPage, debouncedBedRoom, debouncedPriceRange, debouncedBathRoom]);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        Find Your Dream Property
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 mb-8 items-center">
        <select
          className="border p-3 rounded-lg w-full md:w-1/4 bg-gray-50 shadow-sm focus:ring focus:ring-blue-300"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">All Services</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
          <option value="RENT">RENT</option>
        </select>

        <select
          className="border p-3 rounded-lg w-full md:w-1/4 bg-gray-50 shadow-sm focus:ring focus:ring-blue-300"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">All Property Types</option>
          <option value="COMMERCIAL">COMMERCIAL</option>
          <option value="RESIDENTIAL">RESIDENTIAL</option>
        </select>

        <div className="relative w-full md:w-1/3 flex justify-center items-center">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or location"
            className="border p-3 rounded-lg w-full pl-12 shadow-sm focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-[20%_auto] gap-6">
        <aside className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-5 text-gray-800">Filters</h2>

          {/* Price Range */}
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Price Range
          </label>
          <div className="relative mb-4">
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            {/* <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full accent-blue-500 mt-2"
            /> */}
            <p className="text-gray-700 text-sm font-medium mt-2">
              Rs. {priceRange.toLocaleString()}
            </p>
          </div>

          {/* Bedrooms */}
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Bedrooms
          </label>
          <div className="flex items-center gap-3 mb-4">
            <button
              className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
              onClick={() => setBedrooms((prev) => Math.max(0, prev - 1))}
            >
              –
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {bedrooms}
            </span>
            <button
              className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
              onClick={() => setBedrooms((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Bathrooms */}
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Bathrooms
          </label>
          <div className="flex items-center gap-3">
            <button
              className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
              onClick={() => setBathrooms((prev) => Math.max(0, prev - 1))}
            >
              –
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {bathrooms}
            </span>
            <button
              className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
              onClick={() => setBathrooms((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </aside>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyData?.length > 0 ? (
            propertyData?.map((property) => (
              <Link href={`/properties/${property?.slug}`} key={property._id}>
                <div className="bg-white border rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
                  <img
                    src={property?.imageGallery?.[0]?.secure_url}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {property?.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      📍 {property?.locality}
                    </p>
                    <p className="text-gray-800 mt-1 font-medium">
                      💰 Rs. {property?.expectedPrice?.toLocaleString()}
                    </p>
                    <p className="text-gray-800 mt-1">
                      🛏 {property?.noOfBedrooms} Bedrooms | 🛁{" "}
                      {property.noOfBathrooms} Bathrooms
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {property?.propertyType?.name}
                      </span>
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {property.service}
                      </span>
                    </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No properties found.
            </p>
          )}
        </div>
      </div>
      <PaginationMainComponent
        paginate={paginate}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

export default PropertiesPage;
