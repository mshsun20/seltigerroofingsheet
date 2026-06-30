"use client";
import React from 'react'
import { domesticUseInfoDetails } from "@/data/domesticUseInfoDetails";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import Link from 'next/link';
import Image from 'next/image';

const DomesticUseInfo = () => {
  return (
    <div className="domestic-use-info-layout">
        <div className={domesticUseInfoDetails[0]?.mainContent?.textualContents?.className}>
            {domesticUseInfoDetails[0]?.mainContent?.textualContents?.contents?.length>0
            && domesticUseInfoDetails[0]?.mainContent?.textualContents?.contents?.map((elm, i) => (
                <SafeHtmlRenderer content={elm} key={i} />
            ))}
            <div className="domestic-use-info-link">
                <Link href={`/contact`}>Contact Us</Link>
            </div>
        </div>
        <div className="domestic-use-info-hdr">
            <div className="domestic-use-info-top">
                <span className={domesticUseInfoDetails[0]?.topper?.icon?.className}>
                    <Image
                        src={domesticUseInfoDetails[0]?.topper?.icon?.url}
                        alt={domesticUseInfoDetails[0]?.topper?.icon?.alt}
                        width={parseInt(domesticUseInfoDetails[0]?.topper?.icon?.width)}
                        height={parseInt(domesticUseInfoDetails[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={domesticUseInfoDetails[0]?.topper?.text?.className}>{domesticUseInfoDetails[0]?.topper?.text?.data}</span>
            </div>
            <div className={domesticUseInfoDetails[0]?.heading?.className}>{domesticUseInfoDetails[0]?.heading?.data}</div>
        </div>
        <div className="domestic-use-info-container">
            <div className={domesticUseInfoDetails[0]?.mainContent?.className}>
                <div className={domesticUseInfoDetails[0]?.mainContent?.graphicalContents?.className}>
                    {domesticUseInfoDetails[0]?.mainContent?.graphicalContents?.contents?.length>0
                    && domesticUseInfoDetails[0]?.mainContent?.graphicalContents?.contents?.map(elm => 
                        <div
                            className="graphical-content-info"
                            key={elm?.contentIndex}
                        >
                            <Image
                                src={elm?.url}
                                alt={elm?.alt}
                                width={elm?.width}
                                height={elm?.height}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(DomesticUseInfo)