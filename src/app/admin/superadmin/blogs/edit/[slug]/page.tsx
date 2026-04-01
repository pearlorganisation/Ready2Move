"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Added useRouter
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getSingleBlog, updateBlog } from "@/lib/redux/actions/blogAction";
import slugify from "slugify";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type BlogFormInputs = {
  title: string;
  content: string;
  thumbImage?: FileList;
  slug: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: FileList;
};

interface ApiBlogResponse {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbImage?: { secure_url: string };
  ogMetaField?: {
    ogTitle: string;
    ogDescription: string;
    ogImage?: { secure_url: string };
  };
}

const Page = () => {
  const params = useParams();
  const router = useRouter(); // Initialize Router
  const slugFromUrl = params?.slug as string;

  const dispatch = useAppDispatch();
  const { singleBlog } = useAppSelector((state: any) => state.blogs) as { 
    singleBlog: ApiBlogResponse | null 
  };

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ogPreview, setOgPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, control } = useForm<BlogFormInputs>();

  useEffect(() => {
    if (slugFromUrl) dispatch(getSingleBlog(slugFromUrl));
  }, [dispatch, slugFromUrl]);

  useEffect(() => {
    if (singleBlog) {
      reset({
        title: singleBlog.title || "",
        content: singleBlog.content || "",
        slug: singleBlog.slug || "",
        ogTitle: singleBlog.ogMetaField?.ogTitle || "",
        ogDescription: singleBlog.ogMetaField?.ogDescription || "",
      });

      if (singleBlog.thumbImage?.secure_url) setImagePreview(singleBlog.thumbImage.secure_url);
      if (singleBlog.ogMetaField?.ogImage?.secure_url) setOgPreview(singleBlog.ogMetaField.ogImage.secure_url);
    }
  }, [singleBlog, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumb' | 'og') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'thumb') setImagePreview(url);
      else setOgPreview(url);
    }
  };

  const onSubmit = async (data: BlogFormInputs) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("slug", slugify(data.title, { lower: true, strict: true }));
    formData.append("ogTitle", data.ogTitle);
    formData.append("ogDescription", data.ogDescription);

    if (data.thumbImage?.[0]) formData.append("thumbImage", data.thumbImage[0]);
    if (data.ogImage?.[0]) formData.append("ogImage", data.ogImage[0]);

    // Perform Update
    const resultAction = await dispatch(
      updateBlog({ slug: singleBlog?.slug, updatedData: formData })
    );

    // Redirect on success
    if (updateBlog.fulfilled.match(resultAction)) {
      router.push("/admin/superadmin/blogs");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Blog Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Editor */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Content</label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <JoditEditor
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
          </div>

          {/* Thumbnail Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                {...register("thumbImage")}
                onChange={(e) => handleFileChange(e, 'thumb')}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            {imagePreview && (
              <img src={imagePreview} className="h-32 w-full object-cover rounded-xl border shadow-inner" alt="Thumb" />
            )}
          </div>

          {/* SEO / OG Fields */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">SEO & Social Sharing (OG)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">OG Meta Title</label>
                  <input 
                    {...register("ogTitle")} 
                    className="w-full border-b border-gray-300 py-2 focus:border-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">OG Meta Description</label>
                  <textarea 
                    rows={3}
                    {...register("ogDescription")} 
                    className="w-full border-b border-gray-300 py-2 focus:border-blue-500 outline-none resize-none" 
                  />
                </div>
              </div>
              
              <div className="lg:col-span-5">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">OG Social Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                  <input 
                    type="file" 
                    accept="image/*" 
                    {...register("ogImage")}
                    onChange={(e) => handleFileChange(e, 'og')}
                    className="text-xs mb-4 w-full"
                  />
                  {ogPreview && (
                    <img src={ogPreview} className="w-full aspect-video object-cover rounded-lg" alt="OG Preview" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Syncing with Database..." : "Update Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;