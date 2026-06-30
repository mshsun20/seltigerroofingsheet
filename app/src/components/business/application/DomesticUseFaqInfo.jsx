"use client";
import Image from 'next/image';
import React from 'react'
import Accordion from '@/components/common/Accordion';
import DomesticUseFaq from "./DomesticUseFaq";
import { domesticUseFaqDetails } from '@/data/domesticUseFaqDetails';

const DomesticUseFaqInfo = () => {
    const items = domesticUseFaqDetails[0]?.mainContent?.allContents?.map((item) => ({
        id: item?.contentIndex,
        heading: item?.heading,
        details: item?.details,
    }));

  return (
    <div className="domestic-use-faq-layout">
        <div className="domestic-use-faq-hdr">
            <div className="domestic-use-faq-top">
                <span className={domesticUseFaqDetails[0]?.topper?.icon?.className}>
                    <Image
                        src={domesticUseFaqDetails[0]?.topper?.icon?.url}
                        alt={domesticUseFaqDetails[0]?.topper?.icon?.alt}
                        width={parseInt(domesticUseFaqDetails[0]?.topper?.icon?.width)}
                        height={parseInt(domesticUseFaqDetails[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={domesticUseFaqDetails[0]?.topper?.text?.className}>{domesticUseFaqDetails[0]?.topper?.text?.data}</span>
            </div>
            <div className={domesticUseFaqDetails[0]?.heading?.className}>{domesticUseFaqDetails[0]?.heading?.data}</div>
        </div>
        <div className="domestic-use-faq-container">
            <div className={domesticUseFaqDetails[0]?.mainContent?.className}>
                <Accordion
                    items={items}
                    defaultOpen={0}
                    multiple={false}
                    renderItem={(item, isOpen, toggle) => (
                        <DomesticUseFaq
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

export default React.memo(DomesticUseFaqInfo)