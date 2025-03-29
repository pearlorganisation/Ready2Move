"use client";

import { useState } from "react";
import { format } from "date-fns";
import slugify from "slugify";

// Mock data for features (would come from API in real implementation)
const features = {
  propertyTypes: [
    { id: "1", name: "Flat" },
    { id: "2", name: "Villa" },
    { id: "3", name: "Plot" },
    { id: "4", name: "Office" },
    { id: "5", name: "Godown" },
    { id: "6", name: "Showroom" },
    { id: "7", name: "Shop" },
    { id: "8", name: "Duplex" },
  ],
  parkingTypes: [
    { id: "p1", name: "Stilt Parking" },
    { id: "p2", name: "Covered Parking" },
    { id: "p3", name: "Open Parking" },
    { id: "p4", name: "No Parking" },
  ],
  furnishingTypes: [
    { id: "f1", name: "Fully Furnished" },
    { id: "f2", name: "Semi Furnished" },
    { id: "f3", name: "Unfurnished" },
  ],
  entranceFacings: [
    { id: "e1", name: "East" },
    { id: "e2", name: "North" },
    { id: "e3", name: "West" },
    { id: "e4", name: "South" },
    { id: "e5", name: "North-East" },
    { id: "e6", name: "North-West" },
    { id: "e7", name: "South-East" },
    { id: "e8", name: "South-West" },
  ],
  availabilityTypes: [
    { id: "a1", name: "Ready2move" },
    { id: "a2", name: "Under Construction" },
    { id: "a3", name: "More Than 10 Years" },
  ],
  propertyAgeTypes: [
    { id: "pa1", name: "New Construction" },
    { id: "pa2", name: "1 To 5 Years" },
    { id: "pa3", name: "6 To 10 Years" },
    { id: "pa4", name: "More Than 10 Years" },
  ],
  ownershipTypes: [
    { id: "o1", name: "Free Hold" },
    { id: "o2", name: "Leasehold" },
    { id: "o3", name: "Pagdi System" },
  ],
  bankApprovals: [
    { id: "b1", name: "SBI" },
    { id: "b2", name: "HDFC" },
    { id: "b3", name: "ICICI" },
    { id: "b4", name: "Axis Bank" },
    { id: "b5", name: "PNB" },
  ],
  amenities: [
    { id: "am1", name: "Kids Play area" },
    { id: "am2", name: "Garden" },
    { id: "am3", name: "Gymnasium" },
    { id: "am4", name: "Multi-purpose Hall" },
    { id: "am5", name: "Security" },
    { id: "am6", name: "CC TV Surveillance" },
    { id: "am7", name: "Star Gazing Deck" },
    { id: "am8", name: "Indoor Games" },
    { id: "am9", name: "Outdoor Games" },
    { id: "am10", name: "Swimming Pool" },
    { id: "am11", name: "Clubhouse" },
  ],
  waterSources: [
    { id: "w1", name: "24 Hours Water Supply" },
    { id: "w2", name: "Borewell" },
    { id: "w3", name: "Municipal Corporation" },
    { id: "w4", name: "Tanker Water Supply" },
  ],
  otherFeatures: [
    { id: "of1", name: "Prime Location" },
    { id: "of2", name: "Good Connectivity" },
    { id: "of3", name: "Builder Subvention Plan" },
    { id: "of4", name: "Near School" },
    { id: "of5", name: "Near Hospital" },
    { id: "of6", name: "Near Market" },
  ],
  flooringTypes: [
    { id: "fl1", name: "Marble" },
    { id: "fl2", name: "Vitrified Tiles" },
    { id: "fl3", name: "Wooden" },
    { id: "fl4", name: "Granite" },
    { id: "fl5", name: "Ceramic Tiles" },
  ],
};

