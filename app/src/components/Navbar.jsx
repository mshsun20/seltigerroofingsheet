import React from 'react'
import Link from 'next/link'
import { menuItems } from '@/configs/menuItems'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='containr nav-container'>
        <div className="navbar">
            <div className="logo">
                <Image src="/logo.png" alt="SELTigerRoofingSheet" fill />
            </div>
            <div className="nav">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.icon && <Link className='icon-link' href={item.path} target={item.target || "_self"}>
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    width="100"
                                    height="100"
                                    style={{ objectFit: "contain" }}
                                />
                            </Link>}
                            {!item.icon && <Link className='menu-link' href={item.path}>{item.name}</Link>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar