// // // //  https://www.oracle.com/corporate/

// "use client";

// import PaginationMainComponent from "@/components/PaginationMain";
// import { useDebounce } from "@/lib/hooks/debounceHook";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
// import { getAllProperties } from "@/lib/redux/actions/propertyAction";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";

// const PropertiesPage = () => {
//   const dispatch = useAppDispatch();
//   const { propertyData, paginate } = useAppSelector((state) => state.property);

//   const [service, setService] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState(0);
//   const [bedrooms, setBedrooms] = useState(0);
//   const [bathrooms, setBathrooms] = useState(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   // returned values from the custom debounce hook
//   const debouncedPriceRange = useDebounce(priceRange, 500);
//   const debouncedBedRoom = useDebounce(bedrooms, 500);
//   const debouncedBathRoom = useDebounce(bathrooms, 500);
//   // console.log("the price range is", priceRange);
//   // console.log("the no of bedrooms are", bedrooms);
//   // console.log("the bathrooms are", bathrooms);

//   /** for the dynamic data */
//   const totalPages = Math.ceil(paginate?.total / paginate?.limit);

//   const handlePageClick = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   useEffect(() => {
//     dispatch(
//       getAllProperties({
//         page: currentPage,
//         limit: 5,
//         priceRange: debouncedPriceRange,
//         bedRooms: debouncedBedRoom,
//         bathRooms: debouncedBathRoom,
//       })
//     ).then((res)=>{
//       console.log(res,"res")
//     })
//   }, [currentPage, debouncedBedRoom, debouncedPriceRange, debouncedBathRoom]);
//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
//         Find Your Dream Property
//       </h1>

//       <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 mb-8 items-center">
//         <select
//           className="border p-3 rounded-lg w-full md:w-1/4 bg-gray-50 shadow-sm focus:ring focus:ring-blue-300"
//           value={service}
//           onChange={(e) => setService(e.target.value)}
//         >
//           <option value="">All Services</option>
//           <option value="BUY">BUY</option>
//           {/* <option value="SELL">SELL</option> */}
//           <option value="RENT">RENT</option>
//         </select>

//         <select
//           className="border p-3 rounded-lg w-full md:w-1/4 bg-gray-50 shadow-sm focus:ring focus:ring-blue-300"
//           value={propertyType}
//           onChange={(e) => setPropertyType(e.target.value)}
//         >
//           <option value="">All Property Types</option>
//           <option value="COMMERCIAL">COMMERCIAL</option>
//           <option value="RESIDENTIAL">RESIDENTIAL</option>
//         </select>

//         <div className="relative w-full md:w-1/3 flex justify-center items-center">
//           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search by title or location"
//             className="border p-3 rounded-lg w-full pl-12 shadow-sm focus:ring focus:ring-blue-300"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="grid md:grid-cols-[20%_auto] gap-6">
//         <aside className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//           <h2 className="text-xl font-bold mb-5 text-gray-800">Filters</h2>

//           {/* Price Range */}
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Price Range
//           </label>
//           <div className="relative mb-4">
//             <input
//               type="range"
//               min="0"
//               max="2000000"
//               step="50000"
//               value={priceRange}
//               onChange={(e) => setPriceRange(Number(e.target.value))}
//               className="w-full accent-blue-500"
//             />
//             <p className="text-gray-700 text-sm font-medium mt-2">
//               Rs. {priceRange.toLocaleString()}
//             </p>
//           </div>

//           {/* Bedrooms */}
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Bedrooms
//           </label>
//           <div className="flex items-center gap-3 mb-4">
//             <button
//               className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
//               onClick={() => setBedrooms((prev) => Math.max(0, prev - 1))}
//             >
//               –
//             </button>
//             <span className="text-lg font-semibold text-gray-800">
//               {bedrooms}
//             </span>
//             <button
//               className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
//               onClick={() => setBedrooms((prev) => prev + 1)}
//             >
//               +
//             </button>
//           </div>