export default function PropertyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedBedrooms, setSelectedBedrooms] = useState(0);

  // Initialize form state based on schema
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subTitle: "",
    description: "",
    service: "SELL", // SELL or RENT
    property: "RESIDENTIAL", // RESIDENTIAL or COMMERCIAL
    propertyType: "", // ID reference

    // Location Details
    apartmentName: "",
    apartmentNo: "",
    locality: "",
    city: "",
    state: "",

    // Property Size & Configuration
    area: [
      { name: "CARPET_AREA", area: 0, areaMeasurement: "SQ_FT" },
      { name: "BUILT_UP_AREA", area: 0, areaMeasurement: "SQ_FT" },
      { name: "SUPER_AREA", area: 0, areaMeasurement: "SQ_FT" },
    ],
    landArea: { area: 0, measurement: "SQ_FT" }, // ✅ ADDED
    propertyFloor: 0, // ✅ ADDED
    totalFloors: 0, // ✅ ADDED
    roadWidth: 0, // ✅ ADDED

    // Legal & Registration
    reraNumber: "",
    reraPossessionDate: new Date(),

    // Property Features
    noOfBedrooms: 0,
    noOfBathrooms: 0,
    noOfBalconies: 0,
    parking: "", // ID reference
    furnishing: "", // ID reference
    entranceFacing: "", // ID reference
    availability: "", // ID reference
    propertyAge: "", // ID reference
    isOCAvailable: false,
    isCCAvailable: false,
    ownership: "", // ID reference

    // Pricing & Charges
    expectedPrice: 0,
    isPriceNegotiable: false,
    isBrokerageCharge: false,
    brokerage: 0,
    maintenanceCharge: 0, // ✅ ADDED
    maintenanceFrequency: "Monthly", // ✅ ADDED

    // Financial & Legal
    bankOfApproval: [] as string[], // Array of ID references

    // Amenities & Features
    amenities: [] as string[], // Array of ID references
    waterSource: "", // ID reference
    otherFeatures: [] as string[], // Array of ID references
    propertyFlooring: "", // ID reference
    powerBackup: "No Backup", // ✅ ADDED
    nearbyLandmarks: [] as string[], // ✅ ADDED

    // Media
    imageGallery: [] as { secure_url: string; public_id: string }[],
    youtubeEmbedLink: "",
    isFeatured: "",
  });

  const steps = [
    {
      id: "basic-details",
      title: "Basic Details",
      subtitle: "Add basic details",
    },
    {
      id: "property-location",
      title: "Property Location",
      subtitle: "Where is your property located?",
    },
    {
      id: "property-details",
      title: "Property Details",
      subtitle: "Tell us about your property",
    },
    {
      id: "more-details",
      title: "More Details",
      subtitle: "Tell us about your property",
    },
    {
      id: "price-details",
      title: "Price Details",
      subtitle: "Add pricing and details",
    },
    {
      id: "amenities-details",
      title: "Amenities Details",
      subtitle: "Add amenities / unique features",
    },
    {
      id: "photo-gallery",
      title: "Photo Gallery",
      subtitle: "Add photos of your property",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log(`Updating ${field}:`, value);
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [field]: value,
        ...(field === "title" && {
          slug: slugify(value, { lower: true, strict: true, trim: true }),
        }),
      };
      console.log("Updated Form Data:", updatedData);
      return updatedData;
    });
  };

  const handleArrayToggle = (field: string, id: string) => {
    setFormData((prev) => {
      const currentArray = [...(prev[field as keyof typeof prev] as string[])];
      const index = currentArray.indexOf(id);

      if (index === -1) {
        currentArray.push(id);
      } else {
        currentArray.splice(index, 1);
      }

      return { ...prev, [field]: currentArray };
    });
  };

  const handleAreaChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const areas = [...prev.area];
      areas[index] = { ...areas[index], [field]: value };
      return { ...prev, area: areas };
    });
  };

  const handleSubmit = async () => {
    // Generate slug from title

    // Mock API call
    try {
      // const response = await fetch('/api/properties', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(propertyData),
      // })
      // const data = await response.json()
      alert("Property submitted successfully!");
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Error submitting property. Please try again.");
    }
  };

  // Simple calendar component
  const Calendar = ({
    date,
    onChange,
  }: {
    date: Date | undefined;
    onChange: (date: Date) => void;
  }) => {
    const [currentMonth, setCurrentMonth] = useState(date || new Date());

    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const prevMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    };

    const nextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
    };

    const isSelectedDate = (day: number) => {
      return (
        date?.getDate() === day &&
        date?.getMonth() === currentMonth.getMonth() &&
        date?.getFullYear() === currentMonth.getFullYear()
      );
    };

    return (
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-xs">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="font-semibold">
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </div>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="h-8"></div>
          ))}
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => {
                onChange(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  )
                );
                setShowCalendar(false);
              }}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                isSelectedDate(day)
                  ? "bg-[#86e5e7] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-4">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative border-l-4 pb-6 ${
                index === steps.length - 1 ? "border-transparent" : ""
              } ${
                currentStep === index ? "border-[#1073F7]" : "border-slate-200"
              }`}
            >
              <div
              // className={`absolute left-[-5px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              //   currentStep === index ? "bg-[#1073F7] text-white" : "bg-slate-100 text-slate-500"
              // }`}
              >
                {/* {index + 1} */}
              </div>
              <div className="ml-4  hover:bg-blue-100">
                <h3
                  className={`font-medium text-sm ${
                    currentStep === index ? "text-[#1073F7]" : "text-slate-500"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200">
          {/* Step Content */}
          <div className="p-6">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Basic Details
                  </h2>
                  <p className="text-slate-500 text-sm">Add basic details</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Property Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="e.g. 2 BHK Apartment for Sale in Rustomjee Global City"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Slug
                    </label>
                    <input
                      id="slug"
                      type="text"
                      placeholder="slug"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.slug}
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subTitle"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Property Subtitle (optional)
                    </label>
                    <input
                      id="subTitle"
                      type="text"
                      placeholder="e.g. Kandivali West, Mumbai, Mahavir Nagar"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.subTitle}
                      onChange={(e) =>
                        handleInputChange("subTitle", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Property Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Describe your property in detail"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7] min-h-[100px]"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">
                      You're looking to
                    </h3>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          formData.service === "SELL"
                            ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                            : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() => handleInputChange("service", "SELL")}
                      >
                        SELL
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          formData.service === "RENT"
                            ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                            : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() => handleInputChange("service", "RENT")}
                      >
                        RENT
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">
                      Property
                    </h3>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          formData.property === "RESIDENTIAL"
                            ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                            : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() =>
                          handleInputChange("property", "RESIDENTIAL")
                        }
                      >
                        RESIDENTIAL
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          formData.property === "COMMERCIAL"
                            ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                            : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() =>
                          handleInputChange("property", "COMMERCIAL")
                        }
                      >
                        COMMERCIAL
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">
                      Property Type
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {features.propertyTypes.slice(0).map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            formData.propertyType === type.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("propertyType", type.id)
                          }
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                    {/* <div className="grid grid-cols-3 gap-3 mt-3">
                      {features.propertyTypes.slice(5).map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            formData.propertyType === type.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() => handleInputChange("propertyType", type.id)}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Property Location
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Where is your property located?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="apartmentName"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Apartment/Society Name
                    </label>
                    <input
                      id="apartmentName"
                      type="text"
                      placeholder="Name of apartment or society"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.apartmentName}
                      onChange={(e) =>
                        handleInputChange("apartmentName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="apartmentNo"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Flat No. / Apartment No.
                    </label>
                    <input
                      id="apartmentNo"
                      type="text"
                      placeholder="Flat or house number"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.apartmentNo}
                      onChange={(e) =>
                        handleInputChange("apartmentNo", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="locality"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Locality
                    </label>
                    <input
                      id="locality"
                      type="text"
                      placeholder="Eg: Andheri"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.locality}
                      onChange={(e) =>
                        handleInputChange("locality", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-slate-700"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Enter city name"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-slate-700"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder="Enter state name"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Property Details
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Tell us about your property
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Carpet Area
                    </label>
                    <div className="flex mt-1">
                      <input
                        type="number"
                        placeholder="e.g. 1000"
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-l-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                        value={formData.area[0].area || ""}
                        onChange={(e) =>
                          handleAreaChange(0, "area", Number(e.target.value))
                        }
                      />
                      <div className="relative">
                        <select
                          className="block w-[120px] px-3 py-2 bg-white border border-slate-300 rounded-r-md text-sm shadow-sm
                            focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7] appearance-none"
                          value={formData.area[0].areaMeasurement}
                          onChange={(e) =>
                            handleAreaChange(
                              0,
                              "areaMeasurement",
                              e.target.value
                            )
                          }
                        >
                          <option value="SQ_FT">Sq. Ft</option>
                          <option value="SQ_M">Sq. Mt</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Buildup Area
                    </label>
                    <div className="flex mt-1">
                      <input
                        type="number"
                        placeholder="Buildup area"
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-l-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                        value={formData.area[1].area || ""}
                        onChange={(e) =>
                          handleAreaChange(1, "area", Number(e.target.value))
                        }
                      />
                      <div className="relative">
                        <select
                          className="block w-[120px] px-3 py-2 bg-white border border-slate-300 rounded-r-md text-sm shadow-sm
                            focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7] appearance-none"
                          value={formData.area[1].areaMeasurement}
                          onChange={(e) =>
                            handleAreaChange(
                              1,
                              "areaMeasurement",
                              e.target.value
                            )
                          }
                        >
                          <option value="SQ_FT">Sq. Ft</option>
                          <option value="SQ_M">Sq. Mt</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Super Area
                    </label>
                    <div className="flex mt-1">
                      <input
                        type="number"
                        placeholder="Super area"
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-l-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                        value={formData.area[2].area || ""}
                        onChange={(e) =>
                          handleAreaChange(2, "area", Number(e.target.value))
                        }
                      />
                      <div className="relative">
                        <select
                          className="block w-[120px] px-3 py-2 bg-white border border-slate-300 rounded-r-md text-sm shadow-sm
                            focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7] appearance-none"
                          value={formData.area[2].areaMeasurement}
                          onChange={(e) =>
                            handleAreaChange(
                              2,
                              "areaMeasurement",
                              e.target.value
                            )
                          }
                        >
                          <option value="SQ_FT">Sq. Ft</option>
                          <option value="SQ_M">Sq. Mt</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reraNumber"
                      className="block text-sm font-medium text-slate-700"
                    >
                      RERA Number
                    </label>
                    <input
                      id="reraNumber"
                      type="text"
                      placeholder="Enter RERA Number"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.reraNumber}
                      onChange={(e) =>
                        handleInputChange("reraNumber", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reraPossessionDate"
                      className="block text-sm font-medium text-slate-700"
                    >
                      RERA Possession Date
                    </label>
                    <div className="relative mt-1">
                      <button
                        type="button"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="w-full flex justify-start items-center px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                          focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </button>
                      {showCalendar && (
                        <div className="absolute z-10 mt-1">
                          <Calendar
                            date={date}
                            onChange={(date) => {
                              setDate(date);
                              handleInputChange("reraPossessionDate", date);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      No. of Bedrooms
                    </label>
                    <div className="flex space-x-2 mt-1">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                            formData.noOfBedrooms === num
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() => handleInputChange("noOfBedrooms", num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">
                      No. of Bedrooms
                    </h3>
                    <div className="flex space-x-3">
  {[0, 1, 2, 3].map((option) => (
    <button
      key={option}
      type="button"
      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
        selectedBedrooms == option
          ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
          : "border border-slate-300 text-slate-700 hover:bg-slate-50"
      }`}
      onClick={() => setSelectedBedrooms(option)}
    >
      {option}
    </button>
  ))}

  {/* Custom Input Field */}
  <input
    type="number"
    placeholder="Input Here"
    className="flex-1 px-3 py-2 rounded-md text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1073F7]"
    value={selectedBedrooms > 3 ? selectedBedrooms : ""}
    onChange={(e) => setSelectedBedrooms(Number(e.target.value))}
  />
