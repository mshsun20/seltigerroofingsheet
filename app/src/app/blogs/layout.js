"use client"
import React from 'react'
import Link from 'next/link'
import axiosInstance from '@/configs/axiosInstance'
import { useSelectedLayoutSegment } from 'next/navigation'

const BlogContext = React.createContext()
export const useBlogContext = () => React.useContext(BlogContext)

const blogLayout = ({ children }) => {
  const [blogs, setBlogs] = React.useState([])
  const activeSlug = useSelectedLayoutSegment()

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

  const activeBlog = React.useMemo(() => {
    return blogs.find((blog) => blog.slug === activeSlug)
  }, [activeSlug, blogs])

  return (
    <BlogContext.Provider value={activeBlog}>
      <div className="blog-layout">
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blogs/${blog?.slug}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
          {children}
      </div>
    </BlogContext.Provider>
  )
}

export default blogLayout