//           {/* Bathrooms */}
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Bathrooms
//           </label>
//           <div className="flex items-center gap-3">
//             <button
//               className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
//               onClick={() => setBathrooms((prev) => Math.max(0, prev - 1))}
//             >
//               –
//             </button>
//             <span className="text-lg font-semibold text-gray-800">
//               {bathrooms}
//             </span>
//             <button
//               className="p-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition"
//               onClick={() => setBathrooms((prev) => prev + 1)}
//             >
//               +
//             </button>
//           </div>
//         </aside>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {propertyData?.length > 0 ? (
//             propertyData?.map((property) => (
//               <Link href={`/properties/${property?.slug}`} key={property._id}>
//                 <div className="bg-white border rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
//                   <img
//                     src={property?.imageGallery?.[0]?.secure_url}
//                     alt={property.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-5">
//                     <h3 className="text-xl font-semibold text-gray-900">
//                       {property?.title}
//                     </h3>
//                     <p className="text-gray-600 mt-1">
//                       📍 {property?.locality}
//                     </p>
//                     <p className="text-gray-800 mt-1 font-medium">
//                       💰 Rs. {property?.expectedPrice?.toLocaleString()}
//                     </p>
//                     <p className="text-gray-800 mt-1">
//                       🛏 {property?.noOfBedrooms} Bedrooms | 🛁{" "}
//                       {property.noOfBathrooms} Bathrooms
//                     </p>
//                     <div className="mt-3 flex justify-between items-center">
//                       <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
//                         {property?.propertyType?.name}
//                       </span>
//                       <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
//                         {property.service}
//                       </span>
//                     </div>
//                     <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-full">
//               No properties found.
//             </p>
//           )}
//         </div>
//       </div>
//       <PaginationMainComponent
//         paginate={paginate}
//         totalPages={totalPages}
//         currentPage={currentPage}
//         handlePageClick={handlePageClick}
//       />
//     </div>
//   );
// };

// export default PropertiesPage;

// "use client";

// import { useDebounce } from "@/lib/hooks/debounceHook";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
// import { getAllProperties } from "@/lib/redux/actions/propertyAction";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   FaSearch,
//   FaBed,
//   FaBath,
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaFilter,
//   FaTimes,
// } from "react-icons/fa";

// const PropertiesPage = () => {
//   const dispatch = useAppDispatch();
//   const { propertyData, paginate } = useAppSelector((state) => state.property);

//   const [service, setService] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState(0);
//   const [bedrooms, setBedrooms] = useState(0);
//   const [bathrooms, setBathrooms] = useState(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   // Debounced values
//   const debouncedPriceRange = useDebounce(priceRange, 500);
//   const debouncedBedRoom = useDebounce(bedrooms, 500);
//   const debouncedBathRoom = useDebounce(bathrooms, 500);
//   const debouncedSearch = useDebounce(searchQuery, 500);

//   // Pagination
//   const totalPages = Math.ceil(paginate?.total / paginate?.limit) || 0;
//   const itemsPerPage = 5;

//   const handlePageClick = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setService("");
//     setPropertyType("");
//     setSearchQuery("");
//     setPriceRange(0);
//     setBedrooms(0);
//     setBathrooms(0);
//   };

//   // Fetch properties
//   useEffect(() => {
//     dispatch(
//       getAllProperties({
//         page: currentPage,
//         limit: itemsPerPage,
//         service: service || undefined,
//         propertyType: propertyType || undefined,
//         q: debouncedSearch || undefined,
//         priceRange: debouncedPriceRange || undefined,
//         bedRooms: debouncedBedRoom || undefined,
//         bathRooms: debouncedBathRoom || undefined,
//       })
//     );
//   }, [
//     dispatch,
//     currentPage,
//     service,
//     propertyType,
//     debouncedSearch,
//     debouncedPriceRange,
//     debouncedBedRoom,
//     debouncedBathRoom,
//   ]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-extrabold text-center mb-6">
//             Find Your Dream Property
//           </h1>
//           <p className="text-xl text-center mb-8 max-w-3xl mx-auto text-blue-100">
//             Discover the perfect property that matches your lifestyle and
//             preferences
//           </p>

//           {/* Main Search Bar */}
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
//               <div className="relative flex-grow">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by title or location"
//                   className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
//               >
//                 <FaFilter />
//                 <span>Filters</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Filter Section */}
//         {showFilters && (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8 relative">
//             <button
//               onClick={() => setShowFilters(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <FaTimes size={20} />
//             </button>

