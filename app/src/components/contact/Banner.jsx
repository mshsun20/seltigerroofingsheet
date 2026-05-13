"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className='banner'>
        <div className="banner-poster">
            <Image src="/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-06-at-21.00.12_72f04151.jpg" alt="contact-banner" width={1000} height={500} />
        </div>
        <div className="banner-content container">
            <div className="banner-hdr">Contact Us</div>
            <div className="banner-info">
                <Link href="/">Home</Link>
                <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                <Link href="#">Contact Us</Link>
            </div>
        </div>
    </div>
  )
}

export default React.memo(Banner)