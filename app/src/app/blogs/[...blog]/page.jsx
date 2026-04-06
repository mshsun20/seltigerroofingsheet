"use client"
import React from 'react'

const Blog = ({ params }) => {
    const param = React.use(params)
    console.log(param)
  return (
    <div>Blog {param.blog}</div>
  )
}

export default Blog