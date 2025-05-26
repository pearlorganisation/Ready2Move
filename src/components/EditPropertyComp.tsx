'use client';
import React, { useEffect, useRef, useState } from 'react';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { axiosInstance } from '@/lib/constants/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/dispatchHook';
import { getSingleProject } from '@/lib/redux/actions/projectAction';
import { getSingleProperty } from '@/lib/redux/actions/propertyAction';
import { useRouter } from "next/navigation"; // ✅ App Router
import { getFeatures } from '@/lib/redux/actions/featuresAction';
import Image from 'next/image';

export interface Property {
  _id?: string;
  title: string; //
  subTitle: string;//
  description: string;//
  locality: string;//
  city: string;//
  state: string;//
  priceRange: { min:number; max: number };
  area: {  //
    name: "CARPET_AREA" | "BUILT_UP_AREA" | "SUPER_AREA";
    area: number;
    areaMeasurement: "SQ_FT" | "SQ_M";
  }[];
  aminities:  string[];//
  reraNumber: string;//
  reraPossessionDate: string;//
  youtubeEmbedLink: string;//
  service: 'BUY' | 'RENT';//
  property: 'RESIDENTIAL' | 'COMMERCIAL';//
  isFeatured: boolean;//
  propertyType:string;//
  apartmentName:string;//
  apartmentNo:string;//
  noOfBedrooms:number;
  noOfBathrooms:number;
  noOfBalconies:number;
  parking: string;
  furnishing:string;
  entranceFacing:string;
  availability:string;
  propertyAge:string;
  isOCAvailable:boolean;
  isCCAvailable:boolean;
  ownership: string;
  expectedPrice:number;
  isPriceNegotiable:boolean;
  isBrokerageCharge:boolean;
  brokerage:number;
  bankOfApproval:string;
  waterSource: string;
  otherFeatures: string[];
  propertyFlooring: string;
  imageGallery: File[]    // will add late

}
 