//             <h2 className="text-xl font-bold mb-6 text-gray-800">
//               Filter Properties
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {/* Service Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Service Type
//                 </label>
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={service}
//                   onChange={(e) => setService(e.target.value)}
//                 >
//                   <option value="">All Services</option>
//                   <option value="BUY">BUY</option>
//                   <option value="RENT">RENT</option>
//                 </select>
//               </div>

//               {/* Property Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Property Type
//                 </label>
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={propertyType}
//                   onChange={(e) => setPropertyType(e.target.value)}
//                 >
//                   <option value="">All Property Types</option>
//                   <option value="COMMERCIAL">COMMERCIAL</option>
//                   <option value="RESIDENTIAL">RESIDENTIAL</option>
//                 </select>
//               </div>

//               {/* Price Range */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price Range: Rs. {priceRange.toLocaleString()}
//                 </label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="2000000"
//                   step="50000"
//                   value={priceRange}
//                   onChange={(e) => setPriceRange(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                 />
//               </div>

//               {/* Bedrooms & Bathrooms */}
//               <div className="flex gap-4">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Bedrooms
//                   </label>
//                   <div className="flex items-center">
//                     <button
//                       className="p-2 bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 transition-colors"
//                       onClick={() =>
//                         setBedrooms((prev) => Math.max(0, prev - 1))
//                       }
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-2 border-t border-b border-gray-300 bg-white text-center min-w-[40px]">
//                       {bedrooms}
//                     </span>
//                     <button
//                       className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
//                       onClick={() => setBedrooms((prev) => prev + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Bathrooms
//                   </label>
//                   <div className="flex items-center">
//                     <button
//                       className="p-2 bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 transition-colors"
//                       onClick={() =>
//                         setBathrooms((prev) => Math.max(0, prev - 1))
//                       }
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-2 border-t border-b border-gray-300 bg-white text-center min-w-[40px]">
//                       {bathrooms}
//                     </span>
//                     <button
//                       className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
//                       onClick={() => setBathrooms((prev) => prev + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={resetFilters}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mr-2"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Results Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               {paginate?.total || 0} Properties Found
//             </h2>
//             <p className="text-gray-600">
//               {service && <span className="mr-2">Service: {service}</span>}
//               {propertyType && (
//                 <span className="mr-2">Type: {propertyType}</span>
//               )}
//               {(bedrooms > 0 || bathrooms > 0) && (
//                 <span>
//                   {bedrooms > 0 && `${bedrooms} Bed${bedrooms > 1 ? "s" : ""}`}
//                   {bedrooms > 0 && bathrooms > 0 && ", "}
//                   {bathrooms > 0 &&
//                     `${bathrooms} Bath${bathrooms > 1 ? "s" : ""}`}
//                 </span>
//               )}
//             </p>
//           </div>

//           <div className="flex items-center mt-4 md:mt-0">
//             <span className="mr-2 text-gray-700">View:</span>
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`px-3 py-2 ${
//                   viewMode === "grid"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`px-3 py-2 ${
//                   viewMode === "list"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 List
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Property Listings */}
//         {propertyData?.length > 0 ? (
//           <div
//             className={
//               viewMode === "grid"
//                 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//                 : "space-y-6"
//             }
//           >
//             {propertyData.map((property) => (
//               <Link
//                 href={`/properties/${property?.slug}`}
//                 key={property._id}
//                 className="block"
//               >
//                 <div
//                   className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow ${
//                     viewMode === "list" ? "flex" : ""
//                   }`}
//                 >
//                   <div className={viewMode === "list" ? "w-1/3" : ""}>
//                     <img
//                       src={
//                         property?.imageGallery?.[0]?.secure_url ||
//                         "/placeholder.svg?height=300&width=400"
//                       }
//                       alt={property.title}
//                       className={`w-full object-cover ${
//                         viewMode === "list" ? "h-full" : "h-56"
//                       }`}
//                     />
//                   </div>
//                   <div className={`p-5 ${viewMode === "list" ? "w-2/3" : ""}`}>
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
//                         {property?.title}
//                       </h3>
//                       <span
//                         className={`text-xs font-bold px-2 py-1 rounded-full ${
//                           property.service === "BUY"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-blue-100 text-blue-800"
//                         }`}
//                       >
//                         {property.service}
//                       </span>
//                     </div>

//                     <div className="flex items-center mt-2 text-gray-600">
//                       <FaMapMarkerAlt className="mr-1" />
//                       <p className="text-sm line-clamp-1">
//                         {property?.locality}
//                       </p>
//                     </div>

//                     <div className="flex items-center mt-3 text-gray-800 font-medium">
//                       <FaMoneyBillWave className="mr-2 text-green-600" />
//                       <p>Rs. {property?.expectedPrice?.toLocaleString()}</p>
//                     </div>

//                     <div className="flex items-center mt-3 text-gray-700 gap-4">
//                       <div className="flex items-center">
//                         <FaBed className="mr-1" />
//                         <span>
//                           {property?.noOfBedrooms} Bed
//                           {property?.noOfBedrooms !== 1 ? "s" : ""}
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <FaBath className="mr-1" />
//                         <span>
//                           {property.noOfBathrooms} Bath
//                           {property.noOfBathrooms !== 1 ? "s" : ""}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex justify-between items-center">
//                       <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
//                         {property?.propertyType?.name}
//                       </span>
//                       <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                         View Details →
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <div className="text-gray-400 text-6xl mb-4">🏠</div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">
//               No properties found
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Try adjusting your filters to see more results
//             </p>
//             <button
//               onClick={resetFilters}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-10 flex justify-center">
//             <div className="flex space-x-1">
//               <button
//                 onClick={() => handlePageClick(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg ${
//                   currentPage === 1
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-white text-blue-600 hover:bg-blue-50 border border-gray-300"
//                 }`}
//               >
//                 Previous
//               </button>

//               {[...Array(totalPages)].map((_, i) => {
//                 const pageNumber = i + 1;
//                 // Show limited page numbers with ellipsis
//                 if (
//                   pageNumber === 1 ||
//                   pageNumber === totalPages ||
//                   (pageNumber >= currentPage - 1 &&
//                     pageNumber <= currentPage + 1)
//                 ) {
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => handlePageClick(pageNumber)}
//                       className={`px-4 py-2 rounded-lg ${
//                         currentPage === pageNumber
//                           ? "bg-blue-600 text-white"
//                           : "bg-white text-blue-600 hover:bg-blue-50 border border-gray-300"
//                       }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 } else if (
//                   (pageNumber === currentPage - 2 && currentPage > 3) ||
//                   (pageNumber === currentPage + 2 &&
//                     currentPage < totalPages - 2)
//                 ) {
//                   return (
//                     <span key={i} className="px-4 py-2 text-gray-500">
//                       ...
//                     </span>
//                   );
//                 }
//                 return null;
//               })}

