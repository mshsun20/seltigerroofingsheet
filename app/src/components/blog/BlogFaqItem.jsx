import React from 'react'

const BlogFaqItem = ({ id, item, isOpen, toggle }) => {
  return (
    <div className={`blog-item-faq-item ${isOpen ? 'active' : ''}`} key={id}>
        <div className="blog-item-faq-item-heading" onClick={toggle}>
            <div className="blog-item-faq-heading-part">{item.heading}</div>
            <div className="blog-item-faq-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="blog-item-faq-item-content">
            {item.details}
        </ul>
    </div>
  )
}

export default React.memo(BlogFaqItem)