"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllProjects } from "@/lib/redux/actions/projectAction";
import { Suspense } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PaginationMainComponent from "@/components/PaginationMain";
import Link from "next/link";
import FilterRangeSliders from "@/components/FilterProperty";
import { useState, useRef, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import { ChevronDown, X } from "lucide-react";
import Pagination from "@/components/Pagination";
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

const ProjectsPageContent = () => {
  const dispatch = useAppDispatch();
  const { projectData, paginate } = useAppSelector((state) => state.projects);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(paginate?.total / paginate?.limit);

  const [isPriceChanged, setIsPriceChanged] = useState(false);
  const [isAreaChanged, setIsAreaChanged] = useState(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 1000000000,
  ]);
  const [minPriceInput, setMinPriceInput] = useState<string>("0");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("100,00,00,000");

  const [areaRange, setAreaRange] = useState<[number, number]>([0, 100000]);
  const [minAreaInput, setMinAreaInput] = useState<string>("0");
  const [maxAreaInput, setMaxAreaInput] = useState<string>("100000");

  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const priceSliderRef = useRef<HTMLDivElement>(null);
  const priceMinThumbRef = useRef<HTMLDivElement>(null);
  const priceMaxThumbRef = useRef<HTMLDivElement>(null);

  const areaSliderRef = useRef<HTMLDivElement>(null);
  const areaMinThumbRef = useRef<HTMLDivElement>(null);
  const areaMaxThumbRef = useRef<HTMLDivElement>(null);

  const [debouncedPriceRange, setDebouncedPriceRange] =
    useState<[number, number]>(priceRange);
  const [debouncedAreaRange, setDebouncedAreaRange] =
    useState<[number, number]>(areaRange);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);

    return () => clearTimeout(handler);
  }, [priceRange]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAreaRange(areaRange);
    }, 500);

    return () => clearTimeout(handler);
  }, [areaRange]);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-IN");
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setIsPriceChanged(true);
    const minPrice = 0;
    const maxPrice = 1000000000;

    const boundedMin = Math.max(minPrice, Math.min(newRange[0], maxPrice));
    const boundedMax = Math.min(maxPrice, Math.max(newRange[1], minPrice));

    setPriceRange([boundedMin, boundedMax]);
    setMinPriceInput(formatPrice(boundedMin));
    setMaxPriceInput(formatPrice(boundedMax));

    const priceFilterIndex = appliedFilters.findIndex((filter) =>
      filter.includes("₹")
    );
    const newFilters = [...appliedFilters];
    const newPriceFilter = `₹ ${formatPrice(boundedMin)} - ${formatPrice(
      boundedMax
    )}`;

    if (priceFilterIndex >= 0) {
      newFilters[priceFilterIndex] = newPriceFilter;
    } else {
      newFilters.push(newPriceFilter);
    }

    setAppliedFilters(newFilters);
  };