//               <button
//                 onClick={() => handlePageClick(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg ${
//                   currentPage === totalPages
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-white text-blue-600 hover:bg-blue-50 border border-gray-300"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertiesPage;

"use client";

import { useDebounce } from "@/lib/hooks/debounceHook";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllProperties } from "@/lib/redux/actions/propertyAction";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  // Debounced values
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const debouncedBedRoom = useDebounce(bedrooms, 500);
  const debouncedBathRoom = useDebounce(bathrooms, 500);
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Pagination
  const totalPages = Math.ceil(paginate?.total / paginate?.limit) || 0;
  const itemsPerPage = 6;

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

  // Fetch properties
  useEffect(() => {
    dispatch(
      getAllProperties({
        page: currentPage,
        limit: itemsPerPage,
        service: service?.toUpperCase() as "RENT" | "BUY", // ✅ Fix here
        propertyType: propertyType?.toUpperCase() as
          | "RESIDENTIAL"
          | "COMMERCIAL",
        q: debouncedSearch || undefined,
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
    debouncedPriceRange,
    debouncedBedRoom,
    debouncedBathRoom,
  ]);

  const filterOptions = [
    { id: "all", label: "All Properties", count: paginate?.total || 0 },
    { id: "buy", label: "BUY", count: 0 },
    { id: "rent", label: "Rent", count: 0 },
    { id: "commercial", label: "Commercial", count: 0 },
    { id: "residential", label: "Residential", count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <FaTh size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list"
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <FaList size={16} />
                    </button>
                  </div>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
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
                className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                    if (filter.id === "buy") setService("BUY");
                    else if (filter.id === "rent") setService("RENT");
                    else if (filter.id === "commercial")
                      setPropertyType("COMMERCIAL");
                    else if (filter.id === "residential")
                      setPropertyType("RESIDENTIAL");
                    else if (filter.id === "all") {
                      setService("");
                      setPropertyType("");
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 text-xs opacity-75">
                    {/* ({filter.count}) */}
                  </span>
                </button>
              ))}
            </div>

            {/* Advanced Filters */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price: ${priceRange.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="50000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                      className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {bedrooms}
                    </span>
                    <button
                      onClick={() => setBedrooms(bedrooms + 1)}
                      className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
                      className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {bathrooms}
                    </span>
                    <button
                      onClick={() => setBathrooms(bathrooms + 1)}
                      className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
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

                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(property._id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        favorites.includes(property._id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <FaHeart size={16} />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-emerald-500 hover:text-white transition-colors">
                      <FaShare size={16} />
                    </button>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property?.expectedPrice?.toLocaleString()}
                    </div>
                  </div>

                  {/* Service Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.service === "BUY"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {property.service === "BUY" ? "For Sell " : "Rent"}
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {property?.title}
                    </h3>
                    <Link href={`/properties/${property?.slug}`}>
                      <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                        <FaEye size={18} />
                      </button>
                    </Link>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt
                      className="mr-2 text-emerald-600"
                      size={14}
                    />
                    <span className="text-sm line-clamp-1">
                      {property?.locality}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaBed className="mr-1 text-emerald-600" />
                      <span>{property?.noOfBedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-1 text-emerald-600" />
                      <span>{property.noOfBathrooms} Baths</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {property?.propertyType?.name}
                    </span>
                    <Link href={`/properties/${property?.slug}`}>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
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
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
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
                          ? "bg-emerald-600 text-white"
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
