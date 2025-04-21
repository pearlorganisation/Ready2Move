"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";

export default function FilterRangeSliders() {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 900000000,
  ]);
  const [minPriceInput, setMinPriceInput] = useState<string>("0");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("90,00,00,000");

  const [areaRange, setAreaRange] = useState<[number, number]>([0, 100000]);
  const [minAreaInput, setMinAreaInput] = useState<string>("0");
  const [maxAreaInput, setMaxAreaInput] = useState<string>("100000");

  const [appliedFilters, setAppliedFilters] = useState<string[]>([
    "C Scheme",
    "₹ 0 - 90,00,00,000",
  ]);

  const priceSliderRef = useRef<HTMLDivElement>(null);
  const priceMinThumbRef = useRef<HTMLDivElement>(null);
  const priceMaxThumbRef = useRef<HTMLDivElement>(null);

  const areaSliderRef = useRef<HTMLDivElement>(null);
  const areaMinThumbRef = useRef<HTMLDivElement>(null);
  const areaMaxThumbRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-IN");
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
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
    const minArea = 200;
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
    const max = 900000000;
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
    const maxPrice = 900000000;

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

    const minArea = 200;
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

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="mb-2">
        <a href="#" className="text-gray-500 text-sm">
          Home
        </a>
      </div>

      {/* Applied Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Applied Filters
          </h2>
          <button
            onClick={clearAllFilters}
            className="text-blue-500 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {appliedFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-50 text-blue-800 rounded-full px-3 py-1"
            >
              <span className="mr-1">{filter}</span>
              <button
                onClick={() => removeFilter(filter)}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Section */}
      <div className="py-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-800 font-medium">Budget</h3>
          <button
            onClick={clearBudget}
            className="text-blue-500 text-sm font-medium flex items-center"
          >
            Clear
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Price Range Slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <div className="bg-gray-900 text-white px-3 py-1 rounded text-sm">
              {minPriceInput}
            </div>
            <div className="bg-gray-900 text-white px-3 py-1 rounded text-sm">
              {maxPriceInput}
            </div>
          </div>

          <div
            ref={priceSliderRef}
            className="relative h-1 bg-gray-200 rounded-full my-6"
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
              className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow-md"
            ></div>
            <div
              ref={priceMaxThumbRef}
              className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow-md"
            ></div>
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <div className="relative w-1/2">
              <input
                type="text"
                value={minPriceInput}
                onChange={(e) => handleMinPriceInputChange(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="relative w-1/2">
              <input
                type="text"
                value={maxPriceInput}
                onChange={(e) => handleMaxPriceInputChange(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Area Range Section */}
        <div className="py-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-800 font-medium">Area</h3>
            <button className="text-blue-500 text-sm font-medium flex items-center">
              Clear
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Area Range Slider */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <div className="bg-gray-900 text-white px-3 py-1 rounded text-sm">
                {minAreaInput} sq.ft
              </div>
              <div className="bg-gray-900 text-white px-3 py-1 rounded text-sm">
                {maxAreaInput} sq.ft
              </div>
            </div>

            <div
              ref={areaSliderRef}
              className="relative h-1 bg-gray-200 rounded-full my-6"
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
                ref={areaMinThumbRef}
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow-md"
              ></div>
              <div
                ref={areaMaxThumbRef}
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow-md"
              ></div>
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <div className="relative w-1/2">
                <input
                  type="text"
                  value={minAreaInput}
                  onChange={(e) => handleMinAreaInputChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative w-1/2">
                <input
                  type="text"
                  value={maxAreaInput}
                  onChange={(e) => handleMaxAreaInputChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
