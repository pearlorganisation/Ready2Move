"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import {
  deleteBanner,
  getBanner,
  updateBanner,
} from "@/lib/redux/actions/bannerAction";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import AddBannerImage from "@/components/BannerComponent";
import DeleteModal from "@/components/DeletedModal";

type Banner = {
  _id: string;
  headline: string;
  quote: string;
  bgImage?: { secure_url: string };
};

export type BannerForm = {
  bgImage: File | null;
  headline: string;
  quote: string;
  _id: string;
};

const Page: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, bannerData } = useAppSelector((state) => state.banner);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBannerId, setDeleteBannerId] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BannerForm>({
    defaultValues: {
      headline: "",
      quote: "",
      bgImage: null,
      _id: "",
    },
  });

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  // Close add modal and refresh banners
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    dispatch(getBanner());
  };

  // Open delete modal with id
  const handleConfirmDelete = (id: string) => {
    setDeleteBannerId(id);
    setIsDeleteModalOpen(true);
  };

  // Cancel delete modal
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteBannerId("");
  };

  // Execute delete action
  const handleDelete = () => {
    if (deleteBannerId) {
      dispatch(deleteBanner(deleteBannerId)).then(() => {
        dispatch(getBanner());
        handleDeleteModalClose();
      });
    }
  };

  // Open update modal and prefill form
  const handleUpdate = (banner: Banner) => {
    setSelectedBannerId(banner._id);
    setValue("headline", banner.headline);
    setValue("quote", banner.quote);
    setPreviewImage(banner.bgImage?.secure_url || null);
    setSelectedImageFile(null);
    setIsUpdateModalOpen(true);
  };

  // Handle image file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Update banner submit handler
  const onSubmit: SubmitHandler<BannerForm> = async (data) => {
    // if (!selectedBannerId) return;

    // const formData = new FormData();
    // formData.append("id", selectedBannerId);
    // formData.append("headline", data.headline);
    // formData.append("quote", data.quote);

    // if (selectedImageFile) {
    //   formData.append("bgImage", selectedImageFile);
    // }

    // // Dispatch updateBanner action with FormData
    // dispatch(updateBanner(formData)).then((res: any) => {
    //   if (res.payload?.success) {
    //     dispatch(getBanner());
    //     setIsUpdateModalOpen(false);
    //     reset();
    //     setPreviewImage(null);
    //     setSelectedImageFile(null);
    //     setSelectedBannerId(null);
    //   }
    // });

    if (!selectedBannerId) return;

    const payload: BannerForm = {
      _id: selectedBannerId,
      headline: data.headline,
      quote: data.quote,
      bgImage: selectedImageFile ?? null,
    };
    dispatch(updateBanner(payload)).then((res) => {
      if (res.payload.success == true) {
        setIsUpdateModalOpen(false);
      }
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Banners</h1>
        <button
          className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Banner
        </button>
      </div>

      {/* Add Banner Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-3xl w-full shadow-xl overflow-y-auto max-h-[90vh]">
            <AddBannerImage onclose={handleCloseAddModal} />
          </div>
        </div>
      )}

      {/* Banners Table */}
      {bannerData?.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Headline
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Quote
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bannerData.map((banner: Banner) => (
                <tr key={banner._id}>
                  <td className="px-6 py-4">
                    {banner.bgImage?.secure_url ? (
                      <Image
                        src={banner.bgImage.secure_url}
                        alt="Banner"
                        width={120}
                        height={60}
                        className="rounded object-cover w-28 h-16"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {banner.headline}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {banner.quote}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      className="bg-yellow-400 p-2 rounded text-white hover:bg-yellow-500"
                      onClick={() => handleUpdate(banner)}
                      aria-label={`Edit banner ${banner.headline}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white hover:bg-red-600"
                      onClick={() => handleConfirmDelete(banner._id)}
                      aria-label={`Delete banner ${banner.headline}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Update Modal */}
          {isUpdateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative animate-fadeIn">
                {/* Close Button */}
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Image Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background Image
                    </label>
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        alt="Slide Preview"
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-2 bg-gray-50 border-t flex flex-col items-center gap-2">
                        <input
                          type="file"
                          {...register("bgImage")}
                          className="hidden"
                          id="upload-image"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                        <label
                          htmlFor="upload-image"
                          className="cursor-pointer flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm select-none"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      {...register("headline", {
                        required: "Headline is required",
                      })}
                      className={`w-full border rounded-md px-3 py-2 text-sm ${
                        errors.headline ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter headline"
                    />
                    {errors.headline && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.headline.message}
                      </p>
                    )}
                  </div>

                  {/* Quote */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quote
                    </label>
                    <textarea
                      {...register("quote", { required: "Quote is required" })}
                      className={`w-full border rounded-md px-3 py-2 text-sm ${
                        errors.quote ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter quote"
                      rows={3}
                    />
                    {errors.quote && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.quote.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm ${
                      isLoading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-2 inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Update Banner"
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No banners found.</p>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Page;
