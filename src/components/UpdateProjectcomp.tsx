'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '@/lib/constants/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/dispatchHook';
import { getSingleProject } from '@/lib/redux/actions/projectAction';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  locality: string;
  city: string;
  state: string;
  priceRange: { min: number; max: number };
  areaRange: { min: number; max: number };
  reraNumber: string;
  reraPossessionDate?: string | Date;
  youtubeEmbedLink: string;
  service: 'RENT' | 'SALE';
  projectType: 'RESIDENTIAL' | 'COMMERCIAL';
  isFeatured: boolean;
}

const EditProjectComp = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { singleProjectData } = useAppSelector((state) => state.projects);

  const [generatedSlug, setGeneratedSlug] = useState(slug);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
  } = useForm<Project>();

  useEffect(() => {
    dispatch(getSingleProject({ slug }));
  }, [dispatch, slug]);

  useEffect(() => {
    if (singleProjectData?.title) {
      setTitle(singleProjectData.title);
      setGeneratedSlug(slugify(singleProjectData.title, { lower: true }));
      reset({
        ...singleProjectData,
        reraPossessionDate: singleProjectData.reraPossessionDate?.split("T")[0],
      } as Project);
      
  }},[singleProjectData, reset]);

  const [title, setTitle] = useState('');
  const [Editslug, setSlug] = useState('');
  
  useEffect(() => {
    const newSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    setSlug(newSlug);
  }, [title]);
  

  const router = useRouter()
  const onSubmit = async (data: Project) => {
    try {
      await axiosInstance.patch(`/api/v1/projects/${slug}`, data);
      alert('Project updated successfully!');
      router.push('/admin/superadmin/projects')
    } catch (err) {
      console.error(err);
      alert('Failed to update project.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Edit Project
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            {...register('title')}
            placeholder="Project Title"
            className="w-full p-3 border rounded-md"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValue('title', e.target.value);
            }}
          />
        </div>

        {/* Subtitle */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            {...register('subTitle')}
            placeholder="Project Subtitle"
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            placeholder="Description"
            rows={4}
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Location Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
          <input {...register('locality')} className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input {...register('city')} className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input {...register('state')} className="w-full p-3 border rounded-md" />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Min</label>
          <input {...register('priceRange.min')} type="number" className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Max</label>
          <input {...register('priceRange.max')} type="number" className="w-full p-3 border rounded-md" />
        </div>

        {/* Area Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area Min</label>
          <input {...register('areaRange.min')} type="number" className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area Max</label>
          <input {...register('areaRange.max')} type="number" className="w-full p-3 border rounded-md" />
        </div>

        {/* RERA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">RERA Number</label>
          <input {...register('reraNumber')} className="w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Possession Date</label>
          <input type="date" {...register('reraPossessionDate')} className="w-full p-3 border rounded-md" />
        </div>

        {/* YouTube */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Embed Link
          </label>
          <input
            {...register('youtubeEmbedLink')}
            placeholder="YouTube Link"
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Dropdowns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select {...register('service')} className="w-full p-3 border rounded-md">
            <option value="RENT">Rent</option>
            <option value="SALE">Sale</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
          <select {...register('projectType')} className="w-full p-3 border rounded-md">
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
        </div>

        {/* Checkbox */}
        <div className="col-span-2 flex items-center space-x-3">
          <input type="checkbox" {...register('isFeatured')} className="w-5 h-5" />
          <label className="text-sm text-gray-700">Mark as Featured Project</label>
        </div>

        {/* Submit */}
        <div className="col-span-2">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectComp;
