import React from 'react'
import "@/styles/blogs.css"
import Link from 'next/link'
import axiosInstance from '@/configs/axiosInstance'
import Card from '@/components/Card'

export const generateMetadata = async ({ params }) => {
  return {
    title: "Blog Deatils",
    description: "Read our latest blogs on roofing solutions, industry insights, and tips for maintaining your roof. Stay informed with SEL Tiger Roofing Sheets.",
  }
}

const BlogLayout = async ({ children }) => {
  const response = await axiosInstance.get('/api/blogs')
  const blogs = response.data?.data || []

  return (
    <div className="containr">
      <div className="content-layout">
        <div className="content-part">
          <div className="blog-details">
            <h1 className='blog-heading'>Blog Details</h1>
            {children}
          </div>
          <div className="blog-list">
            <h2 className='bloglist-heading'>Blogs List</h2>
            <ul>
              {blogs.map((blog) => (
                <li key={blog.slug}>
                  <Link href={`/blogs/${blog?.slug}`}>
                    <Card 
                      poster={blog.mediaLink}
                      title={blog.title}
                      shortInfo={blog.content}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogLayout