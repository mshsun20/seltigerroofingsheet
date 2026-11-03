// import React from 'react'
// import "@/styles/blogitem.css";
// import dynamic from "next/dynamic";
// import LazyWrapper from "@/components/common/LazyWrapper"
// import axiosInstance from "@/configs/axiosInstance"
// import { blogBanner } from "@/data/blogBanner";
// const Banner = dynamic(() => import("@/components/common/Banner"))
// const Blogcontent = dynamic(() => import("@/components/blog/Blogcontent"))

// const getSlug = (blog) => {
//   if (!Array.isArray(blog)) return "";
//   // Your blog URL should contain exactly one path segment
//   if (blog.length !== 1) return "";
//   const slug = blog[0];
//   // Ignore special/system paths
//   if (!slug || slug.startsWith(".")) return "";
//   return slug;
// };

// export const generateMetadata = async ({ params }) => {
//   const { blog } = await params;
//   const slug = getSlug(blog);
//   if (!slug) {
//     return {
//       title: "Blog Details",
//       description: "",
//     };
//   }

//   try {
//     const response = await axiosInstance.get(`/api/blogs/${slug}`);
//     const blogData = response.data?.data || {};
//     return {
//       title: blogData.title || "",
//       description: blogData.description || "",
//     };
//   } catch (error) {
//     console.error("Blog metadata error:", error);
//     return {
//       title: "Blog Details",
//       description: "",
//     };
//   }
// }

// const Blog = async ({ params }) => {
//   const { blog } = await params;
//   // console.log("BLOG DETAILS::", blog);
//   const slug = getSlug(blog);
//   // console.log("BLOG SLUG:", slug);
//   if (!slug) return null;

//   const response = await axiosInstance.get(`/api/blogs/${slug}`);
//   const blogData = response.data?.data || null;
//   const banner = {
//     ...blogBanner,
//     bannerInfo: [
//       ...blogBanner.bannerInfo,
//       { name: blogData?.title, url: "#" },
//     ],
//   };
    
//   return (
//     <div className="content-layout">
//       <LazyWrapper><Banner data={blogData?.title} info={banner} /></LazyWrapper>
//       <LazyWrapper><Blogcontent data={blogData} /></LazyWrapper>
//     </div>
//   )
// }

// export default Blog






import React from 'react';
import "@/styles/blogitem.css";
import dynamicImport from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper"
import axiosInstance from "@/configs/axiosInstance"
import { blogBanner } from "@/data/blogBanner";
const Banner = dynamicImport(() => import("@/components/common/Banner"))
const Blogcontent = dynamicImport(() => import("@/components/blog/Blogcontent"))

// IMPORTANT: Always render blog details dynamically.
export const dynamic = 'force-dynamic';

const getSlug = (blog) => {
  if (!Array.isArray(blog)) return "";
  if (blog.length !== 1) return "";
  const slug = blog[0];
  if (!slug || slug.startsWith(".")) return "";
  return slug;
};

export const generateMetadata = async ({ params }) => {
  const { blog } = await params;
  const slug = getSlug(blog);
  if (!slug) {
    return {
      title: "Blog Details",
      description: "",
    };
  }

  try {
    const response = await axiosInstance.get(`/api/blogs/${slug}`);
    const blogData = response.data?.data;

    return {
      title: blogData?.title || "Blog Details",
      description: blogData?.description || "",
    };
  } catch (error) {
    console.error("Blog metadata error:", error);
    return {
      title: "Blog Details",
      description: "",
    };
  }
};

const Blog = async ({ params }) => {
  const { blog } = await params;
  const slug = getSlug(blog);
  if (!slug) return null;
  let blogData, banner

  try {
    const response = await axiosInstance.get(`/api/blogs/${slug}`);
    const blogData = response.data?.data || null;
    if (!blogData) return null;

    banner = {
      ...blogBanner,
      bannerInfo: [
        ...blogBanner.bannerInfo,
        {
          name: blogData.title,
          url: "#",
        },
      ],
    };
  } catch (error) {
    console.error("BLOG DETAILS FETCH ERROR:", error);

    return null;
  }

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={blogData.title} info={banner} /></LazyWrapper>
      <LazyWrapper><Blogcontent data={blogData} /></LazyWrapper>
    </div>
  );
};

export default Blog;
