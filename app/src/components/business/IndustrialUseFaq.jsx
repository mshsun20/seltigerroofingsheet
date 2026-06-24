"use client";
import React from 'react'

const IndustrialUseFaq = ({ item, isOpen, toggle }) => {
  return (
    <div className={`industrial-use-faq ${isOpen ? 'active' : ''}`} key={item.contentIndex}>
        <div className="industrial-use-faq-heading" onClick={toggle}>
            <div className="industrial-use-faq-heading-part">{item.heading}</div>
            <div className="industrial-use-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="industrial-use-faq-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(IndustrialUseFaq)