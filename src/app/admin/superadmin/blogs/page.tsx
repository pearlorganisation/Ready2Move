"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteBlog, getBlogs } from "@/lib/redux/actions/blogAction";
import Pagination from "@/components/Pagination";

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
  
  const limit = 10;

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
          <p className="text-gray-500 text-sm">
            Showing {blogs?.length || 0} of {pagination?.total || 0} total blogs
          </p>
        </div>
        <button
          className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md flex items-center gap-2"
          onClick={() => router.push("/admin/superadmin/blogs/add")}
        >
          <span>+</span> Add New Blog
        </button>
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
