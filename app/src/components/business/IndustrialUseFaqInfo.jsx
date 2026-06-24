"use client";
import React from 'react'
import Accordion from '@/components/common/Accordion';
import IndustrialUseFaq from './IndustrialUseFaq';
import Image from 'next/image';
import { industrialUseFaqDetails } from '@/data/industrialUseFaqDetails';

const IndustrialUseFaqInfo = () => {
    const items = industrialUseFaqDetails[0]?.mainContent?.allContents?.map((item) => ({
        id: item?.contentIndex,
        heading: item?.heading,
        details: item?.details,
    }));
    
  return (
    <div className="industrial-use-faq-layout">
        <div className="industrial-use-faq-hdr">
            <div className="industrial-use-faq-top">
                <span className={industrialUseFaqDetails[0]?.topper?.icon?.className}>
                    <Image
                        src={industrialUseFaqDetails[0]?.topper?.icon?.url}
                        alt={industrialUseFaqDetails[0]?.topper?.icon?.alt}
                        width={parseInt(industrialUseFaqDetails[0]?.topper?.icon?.width)}
                        height={parseInt(industrialUseFaqDetails[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={industrialUseFaqDetails[0]?.topper?.text?.className}>{industrialUseFaqDetails[0]?.topper?.text?.data}</span>
            </div>
            <div className={industrialUseFaqDetails[0]?.heading?.className}>{industrialUseFaqDetails[0]?.heading?.data}</div>
        </div>
        <div className="industrial-use-faq-container">
            <div className={industrialUseFaqDetails[0]?.mainContent?.className}>
                <Accordion
                    items={items}
                    defaultOpen={0}
                    multiple={false}
                    renderItem={(item, isOpen, toggle) => (
                        <IndustrialUseFaq
                            key={item.id}
                            item={item}
                            isOpen={isOpen}
                            toggle={toggle}
                        />
                    )}
                />
            </div>
        </div>
    </div>
  )
}

export default React.memo(IndustrialUseFaqInfo)