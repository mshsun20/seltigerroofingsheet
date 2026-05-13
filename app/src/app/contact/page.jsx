import React from 'react'
import '@/styles/contact.css'
const Banner = React.lazy(() => import('@/components/contact/Banner'))
const Contactpart = React.lazy(() => import('@/components/contact/Contactpart'))

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