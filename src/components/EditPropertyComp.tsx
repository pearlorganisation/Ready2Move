'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { axiosInstance } from '@/lib/constants/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/dispatchHook';
import { getSingleProperty } from '@/lib/redux/actions/propertyAction';
import { useRouter } from "next/navigation"; 
import { getFeatures } from '@/lib/redux/actions/featuresAction';
import Image from 'next/image';

const EditProPertyComp = ({ slug }: { slug: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { singlePropertyData } = useAppSelector((state) => state.property);
  const { featureData } = useAppSelector(state => state.features);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
 const [ogPreview, setOgPreview] = useState<string | null>(null);
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<any>({
    defaultValues: {
        title: "",
    subTitle: "",
    expectedPrice: 0, // Adding this here will fix the error on setValue('expectedPrice', ...)
    brokeragepricingType: "",
    brokeragepricingValue: 0,
   
   
    
      priceRange: { min: 0, max: 0 },
       locality: [{ name: "" }],
      area: [],
      aminities: [],
      waterSource: [],
      otherFeatures: [],
      bankOfApproval: []
    },
  });

  const { fields: localityFields, append: appendLocality, remove: removeLocality } = useFieldArray({ 
  control, 
  name: 'locality' 
});
  const isBrokerageCharge = watch("isBrokerageCharge");

  useEffect(() => {
    dispatch(getSingleProperty({ slug }));
    dispatch(getFeatures());
  }, [slug, dispatch]);

  useEffect(() => {
    if (singlePropertyData) {

       if (singlePropertyData.locality && Array.isArray(singlePropertyData.locality)) {
      setValue('locality', singlePropertyData.locality.map((l: string) => ({ name: l })));
    } else {
      setValue('locality', [{ name: "" }]);
    }
      // 1. Basic & Service
      setValue('title', singlePropertyData.title || '');
      setValue('subTitle', singlePropertyData.subTitle || '');
      setValue('description', singlePropertyData.description || '');
      setValue('service', singlePropertyData.service || '');
      setValue('property', singlePropertyData.property || 'RESIDENTIAL');
      setValue('propertyType', singlePropertyData.propertyType?._id || "");

     if (singlePropertyData?.ogMetaField) {
  setValue('ogTitle', singlePropertyData.ogMetaField.ogTitle || '');
  setValue('ogDescription', singlePropertyData.ogMetaField.ogDescription || '');
  
 
  if (singlePropertyData.ogMetaField.ogImage?.secure_url) {
    setOgPreview(singlePropertyData.ogMetaField.ogImage.secure_url);
  }
}

      // 2. Location
      setValue('apartmentName', singlePropertyData.apartmentName || '');
      setValue('apartmentNo', singlePropertyData.apartmentNo || '');

      setValue('city', singlePropertyData.city || '');
      setValue('state', singlePropertyData.state || '');

      // 3. Configuration
      setValue('noOfBedrooms', singlePropertyData.noOfBedrooms || 0);
      setValue('noOfBathrooms', singlePropertyData.noOfBathrooms || 0);
      setValue('noOfBalconies', singlePropertyData.noOfBalconies || 0);
      setValue('area', singlePropertyData.area?.map((item: any) => ({
        name: item.name,
        area: item.area,
        areaMeasurement: item.areaMeasurement,
      })) || []);

      // 4. Financial
      setValue('expectedPrice', singlePropertyData.expectedPrice || 0);
      setValue('priceRange.min', singlePropertyData.priceRange?.min || 0);
      setValue('priceRange.max', singlePropertyData.priceRange?.max || 0);
      setValue('isPriceNegotiable', !!singlePropertyData.isPriceNegotiable);
      setValue('isBrokerageCharge', !!singlePropertyData.isBrokerageCharge);
      setValue('brokeragepricingType', singlePropertyData.brokeragepricingType || "");
      setValue('brokeragepricingValue', singlePropertyData.brokeragepricingValue || 0);

      // 5. Legal
      setValue('reraNumber', singlePropertyData.reraNumber || '');
      if (singlePropertyData.reraPossessionDate) {
        setValue('reraPossessionDate', singlePropertyData.reraPossessionDate.split("T")[0]);
      }
      setValue('isOCAvailable', !!singlePropertyData.isOCAvailable);
      setValue('isCCAvailable', !!singlePropertyData.isCCAvailable);
      setValue('ownership', singlePropertyData.ownership?._id || "");
      setValue('bankOfApproval', singlePropertyData.bankOfApproval?.map((b: any) => b._id) || []);

      // 6. Features & Media
      setValue('parking', singlePropertyData.parking?._id || "");
      setValue('furnishing', singlePropertyData.furnishing?._id || "");
      setValue('entranceFacing', singlePropertyData.entranceFacing?._id || "");
      setValue('availability', singlePropertyData.availability?._id || "");
      setValue('propertyAge', singlePropertyData.propertyAge?._id || "");
      setValue('propertyFlooring', singlePropertyData.propertyFlooring?._id || "");
      setValue('youtubeEmbedLink', singlePropertyData.youtubeEmbedLink || '');
      setValue('isFeatured', !!singlePropertyData.isFeatured);


      
     


      // 7. Multi-Select Arrays
      setValue('aminities', singlePropertyData.aminities?.map((a: any) => a._id) || []);
      setValue('waterSource', singlePropertyData.waterSource?.map((w: any) => w._id) || []);
      setValue('otherFeatures', singlePropertyData.otherFeatures?.map((o: any) => o._id) || []);
    }
  }, [singlePropertyData, setValue]);

  const { fields: areaFields } = useFieldArray({ control, name: 'area' });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setValue("imageGallery", files as any);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    
    // Simple strings and numbers
    const keys = [
      'title', 'subTitle', 'description', 'service', 'property', 'propertyType',
      'apartmentName', 'apartmentNo',  'city', 'state', 'reraNumber',
      'reraPossessionDate', 'noOfBedrooms', 'noOfBathrooms', 'noOfBalconies',
      'parking', 'furnishing', 'entranceFacing', 'availability', 'propertyAge',
      'ownership', 'propertyFlooring', 'youtubeEmbedLink', 'expectedPrice'
    ];
    keys.forEach(k => formData.append(k, data[k]?.toString() || ""));

    data.locality.forEach((loc: any) => {
  const cleanName = loc.name?.trim(); // Remove accidental spaces
  if (cleanName) {
    formData.append("locality", cleanName); // Only append if it's not empty
  }
});



    // Price Range Object
    formData.append("priceRange[min]", data.priceRange.min.toString());
    formData.append("priceRange[max]", data.priceRange.max.toString());

    // Booleans
    formData.append("isFeatured", data.isFeatured ? "true" : "false");
    formData.append("isOCAvailable", data.isOCAvailable ? "true" : "false");
    formData.append("isCCAvailable", data.isCCAvailable ? "true" : "false");
    formData.append("isPriceNegotiable", data.isPriceNegotiable ? "true" : "false");
    formData.append("isBrokerageCharge", data.isBrokerageCharge ? "true" : "false");

    if (data.isBrokerageCharge) {
      formData.append("brokeragepricingType", data.brokeragepricingType);
      formData.append("brokeragepricingValue", data.brokeragepricingValue.toString());
    }

    formData.append("ogTitle", data.ogTitle || "");
formData.append("ogDescription", data.ogDescription || "");

if (data.ogImage instanceof File) {
  formData.append("ogImage", data.ogImage);
}

    // Arrays
    data.area.forEach((item: any, i: number) => {
      formData.append(`area[${i}][name]`, item.name);
      formData.append(`area[${i}][area]`, item.area.toString());
      formData.append(`area[${i}][areaMeasurement]`, item.areaMeasurement);
    });

    ['aminities', 'waterSource', 'otherFeatures', 'bankOfApproval'].forEach(key => {
      if (Array.isArray(data[key])) {
        data[key].forEach((id: string) => formData.append(key, id));
      }
    });

    if (data.imageGallery) {
      Array.from(data.imageGallery).forEach((file: any) => formData.append("imageGallery", file));
    }

    try {
      await axiosInstance.patch(`/api/v1/properties/${slug}`, formData, {
        headers: { "Content-Type": 'multipart/form-data' }
      });
      alert('Property updated successfully!');
      router.back();
    } catch (err) { console.error(err); alert('Update failed'); }
  };


   const handleOgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setValue("ogImage", file);
    setOgPreview(URL.createObjectURL(file));
  }
};

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-4">Edit Property Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* --- SECTION 1: BASIC INFO --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h3 className="col-span-2 text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Basic Information</h3>
          <div className="col-span-2"><label className="text-sm font-medium">Title</label><input {...register('title')} className="w-full p-3 border rounded-md" /></div>
          <div className="col-span-2"><label className="text-sm font-medium">Subtitle</label><input {...register('subTitle')} className="w-full p-3 border rounded-md" /></div>
          <div className="col-span-2"><label className="text-sm font-medium">Description</label><textarea {...register('description')} rows={4} className="w-full p-3 border rounded-md" /></div>
          
          <div>
            <label className="text-sm font-medium">Service Type</label>
            <select {...register('service')} className="w-full p-3 border rounded-md"><option value="SELL">SELL</option><option value="RENT">RENT</option></select>
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <select {...register('property')} className="w-full p-3 border rounded-md"><option value="RESIDENTIAL">RESIDENTIAL</option><option value="COMMERCIAL">COMMERCIAL</option></select>
          </div>
        </section>

        {/* --- SECTION 2: LOCATION --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="col-span-3 text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Location Details</h3>
          <div><label className="text-sm font-medium">Apartment Name</label><input {...register('apartmentName')} className="w-full p-3 border rounded-md" /></div>
          <div><label className="text-sm font-medium">Flat/Apt No</label><input {...register('apartmentNo')} className="w-full p-3 border rounded-md" /></div>
         {/* --- SECTION 2: LOCATION --- */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
  <h3 className="col-span-3 text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Location Details</h3>
  <div><label className="text-sm font-medium">Apartment Name</label><input {...register('apartmentName')} className="w-full p-3 border rounded-md" /></div>
  <div><label className="text-sm font-medium">Flat/Apt No</label><input {...register('apartmentNo')} className="w-full p-3 border rounded-md" /></div>
  
  {/* Multi-Locality Section */}
  <div className="col-span-3 space-y-3">
    <div className="flex justify-between items-center">
      <label className="text-sm font-bold text-gray-600">Localities / Landmarks</label>
      <button 
        type="button" 
        onClick={() => appendLocality({ name: "" })}
        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
      >
        + Add More
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {localityFields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <input 
            {...register(`locality.${index}.name`)} 
            placeholder="e.g. Near Station"
            className="w-full p-3 border rounded-md bg-white" 
          />
          {localityFields.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeLocality(index)}
              className="text-red-500 p-2 hover:bg-red-50 rounded"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  </div>

  <div><label className="text-sm font-medium">City</label><input {...register('city')} className="w-full p-3 border rounded-md" /></div>
  <div><label className="text-sm font-medium">State</label><input {...register('state')} className="w-full p-3 border rounded-md" /></div>
</section>
          <div><label className="text-sm font-medium">City</label><input {...register('city')} className="w-full p-3 border rounded-md" /></div>
          <div><label className="text-sm font-medium">State</label><input {...register('state')} className="w-full p-3 border rounded-md" /></div>
        </section>

       
      {/* --- SECTION 3: CONFIGURATION --- */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <h3 className="col-span-3 text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Property Configuration</h3>
  <div><label className="text-sm font-medium">Bedrooms</label><input type="number" {...register('noOfBedrooms')} className="w-full p-3 border rounded-md" /></div>
  <div><label className="text-sm font-medium">Bathrooms</label><input type="number" {...register('noOfBathrooms')} className="w-full p-3 border rounded-md" /></div>
  <div><label className="text-sm font-medium">Balconies</label><input type="number" {...register('noOfBalconies')} className="w-full p-3 border rounded-md" /></div>
  
  <div className="col-span-3 border-t pt-4">
    <label className="font-bold block mb-3">Area measurements</label>
  
    {areaFields.map((field, index) => (
      <div key={field.id} className="grid grid-cols-3 gap-4 mb-3">
        <input readOnly {...register(`area.${index}.name`)} className="bg-gray-100 p-3 border rounded" />
        <input type="number" {...register(`area.${index}.area`)} className="p-3 border rounded" />
        <select {...register(`area.${index}.areaMeasurement`)} className="p-3 border rounded">
          <option value="SQ_FT">SQ_FT</option>
          <option value="SQ_M">SQ_M</option>
        </select>
      </div>
    ))}
  </div>
</section>

        {/* --- SECTION 4: FINANCIAL --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-6 rounded-lg">
          <h3 className="col-span-2 text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Financial Details</h3>
          <div><label className="text-sm font-bold">Expected Price (Final)</label><input type="number" {...register('expectedPrice')} className="w-full p-3 border rounded-md border-blue-300" /></div>
          <div className="flex items-end space-x-3 pb-3">
            <input type="checkbox" {...register('isPriceNegotiable')} className="w-5 h-5" />
            <label className="font-medium">Price is Negotiable</label>
          </div>
          <div><label className="text-sm font-medium">Price Range (Min)</label><input type="number" {...register('priceRange.min')} className="w-full p-3 border rounded-md" /></div>
          <div><label className="text-sm font-medium">Price Range (Max)</label><input type="number" {...register('priceRange.max')} className="w-full p-3 border rounded-md" /></div>
          
          <div className="col-span-2 border-t border-blue-200 pt-4 flex items-center space-x-4">
            <input type="checkbox" id="brk" {...register('isBrokerageCharge')} className="w-5 h-5" />
            <label htmlFor="brk" className="font-bold">I charge brokerage</label>
          </div>
          {isBrokerageCharge && (
            <div className="col-span-2 grid grid-cols-2 gap-4 animate-in fade-in">
              <div><label className="text-sm">Brokerage Type</label><select {...register('brokeragepricingType')} className="w-full p-3 border rounded-md bg-white"><option value="PERCENTAGE">Percentage (%)</option><option value="MONTH_RENT">Month Rent</option></select></div>
              <div><label className="text-sm">Value</label><input type="number" {...register('brokeragepricingValue')} className="w-full p-3 border rounded-md bg-white" /></div>
            </div>
          )}
        </section>

        {/* --- SECTION 5: LEGAL & STATUS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h3 className="col-span-2 text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Legal & Status</h3>
          <div><label className="text-sm font-medium">RERA Number</label><input {...register('reraNumber')} className="w-full p-3 border rounded-md" /></div>
          <div><label className="text-sm font-medium">Possession Date</label><input type="date" {...register('reraPossessionDate')} className="w-full p-3 border rounded-md" /></div>
          
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2"><input type="checkbox" {...register('isOCAvailable')} /> <span>OC Available</span></label>
            <label className="flex items-center space-x-2"><input type="checkbox" {...register('isCCAvailable')} /> <span>CC Available</span></label>
          </div>

          <div>
            <label className="text-sm font-medium">Ownership Type</label>
            <select {...register('ownership')} className="w-full p-3 border rounded-md">
              {featureData?.find(f => f.type === 'OWNERSHIP')?.features.map(f => (<option key={f._id} value={f._id}>{f.name}</option>))}
            </select>
          </div>

          <fieldset className="col-span-2 border p-4 rounded">
            <legend className="px-2 font-bold">Approved Banks</legend>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {featureData?.find(f => f.type === 'BANKS')?.features.map(f => (
                <label key={f._id} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" value={f._id} {...register('bankOfApproval')} /> <span>{f.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {/* --- SECTION 6: FEATURES & AMENITIES --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h3 className="col-span-3 text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Features & Amenities</h3>
          
          {[
            { label: 'Sub-Property Type', name: 'propertyType', type: 'PROPERTY_TYPE' },
            { label: 'Parking', name: 'parking', type: 'PARKING' },
            { label: 'Furnishing', name: 'furnishing', type: 'FURNISHING' },
            { label: 'Entrance Facing', name: 'entranceFacing', type: 'ENTRANCE_FACING' },
            { label: 'Availability', name: 'availability', type: 'AVAILABILITY' },
            { label: 'Property Age', name: 'propertyAge', type: 'PROPERTY_AGE' },
            { label: 'Flooring', name: 'propertyFlooring', type: 'FLOORING' }
          ].map(item => (
            <div key={item.name}>
              <label className="text-xs font-bold text-gray-500 uppercase">{item.label}</label>
              <select {...register(item.name as any)} className="w-full p-3 border rounded-md bg-white">
                <option value="">Select...</option>
                {featureData?.find(f => f.type === item.type)?.features.map(f => (<option key={f._id} value={f._id}>{f.name}</option>))}
              </select>
            </div>
          ))}

          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
            <fieldset className="border p-4 rounded"><legend className="font-bold px-2">Amenities</legend>
              <div className="h-40 overflow-y-auto space-y-1">
                {featureData?.find(f => f.type === 'AMENITIES')?.features.map(f => (
                  <label key={f._id} className="flex items-center space-x-2 text-sm"><input type="checkbox" value={f._id} {...register('aminities')} /><span>{f.name}</span></label>
                ))}
              </div>
            </fieldset>
            <fieldset className="border p-4 rounded"><legend className="font-bold px-2">Water Source</legend>
              {featureData?.find(f => f.type === 'WATER_SOURCE')?.features.map(f => (
                <label key={f._id} className="flex items-center space-x-2 text-sm"><input type="checkbox" value={f._id} {...register('waterSource')} /><span>{f.name}</span></label>
              ))}
            </fieldset>
            <fieldset className="border p-4 rounded"><legend className="font-bold px-2">Other Features</legend>
              {featureData?.find(f => f.type === 'OTHER_FEATURES')?.features.map(f => (
                <label key={f._id} className="flex items-center space-x-2 text-sm"><input type="checkbox" value={f._id} {...register('otherFeatures')} /><span>{f.name}</span></label>
              ))}
            </fieldset>
          </div>
        </section>

        {/* --- SECTION 7: MEDIA --- */}
        <section className="space-y-6 border-t pt-8">
          <h3 className="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Media & Visibility</h3>
          <div><label className="text-sm font-medium">YouTube Embed Link</label><input {...register('youtubeEmbedLink')} className="w-full p-3 border rounded-md" placeholder="https://www.youtube.com/embed/..." /></div>
          <label className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-md border border-yellow-200">
            <input type="checkbox" {...register('isFeatured')} className="w-6 h-6" />
            <span className="font-bold text-yellow-800">Feature this property on the homepage</span>
          </label>

          <div className="p-6 border-2 border-dashed rounded-lg">
            <label className="block font-bold mb-4">Gallery Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            <div className="flex flex-wrap gap-4">
              {singlePropertyData?.imageGallery?.map((img: any) => (
                <div key={img.public_id} className="relative w-32 h-32 rounded-lg overflow-hidden borderShadow"><Image src={img.secure_url} alt="property" fill className="object-cover" /></div>
              ))}
              {previewImages.map((src, i) => (
                <div key={i} className="relative w-32 h-32 rounded-lg overflow-hidden borderShadow ring-4 ring-green-400"><Image src={src} alt="preview" fill className="object-cover" /></div>
              ))}
            </div>
          </div>
<div className="bg-gray-50 p-6 rounded-xl space-y-4">
  <h4 className="font-bold">OG Meta Field</h4>
  <div>
    <label className="text-sm">OG Title</label>
    <input {...register('ogTitle')} className="w-full p-3 border rounded-md" />
  </div>
  <div>
    <label className="text-sm">OG Description</label>
    <input {...register('ogDescription')} className="w-full p-3 border rounded-md" />
  </div>
  <div>
    <label className="text-sm">OG Image File (Social Preview)</label>
    <input type="file" onChange={handleOgImageChange} className="block w-full text-sm mb-2" />
    {ogPreview && (
      <div className="relative w-48 h-28 border rounded overflow-hidden">
        <Image src={ogPreview} alt="OG Preview" fill className="object-cover" />
      </div>
    )}
  </div>
</div>
        </section>

        <button type="submit" className="w-full py-5 bg-blue-600 text-white text-xl font-bold rounded-xl hover:bg-blue-700 shadow-lg transform transition active:scale-95">
          Save All Changes
        </button>
      </form>
    </div>
  );
};

export default EditProPertyComp;