"use client";
import React from 'react'

const DomesticUseFaq = ({ item, isOpen, toggle }) => {
  return (
    <div className={`domestic-use-faq-item ${isOpen ? 'active' : ''}`} key={item.contentIndex}>
        <div className="domestic-use-faq-item-heading" onClick={toggle}>
            <div className="domestic-use-faq-heading-part">{item.heading}</div>
            <div className="domestic-use-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="domestic-use-faq-item-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(DomesticUseFaq)