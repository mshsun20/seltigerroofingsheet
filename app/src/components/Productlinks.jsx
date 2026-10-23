"use client";
import React from 'react'
import Link from 'next/link'
import { productLinkItems } from '@/configs/productLinkItems';

const Productlinks = () => {
  return (
    <div className='product-links'>
      <div className="product-links-title">Our Products</div>
      {productLinkItems.map((item, index) => <li key={index}><Link href={item.path}>{item.name}</Link></li>)}
    </div>
  )
}

export default React.memo(Productlinks)