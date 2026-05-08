"use client";

import React, { use, useEffect } from "react";

import { useState, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import slugify from "slugify";
import { CalendarIcon, Check, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/util/cn";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import {
  createPropertyByAdmin,
  getAllProperties,
  
} from "@/lib/redux/actions/propertyAction";
import { getFeatures } from "@/lib/redux/actions/featuresAction";
import { useRouter } from "next/navigation"; // ✅ App Router
import Propertylisting from "@/components/propertylist/page";
import { getLocalities } from "@/lib/redux/actions/localityAction";
import { fetchOGFields,  createOGField, deleteOGField, updateOGField } from "@/lib/redux/actions/ogAction";
import { useSelector } from "react-redux";



interface OgState {
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | null;
}

interface EditState {
  id: string;
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | string | null; // string is for the existing URL
}





// --- Added State & City Data ---
const STATE_CITY_DATA: Record<string, string[]> = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
  ],
  "Arunachal Pradesh": ["Itanagar"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
  Delhi: [
    "New Delhi",
    "North Delhi",
    "South Delhi",
    "West Delhi",
    "East Delhi",
  ],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Panchkula"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Navi Mumbai",
  ],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
  Puducherry: ["Puducherry"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
  ],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Noida",
    "Ghaziabad",
    "Agra",
    "Varanasi",
    "Meerut",
  ],
  Uttarakhand: ["Dehradun", "Haridwar", "Roorkee", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
};


type FormData = {
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  service: "SELL" | "RENT";
  property: "RESIDENTIAL" | "COMMERCIAL";
  propertyType: string;
  note: string;
  // Location Details
  apartmentName: string;
  apartmentNo: string;
  locality: { name: string }[];
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
  brokeragepricingType: string;
  brokeragepricingValue: number;
  expectedPrice: number;
  isPriceNegotiable: boolean;
  isBrokerageCharge: boolean;
  brokerage: number;
  maintenanceCharge: number;
  maintenanceFrequency: string;

  //OG Filed
  ogTitle: string;
  ogDescription: string;
  ogImage: FileList;

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
  const [customInputs, setCustomInputs] = useState<Record<string, boolean>>({});
// const [editData, setEditData] = useState({
//   id: "",
//   ogType: "",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
// });

const [ogFormData, setOgFormData] = useState<OgState>({
  ogType: "property",
  ogTitle: "",
  ogDescription: "",
  ogImage: null,
});

const [editData, setEditData] = useState<EditState>({
  id: "",
  ogType: "property",
  ogTitle: "",
  ogDescription: "",
  ogImage: null,
});


  const [OpenPropertyModal, setPropertyModal] = useState<boolean>(false);
  const handleModalOpen = () => {
    setPropertyModal(true);
  };

  const [OpenOGModel, setOGModel] = useState<boolean>(false)

  const handleOGModelData = () => {
    setOGModel(true);
  }

const { ogData, loading: ogLoading } = useAppSelector((state) => state.og);

// const [ogFormData, setOgFormData] = useState({
//   ogType: "property",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: "",
// });

const handleOGChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  setOgFormData({
    ...ogFormData,
    [e.target.name]: e.target.value,
  });
};

// New state structure to handle both text and File objects
// const [ogFormData, setOgFormData] = useState({
//   ogType: "property",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: null, // Store File object here
// });

// const [editData, setEditData] = useState({
//   id: "",
//   ogType: "property",
//   ogTitle: "",
//   ogDescription: "",
//   ogImage: null, // Store File or URL string
// });