const EditProPertyComp = ({slug}:{slug:string}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter()
  const dispatch=useAppDispatch();
  const { singlePropertyData, paginate } = useAppSelector((state) => state.property);
  const { featureData } = useAppSelector(state=> state.features);
  useEffect(()=>{
    dispatch(getSingleProperty({slug:slug}))
  },[])
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { register, handleSubmit, reset, control, setValue, formState: { errors }, watch } = useForm<Property>({
    defaultValues: {
      service: 'RENT',
      property: 'RESIDENTIAL',
      title: '',
      subTitle: '',
      description: '',
      locality: '',
      city: '',
      state: '',
      area: [],
      reraNumber: '',
      reraPossessionDate: '',
      youtubeEmbedLink: '',
      isFeatured: false,
      aminities: [],
      priceRange: {min:0, max:0},
      propertyType:"",
      apartmentName:"",
      apartmentNo:"",
      noOfBedrooms:0,
      noOfBathrooms:0,
      noOfBalconies:0,
      parking: "",
      furnishing:"",
      entranceFacing:"",
      availability:"",
      propertyAge:"",
      isOCAvailable:false,
      isCCAvailable:false,
      ownership: "",
      expectedPrice:0,
      isPriceNegotiable:false,
      isBrokerageCharge:false,
      brokerage:0,
      bankOfApproval:"",
      waterSource: "",
      otherFeatures:[],
      propertyFlooring:""
    },
  });

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const files = Array.from(e.target.files);
      setValue("imageGallery", files);
      setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    };
  
   useEffect(() => {
    
    if (singlePropertyData) {
     
      setValue('title', singlePropertyData.title || '');
      setValue('subTitle', singlePropertyData.subTitle || '');
      setValue('description', singlePropertyData.description || '');
      setValue('locality', singlePropertyData.locality || '');
      setValue('city', singlePropertyData.city || '');
      setValue('state', singlePropertyData.state || '');
       const mappedArea = singlePropertyData.area?.map((item) => ({
        ...item,
        areaMeasurement: item.areaMeasurement as "SQ_FT" | "SQ_M",
        name: item.name as "CARPET_AREA" | "BUILT_UP_AREA" | "SUPER_AREA",
      })) || [];
      setValue('area', mappedArea);
      setValue('reraNumber', singlePropertyData.reraNumber || '');
       const formattedDate = singlePropertyData.reraPossessionDate
        ? singlePropertyData.reraPossessionDate.split("T")[0]
        : '';
      setValue('reraPossessionDate', formattedDate);
      setValue('youtubeEmbedLink', singlePropertyData.youtubeEmbedLink || '');
      setValue('isFeatured', singlePropertyData.isFeatured ?? false);
      const mappedAmenities = singlePropertyData.aminities?.map((item) => item._id) || [];
      setValue('aminities', mappedAmenities);
      setValue('isFeatured', singlePropertyData?.isFeatured)
      setValue('noOfBedrooms', singlePropertyData?.noOfBedrooms)
      setValue('noOfBathrooms', singlePropertyData?.noOfBathrooms)
      setValue('noOfBalconies', singlePropertyData?.noOfBalconies)
      setValue('parking', singlePropertyData?.parking?._id)
      setValue('furnishing', singlePropertyData?.furnishing?._id)
      setValue('entranceFacing', singlePropertyData?.entranceFacing?._id)
      setValue('availability', singlePropertyData?.availability?._id)
      setValue('propertyAge', singlePropertyData?.propertyAge?._id)
      setValue('expectedPrice', singlePropertyData?.expectedPrice)
      setValue('isPriceNegotiable', singlePropertyData?.isPriceNegotiable)
      setValue('isBrokerageCharge', singlePropertyData?.isBrokerageCharge)
      setValue('brokerage', singlePropertyData?.brokerage)
      setValue('waterSource', singlePropertyData?.waterSource?._id)
      setValue('propertyFlooring', singlePropertyData?.propertyFlooring?._id)
      const mappedOtherFeatures = singlePropertyData?.otherFeatures?.map((item)=> item._id) || [];
      setValue('otherFeatures', mappedOtherFeatures);
      setValue('bankOfApproval', singlePropertyData?.bankOfApproval?.[0]?._id);
      setValue('ownership', singlePropertyData?.ownership?._id);
      setValue('isOCAvailable', singlePropertyData?.isOCAvailable);
      setValue('isCCAvailable', singlePropertyData?.isCCAvailable);
      setValue('apartmentName', singlePropertyData?.apartmentName);
      setValue('apartmentNo', singlePropertyData?.apartmentNo);
      setValue('propertyType', singlePropertyData?.propertyType?._id);
    }                       
                                      
  }, [singlePropertyData, setValue]);     

  useEffect(()=>{
    dispatch(getFeatures())
  },[])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'area',
  });

