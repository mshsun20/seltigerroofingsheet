"use client"
import React from 'react'
import Link from 'next/link'

const blogLayout = ({ children }) => {
  return (
    <div className="blog-layout">
        <ul>
            <li><Link href="/blogs/1">Blog Post 1</Link></li>
            <li><Link href="/blogs/2">Blog Post 2</Link></li>
        </ul>
        {children}
    </div>
  )
}

export default blogLayout