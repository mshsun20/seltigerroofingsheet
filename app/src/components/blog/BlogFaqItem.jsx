import React from 'react'

const BlogFaqItem = ({ id, item, isOpen, toggle }) => {
  return (
    <div className={`blog-faq-item ${isOpen ? 'active' : ''}`} key={id}>
        <div className="blog-faq-item-heading" onClick={toggle}>
            <div className="blog-faq-heading-part">{item.heading}</div>
            <div className="blog-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="blog-faq-item-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(BlogFaqItem)