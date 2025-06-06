"use client";

import React, { use, useEffect } from "react";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import slugify from "slugify";
import { CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/util/cn";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import {
  createPropertyByAdmin,
  getAllProperties,
} from "@/lib/redux/actions/propertyAction";
import { getFeatures } from "@/lib/redux/actions/featuresAction";
import { useRouter } from "next/navigation"; // ✅ App Router
import Propertylisting from "../propertylist/page"
  type FormData = {
    title: string;
    slug: string;
    subTitle: string;
    description: string;
    service: "SELL" | "RENT";
    property: "RESIDENTIAL" | "COMMERCIAL";
    propertyType: string;

  // Location Details
  apartmentName: string;
  apartmentNo: string;
  locality: string;
  city: string;
  state: string;

  // Property Size & Configuration
  area: {
    name: "CARPET_AREA" | "BUILT_UP_AREA" | "SUPER_AREA";
    area: number;
    areaMeasurement: "SQ_FT" | "SQ_M";
  }[];
  landArea: { area: number; measurement: string };
  propertyFloor: number;
  totalFloors: number;
  roadWidth: number;

  // Legal & Registration
  reraNumber: string;
  reraPossessionDate: Date | null;

  // Property Features
  noOfBedrooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  parking: string;
  furnishing: string;
  entranceFacing: string;
  availability: string;
  propertyAge: string;
  isOCAvailable: boolean;
  isCCAvailable: boolean;
  ownership: string;

  // Pricing & Charges
  expectedPrice: number;
  isPriceNegotiable: boolean;
  isBrokerageCharge: boolean;
  brokerage: number;
  maintenanceCharge: number;
  maintenanceFrequency: string;

  // Financial & Legal
  bankOfApproval: string[];

  // Amenities & Features
  amenities: string[];
  waterSource: string;
  otherFeatures: string[];
  propertyFlooring: string;
  powerBackup: string;
  nearbyLandmarks: string[];

  // Media
  imageGallery: File[];
  youtubeEmbedLink: string;
  isFeatured: boolean;
};
type PropertyFormValues = Pick<
  FormData,
  "noOfBedrooms" | "noOfBalconies" | "noOfBathrooms"
>;

