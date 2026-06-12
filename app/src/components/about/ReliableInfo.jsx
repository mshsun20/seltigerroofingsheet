"use client";
import Image from 'next/image';
import React from 'react'
import { reliableInfo } from "@/data/reliableInfo";
import GallerySlider from "@/components/common/GallerySlider";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import Statcounter from "@/components/common/Statcounter";

const ReliableInfo = () => {
  return (
    <div className="reliable-layout">
        <div className="reliable-hdr">
            <div className="reliable-top">
                <span className={reliableInfo[0]?.topper?.icon?.className}>
                    <Image
                        src={reliableInfo[0]?.topper?.icon?.url}
                        alt={reliableInfo[0]?.topper?.icon?.alt}
                        width={parseInt(reliableInfo[0]?.topper?.icon?.width)}
                        height={parseInt(reliableInfo[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={reliableInfo[0]?.topper?.text?.className}>{reliableInfo[0]?.topper?.text?.data}</span>
            </div>
            <div className={reliableInfo[0]?.heading?.className}>{reliableInfo[0]?.heading?.data}</div>
        </div>
        <div className="reliable-container">
            <div className={reliableInfo[0]?.mainGallery?.className}>
                <GallerySlider slides={reliableInfo[0]?.mainGallery?.galleryItems} />
            </div>
            <div className={reliableInfo[0]?.mainContent?.className}>
                <div className="reliable-content-text">
                    {
                        reliableInfo[0]?.mainContent?.contentTextuals?.map((elm, i) => (
                            <span key={i}><SafeHtmlRenderer content={elm?.data} /></span>
                        ))
                    }
                </div>
                <div className="reliable-content-info"><Statcounter statData={reliableInfo[0]?.mainContent?.contentCounter} /></div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ReliableInfo)