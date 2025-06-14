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




// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { FaArrowRight, FaCalendarAlt, FaSearch } from "react-icons/fa";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import parse from "html-react-parser";
// import { axiosInstance } from "@/lib/constants/axiosInstance";

// interface Blog {
//   _id: string;
//   slug: string;
//   title: string;
//   description?: string;
//   content?: string;
//   image?: string;
//   thumbImage: {
//     secure_url?: string | null;
//   };
//   author: {
//     name: string;
//   };

//   publishedAt?: string;
//   category?: string;
//   readTime?: string;
// }

// const BlogPage: React.FC = () => {
//   const [data, setData] = useState<Blog[]>([]);
//   const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const postsPerPage = 6;
//   const bannerRef = useRef<HTMLDivElement>(null);

//   const getAllBlogs = async (search = "") => {
//     try {
//       const res = await axiosInstance.get(`/api/v1/blogs`, {
//         params: { search },
//       });
//       console.log("res", res);
//       if (res?.data?.data) {
//         // update blog list here
//         setData(res.data.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch blogs:", err);
//     }
//   };

//   console.log(recentBlogs, "recentBlog");
//   const getRecentBlogs = async () => {
//     try {
//       const res = await axiosInstance.get("/api/v1/blogs/recent");
//       if (res?.data?.data) setRecentBlogs(res?.data.data);
//     } catch (error) {
//       console.error("Failed to fetch recent blogs:", error);
//     }
//   };

//   useEffect(() => {
//     getAllBlogs();
//     getRecentBlogs();
//     if (bannerRef.current) {
//       gsap.fromTo(
//         bannerRef.current,
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
//       );
//     }
//   }, []);

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const filteredBlogs = data.filter(
//     (blog) =>
//       blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
//   const startIndex = (page - 1) * postsPerPage;
//   const currentPosts = filteredBlogs.slice(
//     startIndex,
//     startIndex + postsPerPage
//   );

//   console.log(currentPosts, "currentpost");
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div
//         ref={bannerRef}
//         className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white"
//       >
//         <div className="max-w-7xl mx-auto px-6 py-16 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             Real Estate <span className="text-blue-300">Insights</span>
//           </h1>
//           <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
//             Stay informed with the latest trends, tips, and expert advice in
//             real estate
//           </p>
//           <div className="max-w-2xl mx-auto">
//             <div className="relative">
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Search  blogs..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setPage(1);
//                 }}
//                 className="w-full pl-12 pr-6 py-4 text-lg rounded-full border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none text-gray-800 shadow-xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Section */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Blog Content */}
//           <div className="lg:w-2/3">
//             {currentPosts.length > 0 ? (
//               <>
//                 {/* Featured */}
//                 {currentPosts?.slice(0, 1).map((post) => (
//                   <Link key={post?._id} href={`/blog/${post?.slug}`}>
//                     <motion.article
//                       initial={{ opacity: 0, y: 50 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.8, delay: 0.2 }}
//                       className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 group cursor-pointer"
//                     >
//                       <div className="relative overflow-hidden">
//                         <img
//                           src={post?.thumbImage?.secure_url || ""}
//                           width={800}
//                           height={400}
//                           alt={post.title}
//                           className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
//                         />
//                         <div className="absolute top-4 left-4"></div>
//                         {post.category && (
//                           <div className="absolute top-4 right-4">
//                             <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
//                               {post.category}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="p-8">
//                         <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
//                           {/* <FaCalendarAlt /> */}
//                           {/* <span>
//                             {new Date(
//                               post.publishedAt || ""
//                             ).toLocaleDateString()}
//                           </span> */}
//                           {/* {post.readTime && (
//                             <>
//                               <span>•</span>
//                               <span>{post.readTime}</span>
//                             </>
//                           )} */}
//                         </div>
//                         <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
//                           {post.title}
//                         </h2>
//                         <p className="text-gray-600 text-sm line-clamp-3 mb-4">
//                           {post.description || parse(post.content || "")}
//                         </p>
//                         <div className="text-blue-600 font-semibold  flex flex-row items-center text-sm">
//                           <span>Read Article</span>
//                           <FaArrowRight className="ml-1" />
//                         </div>
//                       </div>
//                     </motion.article>
//                   </Link>
//                 ))}

//                 {/* Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {currentPosts?.slice(1)?.map((post, index) => (
//                     <Link key={post?._id} href={`/blog/${post.slug}`}>
//                       <motion.article
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay:index * 0.1 }}
//                         whileHover={{ y: -8 }}
//                         className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
//                       >
//                         <div className="relative overflow-hidden">
//                           <Image
//                             src={
//                               post?.thumbImage?.secure_url || "/placeholder.svg"
//                             }
//                             width={400}
//                             height={200}
//                             alt={post?.title}
//                             className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                           {post.category && (
//                             <div className="absolute top-3 left-3">
//                               <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
//                                 {post.category}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="p-6">
//                           <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
//                             {/* <FaCalendarAlt /> */}
//                             {/* <span>
//                               {new Date(
//                                 post.publishedAt || ""
//                               ).toLocaleDateString()}
//                             </span> */}
//                           </div>
//                           <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
//                             {post.title}
//                           </h3>
//                           <p className="text-gray-600 text-sm line-clamp-3 mb-4">
//                             {post.description || parse(post.content || "")}
//                           </p>
//                           <div className="text-blue-600 font-semibold  flex flex-row items-center text-sm">
//                             <span>Read Article</span>
//                             <FaArrowRight className="ml-1" />
//                           </div>
//                         </div>
//                       </motion.article>
//                     </Link>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <p className="text-center text-gray-600">No blogs found.</p>
//             )}
//           </div>

//           {/* Sidebar (Recent blogs etc.) */}
//           <div className="lg:w-1/3 space-y-6">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Recent Posts
//             </h3>
//             {recentBlogs.map((blog) => (
//               <Link href={`/blog/${blog?.slug}`} key={blog?._id}>
//                 <div className="bg-white p-8 shadow-md rounded-lg hover:shadow-lg transition flex flex-row">
//                   <div className=" w-40 h-20">
//                     <img
//                       src={blog?.thumbImage?.secure_url || ""}
//                       alt="Blog Thumbnail"
//                       className="w-[120px] h-[80px] object-cover rounded"
//                     />
//                   </div>
//                   <div>
//                     {" "}
//                     <h4 className="text-md font-semibold text-gray-800">
//                       {blog?.title}
//                     </h4>
//                     <p className="text-sm text-gray-500">
//                       {new Date(blog.publishedAt || "").toLocaleDateString()}
//                     </p>
//                      <p>
//   {" "}
//                       <span className="text-sm font-semibold">Author:</span>
//                       <span className=" text-sm"> {blog.author.name}</span>
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* pagination */}
//       {
//         <div className="flex justify-center items-center space-x-2 mt-12  py-10 mx-auto">
//           <button
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page === 1}
//             className="px-4 py-2 rounded-md  border-gray-400   border-2 text-sm disabled:opacity-50"
//           >
//             Previous
//           </button>

//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx + 1}
//               onClick={() => handlePageChange(idx + 1)}
//               className={`px-4 py-2 rounded-md text-sm ${
//                 page === idx + 1
//                   ? "bg-blue-600 text-white"
//                   : "border border-gray-300"
//               }`}
//             >
//               {idx + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page === totalPages}
//             className="px-4 py-2 rounded-md border-gray-400 border-2 text-sm disabled:opacity-50  "
//           >
//             Next
//           </button>
//         </div>
//       }
//     </div>
//   );
// };

// export default BlogPage;
