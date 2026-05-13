"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Banner = ({ children, link }) => {
  return (
    <div className='banner'>
        <div className="banner-poster">
            <Image src="/wp-content/uploads/2026/02/blogs-banner.jpg" alt="blog-banner" width={1000} height={500} />
        </div>
        <div className="banner-content">
            <div className="banner-hdr">{children}</div>
            <div className="banner-info">
                <Link href={link || "/"}>Home</Link>
                {
                    children==="Blogs"
                    ? <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                    : (
                        <>
                            <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                            <Link href="/blogs">Blogs</Link>
                            <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                        </>
                    )
                }
                <Link href={link || "#"}>{children}</Link>
            </div>
        </div>
    </div>
  )
}

export default React.memo(Banner)