import React from 'react'
import LazyWrapper from "@/components/LazyWrapper"
const Banner = React.lazy(() => import("@/components/Banner"))
import { blogBanner } from "@/data/blogBanner";
const Blogcontent = React.lazy(() => import("@/components/blog/Blogcontent"))
import axiosInstance from "@/configs/axiosInstance"

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
  console.log(blog);
  const slug = blog?.[0] || "";

  const response = await axiosInstance.get(`/api/blogs/${slug}`)
  const blogData = response.data?.data || null

  const banner = {...blogBanner}
  banner.bannerInfo = [...banner.bannerInfo, {
    name: blogData?.title,
    url: "#"
  }]

  console.log(banner);
    
  return (
    <div className="blog-layout">
      <LazyWrapper><Banner data={blogData?.title} info={banner} /></LazyWrapper>
      <LazyWrapper><Blogcontent data={blogData} /></LazyWrapper>
    </div>
  )
}

export default Blog