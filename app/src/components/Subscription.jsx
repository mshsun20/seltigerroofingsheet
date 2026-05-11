"use client";
import React from 'react'
import Link from 'next/link'

const Subscription = () => {
    const [arrow, setArrow] = React.useState('↗');

  return (
    <div className='subsciption'>
        <div className="subscription-title">Subscribe to our newsletter</div>
        <div className='subscription-info'>Get the latest updates and offers.</div>
        <div className="subscription-form">
            <input type="email" placeholder="Enter your email address" required />
            <button onMouseEnter={() => setArrow('→')} onMouseLeave={() => setArrow('↗')}>Subscribe <span>{arrow}</span></button>
        </div>
        <div className="subscription-social-links">
            <Link href="https://www.facebook.com/seltigerroofingsheet" target="_blank" rel="noopener noreferrer">Facebook</Link>
            <Link href="https://www.instagram.com/seltigerroofingsheet" target="_blank" rel="noopener noreferrer">Instagram</Link>
        </div>
    </div>
  )
}

export default React.memo(Subscription)