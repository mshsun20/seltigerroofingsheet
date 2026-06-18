"use client";
import React from 'react'
import Link from 'next/link'
import { quickLinkItems } from '../configs/quickLinkItems'

const Quicklinks = () => {
  return (
    <div className='quick-links'>
        <div className="quick-links-title">Quick Links</div>
        {quickLinkItems.map((item, index) => <li key={index}><Link href={item.path}>{item.name}</Link></li>)}
    </div>
  )
}

export default React.memo(Quicklinks)