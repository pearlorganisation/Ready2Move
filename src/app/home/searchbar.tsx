" use client";
import { Search, ChevronDown } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white rounded-md shadow-lg p-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <button className="w-full flex items-center justify-between bg-white border rounded-md px-4 py-2 text-left">
            <span className="text-gray-700">Project/Property</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="relative">
          <button className="w-full flex items-center justify-between bg-white border rounded-md px-4 py-2 text-left">
            <span className="text-gray-700">Select Service</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="relative">
          <button className="w-full flex items-center justify-between bg-white border rounded-md px-4 py-2 text-left">
            <span className="text-gray-700">Property Type</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="relative flex">
          <div className="flex-grow relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Find properties, localities or roads"
              className="w-full pl-10 pr-4 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-r-md font-medium">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
