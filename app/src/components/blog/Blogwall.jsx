"use client";
import React from 'react'

const Blogwall = ({ children }) => {
  return (
    <div className='blog-container'>
      {children}
    </div>
  )
}

export default React.memo(Blogwall)