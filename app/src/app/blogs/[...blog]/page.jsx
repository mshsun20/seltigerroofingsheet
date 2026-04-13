import axiosInstance from "@/configs/axiosInstance"

export const generateMetadata = async ({ params }) => {
  const { blog } = await params
  const slug = blog?.[0] || "";
  try {
    const response = await axiosInstance.get(`/api/blogs/${slug}`)
    const blogData = response.data?.data || {}
    return {
      title: blogData.metaTitle || blogData.title || "",
      description: blogData.metaDescription || "",
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
    
  return (
    <div className="blog-page">
      <h1>{blogData?.title}</h1>
      <p>{blogData?.content}</p>
    </div>
  )
}

export default Blog