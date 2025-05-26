"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import gsap from "gsap";
import parse from "html-react-parser";
import cardimg from "../../assets/building-4.jpg";
import banner from "../../assets/city.jpg";
import { axiosInstance } from "@/lib/constants/axiosInstance";
import Link from "next/link";

// Blog Type
interface Blog {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  thumbImage?: {
    secure_url?: string;
  };
  publishedAt?: string;
}

const BlogPage: React.FC = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const postsPerPage = 2;
  const bannerRef = useRef<HTMLDivElement>(null);

  const getAllBlogs = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/blogs?limit=${postsPerPage}&page=${page}`
      );
      if (res?.data?.data) setData(res.data.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const getRecentBlogs = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/blogs/recent");
      if (res?.data?.data) setRecentBlogs(res.data.data);
    } catch (error) {
      console.error("Failed to fetch recent blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
    getRecentBlogs();
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
  }, [page]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="mx-auto text-gray-800">
      {/* Search & Content */}
      <div className="max-w-[85rem] mx-auto px-6 py-10">
        {/* Search */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white shadow-md p-4 rounded-xl mb-8">
          <div className="flex items-center gap-3 border px-3 py-2 rounded-md w-full md:w-auto">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-gray-700 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Blog Posts */}
          <div className="lg:w-2/3 space-y-8">
            {currentPosts.length > 0 ? (
              <>
                {/* First post */}
                {currentPosts.slice(0, 1).map((post) => (
                  <Link key={post._id} href={`/blog/${post.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={post?.image || cardimg}
                        width={800}
                        height={400}
                        alt={post?.title || "Blog Image"}
                        className="w-full object-cover"
                      />
                      <div className="p-5">
                        <h2 className="text-2xl font-semibold">{post.title}</h2>
                        <p className="text-gray-500 mt-3">{post.description}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                {/* Remaining posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPosts.slice(1).map((post) => (
                    <Link key={post._id} href={`/blog/${post.slug}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white shadow-lg rounded-xl overflow-hidden flex cursor-pointer"
                      >
                        <Image
                          src={post?.thumbImage?.secure_url || cardimg}
                          width={200}
                          height={150}
                          alt={post?.title || "Blog Thumbnail"}
                          className="object-cover w-52 h-40"
                        />
                        <div className="p-4">
                          <h2 className="text-lg font-bold">{post.title}</h2>
                          <div className="line-clamp-3 overflow-hidden text-ellipsis text-sm text-gray-700 mt-2">
                            {parse(post.content || "")}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <Pagination
                    count={Math.ceil(data.length / postsPerPage)}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                  />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">No blogs found.</p>
            )}
          </div>

          {/* Recent Posts */}
          <div className="lg:w-1/4 h-max bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
            <div className="space-y-8 flex flex-col gap-2 w-80">
              {recentBlogs.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <Image
                      src={post?.thumbImage?.secure_url || cardimg}
                      width={80}
                      height={60}
                      alt={post?.title || "Recent blog"}
                      className="rounded-lg w-36 h-28 object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(post?.publishedAt || "").toDateString()}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
