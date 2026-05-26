"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteBlog, getBlogs } from "@/lib/redux/actions/blogAction";
import Pagination from "@/components/Pagination";
import { createOGField, fetchOGFields, updateOGField, deleteOGField } from "@/lib/redux/actions/ogAction";
import { X } from "lucide-react";
// 1. Define the Blog structure
interface Blog {
  _id: string;
  title: string;
  slug: string;
  thumbImage?: {
    secure_url: string;
  };
  author?: {
    name: string;
  };
  createdAt: string;
}

interface OgState {
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | null;
}

interface EditState {
  id: string;
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | string | null; // string is for the existing URL
}

// 2. Define the Pagination structure
interface PaginationData {
  total: number;
  page: number;
  pages: number;
}

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // 3. Type the Selector (Replace 'any' with your actual RootState type if available)
 const { blogs, pagination } = useAppSelector((state: any) => state.blogs) as {
    blogs: Blog[];
    pagination: PaginationData | null;
  };

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [OpenOGModel, setOGModel] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const limit = 10;


const [ogFormData, setOgFormData] = useState<OgState>({
  ogType: "blog", 
  ogTitle: "",
  ogDescription: "",
  ogImage: null,
});

const [editData, setEditData] = useState<EditState>({
  id: "",
  ogType: "blog",
  ogTitle: "",
  ogDescription: "",
  ogImage: null,
});

const handleCreateOG = async () => {
  try {
     setIsSaving(true);
    const formData = new FormData();

    formData.append("ogType", "blog");
    formData.append("ogTitle", ogFormData.ogTitle);
    formData.append("ogDescription", ogFormData.ogDescription);

    // append image file
    if (ogFormData.ogImage) {
      formData.append("ogImage", ogFormData.ogImage);
    }

    await dispatch(createOGField(formData));

    alert("Created Successfully");

    dispatch(fetchOGFields());

    setOgFormData({
      ogType: "blog",
      ogTitle: "",
      ogDescription: "",
      ogImage: null,
    });

  } catch (error) {
    console.log(error);
  }
  finally {
    setIsSaving(false); // Stop loading regardless of success or error
  }
};
const handleEditClick = (item: any) => {
  setEditData({
    id: item._id,
    ogType: item.ogType,
    ogTitle: item.ogTitle,
    ogDescription: item.ogDescription,
    // Extract the URL from the nested object so the input shows it
   ogImage: item?.ogImage?.secure_url || null, 
  });
};

const handleDelete = async (id: string) => {
  if (confirm("Are you sure you want to delete this meta tag?")) {
    await dispatch(deleteOGField(id));
    alert("Deleted successfully");
  }
};

