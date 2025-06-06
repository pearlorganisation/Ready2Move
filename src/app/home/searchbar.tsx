"use client";

import { useEffect, useState } from "react";
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
  getAllSearchProjects,
} from "@/lib/redux/actions/projectAction";
import {
  getAllProperties,
  getAllSearchedProperties,
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
            ? `/api/v1/projects?page=1&limit=10&q=${debouncedQ}`
            : `/api/v1/properties?page=1&limit=10&q=${debouncedQ}`;

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
      ...(debouncedQ && { q: debouncedQ }),
      ...(service !== "ALL" && { service }),
    };

    if (activeTab === "projects") {
      if (projectType !== "ALL") filters.projectType = projectType;
      dispatch(getAllSearchProjects(filters));
    } else {
      if (propertyType !== "ALL") filters.propertyType = propertyType;
      if (propertyCategory !== "ALL")
        filters.propertyCategory = propertyCategory;
      dispatch(getAllSearchedProperties(filters));
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

  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-r from-teal-50 to-bg-[#1E3C 94] rounded-sm ">
      <div className="w-full max-w-6xl">
        {/* Tabs */}
        <div className="flex border border-gray-200 bg-white rounded-t-lg overflow-hidden #2345">
          {["projects", "properties"].map((tab) => (
            <motion.button
              key={tab}
              className={`flex-1 py-3 px-6 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#3298ec] text-white"
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

            {/* Property Category (ONLY for Properties tab) */}
            {activeTab === "properties" && (
              <SelectField
                control={control}
                name="propertyCategory"
                icon={<Home />}
                label="Property Category"
                loading={loading}
                options={[
                  "ALL",
                  ...propertyCategories.map((cat) => ({
                    value: cat._id,
                    label: cat.name,
                  })),
                ]}
              />
            )}

            {/* Search Field */}
            <div
              className={`space-y-2 relative w-full ${
                activeTab === "projects" ? "lg:col-span-2" : "lg:col-span-1"
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    />
                    {activeTab === "projects" && (
                      <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-20 rounded-md">
                        {Array.isArray(searchedProjectData) &&
                        searchedProjectData.length > 0 ? (
                          searchedProjectData.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-teal-100 cursor-pointer"
                              onClick={() => {
                                field.onChange(item.title);
                                setSuggestions([]);
                              }}
                            >
                              <Link href={`/projects/${item?.slug}`}>
                                <div>
                                  <img
                                    src={item?.imageGallery?.[0]?.secure_url}
                                    alt={item.title}
                                    className="w-12 h-12 object-cover rounded-md border"
                                  />
                                  <span className="text-sm text-gray-800">
                                    {item.title}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))
                        ) : Array.isArray(searchedProjectData) &&
                          searchedProjectData.length === 0 ? (
                          <li className="px-4 py-2 text-sm text-gray-500">
                            No results found
                          </li>
                        ) : null}
                      </ul>
                    )}

                    {activeTab === "properties" && (
                      <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-20 rounded-md">
                        {Array.isArray(searchedPropertyData) &&
                        searchedPropertyData.length > 0 ? (
                          searchedPropertyData.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-teal-100 cursor-pointer"
                              onClick={() => {
                                field.onChange(item.title);
                                setSuggestions([]);
                              }}
                            >
                              <Link href={`/properties/${item?.slug}`}>
                                <div>
                                  <img
                                    src={item?.imageGallery?.[0]?.secure_url}
                                    alt={item.title}
                                    className="w-12 h-12 object-cover rounded-md border"
                                  />
                                  <span className="text-sm text-gray-800">
                                    {item.title}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))
                        ) : Array.isArray(searchedPropertyData) &&
                          searchedPropertyData.length === 0 ? (
                          <li className="px-4 py-2 text-sm text-gray-500">
                            No results found
                          </li>
                        ) : null}
                      </ul>
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
