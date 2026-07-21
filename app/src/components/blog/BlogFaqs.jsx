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
    <div className="all-faq-layout">
        <div className="contnr">
            <div className="all-faq-hdr">
                <div className="all-faq-heading">FAQs</div>
            </div>
            <div className="all-faq-container">
                <div className="all-faq-item-contents">
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