const handleUpdate = async () => {
  try {
    const formData = new FormData();

    formData.append("ogType", editData.ogType);
    formData.append("ogTitle", editData.ogTitle);
    formData.append("ogDescription", editData.ogDescription);

    // ONLY append ogImage if the user has selected a NEW file.
    // If editData.ogImage is just a string (the old URL), do NOT append it.
    if (editData.ogImage instanceof File) {
      formData.append("ogImage", editData.ogImage);
    }

    const resultAction = await dispatch(
      updateOGField({
        id: editData.id,
        data: formData, // Now only contains a file if it's a new one
      })
    );

    if (updateOGField.fulfilled.match(resultAction)) {
      alert("Updated Successfully");
      dispatch(fetchOGFields());
      setEditData({
        id: "",
        ogType: "blog",
        ogTitle: "",
        ogDescription: "",
        ogImage: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};




  useEffect(() => {
    dispatch(getBlogs({ 
      page: currentPage, 
      limit: limit,
      sort: "-createdAt" 
    }));
  }, [dispatch, currentPage]);

  const handleConfirmDelete = async () => {
    // 4. Type Guard: Only run if deleteId is not null
    if (deleteId) {
      await dispatch(deleteBlog(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      dispatch(getBlogs({ page: currentPage, limit: limit, sort: "-createdAt" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, mode: "create" | "edit") => {
  const file = e.target.files ? e.target.files[0] : null;
  if (!file) return;
  if (mode === "create") setOgFormData({ ...ogFormData, ogImage: file });
  else setEditData({ ...editData, ogImage: file });
};

   const handleOGModelData = () => {
    setOGModel(true);
  }

  const { ogData, loading: ogLoading } = useAppSelector((state) => state.og);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
          <p className="text-gray-500 text-sm">
            Showing {blogs?.length || 0} of {pagination?.total || 0} total blogs
          </p>
        </div>
        <div className="flex gap-3">
          <button
          onClick={handleOGModelData}
          className="px-6 py-3 bg-white text-red-500 rounded-md font-semibold shadow-md hover:bg-red-100 transition "
        >
          Add Meta Fields
        </button>
        <button
          className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md flex items-center gap-2"
          onClick={() => router.push("/admin/superadmin/blogs/add")}
        >
          <span>+</span> Add New Blog
        </button>

 
</div>
        {OpenOGModel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white">
                <h2 className="text-2xl font-bold">OG Meta Management</h2>
                <button onClick={() => setOGModel(false)}><X className="h-6 w-6" /></button>
              </div>
        
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT: FORM SECTION (Switch between Create and Edit) */}
                <div className="bg-slate-50 p-6 rounded-lg border">
                  <h3 className="font-bold mb-4">{editData.id ? "Edit Record" : "Add New Meta"}</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="OG Title"
                      className="w-full border p-2 rounded"
                      value={editData.id ? editData.ogTitle : ogFormData.ogTitle}
                      onChange={(e) => editData.id 
                        ? setEditData({...editData, ogTitle: e.target.value}) 
                        : setOgFormData({...ogFormData, ogTitle: e.target.value})}
                    />
                    <textarea
                      placeholder="OG Description"
                      className="w-full border p-2 rounded"
                      value={editData.id ? editData.ogDescription : ogFormData.ogDescription}
                      onChange={(e) => editData.id 
                        ? setEditData({...editData, ogDescription: e.target.value}) 
                        : setOgFormData({...ogFormData, ogDescription: e.target.value})}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full border p-2 rounded bg-white"
                      onChange={(e) => handleFileChange(e, editData.id ? "edit" : "create")}
                    />
                    
                    <div className="flex gap-2">
                      {editData.id ? (
                        <>
                          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded flex-1">Update</button>
                          <button onClick={() => setEditData({id: "", ogType: "blog", ogTitle: "", ogDescription: "", ogImage: null})} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                        </>
                      ) : (
                        <button onClick={handleCreateOG} className="bg-blue-600 text-white px-4 py-2 rounded w-full"> {isSaving ? "Saving..." : "Save"}</button>
                      )}
                    </div>
                  </div>
                </div>
        
                {/* RIGHT: LIST SECTION */}
                <div className="space-y-4">
                  <h3 className="font-bold">Existing Meta</h3>
{ogLoading ? <p>Loading...</p> : ogData?.filter((item: any) => item.ogType === "blog").map((item: any) => (
                    <div key={item._id} className="border p-3 rounded bg-white flex gap-3 items-center">
                     <img
          src={item?.ogImage?.secure_url}
          className="w-12 h-12 object-cover rounded"
        />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{item.ogTitle}</p>
                          <p className=" text-sm truncate">{item.ogDescription}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(item)} className="text-blue-600 font-medium text-sm">Edit</button>
                        <button onClick={() => handleDelete(item._id)} className="text-red-600 font-medium text-sm">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}


      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cover</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Blog Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* 5. Use the Blog interface here */}
              {blogs.map((blog: Blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.thumbImage?.secure_url ? (
                      <Image
                        src={blog.thumbImage.secure_url}
                        alt={blog.title}
                        width={100}
                        height={60}
                        className="rounded-md object-cover w-24 h-14 shadow-sm"
                      />
                    ) : (
                      <div className="w-24 h-14 bg-gray-100 rounded-md border border-dashed flex items-center justify-center text-[10px] text-gray-400">No Cover</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 line-clamp-1">{blog.title}</div>
                    <div className="text-xs text-gray-400 uppercase mt-1">{blog.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {blog?.author?.name || "Admin"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => router.push(`/admin/superadmin/blogs/edit/${blog.slug}`)}
                        className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => { 
                          setDeleteId(blog._id); 
                          setShowDeleteModal(true); 
                        }}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-24 text-center">
            <div className="text-gray-300 mb-2 flex justify-center"><FaTrash size={48} /></div>
            <p className="text-gray-500 font-medium">No blogs found in the database.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        limit={limit}
         total={Number(pagination?.total || 0)}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <FaTrash size={28} />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Are you sure?</h3>
            <p className="text-gray-500 text-center text-sm mb-8">This action will permanently delete this blog post.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition"
              >
                Keep it
              </button>
              <button 
                onClick={handleConfirmDelete} 
                className="flex-1 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-xl font-semibold transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

