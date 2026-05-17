import React from 'react'
// import Banner from "@/components/blog/Banner";
const Banner = React.lazy(() => import("@/components/blog/Banner"))
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
    
  return (
    <div className="blog-layout">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Banner data={blogData?.title || "Blog Details"} />
      </React.Suspense>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Blogcontent data={blogData} />
      </React.Suspense>
    </div>
  )
}

export default Blog