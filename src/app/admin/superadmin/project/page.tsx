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
   ogTitle: string;      
  ogDescription: string; 
  ogImage: FileList;  
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
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
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

  const { isSuccess, isLoading, isError, isProjectAdded } = useAppSelector((state) => state.projects);
  const [openAddProjectModal, setOpenAddProjectModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors,
  } = useForm<ProjectFormInputs>();

  const { featureData } = useAppSelector((state) => state.features);
  const { userData } = useAppSelector((state) => state.user);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    setSelectedImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const title = watch("title");
  const stepFields: Record<number, (keyof ProjectFormInputs)[]> = {
    0: ["title", "slug", "subTitle", "description", "service", "projectType"],
    1: ["locality", "city", "state"],
    2: ["areaRangeMin", "areaRangeMax", "reraNumber", "availability", "reraPossessionDate"],
    3: ["priceRangeMin", "priceRangeMax", "pricePerSqFt"],
    4: ["aminities", "bankOfApproval"],
     5: [
    "imageGallery", 
    "ogTitle",       
    "ogDescription", 
    "ogImage"        
  ],
  };

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
      priceRange: { min: data.priceRangeMin, max: data.priceRangeMax },
      imageGallery: selectedImages,
    };
    try {
      dispatch(createProjectsByBuilder({ userdata: formData })).then((res) => {
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
    { id: "basic-details", title: "Basic Details", subtitle: "Add basic details" },
    { id: "Project-location", title: "Project Location", subtitle: "Where is your Project located?" },
    { id: "Project-details", title: "Project Details", subtitle: "Tell us about your Project" },
    { id: "price-details", title: "Price Details", subtitle: "Add pricing and details" },
    { id: "amenities-details", title: "Amenities Details", subtitle: "Add amenities / unique features" },
    { id: "photo-gallery", title: "Photo Gallery", subtitle: "Add photos of your Project" },
  ];

  const handleNext = async () => {
    const ok = await trigger(stepFields[currentStep] as any);
    if (!ok) return;
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex ">
      <RoleRedirect role="ADMIN" />
      <div className="flex flex-col p-4">
        <div className="flex flex-col w-full">
          <div className="w-full px-4 py-2">
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

          {openAddProjectModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-full flex flex-row gap-6 px-28 h-[90vh]">
                <div className="w-68 bg-white border border-slate-200 rounded-xl shadow-lg p-4 h-fit">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-700">Add Project</h2>
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
                        className={cn(
                          "relative border-l-4 pb-3 transition-colors",
                          index === steps.length - 1 ? "border-transparent" : "",
                          currentStep === index ? "border-blue-600" : "border-slate-200"
                        )}
                      >
                        <div
                          className="ml-4 hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                          onClick={() => setCurrentStep(index)}
                        >
                          <h3 className={cn("font-medium text-sm", currentStep === index ? "text-blue-600" : "text-slate-500")}>
                            {step.title}
                          </h3>
                          <p className="text-xs text-slate-400">{step.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <form onSubmit={handleSubmit(submitForm)} className="flex flex-col h-full">
                    {/* SCROLLABLE BODY */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                      {currentStep === 0 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                          <div>
                            <h2 className="text-2xl font-semibold text-slate-800">Basic Details</h2>
                            <p className="text-slate-500 text-sm">Add basic details</p>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                              <input
                                id="title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                {...register("title", { required: "Title is required" })}
                              />
                              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                              <input id="slug" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-100 cursor-not-allowed" {...register("slug")} readOnly />
                            </div>
                            <div>
                              <label htmlFor="subTitle" className="block text-sm font-medium text-gray-700 mb-1">Project Subtitle</label>
                              <input id="subTitle" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" {...register("subTitle", { required: "subTitle is required" })} />
                              {errors.subTitle && <p className="text-red-500 text-sm mt-1">{errors.subTitle.message}</p>}
                            </div>
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <textarea id="description" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm min-h-[90px]" {...register("description", { required: "Description is required" })} />
                              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                            </div>
                            <div className="flex flex-row gap-10">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                                <div className="flex space-x-6">
                                  <Controller name="service" control={control} defaultValue="SELL" render={({ field }) => (
                                    <>
                                      {["SELL", "RENT"].map((type) => (
                                        <label key={type} className="flex items-center">
                                          <input type="radio" value={type} checked={field.value === type} onChange={() => field.onChange(type)} className="h-4 w-4 text-blue-600" />
                                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                                        </label>
                                      ))}
                                    </>
                                  )} />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                                <div className="flex space-x-6">
                                  <Controller name="projectType" control={control} defaultValue="RESIDENTIAL" render={({ field }) => (
                                    <>
                                      {["RESIDENTIAL", "COMMERCIAL"].map((type) => (
                                        <label key={type} className="flex items-center">
                                          <input type="radio" value={type} checked={field.value === type} onChange={() => field.onChange(type)} className="h-4 w-4 text-blue-600" />
                                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                                        </label>
                                      ))}
                                    </>
                                  )} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                          <div>
                            <h2 className="text-2xl font-semibold text-slate-800">Project Location</h2>
                            <p className="text-slate-500 text-sm">Where is your Project located?</p>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                              <input id="locality" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("locality", { required: "Locality is required" })} />
                              {errors.locality && <p className="text-red-500 text-xs mt-1">{errors.locality.message}</p>}
                            </div>
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                              <input id="city" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("city", { required: "City is required" })} />
                              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                            </div>
                            <div>
                              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                              <input id="state" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("state", { required: "State is required" })} />
                              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                          <div>
                            <h2 className="text-2xl font-semibold text-slate-800">Project Details</h2>
                            <p className="text-slate-500 text-sm">Tell us about your Project</p>
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Min Area (Sq.Ft)</label>
                                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("areaRangeMin", { required: "Required", valueAsNumber: true })} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Max Area (Sq.Ft)</label>
                                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("areaRangeMax", { required: "Required", valueAsNumber: true })} />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">RERA Number</label>
                              <input className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("reraNumber", { required: "RERA Number is required" })} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">RERA Possession Date</label>
                              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("reraPossessionDate", { required: "Required" })} />
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                          <div>
                            <h2 className="text-2xl font-semibold text-slate-800">Price Details</h2>
                            <p className="text-slate-500 text-sm">Add pricing and details</p>
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Min Price (₹)</label>
                                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("priceRangeMin", { required: "Required", valueAsNumber: true })} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Max Price (₹)</label>
                                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("priceRangeMax", { required: "Required", valueAsNumber: true })} />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Price Per Sq.Ft</label>
                              <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("pricePerSqFt", { required: "Required", valueAsNumber: true })} />
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 4 && (
                        <section className="w-full space-y-6 animate-in fade-in duration-500">
                          <header className="space-y-1">
                            <h2 className="text-2xl font-semibold text-slate-800">Aminities Details</h2>
                            <p className="text-sm text-slate-500">Add aminities / unique features</p>
                          </header>
                          <div className="grid gap-8 lg:grid-cols-3">
                            <div className="flex flex-col">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Aminities <span className="text-red-500">*</span></label>
                              <div className="space-y-4 max-h-72 overflow-y-auto pr-1.5">
                                {featureData?.filter((item) => item?.type === "AMENITIES").map((category) => (
                                  <fieldset key={category.type} className="border border-gray-300 rounded-md p-4">
                                    <legend className="px-2 font-medium text-gray-700">{category.type.replace("_", " ")}</legend>
                                    <div className="space-y-1">
                                      {category.features?.map((feature) => (
                                        <label key={feature._id} className="flex items-center space-x-2 text-sm text-gray-700">
                                          <input type="checkbox" value={feature._id} {...register("aminities", { required: "Select at least one" })} className="h-4 w-4 text-blue-600" />
                                          <span>{feature.name}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </fieldset>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Availability <span className="text-red-500">*</span></label>
                              <div className="space-y-4">
                                {featureData?.filter((item) => item?.type === "AVAILABILITY").map((category) => (
                                  <fieldset key={category.type} className="border border-gray-300 rounded-md p-4">
                                    <legend className="px-2 font-medium text-gray-700">{category.type.replace("_", " ")}</legend>
                                    <div className="space-y-1">
                                      {category.features?.map((feature) => (
                                        <label key={feature._id} className="flex items-center space-x-2 text-sm text-gray-700">
                                          <input type="radio" value={feature._id} {...register("availability", { required: "Required" })} />
                                          <span>{feature.name}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </fieldset>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Approvals <span className="text-red-500">*</span></label>
                              <div className="space-y-4">
                                {featureData?.filter((item) => item?.type === "BANKS").flatMap((item) => item.features.map((bank) => (
                                  <label key={bank._id} className="flex items-center space-x-2 text-sm text-gray-700">
                                    <input type="radio" value={bank._id} {...register("bankOfApproval", { required: "Required" })} />
                                    <span>{bank.name}</span>
                                  </label>
                                )))}
                              </div>
                            </div>
                          </div>
                        </section>
                      )}

                      {currentStep === 5 && (
                        <div className="space-y-8 pb-10 animate-in fade-in duration-500">
                          <div>
                            <h2 className="text-2xl font-semibold text-slate-800">Photo Gallery & SEO</h2>
                            <p className="text-slate-500 text-sm">Add visuals and social media metadata</p>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Youtube Link</label>
                              <input className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" {...register("youtubeEmbedLink")} />
                            </div>
                            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-md border border-slate-200 w-fit">
                              <input type="checkbox" id="isFeatured" {...register("isFeatured")} className="h-4 w-4 text-blue-600" />
                              <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">Mark as Featured Project</label>
                            </div>
                            <div className="space-y-4 border-t pt-6">
                              <h3 className="text-lg font-semibold text-gray-800">Project Images</h3>
                              <Controller name="imageGallery" control={control} rules={{ required: "At least one image is required" }} render={({ field: { onChange, onBlur, ref } }) => (
                                <input type="file" multiple accept="image/*" ref={ref} onBlur={onBlur} className="w-full border p-2 rounded-md bg-white border-dashed border-slate-400" onChange={(e) => {
                                  const files = Array.from(e.target.files ?? []);
                                  onChange(files);
                                  handleImagePreview(e);
                                }} />
                              )} />
                              <div className="flex gap-3 mt-2 flex-wrap">
                                {previewImages.map((src, idx) => (
                                  <img key={idx} src={src} className="w-20 h-20 rounded-lg object-cover border border-slate-200" />
                                ))}
                              </div>
                            </div>
                            <div className="border-t pt-6">
                              <h3 className="text-xl font-bold text-slate-800 mb-6">OG Meta Fields</h3>
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                <div className="md:col-span-7 space-y-5">
                                  <div>
                                    <label className="block text-sm font-semibold text-gray-700">Meta Title</label>
                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("ogTitle", { required: "Required" })} />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-semibold text-gray-700">Meta Description</label>
                                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md" {...register("ogDescription", { required: "Required" })} />
                                  </div>
                                </div>
                                <div className="md:col-span-5">
                                  <label className="block text-sm font-semibold text-gray-700">Social Share Image</label>
                                  <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                                    <input type="file" accept="image/*" {...register("ogImage", { required: "Required" })} />
                                    <div className="w-full aspect-video bg-white mt-4 rounded-lg overflow-hidden">
                                      {watch("ogImage")?.[0] && <img src={URL.createObjectURL(watch("ogImage")[0])} className="w-full h-full object-cover" />}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* FIXED FOOTER (Outside Scrollable Body) */}
                    <div className="flex justify-between items-center p-6 border-t border-slate-200 bg-white shrink-0">
                      {isLoading ? (
                        <span className="w-full bg-blue-200 text-center p-3 rounded-sm text-2xl animate-pulse">
                          Project is Being Added...
                        </span>
                      ) : (
                        <>
                          <CustomButton type="button" variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                            Back
                          </CustomButton>

                          {currentStep === steps.length - 1 ? (
                            <CustomButton type="submit">Publish</CustomButton>
                          ) : (
                            <CustomButton type="button" onClick={handleNext}>
                              Next
                            </CustomButton>
                          )}
                        </>
                      )}
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