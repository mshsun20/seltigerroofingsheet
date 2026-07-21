"use client";
import React from 'react';
import '@/styles/blogfaqs.css';
import Accordion from '@/components/common/Accordion';
import BlogFaqItem from "@/components/blog/BlogFaqItem";

const BlogFaqs = ({ dataSet = [] }) => {
    const items = dataSet?.map((item, indx) => ({
        id: indx,
        heading: item?.heading,
        details: item?.details,
    }));

  return (
    <div className="blog-item-faq-layout">
        <div className="contnr">
            <div className="blog-item-faq-hdr">
                <div className="blog-item-faq-heading">FAQs</div>
            </div>
            <div className="blog-item-faq-container">
                <div className="blog-item-faq-item-contents">
                    <Accordion
                        items={items}
                        defaultOpen={0}
                        multiple={false}
                        renderItem={(item, isOpen, toggle) => (
                            <BlogFaqItem
                                key={item.id}
                                id={item.id}
                                item={item}
                                isOpen={isOpen}
                                toggle={toggle}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(BlogFaqs)