// components/BlogDetails.tsx
"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { axiosInstance } from "@/lib/constants/axiosInstance";

interface BlogPost {
  title: string;
  content: string;
  publishedAt: string;
  thumbImage?: {
    secure_url: string;
  };
}

interface BlogDetailsProps {
  slug: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ slug }) => {
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/blogs/${slug}`);
        if (res.data.success && res.data.data) {
          setPost(res.data.data);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to fetch blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {post?.thumbImage?.secure_url && (
        <img
          src={post.thumbImage.secure_url}
          alt={post.title}
          className="rounded mb-4 w-full h-auto"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post?.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post?.publishedAt).toDateString()}
      </p>
      <div className="prose max-w-none">{parse(post?.content)}</div>
    </div>
  );
};

export default BlogDetails;
