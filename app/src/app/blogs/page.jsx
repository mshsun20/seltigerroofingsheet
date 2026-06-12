import React from 'react'
import LazyWrapper from '@/components/common/LazyWrapper';
const Blogwall = React.lazy(() => import("@/components/blog/Blogwall"))
import axiosInstance from '@/configs/axiosInstance'
import Card from '@/components/common/Card'
import Banner from "@/components/common/Banner";
import { blogBanner } from "@/data/blogBanner";

const Blogs = async () => {
  const response = await axiosInstance.get('/api/blogs')
  const blogs = response.data?.data || []

  return (
    <div className="blog-layout">
      <LazyWrapper><Banner data={"Blogs"} info={blogBanner} /></LazyWrapper>
      <LazyWrapper>
        <Blogwall>
          <ul className='blog-list'>
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Card 
                  poster={blog?.mediaLink}
                  title={blog?.title}
                  description={blog?.description}
                  url={`/blogs/${blog?.slug}`}
                />
              </li>
            ))}
          </ul>
        </Blogwall>
      </LazyWrapper>
    </div>
  )
}

export default Blogs