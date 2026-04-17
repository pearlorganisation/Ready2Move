"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Building2,
  Building,
  Home,
  MapPin,
  Layers3,
  Landmark,
} from "lucide-react";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import { useDispatch } from "react-redux";
import {
  getAllProjects,
 
} from "@/lib/redux/actions/projectAction";
import {
  getAllProperties,
  
} from "@/lib/redux/actions/propertyAction";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import Link from "next/link";

export default function SearchBar() {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<"projects" | "properties">(
    "projects"
  );
  const [propertyCategories, setPropertyCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedQ, setDebouncedQ] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const { projectData, searchedProjectData } = useAppSelector(
    (state) => state.projects
  );
  const { propertyData, searchedPropertyData } = useAppSelector(
    (state) => state.property
  );

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      service: "ALL",
      projectType: "ALL",
      propertyType: "ALL",
      propertyCategory: "ALL",
      q: "",
    },
  });

  const service = watch("service");
  const projectType = watch("projectType");
  const propertyType = watch("propertyType");
  const propertyCategory = watch("propertyCategory");
  const q = watch("q");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQ(q);
    }, 500);
    return () => clearTimeout(handler);
  }, [q]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `api/v1/features?type=PROPERTY_TYPE`
        );
        const features = res?.data?.data?.[0]?.features || [];
        setPropertyCategories(features);
      } catch (error) {
        toast.error("Failed to load property categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!debouncedQ) return setSuggestions([]);

    const fetch = async () => {
      try {
       const url =
  activeTab === "projects"
    ? `/api/v1/projects?page=1&limit=10&q=${encodeURIComponent(debouncedQ)}`
    : `/api/v1/properties?page=1&limit=10&q=${encodeURIComponent(debouncedQ)}`;

        const { data } = await axiosInstance.get(url);
        setSuggestions(data?.data || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    fetch();
  }, [debouncedQ, activeTab]);

  useEffect(() => {
    const filters: any = {
      page: currentPage,
      limit: 10,
      ...(debouncedQ && { q: encodeURIComponent(debouncedQ) }),
      ...(service !== "ALL" && { service }),
    };

    if (activeTab === "projects") {
      if (projectType !== "ALL") filters.projectType = projectType;
      dispatch(getAllProjects(filters));
    } else {
      if (propertyType !== "ALL") filters.propertyType = propertyType;
      if (propertyCategory !== "ALL")
        filters.propertyCategory = propertyCategory;
      dispatch(getAllProperties(filters));
    }
  }, [
    dispatch,
    activeTab,
    currentPage,
    service,
    projectType,
    propertyType,
    propertyCategory,
    debouncedQ,
  ]);

  interface Search {
    service: string;
    projectType: string;
    propertyType: string;
    propertyCategory?: string;
    q?: string;
    tab?: string;
  }
  const onSubmit: SubmitHandler<Search> = (data) => {
    const payload = {
      tab: activeTab,
      ...data,
    };

    if (activeTab === "projects") delete payload.propertyCategory;
    console.log("Search data:", payload);
  };

 const searchRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setSuggestions([]);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-r from-teal-50 via-[#1E3C 94] to-teal-50 rounded-sm ">
      <div className="w-full max-w-6xl">
        {/* Tabs */}
        <div className="flex border border-gray-200 bg-white rounded-t-lg overflow-hidden #2345">
          {["projects", "properties"].map((tab) => (
            <motion.button
              key={tab}
              className={`flex-1 py-3 px-6 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#1E3D9C] text-white hover:bg-[#182F7A]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab(tab as "projects" | "properties");
                reset();
                setSuggestions([]);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === "projects" ? (
                <>
                  <Layers3 className="h-5 w-5" />
                  Projects
                </>
              ) : (
                <>
                  <Building className="h-5 w-5" />
                  Properties
                </>
              )}
            </motion.button>
          ))}
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-b-lg p-8 shadow-md border border-t-0 border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service */}
            <SelectField
              control={control}
              name="service"
              icon={<Landmark />}
              label="Service"
              options={["ALL", "BUY", "RENT"]}
            />

            {/* Project Type (ONLY for Projects tab) */}
            {activeTab === "projects" && (
              <SelectField
                control={control}
                name="projectType"
                icon={<Building2 />}
                label="Project Type"
                options={["ALL", "RESIDENTIAL", "COMMERCIAL"]}
              />
            )}

            {/* Property Type (ONLY for Properties tab) */}
            {activeTab === "properties" && (
              <SelectField
                control={control}
                name="propertyType"
                icon={<Building2 />}
                label="Property Type"
                options={["ALL", "RESIDENTIAL", "COMMERCIAL"]}
              />
            )}

           

            {/* Search Field */}
            <div
             ref={searchRef}
              className={`space-y-2 relative w-full ${
                activeTab === "projects" ? "lg:col-span-2" : "lg:col-span-2"
              } md:col-span-2`}
            >
              <label
                htmlFor="q"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                <MapPin className="h-4 w-4" /> Search
              </label>
              <Controller
                name="q"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      id="q"
                      type="text"
                      placeholder="Search by name, locality, city or state"
                      className="w-full pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    />
                    
                    {/* Suggestion List logic: only shows if q has content */}
                    {q && q.trim().length > 0 && (
                      <div className="absolute left-0 right-0 mt-1 bg-white shadow-xl max-h-60 overflow-y-auto z-50 rounded-md border border-gray-200">
                     {activeTab === "properties" && Array.isArray(propertyData) && (
  <div className="bg-white shadow-md mt-4 rounded-lg p-4">

    <div className="grid grid-cols-1">
      {propertyData.length > 0 ? (
        propertyData.map((item, index) => (
          <Link key={index} href={`/properties/${item.slug}`} className="block w-full">
            <div className="overflow-hidden transition cursor-pointer border-b border-gray-100 py-2">

              <div className="group flex justify-between items-start w-full">

                {/* LEFT SIDE */}
                <div className="flex flex-col items-start text-left min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-500 leading-tight truncate">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-500 group-hover:text-blue-500 mt-1 truncate">
                    {item.city}, {item.state}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-right shrink-0 ml-4">
                  <p className="text-sm text-teal-600 font-medium whitespace-nowrap">
                   ₹ {item?.expectedPrice}
                  </p>
                </div>

              </div>

            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 py-3">
          No properties found
        </p>
      )}
    </div>

  </div>
)}
                     
                     
                      {activeTab === "projects" && Array.isArray(projectData) && projectData.length > 0 && (
  <div className="bg-white shadow-md mt-4 rounded-lg p-4">
  

   <div className="grid grid-cols-1">
  {projectData.map((item, index) => (
    <Link key={index} href={`/projects/${item.slug}`} className="block w-full">
      <div className="overflow-hidden transition cursor-pointer border-b border-gray-100 py-2">
        
        {/* Container: Flex row with space between text and price */}
        <div className="group flex justify-between items-start w-full">
          
          {/* Left Side: Text block forced to left alignment */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-sm font-medium group-hover:text-blue-500 text-gray-800 leading-tight">
              {item.title}
            </h4>

            <p className="text-xs group-hover:text-blue-500 text-gray-500 mt-1">
              {item.city}, {item.state}
            </p>
          </div>

          {/* Right Side: Price */}
          <div className="text-right shrink-0 ml-4">
            <p className="text-sm text-teal-600 font-medium">
              ₹ {item?.priceRange?.min} - {item?.priceRange?.max}
            </p>
          </div>
          
        </div>

      </div>
    </Link>
  ))}
</div>
  </div>
)}
{activeTab === "projects" &&
 Array.isArray(projectData) &&
 projectData.length === 0 && (
  <p className="text-center mt-4 text-gray-500">
    No  projects found
  </p>
)}

                   </div>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </motion.form>
       
      </div>
    </div>
  );
}

const SelectField = ({
  control,
  name,
  label,
  icon,
  options,
  loading,
}: {
  control: any;
  name: string;
  label: string;
  icon: React.ReactNode;
  options: (string | { value: string; label: string })[];
  loading?: boolean;
}) => (
  <div className="space-y-2">
    <label
      htmlFor={name}
      className="text-sm font-medium text-gray-700 flex items-center gap-1"
    >
      {icon} {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          {...field}
          id={name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500"
          disabled={loading}
        >
          {options.map((option, i) =>
            typeof option === "string" ? (
              <option key={i} value={option}>
                {option === "ALL" ? "All" : option}
              </option>
            ) : (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
      )}
    />
    {loading && <p className="text-xs text-gray-500">Loading...</p>}
  </div>
);


// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { motion, AnimatePresence } from "framer-motion";
// import { Building2, Building, Home, MapPin, Landmark, Search } from "lucide-react";
// import { axiosInstance } from "@/lib/constants/axiosInstance";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
// import { getAllSearchProjects } from "@/lib/redux/actions/projectAction";
// import { getAllSearchedProperties } from "@/lib/redux/actions/propertyAction";
// import { toast } from "react-toastify";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function SearchBar() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<"projects" | "properties">("projects");
//   const [propertyCategories, setPropertyCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
  
//   // Get data from Redux
//   const { searchedProjectData } = useAppSelector((state) => state.projects);
//   const { searchedPropertyData } = useAppSelector((state) => state.property);

//   const { control, handleSubmit, reset, watch, setValue } = useForm({
//     defaultValues: {
//       service: "ALL",
//       projectType: "ALL",
//       propertyType: "ALL",
//       propertyCategory: "ALL",
//       q: "",
//     },
//   });

//   const query = watch("q");
//   const service = watch("service");

//   // Fetch Categories once
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get(`api/v1/features?type=PROPERTY_TYPE`);
//         setPropertyCategories(res?.data?.data?.[0]?.features || []);
//       } catch (error) {
//         console.error("Failed to load property categories.");
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Debounced Search Trigger
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (query && query.length > 1) {
//         const filters: any = {
//           page: 1,
//           limit: 10,
//           q: query,
//           ...(service !== "ALL" && { service: service === "BUY" ? "SELL" : "RENT" }),
//         };

//         if (activeTab === "projects") {
//           dispatch(getAllSearchProjects(filters));
//         } else {
//           dispatch(getAllSearchedProperties(filters));
//         }
//         setShowSuggestions(true);
//       } else {
//         setShowSuggestions(false);
//       }
//     }, 400);

//     return () => clearTimeout(delayDebounce);
//   }, [query, activeTab, service, dispatch]);

//   const onSubmit: SubmitHandler<any> = (data) => {
//     // Navigate to a dedicated search results page with query params
//     const params = new URLSearchParams();
//     params.set("q", data.q);
//     if (data.service !== "ALL") params.set("service", data.service);
    
//     router.push(`/${activeTab}?${params.toString()}`);
//   };

//   const currentSuggestions = activeTab === "projects" ? searchedProjectData : searchedPropertyData;

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4">
//       {/* Tab Switcher */}
//       <div className="flex bg-gray-100 p-1 rounded-t-xl w-fit">
//         {["projects", "properties"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveTab(tab as any);
//               reset();
//               setShowSuggestions(false);
//             }}
//             className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
//               activeTab === tab ? "bg-[#1E3D9C] text-white shadow-md" : "text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             {tab.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* Main Search Form */}
//       <form 
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-b-xl rounded-tr-xl shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4 relative"
//       >
//         {/* Service Select */}
//         <div className="md:col-span-2">
//           <label className="text-xs font-bold text-gray-500 uppercase ml-1">Service</label>
//           <Controller
//             name="service"
//             control={control}
//             render={({ field }) => (
//               <select {...field} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
//                 <option value="ALL">All Services</option>
//                 <option value="BUY">Buy</option>
//                 <option value="RENT">Rent</option>
//               </select>
//             )}
//           />
//         </div>

//         {/* Dynamic Type Select */}
//         <div className="md:col-span-3">
//           <label className="text-xs font-bold text-gray-500 uppercase ml-1">
//             {activeTab === "projects" ? "Project Type" : "Property Type"}
//           </label>
//           <Controller
//             name={activeTab === "projects" ? "projectType" : "propertyType"}
//             control={control}
//             render={({ field }) => (
//               <select {...field} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
//                 <option value="ALL">All Types</option>
//                 <option value="RESIDENTIAL">Residential</option>
//                 <option value="COMMERCIAL">Commercial</option>
//               </select>
//             )}
//           />
//         </div>

//         {/* Search Input with Suggestions */}
//         <div className="md:col-span-5 relative">
//           <label className="text-xs font-bold text-gray-500 uppercase ml-1">Location / Name</label>
//           <div className="relative">
//             <MapPin className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
//             <Controller
//               name="q"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   autoComplete="off"
//                   placeholder="Enter Locality, City or Project Name"
//                   className="w-full mt-1 p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               )}
//             />
//           </div>

//           {/* Suggestion Dropdown */}
//           <AnimatePresence>
//             {showSuggestions && currentSuggestions?.length > 0 && (
//               <motion.ul
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto"
//               >
//                 {currentSuggestions.map((item: any) => (
//                   <li key={item._id} className="border-b last:border-0">
//                     <Link
//                       href={`/${activeTab}/${item.slug}`}
//                       className="flex items-center gap-4 p-3 hover:bg-blue-50 transition-colors"
//                       onClick={() => setShowSuggestions(false)}
//                     >
//                       <img
//                         src={item.imageGallery?.[0]?.secure_url || "/placeholder.png"}
//                         className="w-12 h-12 rounded object-cover"
//                         alt=""
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
//                         <p className="text-xs text-gray-500 flex items-center gap-1">
//                           <MapPin className="h-3 w-3" /> {item.locality}, {item.city}
//                         </p>
//                       </div>
//                     </Link>
//                   </li>
//                 ))}
//               </motion.ul>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Submit Button */}
//         <div className="md:col-span-2 flex items-end">
//           <button
//             type="submit"
//             className="w-full bg-[#1E3D9C] hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2"
//           >
//             <Search className="h-5 w-5" />
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }