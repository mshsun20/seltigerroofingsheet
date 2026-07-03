"use client";
import Image from 'next/image';
import React from 'react';
import "@/styles/components/faq.css";
import { faqData } from "@/data/faqData";
import Accordion from "@/components/common/Accordion";
import FaqItem from "./FaqItem";

const Faqs = () => {
    const items = faqData[0]?.allFaqs?.map((faq) => ({
        id: faq.faqIndex,
        heading: faq.heading,
        details: faq.details,
    }));

  return (
    <>
        <div className="faqs-layout">
            <div className="contnr">
                <div className="faqs-hdr">
                    <div className="faqs-top">
                        <span className={faqData[0]?.topper?.icon?.className}>
                            <Image
                                src={faqData[0]?.topper?.icon?.url}
                                alt={faqData[0]?.topper?.icon?.alt}
                                width={parseInt(faqData[0]?.topper?.icon?.width)}
                                height={parseInt(faqData[0]?.topper?.icon?.height)}
                            />
                        </span>
                        <span className={faqData[0]?.topper?.text?.className}>{faqData[0]?.topper?.text?.data}</span>
                    </div>
                    <div className={faqData[0]?.heading?.className}>{faqData[0]?.heading?.data}</div>
                </div>
                <div className="faqs-container">                
                    <Accordion
                        items={items}
                        defaultOpen={0}
                        multiple={false}
                        renderItem={(faq, isOpen, toggle) => (
                            <FaqItem
                                key={faq.id}
                                faq={faq}
                                isOpen={isOpen}
                                toggle={toggle}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default React.memo(Faqs)