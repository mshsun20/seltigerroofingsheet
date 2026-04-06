"use client"
import React from 'react'
import Header from './Header'
import Link from 'next/link'
import { menuItems } from '@/configs/menuItems'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="hdr">
            <Header />
        </div>
        <div className="nav">
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Navbar