"use client"
import React, { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Pagination } from "@mui/material";
import cardimg from "../../assets/building-4.jpg"
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
    description: "All the Lorem Ipsum generators on the Internet tend to repeat",
    image: cardimg,
  },
  {
    title: "chose your dream house",  
    description: "All the Lorem Ipsum generators on the Internet tend to repeat",
    image: cardimg,
  },
  {
    id: 5,
    title: "chose your dream house",
    description: "All the Lorem Ipsum generators on the Internet tend to repeat",
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

  interface HandleChangeEvent {
    target: EventTarget;
  }

  const handleChange = (event: HandleChangeEvent, value: number): void => {
    setPage(value);
  };

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className=" mx-auto">
      {/* Banner Image */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
  <Image 
    src={banner} 
    layout="fill" 
    objectFit="cover" 
    alt="Blog Banner" 
    className="absolute inset-0 w-full h-full"
  />
  {/* Optional Overlay */}
  <div className="absolute inset-0 bg-red-300 bg-opacity-50 items-center justify-center text-center flex flex-col">
    <div>
    <h1 className="text-white text-3xl md:text-5xl font-bold">Our Properties For Sale</h1>
    </div>
   
    <p className="text-white mt-2 text-2xl font-bold">you can find here as per your location
        </p>
  </div>
</div>


      {/* Header */}
      <div className="px-14">
      <div className="text-center my-8">
        {/* <h1 className="text-4xl font-bold text-gray-800">BLOG</h1> */}
     
      </div>

      {/* Search and Filter */}
      <div className="px-4">
        <div className="flex items-center justify-between rounded-lg px-4 py-3 border pb-3 mb-6">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-gray-700"
            />
          </div>
          <button className="flex items-center gap-1 text-gray-700 border px-3 py-2 rounded-lg">
            All category <MdKeyboardArrowDown />
          </button>
        </div>

        {/* Blog Posts Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Bigger Blog Post */}
          <div className="md:w-2/3">
            {currentPosts.slice(0, 1).map((post) => (
              <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image src={post.image} width={600} height={350} alt={post.title} className="w-full h-[350px] object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-sm text-gray-500 mt-2">{post.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Two Blog Posts */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {currentPosts.slice(1, 3).map((post) => (
              <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-row">
                <Image src={post.image} width={150} height={120} alt={post.title} className="w-[200px] h-[200px] object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-sm text-gray-500 mt-2">{post.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

 {/* Right: Recent Posts */}
 <div className="flex justify-between">
  <div></div>
  <div className="bg-white p-5 rounded-lg  shadow-lg ">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center gap-4">
              {/* Thumbnail Image */}
              <Image
                src={post.image}
                width={80}
                height={60}
                alt={post.title}
                className="rounded-lg"
              />
              {/* Post Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700">{post.title}</h4>
                <p className="text-xs text-gray-500">
                  {post.date} • {post.readTime}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
       
      </div>
 </div>
 <div className="flex justify-center mt-6">
          <Pagination count={Math.ceil(blogPosts.length / postsPerPage)} page={page} onChange={handleChange} color="primary" />
        </div>

    </div></div></div>
  );
};

export default BlogPage;