const servicename= watch('service')
   console.log("the service name", servicename)
  const onSubmit = async (data: Property) => {
       const formData = new FormData();

      // ✅ Append Basic Details
      // formData.append("user", data?.id || "");
      formData.append("title", data?.title || "");
      // formData.append("slug", data?.slug || "");
      formData.append("subTitle", data?.subTitle || "");
      formData.append("description", data?.description || "");
      formData.append("service", data?.service);
      formData.append("property", data?.property || "RESIDENTIAL");
      formData.append("propertyType", data?.propertyType || "");

      // ✅ Append Location Details
      formData.append("apartmentName", data?.apartmentName || "");
      formData.append("apartmentNo", data?.apartmentNo || "");
      formData.append("locality", data?.locality || "");
      formData.append("city", data?.city || "");
      formData.append("state", data?.state || "");

      // ✅ Append Property Size & Configuration
      data?.area?.forEach((areaItem, index) => {
        formData.append(`area[${index}][name]`, areaItem.name);
        formData.append(`area[${index}][area]`, areaItem.area.toString());
        formData.append(
          `area[${index}][areaMeasurement]`,
          areaItem.areaMeasurement
        );
      });

      // if (data?.area) {
      //   formData.append("area[area]", data.area.toString());
      //   formData.append("area[measurement]", data.measurement);
      // }

      // formData.append(
      //   "propertyFloor",
      //   data?.propertyFloor?.toString() || "0"
      // );
      // formData.append("totalFloors", data?.totalFloors?.toString() || "0");
      // formData.append("roadWidth", data?.roadWidth?.toString() || "0");

      // ✅ Append Legal & Registration
      if (data?.reraNumber)
        formData.append("reraNumber", data.reraNumber);
      if (data?.reraPossessionDate)
        formData.append(
          "reraPossessionDate",
          data.reraPossessionDate
        );

      // ✅ Append Property Features
      formData.append(
        "noOfBedrooms",
        data?.noOfBedrooms?.toString() || "0"
      );
      formData.append(
        "noOfBathrooms",
        data?.noOfBathrooms?.toString() || "0"
      );
      formData.append(
        "noOfBalconies",
        data?.noOfBalconies?.toString() || "0"
      );
      formData.append("parking", data?.parking || "");
      formData.append("furnishing", data?.furnishing || "");
      formData.append("entranceFacing", data?.entranceFacing || "");
      formData.append("availability", data?.availability || "");
      formData.append("propertyAge", data?.propertyAge || "");
      formData.append(
        "isOCAvailable",
        data?.isOCAvailable ? "true" : "false"
      );
      formData.append(
        "isCCAvailable",
        data?.isCCAvailable ? "true" : "false"
      );
      formData.append("ownership", data?.ownership || "");

      // ✅ Append Pricing & Charges
      formData.append(
        "expectedPrice",
        data?.expectedPrice?.toString() || "0"
      );
      formData.append(
        "isPriceNegotiable",
        data?.isPriceNegotiable ? "true" : "false"
      );
      formData.append(
        "isBrokerageCharge",
        data?.isBrokerageCharge ? "true" : "false"
      );
      formData.append("brokerage", data?.brokerage?.toString() || "0");
      // formData.append(
      //   "maintenanceCharge",
      //   data?.maintenanceCharge?.toString() || "0"
      // );
      // formData.append(
      //   "maintenanceFrequency",
      //   data?.maintenanceFrequency || ""
      // );

      // ✅ Append Financial & Legal
      if (Array.isArray(data?.bankOfApproval)) {
        data.bankOfApproval.forEach((bank) => {
          formData.append("bankOfApproval", bank);
        });
      }

      // ✅ Append Amenities & Features
      if (Array.isArray(data?.aminities)) {
        data.aminities.forEach((amenity) => {
          formData.append("aminities", amenity);
        });
      }

      formData.append("waterSource", data?.waterSource || "");

      if (Array.isArray(data?.otherFeatures)) {
        data.otherFeatures.forEach((feature) => {
          formData.append("otherFeatures", feature);
        });
      }

      formData.append("propertyFlooring", data?.propertyFlooring || "");
      // formData.append("powerBackup", data?.powerBackup || "");

      // if (Array.isArray(data?.nearbyLandmarks)) {
      //   data.nearbyLandmarks.forEach((landmark) => {
      //     formData.append("nearbyLandmarks", landmark);
      //   });
      // }

      // ✅ Append Media
      if (Array.isArray(data?.imageGallery)) {
        data.imageGallery.forEach((file) => {
          formData.append("imageGallery", file);
        });
      }

      if (data?.youtubeEmbedLink) {
        formData.append("youtubeEmbedLink", data.youtubeEmbedLink);
      }

      formData.append("isFeatured", data?.isFeatured ? "true" : "false");

      const config = {
        headers:{
             "Content-Type": 'multipart/form-data' 
          }
      }
    try {
      await axiosInstance.patch(`/api/v1/properties/${slug}`, formData,config);
      alert('Property updated successfully!');
      // router.push('/admin/superadmin/property')
    } catch (err) {
      console.error(err);
      alert('Failed to update Property.');
    }
  };



  return (
      <>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Property</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title & Subtitle */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input {...register('title')} placeholder="Project Title" className="w-full p-3 border rounded-md" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input {...register('subTitle')} placeholder="Project Subtitle" className="w-full p-3 border rounded-md" />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea {...register('description')} placeholder="Description" rows={4} className="w-full p-3 border rounded-md" />
              </div>

              {/* Location Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                <input {...register('locality')} placeholder="Locality" className="w-full p-3 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input {...register('city')} placeholder="City" className="w-full p-3 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input {...register('state')} placeholder="State" className="w-full p-3 border rounded-md" />
              </div>

              Price Range
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Min</label>
                <input {...register('priceRange.min')} placeholder="Price Min" type="number" className="w-full p-3 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Max</label>
                <input {...register('priceRange.max')} placeholder="Price Max" type="number" className="w-full p-3 border rounded-md" />
              </div>

              {/* Area Range */}
            
              {fields.map((item, index) => (
                <div key={item.id} className="space-y-2">
                  <select {...register(`area.${index}.name`)}>
                    <option value="CARPET_AREA">Carpet Area</option>
                    <option value="BUILT_UP_AREA">Built-Up Area</option>
                    <option value="SUPER_AREA">Super Area</option>
                  </select>
                  
                  <input
                    type="number"
                    {...register(`area.${index}.area`)}
                    placeholder="Enter Area"
                  />
                  
                  <select {...register(`area.${index}.areaMeasurement`)}>
                    <option value="SQ_FT">SQ.FT</option>
                    <option value="SQ_M">SQ.M</option>
                  </select>
                </div>
              ))}

              {/* RERA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RERA Number</label>
                <input {...register('reraNumber')} placeholder="RERA Number" className="w-full p-3 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Possession Date</label>
                <input {...register('reraPossessionDate')} type="date" className="w-full p-3 border rounded-md" />
              </div>
               
               {/** previously not used fields */}
               <div> 
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No Of Bedrooms</label>
                      <input
                        type="number"
                        {...register(`noOfBedrooms`)}
                        placeholder="Enter No of Bedrooms"
                        className='w-full p-3 border rounded-md'
                      />
                  </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No Of Bathrooms</label>
                      <input
                        type="number"
                        {...register(`noOfBathrooms`)}
                        placeholder="Enter No of No Of Bathrooms"
                        className='w-full p-3 border rounded-md'
                      />
                  </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No Of Balconies</label>
                      <input
                        type="number"
                        {...register(`noOfBalconies`)}
                        placeholder="Enter No of Bedrooms"
                        className='w-full p-3 border rounded-md'
                      />
                  </div>
               
 
               </div>
                 {/** Section for the aminities */}
                  <div>
                    {featureData
                    ?.filter((item) => item?.type == "AMENITIES")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="checkbox"
                              id={`amenity-${feature._id}`}
                              {...register("aminities")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>
                  
    
                  <div>
                      {featureData
                      ?.filter((item) => item?.type == "PARKING")
                      ?.map((category) => (
                        <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                          <legend className="px-2 font-medium text-gray-700">
                            {category.type.replace("_", " ")}
                          </legend>
                          {category?.features?.map((feature) => (
                            <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                              <input
                                type="checkbox"
                                id={`parking-${feature._id}`}
                                {...register("parking")}
                                value={feature._id}
                                
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                                {feature.name}
                              </label>
                            </div>
                          ))}
                        </fieldset>
                      ))}
                  </div>
                  <div>
                      {featureData
                      ?.filter((item) => item?.type == "FURNISHING")
                      ?.map((category) => (
                        <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                          <legend className="px-2 font-medium text-gray-700">
                            {category.type.replace("_", " ")}
                          </legend>
                          {category?.features?.map((feature) => (
                            <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                              <input
                                type="checkbox"
                                id={`parking-${feature._id}`}
                                {...register("furnishing")}
                                value={feature._id}
                                
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                                {feature.name}
                              </label>
                            </div>
                          ))}
                        </fieldset>
                      ))}
                  </div>
                 

                  <div>
                    {featureData
                    ?.filter((item) => item?.type == "ENTRANCE_FACING")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`entranceFacing-${feature._id}`}
                              {...register("entranceFacing")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                    </div>
                    <div>
                    {featureData
                    ?.filter((item) => item?.type == "AVAILABILITY")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`availability-${feature._id}`}
                              {...register("availability")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>
                  
                  <div>
                    {featureData
                    ?.filter((item) => item?.type == "PROPERTY_AGE")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`propertyAge-${feature._id}`}
                              {...register("propertyAge")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>

                   <div>
                    {featureData
                    ?.filter((item) => item?.type == "OWNERSHIP")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`ownership-${feature._id}`}
                              {...register("ownership")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>

                  <div>
                    {featureData
                    ?.filter((item) => item?.type == "BANKS")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`bankOfApproval-${feature._id}`}
                              {...register("bankOfApproval")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>

                  <div>
                    {featureData
                    ?.filter((item) => item?.type == "WATER_SOURCE")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`waterSource-${feature._id}`}
                              {...register("waterSource")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>
                   <div>
                    {featureData
                    ?.filter((item) => item?.type == "OTHER_FEATURES")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="checkbox"
                              id={`otherFeatures-${feature._id}`}
                              {...register("otherFeatures")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>

                  <div>
                    {featureData
                    ?.filter((item) => item?.type == "FLOORING")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`propertyFlooring-${feature._id}`}
                              {...register("propertyFlooring")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>
                  
                  <div>
                    {featureData
                    ?.filter((item) => item?.type == "PROPERTY_TYPE")
                    ?.map((category) => (
                      <fieldset key={category.type} className="border  w-48  border-gray-300 rounded-md p-4">
                        <legend className="px-2 font-medium text-gray-700">
                          {category.type.replace("_", " ")}
                        </legend>
                        {category?.features?.map((feature) => (
                          <div key={feature._id} className="flex flex-row items-center space-x-2 py-1">
                            <input
                              type="radio"
                              id={`propertyType-${feature._id}`}
                              {...register("propertyType")}
                              value={feature._id}
                              
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${feature._id}`} className="text-sm text-gray-700">
                              {feature.name}
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    ))}
                  </div>
              {/* YouTube Link */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Embed Link</label>
                    <input {...register('youtubeEmbedLink')} placeholder="YouTube Link" className="w-full p-3 border rounded-md" />
                  </div>

              {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <select {...register('service')} className="w-full p-3 border rounded-md">
                      <option value="RENT">RENT</option>
                      <option value="BUY">BUY</option>
                    </select>
                  </div>

              {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select {...register('property')} className="w-full p-3 border rounded-md">
                      <option value="RESIDENTIAL">Residential</option>
                      <option value="COMMERCIAL">Commercial</option>
                    </select>
                  </div>

              {/* Featured */}
                  <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('isFeatured')}
                
                    />
                    <label className="text-sm text-gray-700">Mark as Featured Property</label>
                  </div>
                 
                  <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('isCCAvailable')}
                
                    />
                    <label className="text-sm text-gray-700">Is CC Available</label>
                  </div>
                  <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('isOCAvailable')}
                
                    />
                    <label className="text-sm text-gray-700">Is OC Available</label>
                  </div>
                   <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="input"
                      {...register('apartmentName')}
                
                    />
                    <label className="text-sm text-gray-700">Apartment Name</label>
                  </div>

                  <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="input"
                      {...register('apartmentNo')}
                
                    />
                    <label className="text-sm text-gray-700">Apartment Number</label>
                  </div>

                  <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('isPriceNegotiable')}
                
                    />
                    <label className="text-sm text-gray-700">Is Price Negotiable</label>
                  </div>
                  <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...register('isBrokerageCharge')}
                
                    />
                    <label className="text-sm text-gray-700">Is Brokerage</label>
                  </div>

                  <div className="col-span-2 flex items-center space-x-3">
                    <input
                      type="input"
                      {...register('brokerage')}
                
                    />
                    <label className="text-sm text-gray-700">Brokerage</label>
                  </div>
                  
                  <div>
                    {/* <label>Add Images</label>
                    <input 
                     type='file'
                     multiple
                     id="images"
                     {...register('imageGallery')}
                    /> */}
                <label>Add Images</label>
                  <input
                      type="file"
                      id="imageGallery"
                      multiple
                      accept="image/*"
                      // className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                  </div>
              {/* Submit Button */}
              <div className="col-span-2">
                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
                  Update Property
                </button>
              </div>
            </form>
            {/** already posted images */}
          
          
          <div className="flex flex-wrap gap-2.5">  
            {singlePropertyData?.imageGallery?.map((item: { secure_url: string; public_id: string; id?: string }, index: number) => (
              <div
                key={item.public_id || item.id || `gallery-img-${index}`}
                className="relative w-[200px] h-[150px] border border-gray-200 overflow-hidden"
              >
                <Image
                  src={item.secure_url}
                  alt={`Gallery image ${item.public_id || index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Still recommended
                />
    </div>
  ))}
          </div> 
          
         
          </div>

      </>


     
  );
};

export default EditProPertyComp;
