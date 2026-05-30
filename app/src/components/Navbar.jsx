"use client"
import React from 'react'
import { Logs } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { menuItems } from '@/data/menuItems'
import Menusection from './Menusection'
import { m, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='container nav-container'>
        <div className="navbar">
            <div className="logo">
                <Link className='icon-link' href="/">
                    <Image
                        src="/wp-content/themes/sel/assets/img/logo/Logo_White.png"
                        alt="SELTigerRoofingSheet"
                        width="100"
                        height="100"
                        style={{ objectFit: "contain" }}
                    />
                </Link>
            </div>
            <div className="nav">
                <Menusection menuItems={menuItems} />
            </div>
            <div className="sub">
                <button className='toggle' onClick={handleMenuToggle}><Logs /></button>
                <AnimatePresence>
                    {isMenuOpen && <m.div
                        className="menu-container fixed top-0 left-0 w-full bg-white shadow-lg z-50"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <Menusection menuItems={menuItems} onToggle={handleMenuToggle} mobile={true} />
                    </m.div>}   
                </AnimatePresence>
            </div>
        </div>
    </div>
  )
}

export default React.memo(Navbar)