</div>

                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      No. of Balconies
                    </label>
                    <div className="flex space-x-2 mt-1">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                            formData.noOfBalconies === num
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("noOfBalconies", num)
                          }
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      No. of Bathrooms
                    </label>
                    <div className="flex space-x-2 mt-1">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                            formData.noOfBathrooms === num
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("noOfBathrooms", num)
                          }
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Parking
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {features.parkingTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            formData.parking === type.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() => handleInputChange("parking", type.id)}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Furnishing
                    </label>
                    <div className="flex space-x-2 mt-1">
                      {features.furnishingTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                            formData.furnishing === type.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("furnishing", type.id)
                          }
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    More Property Details
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Tell us about your property
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Entrance Facing
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {features.entranceFacings.map((facing) => (
                        <button
                          key={facing.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            formData.entranceFacing === facing.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("entranceFacing", facing.id)
                          }
                        >
                          {facing.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Availability Status
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {features.availabilityTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            formData.availability === type.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("availability", type.id)
                          }
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Age of property
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {features.propertyAgeTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            formData.propertyAge === type.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("propertyAge", type.id)
                          }
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="ocAvailable"
                      className="h-4 w-4 text-[#1073F7] focus:ring-[#1073F7] border-gray-300 rounded"
                      checked={formData.isOCAvailable}
                      onChange={(e) =>
                        handleInputChange("isOCAvailable", e.target.checked)
                      }
                    />
                    <label
                      htmlFor="ocAvailable"
                      className="text-sm text-slate-700"
                    >
                      OC Available
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="ccAvailable"
                      className="h-4 w-4 text-[#1073F7] focus:ring-[#1073F7] border-gray-300 rounded"
                      checked={formData.isCCAvailable}
                      onChange={(e) =>
                        handleInputChange("isCCAvailable", e.target.checked)
                      }
                    />
                    <label
                      htmlFor="ccAvailable"
                      className="text-sm text-slate-700"
                    >
                      CC Available
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Price Details
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Add pricing and details
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Ownership
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {features.ownershipTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            formData.ownership === type.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("ownership", type.id)
                          }
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Expected Price
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        ₹
                      </span>
                      <input
                        id="price"
                        type="number"
                        placeholder="Expected price"
                        className="block w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                        value={formData.expectedPrice || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "expectedPrice",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="priceNegotiable"
                      className="h-4 w-4 text-[#1073F7] focus:ring-[#1073F7] border-gray-300 rounded"
                      checked={formData.isPriceNegotiable}
                      onChange={(e) =>
                        handleInputChange("isPriceNegotiable", e.target.checked)
                      }
                    />
                    <label
                      htmlFor="priceNegotiable"
                      className="text-sm text-slate-700"
                    >
                      Price negotiable
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Do you charge brokerage?
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="brokerageYes"
                          name="brokerage"
                          className="h-4 w-4 text-[#1073F7] focus:ring-[#1073F7] border-gray-300"
                          checked={formData.isBrokerageCharge}
                          onChange={() =>
                            handleInputChange("isBrokerageCharge", true)
                          }
                        />
                        <label
                          htmlFor="brokerageYes"
                          className="text-sm text-slate-700"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="brokerageNo"
                          name="brokerage"
                          className="h-4 w-4 text-[#1073F7] focus:ring-[#1073F7] border-gray-300"
                          checked={!formData.isBrokerageCharge}
                          onChange={() =>
                            handleInputChange("isBrokerageCharge", false)
                          }
                        />
                        <label
                          htmlFor="brokerageNo"
                          className="text-sm text-slate-700"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.isBrokerageCharge && (
                    <div>
                      <label
                        htmlFor="brokerage"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Brokerage Amount
                      </label>
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                          ₹
                        </span>
                        <input
                          id="brokerage"
                          type="number"
                          placeholder="Brokerage amount"
                          className="block w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                          value={formData.brokerage || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "brokerage",
                              Number(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Amenities Details
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Add amenities / unique features
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Bank Approval
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {features.bankApprovals.map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium border ${
                            formData.bankOfApproval.includes(bank.id)
                              ? "bg-purple-100 border-purple-200 text-[#1073F7]"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleArrayToggle("bankOfApproval", bank.id)
                          }
                        >
                          {formData.bankOfApproval.includes(bank.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 inline mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                          {bank.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                      {features.amenities.map((amenity) => (
                        <button
                          key={amenity.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium border text-left ${
                            formData.amenities.includes(amenity.id)
                              ? "bg-purple-100 border-purple-200 text-[#1073F7]"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleArrayToggle("amenities", amenity.id)
                          }
                        >
                          {formData.amenities.includes(amenity.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 inline mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                          {amenity.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Water Source
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {features.waterSources.map((source) => (
                        <button
                          key={source.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            formData.waterSource === source.id
                              ? "bg-[#1073F7] text-white hover:bg-[#1073F7]"
                              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleInputChange("waterSource", source.id)
                          }
                        >
                          {source.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Other Features
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {features.otherFeatures.map((feature) => (
                        <button
                          key={feature.id}
                          type="button"
                          className={`px-3 py-2 rounded-md text-sm font-medium border ${
                            formData.otherFeatures.includes(feature.id)
                              ? "bg-purple-100 border-purple-200 text-[#1073F7]"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                          onClick={() =>
                            handleArrayToggle("otherFeatures", feature.id)
                          }
                        >
                          {formData.otherFeatures.includes(feature.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 inline mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                          {feature.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="flooring"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Type of flooring
                    </label>
                    <div className="relative mt-1">
                      <select
                        id="flooring"
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                          focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7] appearance-none"
                        value={formData.propertyFlooring}
                        onChange={(e) =>
                          handleInputChange("propertyFlooring", e.target.value)
                        }
                      >
                        <option value="">Select...</option>
                        {features.flooringTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Photo Gallery
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Add photos of your property
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="youtubeLink"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Youtube Embed Link
                    </label>
                    <input
                      id="youtubeLink"
                      type="text"
                      placeholder="Youtube Link"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-[#1073F7] focus:ring-1 focus:ring-[#1073F7]"
                      value={formData.youtubeEmbedLink}
                      onChange={(e) =>
                        handleInputChange("youtubeEmbedLink", e.target.value)
                      }
                    />
                  </div>
                  <label className="block text-sm font-medium text-slate-700">
                    Featured Properties
                  </label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="isFeatured"
                        value="true"
                        checked={formData.isFeatured === true}
                        onChange={() =>
                          setFormData({ ...formData, isFeatured: true })
                        }
                      />
                      Yes
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="isFeatured"
                        value="false"
                        checked={formData.isFeatured === false}
                        onChange={() =>
                          setFormData({ ...formData, isFeatured: false })
                        }
                      />
                      No
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Image Gallery
                    </label>
                    <div className="mt-1 border-2 border-dashed border-slate-200 rounded-lg p-12 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-slate-500">
                        Drag and drop some files here, or click to select files
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Maximum 8 images allowed
                      </p>
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 border border-purple-200 bg-purple-50 text-[#1073F7] rounded-md text-sm font-medium hover:bg-purple-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 inline mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Select Files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center p-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 border border-slate-300 rounded-md text-sm font-medium ${
                currentStep === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="button"
                className="px-4 py-2 bg-[#1073F7] text-white rounded-md text-sm font-medium hover:bg-[#1073F7]"
                onClick={handleSubmit}
              >
                Publish
              </button>
            ) : (
              <button
                type="button"
                className="px-4 py-2 bg-[#1073F7] text-white rounded-md text-sm font-medium hover:bg-[#1073F7]"
                onClick={handleNext}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
