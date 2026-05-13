"use client";
import React from 'react'

const Blogwall = ({ children }) => {
  return (
    <div className='blogwall'>
      {children}
    </div>
  )
}

export default React.memo(Blogwall)