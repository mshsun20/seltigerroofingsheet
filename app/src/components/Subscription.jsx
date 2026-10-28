"use client";
import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faYoutube,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

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
            <Link href="https://www.facebook.com/SELTiger.RoofingSheets" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link href="https://www.instagram.com/seltigerroofingsheets" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
            </Link>
        </div>
    </div>
  )
}

export default React.memo(Subscription)