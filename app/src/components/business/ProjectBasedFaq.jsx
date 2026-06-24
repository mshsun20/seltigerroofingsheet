"use client";
import React from 'react'

const ProjectBasedFaq = ({ item, isOpen, toggle }) => {
  return (
    <div className={`project-based-faq ${isOpen ? 'active' : ''}`} key={item.contentIndex}>
        <div className="project-based-faq-heading" onClick={toggle}>
            <div className="project-based-faq-heading-part">{item.heading}</div>
            <div className="project-based-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="project-based-faq-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(ProjectBasedFaq)