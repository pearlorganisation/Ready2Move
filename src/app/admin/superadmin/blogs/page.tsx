"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { useRouter } from "next/navigation";
// import AddBannerImage from "./banner-form/bannerForm";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { deleteBlog, getBlogs } from "@/lib/redux/actions/blogAction";

const Page = () => {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blogs);
  console.log(blogs, "blogs Data");

  const router = useRouter();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setupdateModal] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(getBlogs());
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log("orkjk", previewImage);
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      dispatch(deleteBlog(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const bgImageFile = watch("bgImage");

  useEffect(() => {
    if (bgImageFile && bgImageFile.length > 0) {
      const file = bgImageFile[0];
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      return () => URL.revokeObjectURL(previewURL);
    }
  }, [bgImageFile]);

  const [selectedImage, setSelecteImage] = useState<File | null>(null);
  console.log(selectedImage, "selectedimg");
  const handleSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelecteImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };
  console.log(id, "isssid");

  const handleUpdate = (slug: string) => {
    router.push(`/admin/superadmin/blogs/edit/${slug}`);
  };

  return (
    <div className="p-6">
      {/* Header & Add Banner Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Blogs</h1>
        <button
          className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition"
          onClick={() => router.push("/admin/superadmin/blogs/add")}
        >
          Add Blog
        </button>
      </div>

      {/* Banner Grid */}
      {Array.isArray(blogs) && blogs?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs?.map((banner: any) => (
                <tr key={banner?._id}>
                  <td className="px-6 py-4">
                    {banner.thumbImage?.secure_url ? (
                      <Image
                        src={banner?.thumbImage.secure_url}
                        alt="Banner"
                        width={500}
                        height={500}
                        className="rounded object-cover w-28 h-16"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {banner.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {banner?.author?.name}
                  </td>

                  <td className="p-3 flex justify-center items-center mt-6 gap-4">
                    <button
                      className="bg-yellow-400 p-2 rounded text-white hover:bg-yellow-500"
                      onClick={() => handleUpdate(banner?.slug)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white hover:bg-red-600"
                      onClick={() => confirmDelete(banner._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {showDeleteModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete this blog?
                  </h2>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleConfirmDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No banners found.</p>
      )}
    </div>
  );
};

export default Page;
