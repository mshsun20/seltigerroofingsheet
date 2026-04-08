import React from 'react'
import Link from 'next/link'
import { menuItems } from '@/configs/menuItems'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">SELTigerRoofingSheet</div>
        <div className="nav">
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}><Link className='menu-link' href={item.path}>{item.name}</Link></li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Navbar