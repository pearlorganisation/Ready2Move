// // //  https://www.oracle.com/corporate/

"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const PropertiesPage = () => {
  const [service, setService] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const properties = [
    {
      id: 1,
      title: "Luxury Apartment",
      type: "RESIDENTIAL",
      service: "BUY",
      location: "New York",
      price: 800000,
      bedrooms: 3,
      bathrooms: 2,
      image:
        "https://photos.zillowstatic.com/fp/173b668ad3461bdb29dc13032b6f2e29-p_e.jpg",
    },
    {
      id: 2,
      title: "Office Space",
      type: "COMMERCIAL",
      service: "RENT",
      location: "Los Angeles",
      price: 500000,
      bedrooms: 2,
      bathrooms: 1,
      image:
        "https://boardwalkindia.com/wp-content/uploads/2022/05/shutterstock_1716940273.jpg",
    },
    {
      id: 3,
      title: "Beach House",
      type: "RESIDENTIAL",
      service: "SELL",
      location: "Miami",
      price: 950000,
      bedrooms: 4,
      bathrooms: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg9tdFrisZulo6WwGIISsV2ACSW7xsSdE14g&s",
    },
    {
      id: 4,
      title: "Retail Store",
      type: "COMMERCIAL",
      service: "BUY",
      location: "Chicago",
      price: 300000,
      bedrooms: 6,
      bathrooms: 4,
      image:
        "https://thumbs.dreamstime.com/b/new-commercial-building-newly-constructed-small-retail-office-35627949.jpg",
    },
    {
      id: 5,
      title: "Penthouse Suite",
      type: "RESIDENTIAL",
      service: "RENT",
      location: "San Francisco",
      price: 1200000,
      bedrooms: 5,
      bathrooms: 4,
      image: "https://www.gharjunction.com/img/blog/218.jpg",
    },
  ];

  const filteredProperties = properties.filter((property) => {
    const matchesService = service ? property.service === service : true;
    const matchesType = propertyType ? property.type === propertyType : true;
    const matchesSearch = searchQuery
      ? property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = property.bedrooms >= bedrooms;
    const matchesBathrooms = property.bathrooms >= bathrooms;

    return (
      matchesService &&
      matchesType &&
      matchesSearch &&
      matchesPrice &&
      matchesBedrooms &&
      matchesBathrooms
    );
  });

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
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-full accent-blue-500"
            />
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full accent-blue-500 mt-2"
            />
            <p className="text-gray-700 text-sm font-medium mt-2">
              ${priceRange[0].toLocaleString()} - $
              {priceRange[1].toLocaleString()}
            </p>
          </div>

          {/* Bedrooms */}
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Bedrooms
          </label>
          <div className="flex items-center gap-3 mb-4">
            <button
              className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
              onClick={() => setBedrooms((prev) => Math.max(1, prev - 1))}
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
              onClick={() => setBathrooms((prev) => Math.max(1, prev - 1))}
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
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white border rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mt-1">📍 {property.location}</p>
                  <p className="text-gray-800 mt-1 font-medium">
                    💰 ${property.price.toLocaleString()}
                  </p>
                  <p className="text-gray-800 mt-1">
                    🛏 {property.bedrooms} Bedrooms | 🛁 {property.bathrooms}{" "}
                    Bathrooms
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {property.type}
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
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No properties found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
