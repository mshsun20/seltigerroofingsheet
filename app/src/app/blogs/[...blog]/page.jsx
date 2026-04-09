"use client"
import React from 'react'
// import { useParams } from 'next/navigation'
import { useBlogContext } from '../layout'

const Blog = () => {
    // const param = useParams()
    const blogContext = useBlogContext()
    // console.log(blogContext)
    
  return (
    <div className="blog-page">
      <h1>{blogContext?.title}</h1>
      <p>{blogContext?.content}</p>
    </div>
  )
}

export default Blog