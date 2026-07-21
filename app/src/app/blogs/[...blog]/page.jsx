import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper"
import axiosInstance from "@/configs/axiosInstance"
import { blogBanner } from "@/data/blogBanner";
const Banner = dynamic(() => import("@/components/common/Banner"))
const Blogcontent = dynamic(() => import("@/components/blog/Blogcontent"))

export const generateMetadata = async ({ params }) => {
  const { blog } = await params
  const slug = blog?.[0] || "";
  try {
    const response = await axiosInstance.get(`/api/blogs/${slug}`)
    const blogData = response.data?.data || {}
    return {
      title: blogData.title || blogData.title || "",
      description: blogData.description || "",
    }
  }
  catch (error) {
    console.error(error)
    return {
      title: "Blog Details",
      description: "",
    }
  }
}

const Blog = async ({ params }) => {
  const { blog } = await params
  // console.log(blog);
  const slug = blog?.[0] || "";

  const response = await axiosInstance.get(`/api/blogs/${slug}`)
  const blogData = response.data?.data || null

  console.log(blogData);

  const banner = {...blogBanner}
  banner.bannerInfo = [...banner.bannerInfo, {
    name: blogData?.title,
    url: "#"
  }]
    
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={blogData?.title} info={banner} /></LazyWrapper>
      <LazyWrapper><Blogcontent data={blogData} /></LazyWrapper>
    </div>
  )
}

export default Blog