// Specific handler for file inputs
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, mode: "create" | "edit") => {
  // Use optional chaining (?.) and check if files[0] exists
  const file = e.target.files ? e.target.files[0] : null;
  
  if (!file) return;

  if (mode === "create") {
    setOgFormData({ ...ogFormData, ogImage: file });
  } else {
    setEditData({ ...editData, ogImage: file });
  }
};
const handleCreateOG = async () => {
  try {
    const formData = new FormData();
    formData.append("ogType", "property");
    formData.append("ogTitle", ogFormData.ogTitle);
    formData.append("ogDescription", ogFormData.ogDescription);

    if (ogFormData.ogImage) {
      formData.append("ogImage", ogFormData.ogImage);
    }

    // 1. Capture the result of the dispatch
    const resultAction = await dispatch(createOGField(formData));

    // 2. Check if the action was successful
    if (createOGField.fulfilled.match(resultAction)) {
      alert("Created Successfully");
      
      // Only reset and refresh if it actually worked
      dispatch(fetchOGFields());
      setOgFormData({
        ogType: "property",
        ogTitle: "",
        ogDescription: "",
        ogImage: null,
      });
    } else {
      // 3. Extract and show the actual error message from the payload
      const errorMessage = (resultAction.payload as any )?.message || "Failed to create record";
      alert(`Error: ${errorMessage}`);
    }

  } catch (error) {
    // This only catches logical crashes, not API failures
    console.error("UI Logic Error:", error);
    alert("An unexpected error occurred.");
  }
};
const handleEditClick = (item: any) => {
  setEditData({
    id: item._id,
    ogType: item.ogType,
    ogTitle: item.ogTitle,
    ogDescription: item.ogDescription,
    // Extract the URL from the nested object so the input shows it
   ogImage: item?.ogImage?.secure_url || null, 
  });
};

const handleUpdate = async () => {
  try {
    const formData = new FormData();
    formData.append("ogType", editData.ogType);
    formData.append("ogTitle", editData.ogTitle);
    formData.append("ogDescription", editData.ogDescription);

    if (editData.ogImage instanceof File) {
      formData.append("ogImage", editData.ogImage);
    }

    const resultAction = await dispatch(updateOGField({ id: editData.id, data: formData }));

    // Check for fulfillment
    if (updateOGField.fulfilled.match(resultAction)) {
      alert("Updated Successfully");
      dispatch(fetchOGFields());
      setEditData({ id: "", ogType: "property", ogTitle: "", ogDescription: "", ogImage: null });
    } else {
      // Show the actual server error message
      const errorMessage =  (resultAction.payload as any)?.message || "Failed to update record";
      alert(`Update Failed: ${errorMessage}`);
    }
  } catch (error) {
    alert("An unexpected error occurred.");
  }
};

const handleEditChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  setEditData({
    ...editData,
    [e.target.name]: e.target.value,
  });
}




