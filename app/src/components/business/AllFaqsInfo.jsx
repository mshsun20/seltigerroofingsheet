"use client";
import Image from 'next/image';
import React from 'react';
import '@/styles/components/allfaqsinfo.css';
import Accordion from '@/components/common/Accordion';
import AllFaqs from "@/components/business/AllFaqs";

const AllFaqsInfo = ({ dataSet = {} }) => {
    const items = dataSet?.mainContent?.allContents?.map((item) => ({
        id: item?.contentIndex,
        heading: item?.heading,
        details: item?.details,
    }));

  return (
    <div className="all-faq-layout">
        <div className="all-faq-hdr">
            <div className="all-faq-top">
                <span className={dataSet?.topper?.icon?.className}>
                    <Image
                        src={dataSet?.topper?.icon?.url}
                        alt={dataSet?.topper?.icon?.alt}
                        width={parseInt(dataSet?.topper?.icon?.width)}
                        height={parseInt(dataSet?.topper?.icon?.height)}
                    />
                </span>
                <span className={dataSet?.topper?.text?.className}>{dataSet?.topper?.text?.data}</span>
            </div>
            <div className={dataSet?.heading?.className}>{dataSet?.heading?.data}</div>
        </div>
        <div className="all-faq-container">
            <div className={dataSet?.mainContent?.className}>
                <Accordion
                    items={items}
                    defaultOpen={0}
                    multiple={false}
                    renderItem={(item, isOpen, toggle) => (
                        <AllFaqs
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

export default React.memo(AllFaqsInfo)