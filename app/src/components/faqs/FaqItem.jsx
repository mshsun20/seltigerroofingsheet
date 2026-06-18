"use client";
import React from 'react'

const FaqItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className={`faqs-item ${isOpen ? 'active' : ''}`} key={faq.faqIndex}>
        <div className="faqs-item-heading" onClick={toggle}>
            <div className="faqs-heading-part">{faq.heading}</div>
            <div className="faqs-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <div className="faqs-item-content">{faq.details}</div>
    </div>
  )
}

export default React.memo(FaqItem)