const handleDelete = async (id: string) => {
  try {
    await dispatch(deleteOGField(id));

    alert("Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};

  const { localities } = useAppSelector((state) => state.locality);

  // ... existing selectors (featureData, userData)

  useEffect(() => {
    dispatch(getFeatures());
     dispatch(fetchOGFields());
    // 2. Fetch all localities (limit 1000 to ensure we get them all for the dropdown)
    dispatch(getLocalities({ page: 1, limit: 1000 }));
  }, [dispatch]);

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
      ogTitle: "",
      ogDescription: "",
      ogImage: null as unknown as FileList,
      apartmentName: "",
      apartmentNo: "",
      locality: [{ name: "" }],
      city: "",
      state: "",
      note: "",
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

      brokeragepricingType: "",
      brokeragepricingValue: 0,
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "locality",
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
  const isBrokerageCharge = watch("isBrokerageCharge");
  // Added watcher for state to drive city dropdown
  const selectedState = watch("state");

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
    const files = Array.from(e.target.files) as File[];
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
    // 1. Log to console to see exactly what is happening (Check your browser Inspect > Console)
    console.log("Original data from form:", data.locality);

    // 2. Transformation logic
    const formattedLocality = data.locality
      .map((item: any) => item.name) // Step 1: Get strings ["a,b,c", "d"]
      .filter((val: any) => val) // Step 2: Remove null/undefined
      .join(",") // Step 3: Combine all to "a,b,c,d"
      .split(",") // Step 4: Split by comma to ["a", "b", "c", "d"]
      .map((s: string) => s.trim()) // Step 5: Remove extra spaces
      .filter((s: string) => s !== ""); // Step 6: Remove empty strings

    console.log("Locality after formatting:", formattedLocality);

    // 3. Construct the final object
    const finalPayload = {
      ...data,
      locality: formattedLocality, // This ensures it is a clean array of separate strings
      id: userData?._id,
    };

    // 4. Send 'finalPayload' to your API, NOT 'data'
    dispatch(createPropertyByAdmin({ userdata: finalPayload })).then((res) => {
      if (res?.payload?.success === true) {
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
     
      <div className="flex  gap-5 justify-end">
        <button
          onClick={handleOGModelData}
          className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition "
        >
          Add Meta Fields
        </button>

{/* OG META DATA MODAL */}
{OpenOGModel && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white">
        <h2 className="text-2xl font-bold">OG Meta Management</h2>
        <button onClick={() => setOGModel(false)}><X className="h-6 w-6" /></button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: FORM SECTION (Switch between Create and Edit) */}
        <div className="bg-slate-50 p-6 rounded-lg border">
          <h3 className="font-bold mb-4">{editData.id ? "Edit Record" : "Add New Meta"}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="OG Title"
              className="w-full border p-2 rounded"
              value={editData.id ? editData.ogTitle : ogFormData.ogTitle}
              onChange={(e) => editData.id 
                ? setEditData({...editData, ogTitle: e.target.value}) 
                : setOgFormData({...ogFormData, ogTitle: e.target.value})}
            />
            <textarea
              placeholder="OG Description"
              className="w-full border p-2 rounded"
              value={editData.id ? editData.ogDescription : ogFormData.ogDescription}
              onChange={(e) => editData.id 
                ? setEditData({...editData, ogDescription: e.target.value}) 
                : setOgFormData({...ogFormData, ogDescription: e.target.value})}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded bg-white"
              onChange={(e) => handleFileChange(e, editData.id ? "edit" : "create")}
            />
            
            <div className="flex gap-2">
              {editData.id ? (
                <>
                  <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded flex-1">Update</button>
                  <button onClick={() => setEditData({id: "", ogType: "property", ogTitle: "", ogDescription: "", ogImage: null})} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                </>
              ) : (
                <button onClick={handleCreateOG} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Save New</button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: LIST SECTION */}
        {/* RIGHT: LIST SECTION */}
<div className="space-y-4">
  <h3 className="font-bold">Existing Meta</h3>
  {ogLoading ? (
    <p>Loading...</p>
  ) : (
    // Add the filter here to show only "property" types
    ogData
      ?.filter((item: any) => item.ogType === "property")
      .map((item: any) => (
        <div key={item._id} className="border p-3 rounded bg-white flex gap-3 items-center">
          <img
            src={item?.ogImage?.secure_url}
            className="w-12 h-12 object-cover rounded"
            alt=""
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{item.ogTitle}</p>
            <p className="text-sm truncate">{item.ogDescription}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleEditClick(item)} 
              className="text-blue-600 font-medium text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(item._id)} 
              className="text-red-600 font-medium text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))
  )}
</div>
      </div>
    </div>
  </div>
)}      <button
          onClick={handleModalOpen}
          className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition "
        >
          Create Property
        </button>
      </div>
      <div>
        <Propertylisting from="ADMIN" />
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
                              onChange: (e) => {
                                // ✅ clear error immediately
                                handleTitleChange(e.target.value); // your custom slug generation logic
                              },
                            })}
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
                            {...register("subTitle", {
                              required: "Subtitle is required", // ✅ required validation
                              minLength: {
                                value: 5,
                                message:
                                  "Subtitle must be at least 5 characters",
                              },
                              maxLength: {
                                value: 100,
                                message:
                                  "Subtitle must be less than 100 characters",
                              },
                            })}
                            error={errors.subTitle?.message} // ✅ display error message
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
                            <label className="block text-sm font-medium text-gray-700">
                              You're looking to
                            </label>
                            <Controller
                              name="service"
                              control={control}
                              rules={{
                                required: "Please select a service type", // ✅ required validation
                              }}
                              render={({ field }) => (
                                <div className="space-y-1">
                                  <div className="flex gap-3">
                                    {["SELL", "RENT"].map((option) => (
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
                                    ))}
                                  </div>

                                  {/* ✅ Show error below buttons */}
                                  {errors?.service && (
                                    <p className="text-sm text-red-500 mt-1">
                                      {errors.service.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          {/* Property Type: RESIDENTIAL / COMMERCIAL */}
                          <div className="space-y-2">
                            <Controller
                              name="property"
                              control={control}
                              rules={{
                                required: "Please select a property type", // ✅ Required validation
                              }}
                              render={({ field }) => (
                                <div className="space-y-1">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Property Type
                                  </label>

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

                                  {/* ✅ Show error if validation fails */}
                                  {errors.property && (
                                    <p className="text-sm text-red-600">
                                      {errors.property.message}
                                    </p>
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
                            rules={{
                              required: "Please select a property type", // ✅ validation rule
                            }}
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
                          {/* ✅ Show error message below the button grid */}
                          {errors.propertyType && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.propertyType.message}
                            </p>
                          )}
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
                          {/* State Dropdown */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              State
                            </label>
                            <Controller
                              name="state"
                              control={control}
                              rules={{ required: "State is required" }}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  className={cn(
                                    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white",
                                    errors.state &&
                                      "border-red-500 focus:ring-red-500"
                                  )}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                    setValue("city", ""); // Reset city when state changes
                                  }}
                                >
                                  <option value="">Select State</option>
                                  {Object.keys(STATE_CITY_DATA).map((state) => (
                                    <option key={state} value={state}>
                                      {state}
                                    </option>
                                  ))}
                                </select>
                              )}
                            />
                            {errors.state && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.state.message}
                              </p>
                            )}
                          </div>

                          {/* City Dropdown */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              City
                            </label>
                            <Controller
                              name="city"
                              control={control}
                              rules={{ required: "City is required" }}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  disabled={!selectedState}
                                  className={cn(
                                    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white",
                                    errors.city &&
                                      "border-red-500 focus:ring-red-500",
                                    !selectedState &&
                                      "bg-gray-100 cursor-not-allowed"
                                  )}
                                >
                                  <option value="">Select City</option>
                                  {selectedState &&
                                    STATE_CITY_DATA[selectedState]?.map(
                                      (city) => (
                                        <option key={city} value={city}>
                                          {city}
                                        </option>
                                      )
                                    )}
                                </select>
                              )}
                            />
                            {errors.city && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.city.message}
                              </p>
                            )}
                          </div>

                          <CustomInput
                            id="apartmentName"
                            label="Apartment/Society Name"
                            placeholder="Name of apartment or society"
                            error={errors?.apartmentName?.message}
                            {...register("apartmentName", {
                              required: "Apartment name is required", // ✅ validation rule
                            })}
                          />

                          <CustomInput
                            id="apartmentNo"
                            label="Flat No. / Apartment No."
                            placeholder="Flat or house number"
                            error={errors?.apartmentNo?.message}
                            {...register("apartmentNo", {
                              required: "Flat number is required", // ✅ validation rule
                            })}
                          />

                          {/* Locality Section with Multi-Add */}
                          {/* Locality Section with Multi-Add */}
                          {/* Locality Section with Dropdown Selection */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="block text-sm font-medium text-gray-700">
                                Select Localities
                              </label>
                              <button
                                type="button"
                                onClick={() => append({ name: "" })}
                                className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800"
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add Another
                                Locality
                              </button>
                            </div>

                            <div className="space-y-3">
                              {fields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="flex gap-2 items-start"
                                >
                                  <div className="flex-1">
                                    <Controller
                                      name={`locality.${index}.name` as const}
                                      control={control}
                                      rules={{
                                        required: "Please select a locality",
                                      }}
                                      render={({ field: dropdownField }) => (
                                        <div className="space-y-1">
                                          <select
                                            {...dropdownField}
                                            className={cn(
                                              "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white",
                                              (errors.locality as any)?.[index]
                                                ?.name && "border-red-500"
                                            )}
                                          >
                                            <option value="">
                                              -- Choose Locality --
                                            </option>
                                            {localities?.map((loc) => (
                                              <option
                                                key={loc._id}
                                                value={loc.locality}
                                              >
                                                {loc.locality}
                                              </option>
                                            ))}
                                          </select>
                                          {(errors.locality as any)?.[index]
                                            ?.name && (
                                            <p className="text-red-500 text-xs mt-1">
                                              {
                                                (errors.locality as any)[index]
                                                  .name.message
                                              }
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    />
                                  </div>

                                  {fields.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-md border border-gray-200"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
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
                        {/* Area Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                {/* Area Input */}
                                <div className="flex-1">
                                  <input
                                    type="number"
                                    placeholder={placeholder}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    {...register(`area.${index}.area`, {
                                      valueAsNumber: true,
                                      required: `${label} is required`, // ✅ required validation
                                      min: {
                                        value: 1,
                                        message: `${label} must be greater than 0`,
                                      },
                                    })}
                                  />
                                  {errors.area?.[index]?.area && (
                                    <p className="text-sm text-red-500 mt-1">
                                      {errors.area[index].area.message}
                                    </p>
                                  )}
                                </div>

                                {/* Measurement Select */}
                                <div>
                                  <Controller
                                    name={`area.${index}.areaMeasurement`}
                                    control={control}
                                    rules={{
                                      required: "Please select a unit",
                                    }}
                                    render={({ field }) => (
                                      <select
                                        className="w-[120px] px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                      >
                                        <option value="">Select Unit</option>
                                        <option value="SQ_FT">Sq. Ft</option>
                                        <option value="SQ_M">Sq. Mt</option>
                                      </select>
                                    )}
                                  />
                                  {errors.area?.[index]?.areaMeasurement && (
                                    <p className="text-sm text-red-500 mt-1">
                                      {
                                        errors.area[index].areaMeasurement
                                          .message
                                      }
                                    </p>
                                  )}
                                </div>
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
                              rules={{
                                required: "Possession date is required", // ✅ Required validation
                              }}
                              render={({ field }) => (
                                <div className="space-y-1">
                                  <CustomPopover
                                    isOpen={calendarOpen}
                                    setIsOpen={setCalendarOpen}
                                    trigger={
                                      <button
                                        type="button"
                                        className={`w-full flex items-center justify-between px-3 py-2 border rounded-md shadow-sm text-sm ${
                                          errors.reraPossessionDate
                                            ? "border-red-500 text-red-600 focus:ring-red-500"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
                                        }`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span
                                            className={
                                              errors.reraPossessionDate
                                                ? "text-red-500"
                                                : "text-gray-400"
                                            }
                                          >
                                            Pick a date
                                          </span>
                                        )}
                                        <CalendarIcon
                                          className={`h-4 w-4 ${
                                            errors.reraPossessionDate
                                              ? "text-red-500"
                                              : "text-gray-400"
                                          }`}
                                        />
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

                                  {/* ✅ Error message below */}
                                  {errors.reraPossessionDate && (
                                    <p className="text-sm text-red-500 mt-1">
                                      {errors.reraPossessionDate.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </div>

                        {/* Bedroom, Balcony, Bathroom Counts */}
                        {[
                          { label: "No. of Bedrooms", name: "noOfBedrooms" },
                          { label: "No. of Balconies", name: "noOfBalconies" },
                          { label: "No. of Bathrooms", name: "noOfBathrooms" },
                        ].map(({ label, name }) => (
                          <div className="space-y-2" key={name}>
                            <label className="block text-sm font-medium text-gray-700">
                              {label}
                            </label>
                            <Controller
                              name={name as keyof PropertyFormValues}
                              control={control}
                              rules={{
                                required: `${label} is required`, // ✅ required field
                                min: {
                                  value: 0,
                                  message: `${label} must be at least 0`,
                                },
                              }}
                              render={({ field, fieldState }) => (
                                <div className="space-y-1">
                                  <div className="flex flex-wrap gap-2 items-center">
                                    {[0, 1, 2, 3].map((num) => (
                                      <button
                                        key={num}
                                        type="button"
                                        className={`px-4 py-2 rounded-md border text-sm font-medium shadow-sm transition-all duration-150 ${
                                          field.value === num &&
                                          !customInputs[name]
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                        }`}
                                        onClick={() => {
                                          field.onChange(num);
                                          setCustomInputs((prev) => ({
                                            ...prev,
                                            [name]: false,
                                          }));
                                        }}
                                      >
                                        {num}
                                      </button>
                                    ))}

                                    <input
                                      type="number"
                                      min={0}
                                      placeholder="Custom"
                                      className={`w-24 px-3 py-2 rounded-md shadow-sm sm:text-sm border ${
                                        fieldState?.error
                                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                      }`}
                                      value={
                                        customInputs[name] ? field.value : ""
                                      }
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val)) {
                                          field.onChange(val);
                                          setCustomInputs((prev) => ({
                                            ...prev,
                                            [name]: true,
                                          }));
                                        } else {
                                          field.onChange("");
                                          setCustomInputs((prev) => ({
                                            ...prev,
                                            [name]: false,
                                          }));
                                        }
                                      }}
                                      onWheel={(e) => e.preventDefault()}
                                    />
                                  </div>

                                  {/* ✅ Show validation error */}
                                  {fieldState?.error && (
                                    <p className="text-sm text-red-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        ))}

                        {/* Parking */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Parking
                          </label>

                          <Controller
                            name="parking"
                            control={control}
                            rules={{
                              required: "Please select a parking option",
                            }}
                            render={({ field }) => {
                              const options = featureData
                                ?.filter((item) => item.type === "PARKING")
                                .flatMap((category) => category.features);

                              return (
                                <>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {options.map((type) => (
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
                                  {errors.parking && (
                                    <p className="text-sm text-red-500 mt-1">
                                      {errors.parking.message}
                                    </p>
                                  )}
                                </>
                              );
                            }}
                          />
                        </div>
                        {/* Furnishing */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Furnishing
                          </label>

                          <Controller
                            name="furnishing"
                            control={control}
                            rules={{
                              required: "Please select a furnishing type",
                            }}
                            render={({ field }) => {
                              const options = featureData
                                .filter((item) => item.type === "FURNISHING")
                                .flatMap((category) => category.features);

                              return (
                                <>
                                  <div className="flex flex-wrap gap-2">
                                    {options.map((type) => (
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

                                  {/* ✅ Error message */}
                                  {errors.furnishing && (
                                    <p className="text-sm text-red-500 mt-1">
                                      {errors.furnishing.message}
                                    </p>
                                  )}
                                </>
                              );
                            }}
                          />
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
                          {/* Entrance Facing */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Entrance Facing
                            </label>
                            <Controller
                              name="entranceFacing"
                              control={control}
                              rules={{
                                required: "Please select entrance facing",
                              }}
                              render={({ field }) => {
                                const options = featureData
                                  .filter(
                                    (item) => item.type === "ENTRANCE_FACING"
                                  )
                                  .flatMap((category) => category.features);

                                return (
                                  <>
                                    <div className="flex flex-wrap gap-2">
                                      {options.map((facing) => (
                                        <CustomButton
                                          key={facing._id}
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
                                      ))}
                                    </div>
                                    {errors.entranceFacing && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {errors.entranceFacing.message}
                                      </p>
                                    )}
                                  </>
                                );
                              }}
                            />
                          </div>

                          {/* Availability */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Availability Status
                            </label>
                            <Controller
                              name="availability"
                              control={control}
                              rules={{
                                required: "Please select availability status",
                              }}
                              render={({ field }) => {
                                const options = featureData
                                  .filter(
                                    (item) => item.type === "AVAILABILITY"
                                  )
                                  .flatMap((category) => category.features);

                                return (
                                  <>
                                    <div className="flex flex-wrap gap-2">
                                      {options.map((avail) => (
                                        <CustomButton
                                          key={avail._id}
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
                                      ))}
                                    </div>
                                    {errors.availability && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {errors.availability.message}
                                      </p>
                                    )}
                                  </>
                                );
                              }}
                            />
                          </div>

                          {/* Property Age */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Age of Property
                            </label>
                            <Controller
                              name="propertyAge"
                              control={control}
                              rules={{
                                required: "Please select age of property",
                              }}
                              render={({ field }) => {
                                const options = featureData
                                  .filter(
                                    (item) => item.type === "PROPERTY_AGE"
                                  )
                                  .flatMap((category) => category.features);

                                return (
                                  <>
                                    <div className="flex flex-wrap gap-2">
                                      {options.map((type) => (
                                        <CustomButton
                                          key={type._id}
                                          type="button"
                                          variant={
                                            field.value === type._id
                                              ? "default"
                                              : "outline"
                                          }
                                          onClick={() =>
                                            field.onChange(type._id)
                                          }
                                        >
                                          {type.name}
                                        </CustomButton>
                                      ))}
                                    </div>
                                    {errors.propertyAge && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {errors.propertyAge.message}
                                      </p>
                                    )}
                                  </>
                                );
                              }}
                            />
                          </div>

                          {/* OC Available */}
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

                          {/* CC Available */}
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
                            {/* Ownership */}
                            <div className="space-y-2">
                              <Controller
                                name="ownership"
                                control={control}
                                rules={{
                                  required: "Please select an ownership type",
                                }}
                                render={({ field }) => {
                                  const options = featureData
                                    .filter((item) => item.type === "OWNERSHIP")
                                    .flatMap((category) => category.features);

                                  return (
                                    <>
                                      <div className="flex flex-wrap gap-2">
                                        {options.map((type) => (
                                          <CustomButton
                                            key={type._id}
                                            type="button"
                                            variant={
                                              field.value === type._id
                                                ? "default"
                                                : "outline"
                                            }
                                            onClick={() =>
                                              field.onChange(type._id)
                                            }
                                          >
                                            {type.name}
                                          </CustomButton>
                                        ))}
                                      </div>

                                      {errors.ownership && (
                                        <p className="text-sm text-red-500 mt-1">
                                          {errors.ownership.message}
                                        </p>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </div>
                          </div>

                          <CustomInput
                            id="expectedPrice"
                            label="Expected Price"
                            type="number"
                            placeholder="Expected price"
                            prefix="₹"
                            error={errors.expectedPrice?.message} // ✅ passing error
                            {...register("expectedPrice", {
                              required: "Expected price is required",
                              valueAsNumber: true,
                            })}
                          />

                          {/* <CustomInput
                            id="expectedPrice"
                            label="Expected Price"
                            type="number"
                            placeholder="Expected price"
                            prefix="₹"
                            error={errors.expectedPrice?.message} // ✅ passing error
                            {...register("expectedPrice", {
                              required: "Expected price is required",
                              valueAsNumber: true,
                            })}
                          /> */}

                          {/* Replace the manual select/input in Step 4 with this: */}
                          {/* <div className="space-y-4">
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Expecting Price</label>
    <select
      {...register("brokeragepricingType", { required: "Pricing type is required" })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
    >
      <option value="">Select Pricing Type</option>
      <option value="PERCENTAGE">Percentage (%)</option>
      <option value="MONTH_RENT">Month Rent</option>
    </select>
    {errors.brokeragepricingType && <p className="text-red-500 text-xs">{errors.brokeragepricingType.message}</p>}
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Pricing Value</label>
    <CustomInput
      id="brokeragepricingValue"
      type="number"
      placeholder="Enter value"
      error={errors.brokeragepricingValue?.message}
      {...register("brokeragepricingValue", { 
        required: "Value is required",
        valueAsNumber: true 
      })}
    />
  </div>
</div> */}
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
                            // <CustomInput
                            //   id="brokerage"
                            //   label="Brokerage Amount"
                            //   type="number"
                            //   placeholder="Brokerage amount"
                            //   prefix="₹"
                            //   {...register("brokerage", {
                            //     valueAsNumber: true,
                            //   })}

                            // />

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Brokerage Price
                                </label>
                                <select
                                  {...register("brokeragepricingType", {
                                    required: "Pricing type is required",
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                >
                                  <option value="">Select Pricing Type</option>
                                  <option value="PERCENTAGE">
                                    Percentage (%)
                                  </option>
                                  <option value="MONTH_RENT">Month Rent</option>
                                </select>
                                {errors.brokeragepricingType && (
                                  <p className="text-red-500 text-xs">
                                    {errors.brokeragepricingType.message}
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Brokerage Pricing Value
                                </label>
                                <CustomInput
                                  id="brokeragepricingValue"
                                  type="number"
                                  placeholder="Enter value"
                                  error={errors.brokeragepricingValue?.message}
                                  {...register("brokeragepricingValue", {
                                    required: "Value is required",
                                    valueAsNumber: true,
                                  })}
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
                            error={errors.youtubeEmbedLink?.message} // ✅ Pass the error to input
                            {...register("youtubeEmbedLink", {
                              required: "This field is required", // ✅ Required validation
                            })}
                          />
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
                            <Controller
                              name="imageGallery"
                              control={control}
                              rules={{
                                required: "Please upload at least one image",
                                validate: (files) =>
                                  files && files.length > 0
                                    ? true
                                    : "Please select at least one image",
                              }}
                              render={({
                                field: { onChange, ref, ...fieldProps },
                              }) => (
                                <>
                                  <input
                                    type="file"
                                    id="imageGallery"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                      const files = Array.from(
                                        e.target.files ?? []
                                      );
                                      onChange(files); // Update RHF state
                                      handleImageUpload(e); // Custom handler
                                    }}
                                  />

                                  {errors.imageGallery && (
                                    <p className="text-sm text-red-500 mt-1">
                                      {errors.imageGallery.message}
                                    </p>
                                  )}
                                </>
                              )}
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

                        <div className="space-y-4">
                          <CustomInput
                            id="ogTitle"
                            label="OG Meta Title"
                            placeholder="Enter OG title"
                            error={errors.ogTitle?.message}
                            {...register("ogTitle", {
                              required: "OG title is required",
                            })}
                          />
                        </div>

                        <div className="space-y-4">
                          <CustomInput
                            id="ogDescription"
                            label="OG Meta Description"
                            placeholder="Enter OG description"
                            error={errors.ogDescription?.message}
                            {...register("ogDescription", {
                              required: "OG description is required",
                            })}
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-gray-700">
                            OG Meta Image (WhatsApp/Social Sharing)
                          </label>
                          <input
                            id="ogImage"
                            type="file"
                            accept="image/*"
                            className={cn(
                              "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm",
                              errors.ogImage && "border-red-500"
                            )}
                            {...register("ogImage", {
                              required:
                                "OG image is required for social sharing",
                            })}
                          />
                          {errors.ogImage && (
                            <p className="text-red-500 text-xs">
                              {errors.ogImage.message as string}
                            </p>
                          )}
                        </div>
<div className="mt-5">
                    <CustomTextarea
                      id="note"
                      label="Property Notes"
                      placeholder="Enter Property Notes"
                      className="min-h-[100px]"
                      error={errors.note?.message}
                      {...register("note", {
                        required: "Notes are required",
                      })}
                    />
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
                        className="font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-sm"
                        onClick={async (e) => {
                          const valid = await trigger();
                          if (!valid) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Publish
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-sm"
                        onClick={async () => {
                          const valid = await trigger();
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
