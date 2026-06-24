"use client";
import React from 'react'

const ProjectBasedFaq = ({ item, isOpen, toggle }) => {
  return (
    <div className={`project-based-faq-item ${isOpen ? 'active' : ''}`} key={item.contentIndex}>
        <div className="project-based-faq-item-heading" onClick={toggle}>
            <div className="project-based-faq-heading-part">{item.heading}</div>
            <div className="project-based-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="project-based-faq-item-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(ProjectBasedFaq)