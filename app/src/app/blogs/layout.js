"use client"
import React from 'react'
import "@/styles/blogs.css"
import Link from 'next/link'
import axiosInstance from '@/configs/axiosInstance'
import Card from '@/components/Card'

const BlogLayout = ({ children }) => {
  const [blogs, setBlogs] = React.useState([])

  const fetchBlogs = React.useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/blogs')
      setBlogs(response.data?.data || [])
    } catch (error) {
      console.error(error)
    }
  }, [])
  React.useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

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