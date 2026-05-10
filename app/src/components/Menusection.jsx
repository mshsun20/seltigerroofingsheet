// "use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const Menusection = ({ menuItems, onToggle }) => {
    return (
        <ul className='menu'>
            <button className='menuclose' onClick={onToggle}><ChevronRight /></button>
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
    )
}

export default React.memo(Menusection)