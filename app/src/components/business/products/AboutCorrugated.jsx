"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "@/styles/components/aboutcorrugated.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import GallerySlider from '@/components/common/GallerySlider';

const AboutCorrugated = ({ dataSet = {} }) => {
  return (
    <div className="corrugated-about-layout">
        <div className="contnr">
            <div className="corrugated-about-wall">
                <div className="corrugated-about-gallery">
                    <GallerySlider slides={dataSet?.contents?.mainGallery} />
                </div>
            </div>
            <div className="corrugated-about-container">
                <div className="corrugated-about-hdr">
                    <div className="corrugated-about-top">
                        <span className="topper-icon">
                            <Image
                                src={dataSet?.topper?.icon?.url}
                                alt={dataSet?.topper?.icon?.alt}
                                width={parseInt(dataSet?.topper?.icon?.width)}
                                height={parseInt(dataSet?.topper?.icon?.height)}
                            />
                        </span>
                        <span className="topper-text">{dataSet?.topper?.text?.data}</span>
                    </div>
                    <div className="corrugated-about-heading">{dataSet?.heading?.data}</div>
                </div>
                <div className="corrugated-about-contents">
                    <div className="corrugated-about-textual-contents">
                        {dataSet?.contents?.textualContents?.length>0
                        && dataSet?.contents?.textualContents?.map((itm, i) => <SafeHtmlRenderer content={itm} key={i} />)}
                    </div>
                </div>
                <div className="corrugated-about-actions">
                    <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(AboutCorrugated)