// Custom Input component
const CustomInput = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  className = "",
  prefix,
  ...props
}: {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  prefix?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div className={`relative ${prefix ? "flex items-center" : ""}`}>
      {prefix && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type={type}
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          prefix && "pl-8",
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Custom Textarea component
const CustomTextarea = ({
  id,
  label,
  placeholder,
  error,
  className = "",
  ...props
}: {
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <textarea
      id={id}
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Custom Button component
const CustomButton = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeClasses = {
    default: "px-4 py-2 text-sm",
    sm: "px-2 py-1 text-xs",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Checkbox component
const CustomCheckbox = ({
  id,
  label,
  checked,
  onChange,
  className = "",
}: {
  id: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}) => (
  <div className={cn("flex items-center", className)}>
    <input
      id={id}
      type="checkbox"
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
    />
    {label && (
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    )}
  </div>
);

// Custom Radio component
const CustomRadio = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  className = "",
}: {
  id: string;
  name: string;
  value: string;
  label?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}) => (
  <div className={cn("flex items-center", className)}>
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      checked={checked}
      onChange={(e) => onChange?.(e.target.value)}
    />
    {label && (
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    )}
  </div>
);

// Custom Calendar component
const CustomCalendar = ({
  selected,
  onSelect,
}: {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelect(newDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();
  const daysInMonth = getDaysInMonth(year, currentMonth.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(year, currentMonth.getMonth());

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {selected ? (
          format(selected, "PPP")
        ) : (
          <span className="text-gray-400">Pick a date</span>
        )}
        <CalendarIcon className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute w-max z-10 mt-1  bg-white shadow-lg rounded-md border border-gray-200 p-2">
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              &lt;
            </button>
            <div className="font-medium">
              {monthName} {year}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              &gt;
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

          <div className="grid grid-cols-7 gap-1 mt-1">
            {days.map((day, i) => (
              <div key={i} className="text-center">
                {day !== null ? (
                  <button
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    className={cn(
                      "w-8 h-8 rounded-full text-sm hover:bg-gray-100 focus:outline-none",
                      selected &&
                        selected.getDate() === day &&
                        selected.getMonth() === currentMonth.getMonth() &&
                        selected.getFullYear() === currentMonth.getFullYear()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700"
                    )}
                  >
                    {day}
                  </button>
                ) : (
                  <div className="w-8 h-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Popover component
const CustomPopover = ({
  trigger,
  content,
  isOpen,
  setIsOpen,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-auto bg-white shadow-lg rounded-md border border-gray-200">
          {content}
        </div>
      )}
    </div>
  );
};

export default function PropertyForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { featureData } = useAppSelector((state) => state.features);
  const { userData } = useAppSelector((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [OpenPropertyModal, setPropertyModal] = useState<boolean>(false);
  const handleModalOpen = () => {
    setPropertyModal(true);
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      slug: "",
      subTitle: "",
      description: "",
      service: "SELL",
      property: "RESIDENTIAL",
      propertyType: "",

      apartmentName: "",
      apartmentNo: "",
      locality: "",
      city: "",
      state: "",

      area: [
        { name: "CARPET_AREA", area: 0, areaMeasurement: "SQ_FT" },
        { name: "BUILT_UP_AREA", area: 0, areaMeasurement: "SQ_FT" },
        { name: "SUPER_AREA", area: 0, areaMeasurement: "SQ_FT" },
      ],
      landArea: { area: 0, measurement: "SQ_FT" },
      propertyFloor: 0,
      totalFloors: 0,
      roadWidth: 0,

      reraNumber: "",
      reraPossessionDate: null,

      noOfBedrooms: 0,
      noOfBathrooms: 0,
      noOfBalconies: 0,
      parking: "",
      furnishing: "",
      entranceFacing: "",
      availability: "",
      propertyAge: "",
      isOCAvailable: false,
      isCCAvailable: false,
      ownership: "",

      expectedPrice: 0,
      isPriceNegotiable: false,
      isBrokerageCharge: false,
      brokerage: 0,
      maintenanceCharge: 0,
      maintenanceFrequency: "Monthly",

      bankOfApproval: [],

      amenities: [],
      waterSource: "",
      otherFeatures: [],
      propertyFlooring: "",
      powerBackup: "No Backup",
      nearbyLandmarks: [],

      imageGallery: [],
      youtubeEmbedLink: "",
      isFeatured: false,
    },
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

  // Watch form values for dynamic updates
  const title = watch("title");
  const isBrokerageCharge = watch("isBrokerageCharge");
  const selectedBedrooms = watch("noOfBedrooms");
  const selectedBathroom = watch("noOfBathrooms");
  const selectedBalconies = watch("noOfBalconies");
  // Update slug when title changes
  const handleTitleChange = (value: string) => {
    setValue("title", value);
    setValue("slug", slugify(value, { lower: true, strict: true, trim: true }));
  };

  console.log("the steps are", steps.length);
  console.log("the current steps are", currentStep);
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setValue("imageGallery", files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: any) => {
    const formData = { ...data, id: userData?._id };
    dispatch(createPropertyByAdmin({ userdata: formData })).then((res) => {
      console.log("the res is", res);
      if (res?.payload?.success == true) {
        dispatch(
          getAllProperties({
            page: 1,
            limit: 50,
            priceRange: 0,
            bedRooms: 0,
            bathRooms: 0,
          })
        );
        setPropertyModal(false);
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatures());
  }, []);

  return (
    <div className="flex flex-col justify-end mt-6 px-6">
      {/* Sidebar */}
      <div></div>
      <div className="flex  justify-end">
        <button
          onClick={handleModalOpen}
          className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition "
        >
          Create Property
        </button>
      </div>
      <div>
        <Propertylisting />
      </div>
      <div className="flex max-w-full">
        {OpenPropertyModal && (
          <div className="flex flex-row w-full px-20 inset-0 fixed  bg-black bg-opacity-50  z-50 ">
            <div className="w-64 bg-white border-r p-4 hidden md:block mt-6 rounded-md mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-700">
                  Add Property
                </h2>
                <button
                  onClick={() => setPropertyModal(false)}
                  className="text-sm px-3 py-1.5 text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
              <div className="space-y-2 rounded-md  px-6 py-6">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative border-l-4 pb-6 ${
                      index === steps.length - 1 ? "border-transparent" : ""
                    } ${
                      currentStep === index
                        ? "border-blue-600"
                        : "border-slate-200"
                    }`}
                  >
                    <div
                      className="ml-4 hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                      onClick={() => setCurrentStep(index)}
                    >
                      <h3
                        className={`font-medium text-sm ${
                          currentStep === index
                            ? "text-blue-600"
                            : "text-slate-500"
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
            {/* Mobile Steps Indicator */}
            <div className="md:hidden p-4 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {steps[currentStep].title}
                </h2>
                <div className="text-sm text-slate-500">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8 pt-20 md:pt-6 w-full overflow-y-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full mx-auto"
              >
                <div className="bg-white rounded-lg shadow w-full">
                  {/* Step Content */}
                  <div className="p-6">
                    {currentStep === 0 && (
                      <div className="space-y-8">
                        {/* Section Heading */}
                        <div className="border-b pb-4">
                          <h2 className="text-2xl font-bold text-slate-800">
                            Basic Details
                          </h2>
                          <p className="text-sm text-slate-500">
                            Add basic information about your property
                          </p>
                        </div>

                        {/* Title & Slug */}
                        <div className="grid gap-4 md:grid-cols-2">
                          <CustomInput
                            id="title"
                            label="Property Title"
                            placeholder="e.g. 2 BHK Apartment for Sale in Rustomjee Global City"
                            error={errors.title?.message}
                            {...register("title", {
                              required: "Title is required",
                            })}
                            onChange={(e) => handleTitleChange(e.target.value)}
                          />

                          <CustomInput
                            id="slug"
                            label="Slug"
                            placeholder="slug"
                            className="bg-slate-50"
                            {...register("slug")}
                            readOnly
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          {/* Subtitle */}
                          <CustomInput
                            id="subTitle"
                            label="Property Subtitle (optional)"
                            placeholder="e.g. Kandivali West, Mumbai, Mahavir Nagar"
                            {...register("subTitle")}
                          />

                          {/* Description */}
                          <CustomTextarea
                            id="description"
                            label="Property Description"
                            placeholder="Describe your property in detail"
                            className="min-h-[100px]"
                            error={errors.description?.message}
                            {...register("description", {
                              required: "Description is required",
                            })}
                          />
                        </div>

                    {/* You’re looking to: SELL / RENT */}
                    <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">You're looking to</label>
                      <Controller
                        name="service"
                        control={control}
                        render={({ field }) => (
                          <div className="flex gap-3">
                            {["SELL", "RENT"].map((option) => (
                              <CustomButton
                                key={option}
                                type="button"
                                variant={field.value === option ? "default" : "outline"}
                                onClick={() => field.onChange(option)}
                              >
                                {option}
                              </CustomButton>
                            ))}
                          </div>
                        )}
                      />
                    </div>

                          {/* Property Type: RESIDENTIAL / COMMERCIAL */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Property
                            </label>
                            <Controller
                              name="property"
                              control={control}
                              render={({ field }) => (
                                <div className="flex gap-3">
                                  {["RESIDENTIAL", "COMMERCIAL"].map(
                                    (option) => (
                                      <CustomButton
                                        key={option}
                                        type="button"
                                        variant={
                                          field.value === option
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() => field.onChange(option)}
                                      >
                                        {option}
                                      </CustomButton>
                                    )
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </div>

                        {/* Property Sub-Type (from featureData) */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Property Type
                          </label>
                          <Controller
                            name="propertyType"
                            control={control}
                            render={({ field }) => (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {featureData
                                  .filter(
                                    (item) => item.type === "PROPERTY_TYPE"
                                  )
                                  .flatMap((category) => category.features)
                                  .map((type) => (
                                    <CustomButton
                                      key={type._id}
                                      type="button"
                                      variant={
                                        field.value === type._id
                                          ? "default"
                                          : "outline"
                                      }
                                      onClick={() => field.onChange(type._id)}
                                    >
                                      {type.name}
                                    </CustomButton>
                                  ))}
                              </div>
                            )}
                          />
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
                          <CustomInput
                            id="apartmentName"
                            label="Apartment/Society Name"
                            placeholder="Name of apartment or society"
                            {...register("apartmentName")}
                          />

                          <CustomInput
                            id="apartmentNo"
                            label="Flat No. / Apartment No."
                            placeholder="Flat or house number"
                            {...register("apartmentNo")}
                          />

                          <CustomInput
                            id="locality"
                            label="Locality"
                            placeholder="Eg: Andheri"
                            error={errors.locality?.message}
                            {...register("locality", {
                              required: "Locality is required",
                            })}
                          />

                          <CustomInput
                            id="city"
                            label="City"
                            placeholder="Enter city name"
                            error={errors.city?.message}
                            {...register("city", {
                              required: "City is required",
                            })}
                          />

                          <CustomInput
                            id="state"
                            label="State"
                            placeholder="Enter state name"
                            error={errors.state?.message}
                            {...register("state", {
                              required: "State is required",
                            })}
                          />
                        </div>
                      </div>
                    )}
                    {/* Property Details */}
                    {currentStep === 2 && (
                      <div className="space-y-8">
                        {/* Heading */}
                        <div>
                          <h2 className="text-2xl font-semibold text-slate-800">
                            Property Details
                          </h2>
                          <p className="text-slate-500 text-sm">
                            Tell us about your property
                          </p>
                        </div>

                        {/* Area Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            {
                              label: "Carpet Area",
                              index: 0,
                              placeholder: "e.g. 1000",
                            },
                            {
                              label: "Buildup Area",
                              index: 1,
                              placeholder: "Buildup area",
                            },
                            {
                              label: "Super Area",
                              index: 2,
                              placeholder: "Super area",
                            },
                          ].map(({ label, index, placeholder }) => (
                            <div className="space-y-2" key={label}>
                              <label className="block text-sm font-medium text-gray-700">
                                {label}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  placeholder={placeholder}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  {...register(`area.${index}.area`, {
                                    valueAsNumber: true,
                                  })}
                                />
                                <Controller
                                  name={`area.${index}.areaMeasurement`}
                                  control={control}
                                  render={({ field }) => (
                                    <select
                                      className="w-[120px] px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      value={field.value}
                                      onChange={field.onChange}
                                    >
                                      <option value="SQ_FT">Sq. Ft</option>
                                      <option value="SQ_M">Sq. Mt</option>
                                    </select>
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* RERA Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <CustomInput
                            id="reraNumber"
                            label="RERA Number"
                            placeholder="Enter RERA Number"
                            error={errors.reraNumber?.message}
                            {...register("reraNumber", {
                              required: "RERA Number is required",
                            })}
                          />
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              RERA Possession Date
                            </label>
                            <Controller
                              name="reraPossessionDate"
                              control={control}
                              render={({ field }) => (
                                <CustomPopover
                                  isOpen={calendarOpen}
                                  setIsOpen={setCalendarOpen}
                                  trigger={
                                    <button
                                      type="button"
                                      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span className="text-gray-400">
                                          Pick a date
                                        </span>
                                      )}
                                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                                    </button>
                                  }
                                  content={
                                    <div className="p-2">
                                      <CustomCalendar
                                        selected={field.value || undefined}
                                        onSelect={(date) => {
                                          field.onChange(date);
                                          setCalendarOpen(false);
                                        }}
                                      />
                                    </div>
                                  }
                                />
                              )}
                            />
                          </div>
                        </div>

                        {/* Bedroom, Balcony, Bathroom Counts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            {
                              label: "No. of Bedrooms",
                              name: "noOfBedrooms",
                              selectedValue: selectedBedrooms,
                              setValueFn: setValue,
                            },
                            {
                              label: "No. of Balconies",
                              name: "noOfBalconies",
                              selectedValue: selectedBalconies,
                              setValueFn: setValue,
                            },
                            {
                              label: "No. of Bathrooms",
                              name: "noOfBathrooms",
                              selectedValue: selectedBathroom,
                              setValueFn: setValue,
                            },
                          ].map(
                            ({ label, name, selectedValue, setValueFn }) => (
                              <div className="space-y-2" key={name}>
                                <label className="block text-sm font-medium text-gray-700">
                                  {label}
                                </label>
                                <div className="flex flex-wrap gap-2 items-center">
                                  {[0, 1, 2, 3].map((num) => (
                                    <Controller
                                      key={num}
                                      name={name as keyof PropertyFormValues}
                                      control={control}
                                      render={({ field }) => (
                                        <button
                                          type="button"
                                          className={`px-4 py-2 rounded-md border text-sm font-medium shadow-sm transition-all duration-150 ${
                                            field.value === num
                                              ? "bg-blue-600 text-white border-blue-600"
                                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                          }`}
                                          onClick={() => field.onChange(num)}
                                        >
                                          {num}
                                        </button>
                                      )}
                                    />
                                  ))}
                                  <input
                                    type="number"
                                    min={0}
                                    placeholder="Custom"
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={
                                      selectedValue > 3 ? selectedValue : ""
                                    }
                                    onChange={(e) =>
                                      setValueFn(
                                        name as keyof PropertyFormValues,
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    onWheel={(e) => e.preventDefault()}
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        {/* Parking */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Parking
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {featureData
                              ?.filter((item) => item.type === "PARKING")
                              .flatMap((category) => category.features)
                              .map((type) => (
                                <Controller
                                  key={type._id}
                                  name="parking"
                                  control={control}
                                  render={({ field }) => (
                                    <CustomButton
                                      type="button"
                                      variant={
                                        field.value === type._id
                                          ? "default"
                                          : "outline"
                                      }
                                      onClick={() => field.onChange(type._id)}
                                    >
                                      {type.name}
                                    </CustomButton>
                                  )}
                                />
                              ))}
                          </div>
                        </div>

                        {/* Furnishing */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Furnishing
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {featureData
                              .filter((item) => item.type === "FURNISHING")
                              .flatMap((category) => category.features)
                              .map((type) => (
                                <Controller
                                  key={type._id}
                                  name="furnishing"
                                  control={control}
                                  render={({ field }) => (
                                    <CustomButton
                                      type="button"
                                      variant={
                                        field.value === type._id
                                          ? "default"
                                          : "outline"
                                      }
                                      onClick={() => field.onChange(type._id)}
                                    >
                                      {type.name}
                                    </CustomButton>
                                  )}
                                />
                              ))}
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
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Entrance Facing
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {featureData
                                .filter(
                                  (item) => item.type === "ENTRANCE_FACING"
                                )
                                .flatMap((category) => category.features)
                                .map((facing) => (
                                  <Controller
                                    key={facing._id}
                                    name="entranceFacing"
                                    control={control}
                                    render={({ field }) => (
                                      <CustomButton
                                        type="button"
                                        variant={
                                          field.value === facing._id
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          field.onChange(facing._id)
                                        }
                                      >
                                        {facing.name}
                                      </CustomButton>
                                    )}
                                  />
                                ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Availability Status
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {featureData
                                .filter((item) => item.type === "AVAILABILITY")
                                .flatMap((category) => category.features)
                                .map((avail) => (
                                  <Controller
                                    key={avail._id}
                                    name="availability"
                                    control={control}
                                    render={({ field }) => (
                                      <CustomButton
                                        type="button"
                                        variant={
                                          field.value === avail._id
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          field.onChange(avail._id)
                                        }
                                      >
                                        {avail.name}
                                      </CustomButton>
                                    )}
                                  />
                                ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Age of property
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {featureData
                                .filter((item) => item.type === "PROPERTY_AGE")
                                .flatMap((category) => category.features)
                                .map((type) => (
                                  <Controller
                                    key={type._id}
                                    name="propertyAge"
                                    control={control}
                                    render={({ field }) => (
                                      <CustomButton
                                        type="button"
                                        variant={
                                          field.value === type._id
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() => field.onChange(type._id)}
                                      >
                                        {type.name}
                                      </CustomButton>
                                    )}
                                  />
                                ))}
                            </div>
                          </div>

                          <Controller
                            name="isOCAvailable"
                            control={control}
                            render={({ field }) => (
                              <CustomCheckbox
                                id="ocAvailable"
                                label="OC Available"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />

                          <Controller
                            name="isCCAvailable"
                            control={control}
                            render={({ field }) => (
                              <CustomCheckbox
                                id="ccAvailable"
                                label="CC Available"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
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
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Ownership
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {featureData
                                .filter((item) => item.type === "OWNERSHIP")
                                .flatMap((category) => category.features)
                                .map((type) => (
                                  <Controller
                                    key={type._id}
                                    name="ownership"
                                    control={control}
                                    render={({ field }) => (
                                      <CustomButton
                                        type="button"
                                        variant={
                                          field.value === type._id
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() => field.onChange(type._id)}
                                      >
                                        {type.name}
                                      </CustomButton>
                                    )}
                                  />
                                ))}
                            </div>
                          </div>

                          <CustomInput
                            id="expectedPrice"
                            label="Expected Price"
                            type="number"
                            placeholder="Expected price"
                            prefix="₹"
                            error={errors.expectedPrice?.message}
                            {...register("expectedPrice", {
                              required: "Expected price is required",
                              valueAsNumber: true,
                            })}
                          />

                          <Controller
                            name="isPriceNegotiable"
                            control={control}
                            render={({ field }) => (
                              <CustomCheckbox
                                id="priceNegotiable"
                                label="Price negotiable"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Do you charge brokerage?
                            </label>
                            <Controller
                              name="isBrokerageCharge"
                              control={control}
                              render={({ field }) => (
                                <div className="flex space-x-4">
                                  <CustomRadio
                                    id="brokerageYes"
                                    name="brokerage"
                                    value="true"
                                    label="Yes"
                                    checked={field.value === true}
                                    onChange={(value) =>
                                      field.onChange(value === "true")
                                    }
                                  />
                                  <CustomRadio
                                    id="brokerageNo"
                                    name="brokerage"
                                    value="false"
                                    label="No"
                                    checked={field.value === false}
                                    onChange={(value) =>
                                      field.onChange(value === "true")
                                    }
                                  />
                                </div>
                              )}
                            />
                          </div>

                          {isBrokerageCharge && (
                            <CustomInput
                              id="brokerage"
                              label="Brokerage Amount"
                              type="number"
                              placeholder="Brokerage amount"
                              prefix="₹"
                              {...register("brokerage", {
                                valueAsNumber: true,
                              })}
                            />
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
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Bank Approval
                            </label>
                            <Controller
                              name="bankOfApproval"
                              control={control}
                              render={({ field }) => (
                                <div className="flex flex-wrap gap-2">
                                  {featureData
                                    ?.filter((item) => item.type === "BANKS")
                                    .flatMap((category) => category.features)
                                    .map((bank) => (
                                      <CustomButton
                                        key={bank._id}
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                          field.value.includes(bank._id) &&
                                            "bg-gray-200 text-gray-800"
                                        )}
                                        onClick={() => {
                                          const newValue = [...field.value];
                                          const index = newValue.indexOf(
                                            bank._id
                                          );
                                          if (index === -1) {
                                            newValue.push(bank._id);
                                          } else {
                                            newValue.splice(index, 1);
                                          }
                                          field.onChange(newValue);
                                        }}
                                      >
                                        {field.value.includes(bank._id) && (
                                          <Check className="mr-2 h-4 w-4" />
                                        )}
                                        {bank.name}
                                      </CustomButton>
                                    ))}
                                </div>
                              )}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Amenities
                            </label>
                            <Controller
                              name="amenities"
                              control={control}
                              render={({ field }) => (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {featureData
                                    ?.filter(
                                      (item) => item?.type === "AMENITIES"
                                    ) // Select only amenities
                                    ?.flatMap((category) => category.features) // Flatten to get individual features
                                    ?.map((amenity) => (
                                      <CustomButton
                                        key={amenity._id} // Use the correct ID
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                          "justify-start",
                                          field.value.includes(amenity._id) &&
                                            "bg-gray-200 text-gray-800"
                                        )}
                                        onClick={() => {
                                          const newValue = [...field.value];
                                          const index = newValue.indexOf(
                                            amenity._id
                                          );
                                          if (index === -1) {
                                            newValue.push(amenity._id);
                                          } else {
                                            newValue.splice(index, 1);
                                          }
                                          field.onChange(newValue);
                                        }}
                                      >
                                        {field.value.includes(amenity._id) && (
                                          <Check className="mr-2 h-4 w-4" />
                                        )}
                                        {amenity.name}
                                      </CustomButton>
                                    ))}
                                </div>
                              )}
                            />
                          </div>

                          {/* <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Water Source
                            </label>
                            <Controller
                              name="waterSource"
                              control={control}
                              render={({ field }) => (
                                <div className="flex flex-wrap gap-2">
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {featureData
                                      ?.filter(
                                        (item) => item?.type === "WATER_SOURCE"
                                      ) // Select only amenities
                                      ?.flatMap((category) => category.features) // Flatten to get individual features
                                      ?.map((source) => (
                                        <CustomButton
                                          key={source._id} // Use the correct ID
                                          type="button"
                                          variant="outline"
                                          className={cn(
                                            "justify-start",
                                            field.value.includes(source._id) &&
                                              "bg-gray-200 text-gray-800"
                                          )}
                                          onClick={() => {
                                            const newValue = [...field.value];
                                            const index = newValue.indexOf(
                                              source._id
                                            );
                                            if (index === -1) {
                                              newValue.push(source._id);
                                            } else {
                                              newValue.splice(index, 1);
                                            }
                                            field.onChange(newValue);
                                          }}
                                        >
                                          {field.value.includes(source._id) && (
                                            <Check className="mr-2 h-4 w-4" />
                                          )}
                                          {source.name}
                                        </CustomButton>
                                      ))}
                                  </div>
                                </div>
                              )}
                            />
                          </div> */}

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              watersource
                            </label>
                            <Controller
                              name="waterSource"
                              control={control}
                              render={({ field }) => (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {featureData
                                    ?.filter(
                                      (item) => item?.type === "WATER_SOURCE"
                                    ) // Select only amenities
                                    ?.flatMap((category) => category.features) // Flatten to get individual features
                                    ?.map((source) => (
                                      <CustomButton
                                        key={source._id} // Use the correct ID
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                          "justify-start",
                                          field.value.includes(source._id) &&
                                            "bg-gray-200 text-gray-800"
                                        )}
                                        onClick={() => {
                                          const newValue = [...field.value];
                                          const index = newValue.indexOf(
                                            source._id
                                          );
                                          if (index === -1) {
                                            newValue.push(source._id);
                                          } else {
                                            newValue.splice(index, 1);
                                          }
                                          field.onChange(newValue);
                                        }}
                                      >
                                        {field.value.includes(source._id) && (
                                          <Check className="mr-2 h-4 w-4" />
                                        )}
                                        {source.name}
                                      </CustomButton>
                                    ))}
                                </div>
                              )}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Other Features
                            </label>
                            <Controller
                              name="otherFeatures"
                              control={control}
                              render={({ field }) => (
                                <div className="flex flex-wrap gap-2">
                                  {featureData
                                    .filter(
                                      (item) => item.type === "OTHER_FEATURES"
                                    )
                                    .flatMap((category) => category.features)
                                    .map((feature) => (
                                      <CustomButton
                                        key={feature._id}
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                          field.value.includes(feature._id) &&
                                            "bg-gray-200 text-gray-800"
                                        )}
                                        onClick={() => {
                                          const newValue = [...field.value];
                                          const index = newValue.indexOf(
                                            feature._id
                                          );
                                          if (index === -1) {
                                            newValue.push(feature._id);
                                          } else {
                                            newValue.splice(index, 1);
                                          }
                                          field.onChange(newValue);
                                        }}
                                      >
                                        {field.value.includes(feature._id) && (
                                          <Check className="mr-2 h-4 w-4" />
                                        )}
                                        {feature.name}
                                      </CustomButton>
                                    ))}
                                </div>
                              )}
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="propertyFlooring"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Type of flooring
                            </label>
                            <Controller
                              name="propertyFlooring"
                              control={control}
                              render={({ field }) => (
                                <select
                                  id="propertyFlooring"
                                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                  value={field.value}
                                  onChange={field.onChange}
                                >
                                  <option value="">Select...</option>
                                  {featureData
                                    .filter((item) => item.type === "FLOORING")
                                    .flatMap((category) => category.features)
                                    .map((floor) => (
                                      <option key={floor._id} value={floor._id}>
                                        {floor.name}
                                      </option>
                                    ))}
                                </select>
                              )}
                            />
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
                          <CustomInput
                            id="youtubeEmbedLink"
                            label="YouTube Embed Link"
                            placeholder="YouTube Link"
                            {...register("youtubeEmbedLink", {
                              required: "This field is required",
                            })}
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            👉 Please paste the <strong>embed link</strong>{" "}
                            (e.g.,{" "}
                            <code>https://www.youtube.com/embed/VIDEO_ID</code>
                            ).
                            <br />
                            To get it: Click "Share" → "Embed" on the YouTube
                            video and copy the <strong>src</strong> from the
                            iframe tag.
                            <br />
                            Example:
                            <code className="block mt-1 bg-gray-100 p-1 rounded">
                              &lt;iframe src="
                              <span className="text-red-600">
                                https://www.youtube.com/embed/VIDEO_ID
                              </span>
                              " /&gt;
                            </code>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Featured Property
                          </label>
                          <Controller
                            name="isFeatured"
                            control={control}
                            render={({ field }) => (
                              <div className="flex space-x-4">
                                <CustomRadio
                                  id="featuredYes"
                                  name="featured"
                                  value="true"
                                  label="Yes"
                                  checked={field.value === true}
                                  onChange={(value) =>
                                    field.onChange(value === "true")
                                  }
                                />
                                <CustomRadio
                                  id="featuredNo"
                                  name="featured"
                                  value="false"
                                  label="No"
                                  checked={field.value === false}
                                  onChange={(value) =>
                                    field.onChange(value === "true")
                                  }
                                />
                              </div>
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Image Gallery
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                            <input
                              type="file"
                              id="imageGallery"
                              multiple
                              accept="image/*"
                              className="hidden"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                            />
                            <div className="flex flex-col items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-gray-400"
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
                              <p className="mt-2 text-sm text-gray-500">
                                Drag and drop some files here, or click to
                                select files
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Maximum 8 images allowed
                              </p>
                              <CustomButton
                                type="button"
                                variant="outline"
                                className="mt-4"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Select Files
                              </CustomButton>
                            </div>
                          </div>

                          {/* Preview uploaded images */}
                          {previewImages.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                              {previewImages.map((src, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={src || "/placeholder.svg"}
                                    alt={`property-${index}`}
                                    className="h-24 w-full object-cover rounded-md"
                                  />
                                  <CustomButton
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => {
                                      const newPreviews = [...previewImages];
                                      newPreviews.splice(index, 1);
                                      setPreviewImages(newPreviews);

                                      const files = watch("imageGallery");
                                      const newFiles = [...files];
                                      newFiles.splice(index, 1);
                                      setValue("imageGallery", newFiles);
                                    }}
                                  >
                                    ×
                                  </CustomButton>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center p-6 border-t border-slate-200">
                    <CustomButton
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                    >
                      Back
                    </CustomButton>

                    {currentStep === steps.length - 1 ? (
                      <button
                        type="submit"
                        onClick={async (e) => {
                          const valid = await trigger(); // validate all fields before submitting
                          if (!valid) {
                            e.preventDefault(); // prevent submission if validation fails
                          }
                        }}
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          const valid = await trigger(); // validate current step
                          if (valid) {
                            handleNext();
                          }
                        }}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
