"use client";
import React from 'react'

const CertificationsCredentialsFaq = ({ item, isOpen, toggle }) => {
  return (
    <div className={`certifications-credentials-faq-item ${isOpen ? 'active' : ''}`} key={item.contentIndex}>
        <div className="certifications-credentials-faq-item-heading" onClick={toggle}>
            <div className="certifications-credentials-faq-heading-part">{item.heading}</div>
            <div className="certifications-credentials-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="certifications-credentials-faq-item-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(CertificationsCredentialsFaq)