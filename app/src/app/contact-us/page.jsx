import React from 'react'
import '@/styles/contact.css'
import dynamic from "next/dynamic";
const Banner = dynamic(() => import('@/components/contact/Banner'))
const Contactpart = dynamic(() => import('@/components/contact/Contactpart'))

const Contact = () => {
  return (
    <div className="content-layout">
      <div className="contact-layout">
        <Banner />
        <Contactpart />
      </div>
    </div>
  )
}

export default Contact