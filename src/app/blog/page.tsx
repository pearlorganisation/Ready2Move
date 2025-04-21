"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import gsap from "gsap";

import cardimg from "../../assets/building-4.jpg";
import banner from "../../assets/city.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Dummy text of the printing",
    description: "The standard chunk of Lorem Ipsum used since the 1500s",
    image: cardimg,
  },
  {
    id: 2,
    title: "There are many variations of passages of Lorem Ipsum",
    description: "Richard McClintock, a Latin professor at College in Virginia",
    image: banner,
  },
  {
    id: 3,
    title: "There are many variations of passages",
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat",
    image: cardimg,
  },
  {
    title: "chose your dream house",
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat",
    image: cardimg,
  },
  {
    id: 5,
    title: "chose your dream house",
    description:
      "All the Lorem Ipsum generators on the Internet tend to repeat",
    image: cardimg,
  },
];

const recentPosts = [
  {
    id: 1,
    title: "chose your dream house",
    date: "2024-09-13",
    readTime: "13 min read",
    image: banner,
  },
  {
    id: 2,
    title: "chose your dream house",
    date: "2023-09-03",
    readTime: "11 min read",
    image: banner,
  },
  {
    id: 3,
    title: "chose your dream house",
    date: "2023-10-06",
    readTime: "12 min read",
    image: banner,
  },
  {
    id: 4,
    title: "chose your dream house",
    date: "2023-08-23",
    readTime: "36 min read",
    image: banner,
  },
];

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const postsPerPage = 3;
  const bannerRef = useRef(null);

  const handleChange = (event: any, value: number): void => {
    setPage(value);
  };

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="mx-auto text-gray-800">
      {/* Banner */}
      <div
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
        ref={bannerRef}
      >
        <Image
          src={banner}
          layout="fill"
          objectFit="cover"
          alt="Blog Banner"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center flex-col">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Our Properties For Sale
          </h1>
          <p className="text-white mt-4 text-xl md:text-2xl font-medium">
            Find your dream home by location
          </p>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="max-w-[85rem] mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white shadow-md p-4 rounded-xl mb-8">
          <div className="flex items-center gap-3 border px-3 py-2 rounded-md w-full md:w-auto">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-gray-700 w-full"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-600 border px-4 py-2 rounded-md hover:bg-gray-100 transition">
            All Categories <MdKeyboardArrowDown />
          </button>
        </div>

        {/* Blog Post Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Blog Cards */}
          <div className="lg:w-2/3 space-y-8">
            {currentPosts.slice(0, 1).map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white shadow-lg rounded-xl overflow-hidden"
              >
                <Image
                  src={post.image}
                  width={800}
                  height={400}
                  alt={post.title}
                  className="w-full object-cover"
                />
                <div className="p-5">
                  <h2 className="text-2xl font-semibold">{post.title}</h2>
                  <p className="text-gray-500 mt-3">{post.description}</p>
                </div>
              </motion.div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPosts.slice(1, 3).map((post, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="bg-white shadow-lg rounded-xl overflow-hidden flex"
                >
                  <Image
                    src={post.image}
                    width={200}
                    height={150}
                    alt={post.title}
                    className="object-cover w-48"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-600 mt-2">
                      {post.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8 ">
              <Pagination
                count={Math.ceil(blogPosts.length / postsPerPage)}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </div>
          </div>

          {/* Recent Posts */}
          <div className="lg:w-1/4 h-max bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <Image
                    src={post.image}
                    width={80}
                    height={60}
                    alt={post.title}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <p className="text-xs text-gray-500">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
      </div>
    </div>
  );
};

export default BlogPage;
