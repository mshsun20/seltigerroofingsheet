"use client";
import Image from 'next/image';
import React from 'react';
import "@/styles/components/faq.css";
import { faqData } from "@/data/home/faqData";

const Faqs = () => {
    const [fqIndx, setFqIndx] = React.useState(null)
    // const [open, setOpen] = React.useState(false)

    const handleFaq = (e, i) => {
        // e.preventDefault();
        setFqIndx(prev => prev===i ? null : i)
    }

  return (
    <>
        <div className="faqs-layout">
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
                {faqData[0]?.allFaqs?.map((faq) => {
                    const isOpen = fqIndx===faq.faqIndex
                    return (
                        <div className={`faqs-item ${isOpen ? 'active' : ''}`} key={faq.faqIndex}>
                            <div className="faqs-item-heading" onClick={(e) => handleFaq(e, faq.faqIndex)}>
                                <div className="faqs-heading-part">{faq.heading}</div>
                                <div className="faqs-toggler">
                                    {isOpen ? <span>−</span> : <span>+</span>}
                                </div>
                            </div>

                            <div className="faqs-item-content">{faq.details}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default React.memo(Faqs)