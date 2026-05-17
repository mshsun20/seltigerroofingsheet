import React from 'react'
import Banner from '@/components/blog/Banner'
const Blogwall = React.lazy(() => import("@/components/blog/Blogwall"))
import axiosInstance from '@/configs/axiosInstance'
import Card from '@/components/Card'
import Link from 'next/link'

const Blogs = async () => {
  const response = await axiosInstance.get('/api/blogs')
  const blogs = response.data?.data || []

  return (
    <div className="blog-layout">
      <Banner data={"Blogs"} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Blogwall>
          <ul className='blog-list'>
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Link href={`/blogs/${blog?.slug}`}>
                  <Card 
                    poster={blog?.mediaLink}
                    title={blog?.title}
                    description={blog?.description}
                    url={`/blogs/${blog?.slug}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Blogwall>
      </React.Suspense>
    </div>
  )
}

export default Blogs