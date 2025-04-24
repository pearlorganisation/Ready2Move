'use client';
import React, { useEffect, useState } from 'react';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { axiosInstance } from '@/lib/constants/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/dispatchHook';
import { getSingleProject } from '@/lib/redux/actions/projectAction';
import { getSingleProperty } from '@/lib/redux/actions/propertyAction';

export interface Property {
  _id?: string;
  title: string;
  subTitle: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  priceRange: { min:number; max: number };
  area: {
    name: "CARPET_AREA" | "BUILT_UP_AREA" | "SUPER_AREA";
    area: number;
    areaMeasurement: "SQ_FT" | "SQ_M";
  }[];

  reraNumber: string;
  reraPossessionDate: string;
  youtubeEmbedLink: string;
  service: 'RENT' | 'SALE';
  property: 'RESIDENTIAL' | 'COMMERCIAL';
  isFeatured: boolean;
}


const EditProPertyComp = ({slug}:{slug:string}) => {
 

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Property| null>(null)
  const dispatch=useAppDispatch();
  const { singlePropertyData, paginate } = useAppSelector((state) => state.property);
  console.log(singlePropertyData.title,"project")
  
  useEffect(()=>{
    dispatch(getSingleProperty({slug:slug}))
  },[])

  const { register, handleSubmit, reset, control, setValue } = useForm<Property>({
    defaultValues: {
      title: singlePropertyData.title,
      subTitle:singlePropertyData.subTitle,
      description:singlePropertyData.description,
      locality:singlePropertyData.locality,
      city: singlePropertyData.city,      
      state: singlePropertyData.state,
    //   priceRange:{ min: singlePropertyData.priceRange.min, max: singlePropertyData.priceRange.max }, 

     area: singlePropertyData.area,
      reraNumber: singlePropertyData.reraNumber,
      reraPossessionDate: singlePropertyData.reraPossessionDate.split("T")[0],
      youtubeEmbedLink: singlePropertyData.youtubeEmbedLink,
      service: 'RENT',
      property: 'RESIDENTIAL',
      isFeatured: singlePropertyData.isFeatured,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'area',
  });


//   useEffect(() => {
//     if (slug) {
//      const res = axiosInstance
//         .get<Project>(`/api/v1/projects/${slug}`)
//         .then((res) => {
//           reset(res.data); 
//           setData(res.data)
//           setLoading(false);
//         }
      
//       )
//         .catch((err) => {
//           console.error(err);
//           setLoading(false);
//         });
     
//     }
//   }, [slug, reset]);

  
  const onSubmit = async (data: Property) => {
    try {
      await axiosInstance.patch(`/api/v1/properties/${slug}`, data);
      alert('Property updated successfully!');
 
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

        {/* YouTube Link */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Embed Link</label>
          <input {...register('youtubeEmbedLink')} placeholder="YouTube Link" className="w-full p-3 border rounded-md" />
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select {...register('service')} className="w-full p-3 border rounded-md">
            <option value="RENT">Rent</option>
            <option value="SALE">Sale</option>
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
          // defaultChecked={singlePropertyData?.isFeatured}
          // className={`w-5 h-5 ${singlePropertyData?.isFeatured===true   ? 'bg-blue-500' : 'bg-gray-300'}`}
        />
        <label className="text-sm text-gray-700">Mark as Featured Property</label>
      </div>

        {/* <div className="col-span-2 flex items-center space-x-3">
          <input type="checkbox" {...register('images')} className="w-5 h-5" />
          <label className="text-sm text-gray-700">Mark as Featured Property</label>
        </div> */}

        {/* Submit Button */}
        <div className="col-span-2">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
            Update Property
          </button>
        </div>
      </form>
    </div>

</>


     
  );
};

export default EditProPertyComp;
