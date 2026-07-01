"use client";
import React from 'react'

const AllFaqs = ({ item, isOpen, toggle }) => {
  return (
    <div className={`all-faq-item ${isOpen ? 'active' : ''}`} key={item.contentIndex}>
        <div className="all-faq-item-heading" onClick={toggle}>
            <div className="all-faq-heading-part">{item.heading}</div>
            <div className="all-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="all-faq-item-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(AllFaqs)