const locality = useSearchParams().get("locality");
  const parseInputValue = (value: string): number => {
    if (value.includes("Lacs")) {
      const num = Number.parseFloat(value.replace(" Lacs", ""));
      return num * 100000;
    }
    return Number.parseInt(value.replace(/,/g, ""));
  };

  const handleMinPriceInputChange = (value: string) => {
    setMinPriceInput(value);
    try {
      const numValue = parseInputValue(value);
      if (!isNaN(numValue) && numValue < priceRange[1]) {
        handlePriceRangeChange([numValue, priceRange[1]]);
      }
    } catch (e) {}
  };

  const handleMaxPriceInputChange = (value: string) => {
    setMaxPriceInput(value);
    try {
      const numValue = parseInputValue(value);
      if (!isNaN(numValue) && numValue > priceRange[0]) {
        handlePriceRangeChange([priceRange[0], numValue]);
      }
    } catch (e) {}
  };

  const handleAreaRangeChange = (newRange: [number, number]) => {
    setIsAreaChanged(true);
    const minArea = 0;
    const maxArea = 100000;

    const boundedMin = Math.max(minArea, Math.min(newRange[0], maxArea));
    const boundedMax = Math.min(maxArea, Math.max(newRange[1], minArea));

    setAreaRange([boundedMin, boundedMax]);
    setMinAreaInput(boundedMin.toString());
    setMaxAreaInput(boundedMax.toString());

    const areaFilterIndex = appliedFilters.findIndex((filter) =>
      filter.includes("sqft")
    );
    const newFilters = [...appliedFilters];
    const newAreaFilter = `${boundedMin} sqft - ${boundedMax} sqft`;

    if (areaFilterIndex >= 0) {
      newFilters[areaFilterIndex] = newAreaFilter;
    } else {
      newFilters.push(newAreaFilter);
    }

    setAppliedFilters(newFilters);
  };

  const handleMinAreaInputChange = (value: string) => {
    setMinAreaInput(value);
    const numValue = Number.parseInt(value);
    if (!isNaN(numValue) && numValue < areaRange[1]) {
      handleAreaRangeChange([numValue, areaRange[1]]);
    }
  };

  const handleMaxAreaInputChange = (value: string) => {
    setMaxAreaInput(value);
    const numValue = Number.parseInt(value);
    if (!isNaN(numValue) && numValue > areaRange[0]) {
      handleAreaRangeChange([areaRange[0], numValue]);
    }
  };

  const removeFilter = (filter: string) => {
    setAppliedFilters(appliedFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setAppliedFilters([]);
  };

  const clearBudget = () => {
    const min = 0;
    const max = 1000000000;
    setPriceRange([min, max]);
    setMinPriceInput(formatPrice(min));
    setMaxPriceInput(formatPrice(max));
    setAppliedFilters(appliedFilters.filter((filter) => !filter.includes("₹")));
  };

  useEffect(() => {
    if (
      !priceSliderRef.current ||
      !priceMinThumbRef.current ||
      !priceMaxThumbRef.current
    )
      return;

    const slider = priceSliderRef.current;
    const minThumb = priceMinThumbRef.current;
    const maxThumb = priceMaxThumbRef.current;

    const minPrice = 0;
    const maxPrice = 1000000000;

    const updateSliderPosition = () => {
      const range = maxPrice - minPrice;
      const minPos = ((priceRange[0] - minPrice) / range) * 100;
      const maxPos = ((priceRange[1] - minPrice) / range) * 100;

      minThumb.style.left = `${minPos}%`;
      maxThumb.style.left = `${maxPos}%`;

      slider.style.setProperty("--min-pos", `${minPos}%`);
      slider.style.setProperty("--max-pos", `${maxPos}%`);
    };

    updateSliderPosition();

    const handleMinThumbDrag = (e: MouseEvent) => {
      const sliderRect = slider.getBoundingClientRect();
      const newPos = (e.clientX - sliderRect.left) / sliderRect.width;
      const newValue = Math.round(minPrice + newPos * (maxPrice - minPrice));
      if (newValue < priceRange[1]) {
        handlePriceRangeChange([newValue, priceRange[1]]);
      }
    };

    const handleMaxThumbDrag = (e: MouseEvent) => {
      const sliderRect = slider.getBoundingClientRect();
      const newPos = (e.clientX - sliderRect.left) / sliderRect.width;
      const newValue = Math.round(minPrice + newPos * (maxPrice - minPrice));
      if (newValue > priceRange[0]) {
        handlePriceRangeChange([priceRange[0], newValue]);
      }
    };

    const handleMinThumbMouseDown = () => {
      document.addEventListener("mousemove", handleMinThumbDrag);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMinThumbDrag);
        },
        { once: true }
      );
    };

    const handleMaxThumbMouseDown = () => {
      document.addEventListener("mousemove", handleMaxThumbDrag);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMaxThumbDrag);
        },
        { once: true }
      );
    };

    minThumb.addEventListener("mousedown", handleMinThumbMouseDown);
    maxThumb.addEventListener("mousedown", handleMaxThumbMouseDown);

    return () => {
      minThumb.removeEventListener("mousedown", handleMinThumbMouseDown);
      maxThumb.removeEventListener("mousedown", handleMaxThumbMouseDown);
    };
  }, [priceRange]);

  useEffect(() => {
    if (
      !areaSliderRef.current ||
      !areaMinThumbRef.current ||
      !areaMaxThumbRef.current
    )
      return;

    const slider = areaSliderRef.current;
    const minThumb = areaMinThumbRef.current;
    const maxThumb = areaMaxThumbRef.current;

    const minArea = 0;
    const maxArea = 100000;

    const updateSliderPosition = () => {
      const range = maxArea - minArea;
      const minPos = ((areaRange[0] - minArea) / range) * 100;
      const maxPos = ((areaRange[1] - minArea) / range) * 100;

      minThumb.style.left = `${minPos}%`;
      maxThumb.style.left = `${maxPos}%`;

      slider.style.setProperty("--min-pos", `${minPos}%`);
      slider.style.setProperty("--max-pos", `${maxPos}%`);
    };

    updateSliderPosition();

    const handleMinThumbDrag = (e: MouseEvent) => {
      const sliderRect = slider.getBoundingClientRect();
      const newPos = (e.clientX - sliderRect.left) / sliderRect.width;
      const newValue = Math.round(minArea + newPos * (maxArea - minArea));
      if (newValue < areaRange[1]) {
        handleAreaRangeChange([newValue, areaRange[1]]);
      }
    };

    const handleMaxThumbDrag = (e: MouseEvent) => {
      const sliderRect = slider.getBoundingClientRect();
      const newPos = (e.clientX - sliderRect.left) / sliderRect.width;
      const newValue = Math.round(minArea + newPos * (maxArea - minArea));
      if (newValue > areaRange[0]) {
        handleAreaRangeChange([areaRange[0], newValue]);
      }
    };

    const handleMinThumbMouseDown = () => {
      document.addEventListener("mousemove", handleMinThumbDrag);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMinThumbDrag);
        },
        { once: true }
      );
    };

    const handleMaxThumbMouseDown = () => {
      document.addEventListener("mousemove", handleMaxThumbDrag);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMaxThumbDrag);
        },
        { once: true }
      );
    };

    minThumb.addEventListener("mousedown", handleMinThumbMouseDown);
    maxThumb.addEventListener("mousedown", handleMaxThumbMouseDown);

    return () => {
      minThumb.removeEventListener("mousedown", handleMinThumbMouseDown);
      maxThumb.removeEventListener("mousedown", handleMaxThumbMouseDown);
    };
  }, [areaRange]);

  const { register, watch } = useForm({
    defaultValues: {
      service: "",
      projectType: "",
      q: "",
    },
  });

  const service = watch("service");
  const projectType = watch("projectType");
  const q = watch("q");

  const [debouncedQ, setDebouncedQ] = useState(q);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQ(q);
    }, 500);

    return () => clearTimeout(handler);
  }, [q]);

  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

 useEffect(() => {
  const filters: any = {
    page: currentPage,
    limit: 10,
    q: debouncedQ,
    service,
    projectType,
  };

  if (locality) {
    filters.locality = locality;
  }

  if (isPriceChanged) {
    filters.priceRange = `${debouncedPriceRange[0]},${debouncedPriceRange[1]}`;
  }

  if (isAreaChanged) {
    filters.areaRange = `${debouncedAreaRange[0]},${debouncedAreaRange[1]}`;
  }
  console.log("Filters being sent:", filters);

  dispatch(getAllProjects(filters));

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [
  dispatch,
  currentPage,
  service,
  projectType,
  debouncedQ,
  debouncedPriceRange,
  debouncedAreaRange,
  isPriceChanged,
  isAreaChanged,
  locality, // ✅ VERY IMPORTANT
]);

  console.log(projectData, "projectData");

  return (
    <>
      <div className="p-6 rounded-lg flex flex-col md:flex-row gap-6 mb-8 items-center">
        <select
          {...register("service")}
          className="border p-3 rounded-lg w-full md:w-1/4 bg-gray-50 shadow-sm focus:ring focus:ring-blue-800"
        >
          <option value="">All Services</option>
          <option value="SELL">SELL</option>
          <option value="RENT">RENT</option>
        </select>

        <select
          {...register("projectType")}
          className="border p-3 rounded-lg w-full md:w-1/4 bg-gray-50 shadow-sm focus:ring focus:ring-blue-800"
        >
          <option value="">All Project Types</option>
          <option value="COMMERCIAL">COMMERCIAL</option>
          <option value="RESIDENTIAL">RESIDENTIAL</option>
        </select>

        <div className="relative w-full md:w-1/3 flex justify-center items-center">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            {...register("q")}
            type="text"
            placeholder="Search by title or location"
            className="border p-3 rounded-lg w-full pl-12 shadow-sm focus:ring focus:ring-blue-800"
          />
        </div>
      </div>

      {/* <div className="grid md:grid-cols-[35%_auto] gap-6  ">
        {/* Sidebar Filters */}
        {/* <div className="max-w-md mx-auto  rounded-2xl p-6"> */} 
          {/* Breadcrumb */}

          {/* <div className=" h-screen w-full max-w-sm mx-auto  "> */}
            {/* Header */}

            {/* <div className="overflow-y-auto h-full pb-20 sticky">
              {/* Applied Filters Section */}
              {/* <div className="p-4 border-b border-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                    Applied Filters
                  </h2>
                  <button
                    onClick={clearBudget}
                    className="text-xs text-blue-800 font-medium hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>
              </div> */}

              {/* Budget Filter */}
              {/* <div className="p-4 border-b border-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                    Budget
                  </h3>
                  <button
                    onClick={clearBudget}
                    className="text-xs text-blue-800 font-medium hover:text-blue-800 flex items-center gap-1"
                  >
                    Clear
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between mb-4">
                    <div className="bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs font-medium">
                      {minPriceInput}
                    </div>
                    <div className="bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs font-medium">
                      {maxPriceInput}
                    </div>
                  </div>

                  {/* Price Slider */}
                  {/* <div
                    ref={priceSliderRef}
                    className="relative h-2 bg-gray-200 rounded-full my-8"
                    style={
                      {
                        "--min-pos": "0%",
                        "--max-pos": "100%",
                        background:
                          "linear-gradient(to right, #e5e7eb 0%, #3b82f6 var(--min-pos), #3b82f6 var(--max-pos), #e5e7eb var(--max-pos))",
                      } as React.CSSProperties
                    }
                  >
                    <div
                      ref={priceMinThumbRef}
                      className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-800 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                    />
                    <div
                      ref={priceMaxThumbRef}
                      className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-800 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </div> */}

                  {/* Price Inputs */}
                  {/* <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 font-medium">
                        from
                      </label>
                      <input
                        type="text"
                        value={minPriceInput}
                        onChange={(e) =>
                          handleMinPriceInputChange(e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      />
                    </div>
                    <div className="text-gray-400 text-sm mt-5">to</div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 font-medium">
                        to
                      </label>
                      <input
                        type="text"
                        value={maxPriceInput}
                        onChange={(e) =>
                          handleMaxPriceInputChange(e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      />
                    </div>
                  </div> */}
                {/* </div>
              </div> */} 

              {/* Area Filter */}
              {/* <div className="p-4 border-b border-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                    Area
                  </h3>
                  <button className="text-xs text-blue-800 font-medium hover:bg-[#182F7A] flex items-center gap-1">
                    Clear
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between mb-4">
                    <div className="bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs font-medium">
                      {minAreaInput} sq.ft
                    </div>
                    <div className="bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs font-medium">
                      {maxAreaInput} sq.ft
                    </div>
                  </div>

                  {/* Area Slider */}
                  {/* <div
                    ref={areaSliderRef}
                    className="relative h-2 bg-gray-200 rounded-full my-8"
                  >
                    <div
                      ref={areaMinThumbRef}
                      className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-800 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                    />
                    <div
                      ref={areaMaxThumbRef}
                      className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-800 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </div> */}

                  {/* Area Inputs */}
                  {/* <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 font-medium">
                        from
                      </label>
                      <input
                        type="text"
                        value={minAreaInput}
                        onChange={(e) =>
                          handleMinAreaInputChange(e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      />
                    </div>
                    <div className="text-gray-400 text-sm mt-5">to</div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1 font-medium">
                        to
                      </label>
                      <input
                        type="text"
                        value={maxAreaInput}
                        onChange={(e) =>
                          handleMaxAreaInputChange(e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          {/* </div>
        </div>  */}

        <div className="p-10 grid grid-cols-1 md:grid-cols-2  gap-10">
          {Array.isArray(projectData) && projectData?.length > 0 ? (
            projectData.map((project: any) => {
              console.log(project, "my project single");
              return (
                <div key={project._id}>
                  <PropertyCard project={project} />
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No projects found.
            </div>
          )}
        </div>
      {/* </div> */}
      <div className="w-full flex justify-center">
        {/* <Pagination
          total={paginate?.total}
          currentPage={currentPage}
          limit={paginate?.limit}
          onPageChange={handlePageClick}
        /> */}

        {totalPages >= 1 && (
          <div className="mt-12 flex mb-6 justify-center">
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
      </div>
    </>
  );
};


// This is now your main entry point
const Page = () => {
  return (
    // Suspense is required because you use useSearchParams() inside ProjectsPageContent
    <Suspense fallback={<div className="p-10 text-center">Loading Projects...</div>}>
      <ProjectsPageContent />
    </Suspense>
  );
};

export default Page;
