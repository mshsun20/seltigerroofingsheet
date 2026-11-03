// import React from 'react'
// import "@/styles/blogs.css";
// import dynamic from "next/dynamic";
// import axiosInstance from '@/configs/axiosInstance'
// import LazyWrapper from '@/components/common/LazyWrapper';
// import { blogBanner } from "@/data/blogBanner";
// const Banner = dynamic(() => import("@/components/common/Banner"));
// const BlogPage = dynamic(() => import("@/components/blog/BlogPage"));

// const Blogs = async () => {
//   const response = await axiosInstance.get('/api/blogs')
//   const blogsData = response.data?.data?.sort((a, b) => a.contentIndex - b.contentIndex) || [];

//   // console.log(blogsData);

//   return (
//     <div className="content-layout">
//       <LazyWrapper><Banner data="Blogs" info={blogBanner} /></LazyWrapper>
//       <LazyWrapper><BlogPage blogs={blogsData} limit={4} /></LazyWrapper>
//     </div>
//   )
// }

// export default Blogs





import React from 'react';
import "@/styles/blogs.css";
import dynamicImport from "next/dynamic";
import axiosInstance from '@/configs/axiosInstance';
import LazyWrapper from '@/components/common/LazyWrapper';
import { blogBanner } from "@/data/blogBanner";

const Banner = dynamicImport(() => import("@/components/common/Banner"));
const BlogPage = dynamicImport(() => import("@/components/blog/BlogPage"));

// IMPORTANT: Always render this route dynamically.
export const dynamic = 'force-dynamic';

const Blogs = async () => {
  let blogsData = [];

  try {
    const response = await axiosInstance.get('/api/blogs');
    blogsData = response.data?.data.sort((a, b) => a.contentIndex - b.contentIndex) || [];
  } catch (error) {
    console.error("BLOG FETCH ERROR:", error);
  }

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data="Blogs" info={blogBanner} /></LazyWrapper>
      <LazyWrapper><BlogPage blogs={blogsData} limit={4} /></LazyWrapper>
    </div>
  );
};

export default Blogs;
