"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";
import { createBlog } from "@/lib/redux/actions/blogAction";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const config = {
  readonly: false,
  height: 400,
  toolbar: true,
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "superscript",
    "subscript",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "video",
    "file",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "selectall",
    "|",
    "print",
    "about",
  ],
  uploader: {
    insertImageAsBase64URI: true,
    url: "your-upload-url",
    format: "json",
  },
  placeholder: "Start typing here...",
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  spellcheck: true,
  allowResizeY: true,
  allowResizeX: false,
  language: "en",
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
};

type BlogFormInputs = {
  title: string;
  content: string;
  thumbImage?: FileList;
  slug: string;
};

const Page = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean | false>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<BlogFormInputs>();

  const onSubmit = async (data: BlogFormInputs) => {
    setLoading(true);

    const generatedSlug = slugify(data.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("slug", generatedSlug);
    if (data.thumbImage && data.thumbImage[0]) {
      formData.append("thumbImage", data.thumbImage[0]);
    }

    await dispatch(createBlog(formData) as any);

    setLoading(false);
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Blog</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block font-medium text-gray-700 mb-1"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block font-medium text-gray-700 mb-1"
            >
              Blog Slug
            </label>
            <input
              type="text"
              id="slug"
              value={slugify(watch("title") || "", {
                lower: true,
                strict: true,
                remove: /[*+~.()'"!:@]/g,
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block font-medium text-gray-700 mb-1"
            >
              Blog Content
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <Controller
                control={control}
                name="content"
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <JoditEditor
                    value={field.value}
                    config={config}
                    onBlur={field.onBlur}
                    onChange={(content) => field.onChange(content)}
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="thumbImage"
              className="block font-medium text-gray-700 mb-1"
            >
              Upload Thumbnail
            </label>
            <input
              type="file"
              id="thumbImage"
              accept="image/*"
              {...register("thumbImage")}
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Preview */}
          {imagePreview && (
            <div>
              <p className="font-medium text-gray-700 mb-1">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md border"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating...</span>
              </div>
            ) : (
              "Create Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
