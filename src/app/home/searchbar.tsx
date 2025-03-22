"use client";
import { Search, ChevronDown } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="md:bg-white/80 md:backdrop-blur-md md:shadow-xl md:rounded-full p-6 max-w-6xl mx-auto mb-10">
      <div className="flex flex-col sm:flex-col md:flex-row items-center gap-4">
        {/* Dropdown Buttons */}
        {["Project/Property", "Select Service", "Property Type"].map(
          (label, index) => (
            <div key={index} className="relative w-full md:w-auto flex-grow sm:flex-col">
              <button className="w-full  md:w-92 flex items-center justify-between bg-gradient-to-r from-blue-100 to-white border border-gray-300 rounded-full px-5 py-3 text-gray-800 font-medium shadow-md hover:bg-white hover:shadow-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500">
                <span>{label}</span>
                <ChevronDown size={18} className="text-gray-600" />
              </button>
            </div>
          )
        )}

        {/* Search Input */}
        <div className="relative flex w-full md:w-auto ">
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Find properties, localities"
            className="w-full md:w-64 pl-12 pr-5 py-3  bg-gradient-to-r from-blue-100 to-white border border-gray-300 rounded-l-full bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-1 rounded-r-full font-semibold shadow-md transition duration-300 ease-in-out">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
