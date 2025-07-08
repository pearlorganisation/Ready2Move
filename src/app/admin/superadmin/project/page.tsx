"use client";
import { Sidebar } from "@/components/sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getFeatures } from "@/lib/redux/actions/featuresAction";
import {
  createProjectsByBuilder,
  getAllProjects,
} from "@/lib/redux/actions/projectAction";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import slugify from "slugify";
import ProjectListing from "../projectlist/page";
import { cn } from "@/lib/util/cn";
import RoleRedirect from "@/components/RoleBasedComponent";

export type ProjectFormInputs = {
  id: string;
  user: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  service: "SELL" | "RENT";
  projectType: "RESIDENTIAL" | "COMMERCIAL";
  areaRangeMin: number;
  areaRangeMax: number;
  priceRangeMin: number;
  priceRangeMax: number;
  pricePerSqFt: number;
  reraNumber: string;
  availability: string;
  reraPossessionDate: string;
  aminities?: string[];
  bankOfApproval?: string[];
  imageGallery?: File[];
  isFeatured?: boolean;
  youtubeEmbedLink?: string;
};
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

const CreateProject = () => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const { isSuccess, isLoading, isError, isProjectAdded } = useAppSelector(
    (state) => state.projects
  );
  /** for opening the Project for adding project and updating the project and deleting the project */
  const [openAddProjectModal, setOpenAddProjectModal] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    trigger, // <- ADD THIS
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors,
  } = useForm<ProjectFormInputs>();

  const { featureData } = useAppSelector((state) => state.features);
  const { userData } = useAppSelector((state) => state.user);
  console.log("the userdata is", userData);
  // Handle image preview
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files) as File[];
    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const title = watch("title");
  /** Fields that must be valid before the user can leave a step */
  const stepFields: Record<number, (keyof ProjectFormInputs)[]> = {
    0: [
      // Basic Details
      "title",
      "slug",
      "subTitle",
      "description",
      "service",
      "projectType",
    ],
    1: [
      // Project Location
      "locality",
      "city",
      "state",
    ],
    2: [
      // Project Details
      "areaRangeMin",
      "areaRangeMax",
      "reraNumber",
      "availability",
      "reraPossessionDate",
    ],
    3: [
      // Price Details
      "priceRangeMin",
      "priceRangeMax",
      "pricePerSqFt",
    ],
    4: [
      // Amenities
      "aminities",
      "bankOfApproval",
    ],
    5: [
      // Photo Gallery
      "imageGallery",
    ],
  };

  /** handle for opening the add project modal */
  const handleOpenAddProject = () => {
    setOpenAddProjectModal(!openAddProjectModal);
  };

  useEffect(() => {
    if (title) {
      const titleSlug = slugify(title);
      setValue("slug", titleSlug);
    }
  }, [title, setValue]);

  const submitForm = (data: ProjectFormInputs) => {
    const formData = {
      ...data,
      user: userData._id,
      areaRange: { min: data.areaRangeMin, max: data.areaRangeMax },
      priceRange: {
        min: data.priceRangeMin,
        max: data.priceRangeMax,
      },
      imageGallery: selectedImages,
    };
    try {
      dispatch(createProjectsByBuilder({ userdata: formData })).then((res) => {
        console.log("the res", res);
        if (res?.payload?.success == true) {
          reset();
          setCurrentStep(0);
          setOpenAddProjectModal(false);
        } else {
          alert("Failed to Create the project");
        }
      });
    } catch (error) {
      console.log("the error is", error);
    }
  };

  useEffect(() => {
    dispatch(getFeatures());
  }, [dispatch]);

  const steps = [
    {
      id: "basic-details",
      title: "Basic Details",
      subtitle: "Add basic details",
    },
    {
      id: "Project-location",
      title: "Project Location",
      subtitle: "Where is your Project located?",
    },
    {
      id: "Project-details",
      title: "Project Details",
      subtitle: "Tell us about your Project",
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
      subtitle: "Add photos of your Project",
    },
  ];

  // const handleNext = () => {
  //   if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  //   console.log(currentStep, "handlenext");
  // };
  const handleNext = async () => {
    const ok = await trigger(stepFields[currentStep] as any); // validate only this step
    if (!ok) return; // stay put if invalid

    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  console.log(currentStep, "currentstep");
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    console.log(currentStep, "handleback");
  };

  // /** to reset the whole form */
  // const handleReset = () => {
  //   reset();
  //   setCurrentStep(0);
  // };

  return (
    <div className="flex ">
      {/* <Sidebar /> */}
      <RoleRedirect role="ADMIN" />
      <div className="flex flex-col p-4">
        <div className="flex  flex-col w-full">
          {/** add new project */}
          <div className="w-full  px-4 py-2">
            <div className="flex flex-row justify-between ">
              <div></div>
              <div>
                <button
                  className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition"
                  onClick={handleOpenAddProject}
                >
                  Add New Project
                </button>
              </div>
            </div>
          </div>
          {/* for adding project */}

          {openAddProjectModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-full flex flex-row gap-6 px-28">
                <div className="w-68 bg-white border border-slate-200 rounded-xl shadow-lg p-4">
                  {/* Header with Cancel Button */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-700">
                      Add Project
                    </h2>
                    <button
                      onClick={() => setOpenAddProjectModal(false)}
                      className="text-sm px-3 py-1.5 text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`relative border-l-4 pb-3 ${
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
                          <p className="text-xs text-slate-400">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1  max-h-[60vh]">
                  <form
                    onSubmit={handleSubmit(submitForm)}
                    className="max-w-4xl mx-auto"
                  >
                    <div className="flx flex-col">
                      <div className="bg-white rounded-lg shadow-sm border border-slate-200 ">
                        {/* Step Content */}
                        {/** reset button */}
                        {/* <div className="flex justify-end">
                          <button
                            onClick={handleReset}
                            className="p-1 text-base bg-red-100 rounded"
                          >
                            Reset
                          </button>
                        </div> */}

                        <div className="">
                          <div className="p-4 py-6">
                            {currentStep === 0 && (
                              <div className="space-y-6 max-h-[70vh]">
                                {/* Heading */}
                                <div>
                                  <h2 className="text-2xl font-semibold text-slate-800">
                                    Basic Details
                                  </h2>
                                  <p className="text-slate-500 text-sm">
                                    Add basic details
                                  </p>
                                </div>

                                <div className="space-y-4">
                                  {/* Title */}
                                  <div>
                                    <label
                                      htmlFor="title"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Project Title
                                    </label>
                                    <input
                                      id="title"
                                      placeholder="e.g. 2 BHK Apartment for Sale in Rustomjee Global City"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      {...register("title", {
                                        required: "Title is required",
                                      })}
                                    />
                                    {errors.title && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors.title.message}
                                      </p>
                                    )}
                                  </div>

                                  {/* Slug (read-only) */}
                                  <div>
                                    <label
                                      htmlFor="slug"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Slug
                                    </label>
                                    <input
                                      id="slug"
                                      placeholder="slug"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-100 cursor-not-allowed"
                                      {...register("slug")}
                                      readOnly
                                    />
                                  </div>

                                  {/* Subtitle */}
                                  <div>
                                    <label
                                      htmlFor="subTitle"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Project Subtitle (optional)
                                    </label>
                                    <input
                                      id="subTitle"
                                      placeholder="e.g. Kandivali West, Mumbai, Mahavir Nagar"
                                      className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                                        errors.subTitle
                                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                      }`}
                                      {...register("subTitle", {
                                        required: "subTitle is required",
                                      })}
                                    />
                                    {errors.subTitle && (
                                      <p className="text-red-500 text-sm mt-1">
                                        {errors.subTitle.message}
                                      </p>
                                    )}
                                  </div>

                                  {/* Description */}
                                  <div>
                                    <label
                                      htmlFor="description"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Project Description
                                    </label>
                                    <textarea
                                      id="description"
                                      placeholder="Describe your Project in detail"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[90px]"
                                      {...register("description", {
                                        required: "Description is required",
                                      })}
                                    />
                                    {errors.description && (
                                      <p className="text-red-500 text-xs ">
                                        {errors.description.message}
                                      </p>
                                    )}
                                  </div>

                                  {/* You're looking to */}
                                  <div className="flex flex-row gap-10">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        You're looking to
                                      </label>
                                      <div className="flex space-x-6">
                                        <Controller
                                          name="service"
                                          control={control}
                                          defaultValue="SELL"
                                          render={({ field }) => (
                                            <>
                                              {["SELL", "RENT"].map((type) => (
                                                <label
                                                  key={type}
                                                  className="flex items-center"
                                                >
                                                  <input
                                                    type="radio"
                                                    value={type}
                                                    checked={
                                                      field.value === type
                                                    }
                                                    onChange={() =>
                                                      field.onChange(type)
                                                    }
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                  />
                                                  <span className="ml-2 text-sm text-gray-700">
                                                    {type}
                                                  </span>
                                                </label>
                                              ))}
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>

                                    {/* Project Type */}
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Type
                                      </label>
                                      <div className="flex space-x-6">
                                        <Controller
                                          name="projectType"
                                          control={control}
                                          defaultValue="RESIDENTIAL"
                                          render={({ field }) => (
                                            <>
                                              {[
                                                "RESIDENTIAL",
                                                "COMMERCIAL",
                                              ].map((type) => (
                                                <label
                                                  key={type}
                                                  className="flex items-center"
                                                >
                                                  <input
                                                    type="radio"
                                                    value={type}
                                                    checked={
                                                      field.value === type
                                                    }
                                                    onChange={() =>
                                                      field.onChange(type)
                                                    }
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                  />
                                                  <span className="ml-2 text-sm text-gray-700">
                                                    {type}
                                                  </span>
                                                </label>
                                              ))}
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentStep === 1 && (
                              <div className="space-y-6">
                                <div>
                                  <h2 className="text-2xl font-semibold text-slate-800">
                                    Project Location
                                  </h2>
                                  <p className="text-slate-500 text-sm">
                                    Where is your Project located?
                                  </p>
                                </div>

                                {/* <div className="space-y-4">
                                        <div>
                                          <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-1">
                                            Locality
                                          </label>
                                          <input
                                            id="locality"
                                            placeholder="e.g. Andheri"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            {...register("locality", { required: "Locality is required" })}
                                          />
                                          {errors.locality && <p className="text-red-500 text-xs mt-1">{errors.locality.message}</p>}
                                        </div>

                                        <div>
                                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                          </label>
                                          <input
                                            id="city"
                                            placeholder="Enter city name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            {...register("city", { required: "City is required" })}
                                          />
                                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                        </div>

                                        <div>
                                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                            State
                                          </label>
                                          <input
                                            id="state"
                                            placeholder="Enter state name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            {...register("state", { required: "State is required" })}
                                          />
                                          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                        </div>
                                      </div> */}

                                <div className="space-y-4">
                                  {/* Locality */}
                                  <div>
                                    <label
                                      htmlFor="locality"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Locality
                                    </label>
                                    <input
                                      id="locality"
                                      placeholder="e.g. Andheri"
                                      className={`w-full px-4 py-2 border ${
                                        errors.locality
                                          ? "border-red-500"
                                          : "border-gray-300"
                                      } rounded-md shadow-sm focus:ring-2 ${
                                        errors.locality
                                          ? "focus:ring-red-500 focus:border-red-500"
                                          : "focus:ring-blue-500 focus:border-blue-500"
                                      }`}
                                      {...register("locality", {
                                        required: "Locality is required",
                                        minLength: {
                                          value: 3,
                                          message:
                                            "Locality must be at least 3 characters",
                                        },
                                        maxLength: {
                                          value: 100,
                                          message:
                                            "Locality can't exceed 100 characters",
                                        },
                                      })}
                                    />
                                    {errors.locality && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors.locality.message}
                                      </p>
                                    )}
                                  </div>

                                  {/* City */}
                                  <div>
                                    <label
                                      htmlFor="city"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      City
                                    </label>
                                    <input
                                      id="city"
                                      placeholder="Enter city name"
                                      className={`w-full px-4 py-2 border ${
                                        errors.city
                                          ? "border-red-500"
                                          : "border-gray-300"
                                      } rounded-md shadow-sm focus:ring-2 ${
                                        errors.city
                                          ? "focus:ring-red-500 focus:border-red-500"
                                          : "focus:ring-blue-500 focus:border-blue-500"
                                      }`}
                                      {...register("city", {
                                        required: "City is required",
                                        minLength: {
                                          value: 2,
                                          message:
                                            "City must be at least 2 characters",
                                        },
                                        maxLength: {
                                          value: 50,
                                          message:
                                            "City can't exceed 50 characters",
                                        },
                                      })}
                                    />
                                    {errors.city && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors.city.message}
                                      </p>
                                    )}
                                  </div>

                                  {/* State */}
                                  <div>
                                    <label
                                      htmlFor="state"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      State
                                    </label>
                                    <input
                                      id="state"
                                      placeholder="Enter state name"
                                      className={`w-full px-4 py-2 border ${
                                        errors.state
                                          ? "border-red-500"
                                          : "border-gray-300"
                                      } rounded-md shadow-sm focus:ring-2 ${
                                        errors.state
                                          ? "focus:ring-red-500 focus:border-red-500"
                                          : "focus:ring-blue-500 focus:border-blue-500"
                                      }`}
                                      {...register("state", {
                                        required: "State is required",
                                        minLength: {
                                          value: 2,
                                          message:
                                            "State must be at least 2 characters",
                                        },
                                        maxLength: {
                                          value: 50,
                                          message:
                                            "State can't exceed 50 characters",
                                        },
                                      })}
                                    />
                                    {errors.state && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors.state.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentStep === 2 && (
                              <div className="space-y-6">
                                <div>
                                  <h2 className="text-2xl font-semibold text-slate-800">
                                    Project Details
                                  </h2>
                                  <p className="text-slate-500 text-sm">
                                    Tell us about your Project
                                  </p>
                                </div>

                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label
                                        htmlFor="areaRangeMin"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                      >
                                        Minimum Area (Sq.Ft)
                                      </label>
                                      <input
                                        id="areaRangeMin"
                                        type="number"
                                        placeholder="Minimum area"
                                        onWheel={(e) =>
                                          (e.target as HTMLInputElement).blur()
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        {...register("areaRangeMin", {
                                          required: "Minimum area is required",
                                          valueAsNumber: true,
                                        })}
                                      />
                                      {errors.areaRangeMin && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {errors.areaRangeMin.message}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="areaRangeMax"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                      >
                                        Maximum Area (Sq.Ft)
                                      </label>
                                      <input
                                        id="areaRangeMax"
                                        type="number"
                                        placeholder="Maximum area"
                                        onWheel={(e) =>
                                          (e.target as HTMLInputElement).blur()
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        {...register("areaRangeMax", {
                                          required: "Maximum area is required",
                                          valueAsNumber: true,
                                        })}
                                      />
                                      {errors.areaRangeMax && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {errors.areaRangeMax.message}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="reraNumber"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      RERA Number
                                    </label>
                                    <input
                                      id="reraNumber"
                                      placeholder="Enter RERA Number"
                                      onWheel={(e) =>
                                        (e.target as HTMLInputElement).blur()
                                      }
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      {...register("reraNumber", {
                                        required: "RERA Number is required",
                                      })}
                                    />
                                    {errors.reraNumber && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors.reraNumber.message}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="reraPossessionDate"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      RERA Possession Date
                                    </label>
                                    <input
                                      id="reraPossessionDate"
                                      type="date"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      {...register("reraPossessionDate", {
                                        required:
                                          "RERA Possession Date is required",
                                      })}
                                    />
                                    {errors.reraPossessionDate && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors.reraPossessionDate.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentStep === 3 && (
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
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label
                                        htmlFor="priceRangeMin"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                      >
                                        Minimum Price (₹)
                                      </label>
                                      <input
                                        id="priceRangeMin"
                                        type="number"
                                        placeholder="Minimum price"
                                        onWheel={(e) =>
                                          (e.target as HTMLInputElement).blur()
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        {...register("priceRangeMin", {
                                          required: "Minimum price is required",
                                          valueAsNumber: true,
                                        })}
                                      />
                                      {errors.priceRangeMin && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {errors.priceRangeMin.message}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="priceRangeMax"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                      >
                                        Maximum Price (₹)
                                      </label>
                                      <input
                                        id="priceRangeMax"
                                        type="number"
                                        placeholder="Maximum price"
                                        onWheel={(e) =>
                                          (e.target as HTMLInputElement).blur()
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        {...register("priceRangeMax", {
                                          required: "Maximum price is required",
                                          valueAsNumber: true,
                                        })}
                                      />
                                      {errors.priceRangeMax && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {errors.priceRangeMax.message}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="pricePerSqFt"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Price Per Sq.Ft (₹)
                                    </label>
                                    <input
                                      id="pricePerSqFt"
                                      type="number"
                                      placeholder="Price per square foot"
                                      onWheel={(e) =>
                                        (e.target as HTMLInputElement).blur()
                                      }
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      {...register("pricePerSqFt", {
                                        required: "Price per sq.ft is required",
                                        valueAsNumber: true,
                                      })}
                                    />
                                    {errors.pricePerSqFt && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors.pricePerSqFt.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            {currentStep === 4 && (
                              <section className="w-full space-y-6">
                                {/* ────────── Heading ────────── */}
                                <header className="space-y-1">
                                  <h2 className="text-2xl font-semibold text-slate-800">
                                    Aminities Details
                                  </h2>
                                  <p className="text-sm text-slate-500">
                                    Add aminities / unique features
                                  </p>
                                </header>

                                {/* ────────── Three‑column layout (stacks on mobile) ────────── */}
                                <div className="grid gap-8 lg:grid-cols-3">
                                  {/* ────────── AMENITIES ────────── */}
                                  <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Aminities{" "}
                                      <span className="text-red-500">*</span>
                                    </label>

                                    {/* scrollable if many categories */}
                                    <div className="space-y-4 max-h-72 overflow-y-auto pr-1.5">
                                      {featureData
                                        ?.filter(
                                          (item) => item?.type === "AMENITIES"
                                        )
                                        ?.map((category) => (
                                          <fieldset
                                            key={category.type}
                                            className="border border-gray-300 rounded-md p-4"
                                          >
                                            <legend className="px-2 font-medium text-gray-700">
                                              {category.type.replace("_", " ")}
                                            </legend>

                                            <div className="space-y-1">
                                              {category.features?.map(
                                                (feature) => (
                                                  <label
                                                    key={feature._id}
                                                    htmlFor={`amenity-${feature._id}`}
                                                    className="flex items-center space-x-2 text-sm text-gray-700"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      id={`amenity-${feature._id}`}
                                                      value={feature._id}
                                                      {...register(
                                                        "aminities",
                                                        {
                                                          validate: (v) =>
                                                            (Array.isArray(v) &&
                                                              v.length > 0) ||
                                                            "Select at least one amenity",
                                                        }
                                                      )}
                                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span>{feature.name}</span>
                                                  </label>
                                                )
                                              )}
                                            </div>
                                          </fieldset>
                                        ))}
                                    </div>

                                    {errors.aminities && (
                                      <p className="text-red-500 text-sm mt-1">
                                        {errors.aminities.message as string}
                                      </p>
                                    )}
                                  </div>

                                  {/* ────────── AVAILABILITY ────────── */}
                                  <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Availability{" "}
                                      <span className="text-red-500">*</span>
                                    </label>

                                    <div className="space-y-4">
                                      {featureData
                                        ?.filter(
                                          (item) =>
                                            item?.type === "AVAILABILITY"
                                        )
                                        ?.map((category) => (
                                          <fieldset
                                            key={category.type}
                                            className="border border-gray-300 rounded-md p-4"
                                          >
                                            <legend className="px-2 font-medium text-gray-700">
                                              {category.type.replace("_", " ")}
                                            </legend>

                                            <div className="space-y-1">
                                              {category.features?.map(
                                                (feature) => (
                                                  <label
                                                    key={feature._id}
                                                    htmlFor={`availability-${feature._id}`}
                                                    className="flex items-center space-x-2 text-sm text-gray-700"
                                                  >
                                                    <input
                                                      type="radio"
                                                      value={feature._id}
                                                      {...register(
                                                        "availability",
                                                        {
                                                          required:
                                                            "Select availability",
                                                        }
                                                      )}
                                                      onChange={() => {
                                                        clearErrors(
                                                          "availability"
                                                        ); // ✅ Clears the error on change
                                                      }}
                                                    />

                                                    <span>{feature.name}</span>
                                                  </label>
                                                )
                                              )}
                                            </div>
                                          </fieldset>
                                        ))}
                                    </div>

                                    {errors.availability && (
                                      <p className="text-red-500 text-sm mt-1">
                                        {errors.availability.message as string}
                                      </p>
                                    )}
                                  </div>

                                  {/* ────────── BANK APPROVALS ────────── */}
                                  <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Bank Approvals{" "}
                                      <span className="text-red-500">*</span>
                                    </label>

                                    <div className="space-y-4">
                                      {featureData
                                        ?.filter(
                                          (item) => item?.type === "BANKS"
                                        )
                                        ?.flatMap((item) =>
                                          item.features.map((bank) => (
                                            <label
                                              key={bank._id}
                                              htmlFor={`bank-${bank._id}`}
                                              className="flex items-center space-x-2 text-sm text-gray-700"
                                            >
                                              <input
                                                type="radio"
                                                id={`bank-${bank._id}`}
                                                value={bank._id}
                                                {...register("bankOfApproval", {
                                                  required:
                                                    "Select an approving bank",
                                                })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                              />
                                              <span>{bank.name}</span>
                                            </label>
                                          ))
                                        )}
                                    </div>

                                    {errors.bankOfApproval && (
                                      <p className="text-red-500 text-sm mt-1">
                                        {
                                          errors.bankOfApproval
                                            .message as string
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </section>
                            )}

                            {currentStep === 5 && (
                              <div className="space-y-6">
                                <div>
                                  <h2 className="text-2xl font-semibold text-slate-800">
                                    Photo Gallery
                                  </h2>
                                  <p className="text-slate-500 text-sm">
                                    Add photos of your Project
                                  </p>
                                </div>

                                <div className="space-y-4">
                                  {/* ────── YouTube  Link ────── */}
                                  <div>
                                    <label
                                      htmlFor="youtubeLink"
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Youtube Link
                                    </label>
                                    <input
                                      id="youtubeLink"
                                      placeholder="e.g. https://www.youtube.com/watch?v=QaUAGTyl2Bk"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      {...register("youtubeEmbedLink", {
                                        required:
                                          "Please enter a valid YouTube link",
                                      })}
                                    />
                                    {errors.youtubeEmbedLink && (
                                      <p className="text-red-500 text-sm mt-1">
                                        {
                                          errors.youtubeEmbedLink
                                            .message as string
                                        }
                                      </p>
                                    )}

                                    {/* <p className="mt-1 text-sm text-gray-500">
                                      👉 Please paste the{" "}
                                      <strong>embed link</strong> (e.g.,{" "}
                                      <code>
                                        https://www.youtube.com/embed/VIDEO_ID
                                      </code>
                                      ).
                                      <br />
                                      To get it: Click "Share" → "Embed" on the
                                      YouTube video and copy the{" "}
                                      <strong>src</strong> from the iframe tag.
                                      <br />
                                      Example:
                                      <code className="block mt-1 bg-gray-100 p-1 rounded">
                                        &lt;iframe src="
                                        <span className="text-red-600">
                                          https://www.youtube.com/embed/VIDEO_ID
                                        </span>
                                        " /&gt;
                                      </code>
                                    </p> */}
                                  </div>

                                  {/* ────── Featured Toggle ────── */}
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="isFeatured"
                                        {...register("isFeatured")}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                      />
                                      <label
                                        htmlFor="isFeatured"
                                        className="text-sm text-gray-700"
                                      >
                                        Featured Project
                                      </label>
                                    </div>
                                  </div>

                                  {/* ────── Image Upload ────── */}
                                  <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                      Add images
                                    </h2>
                                    <Controller<ProjectFormInputs>
                                      name="imageGallery"
                                      control={control}
                                      rules={{
                                        validate: (files) =>
                                          Array.isArray(files) &&
                                          files.length > 0
                                            ? true
                                            : "At least one image is required",
                                      }}
                                      render={({
                                        field: { onChange, onBlur, value, ref },
                                      }) => (
                                        <>
                                          <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            id="imageGallery"
                                            ref={ref}
                                            onBlur={onBlur}
                                            className="w-full border p-2 rounded mt-1"
                                            onChange={(e) => {
                                              const files = Array.from(
                                                e.target.files ?? []
                                              );
                                              onChange(files); // update form value
                                              handleImagePreview(e); // optional preview
                                            }}
                                          />

                                          {errors.imageGallery && (
                                            <p className="text-red-500 text-sm mt-1">
                                              {
                                                errors.imageGallery
                                                  .message as string
                                              }
                                            </p>
                                          )}
                                        </>
                                      )}
                                    />

                                    {/* Image Preview */}
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                      {previewImages.map((src, idx) => (
                                        <img
                                          key={idx}
                                          src={src}
                                          alt="Preview"
                                          className="w-16 h-16 rounded-md object-cover"
                                        />
                                      ))}
                                    </div>

                                    {selectedImages.length === 0 &&
                                      errors.imageGallery && (
                                        <p className="text-red-500 text-sm">
                                          {(errors.imageGallery
                                            ?.message as string) ||
                                            "At least one image is required"}
                                        </p>
                                      )}

                                    {/* Image Preview */}
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                      {previewImages.map((src, index) => (
                                        <img
                                          key={index}
                                          src={src}
                                          alt="Preview"
                                          className="w-16 h-16 rounded-md object-cover"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between items-center p-6 border-t border-slate-200">
                            {isLoading ? (
                              <span className="w-full bg-blue-200 text-center p-3 rounded-sm text-2xl">
                                Project is Being Added...
                              </span>
                            ) : (
                              <>
                                <CustomButton
                                  type="button"
                                  variant="outline"
                                  onClick={handleBack}
                                  disabled={currentStep === 0}
                                >
                                  Back
                                </CustomButton>

                                {currentStep === steps.length - 1 ? (
                                  <CustomButton type="submit">
                                    Publish
                                  </CustomButton>
                                ) : (
                                  <CustomButton
                                    type="button"
                                    onClick={handleNext}
                                  >
                                    Next
                                  </CustomButton>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <ProjectListing />
      </div>
    </div>
  );
};

export default CreateProject;
