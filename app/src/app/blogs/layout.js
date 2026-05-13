import React from 'react'
import "@/styles/blogs.css"

export const generateMetadata = async ({ params }) => {
  return {
    title: "Blog Deatils",
    description: "Read our latest blogs on roofing solutions, industry insights, and tips for maintaining your roof. Stay informed with SEL Tiger Roofing Sheets.",
  }
}

const BlogLayout = async ({ children }) => {
  return (    
    <div className="content-layout">
      {children}
    </div>
  )
}

export default BlogLayout