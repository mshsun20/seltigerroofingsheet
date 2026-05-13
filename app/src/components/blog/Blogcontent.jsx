"use client";
import React from 'react'

const Blogcontent = ({ children }) => {
  console.log(children);

  return (
    <div>Blogcontent</div>
  )
}

export default React.memo(Blogcontent)