"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { getAllProjects } from "@/lib/redux/actions/projectAction";
import { getAllProperties } from "@/lib/redux/actions/propertyAction";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";

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

  const { projectData } = useAppSelector((state) => state.projects);
  const { propertyData } = useAppSelector((state) => state.property);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      service: "ALL",
      projectType: "ALL",
      property: "ALL",
      propertyCategory: "ALL",
      q: "",
    },
  });

  const service = watch("service");
  const projectType = watch("projectType");
  const property = watch("property");
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
      dispatch(getAllProjects(filters));
    } else {
      if (property !== "ALL") filters.property = property;
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
    property,
    propertyCategory,
    debouncedQ,
  ]);

  const onSubmit = (data:any) => {
    const payload = {
      tab: activeTab,
      ...data,
    };

    if (activeTab === "projects") delete payload.propertyCategory;
    console.log("Search data:", payload);
  };

  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-r from-teal-50 to-blue-100">
      <div className="w-full max-w-6xl">
        {/* Tabs */}
        <div className="flex border border-gray-200 bg-white rounded-t-lg overflow-hidden">
          {["projects", "properties"].map((tab) => (
            <motion.button
              key={tab}
              className={`flex-1 py-3 px-6 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-teal-100 text-teal-700"
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
              options={["ALL", "SELL", "RENT"]}
            />

            {/* Project Type */}
            <SelectField
              control={control}
              name="projectType"
              icon={<Building2 />}
              label="Project Type"
              options={["ALL", "RESIDENTIAL", "COMMERCIAL"]}
            />

            {/* Property Type (ONLY for Properties tab) */}
            {activeTab === "properties" && (
              <SelectField
                control={control}
                name="property"
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
            <div className="space-y-2 relative">
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
                      placeholder="Enter query"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    />
                    {activeTab === "projects" && suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-20 rounded-md">
                        { Array.isArray(projectData)&&projectData?.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-teal-100 cursor-pointer"
                            onClick={() => {
                              field.onChange(item.title);
                              setSuggestions([]);
                            }}
                          >
                            <img
                              src={item?.imageGallery?.[0]?.secure_url}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded-md border"
                            />
                            <span className="text-sm text-gray-800">
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === "properties" && suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-20 rounded-md">
                        {propertyData.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-teal-100 cursor-pointer"
                            onClick={() => {
                              field.onChange(item.title);
                              setSuggestions([]);
                            }}
                          >
                            <img
                              src={item?.imageGallery?.[0]?.secure_url}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded-md border"
                            />
                            <span className="text-sm text-gray-800">
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded-md"
          >
            Search
          </button>
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
