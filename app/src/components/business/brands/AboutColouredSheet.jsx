"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "@/styles/components/aboutcolouredsheet.css";
import GallerySlider from "@/components/common/GallerySlider";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const AboutColouredSheet = ({ dataSet = {} }) => {
  return (
    <div className="coloured-sheet-about-layout">
        <div className="contnr">
            <div className="coloured-sheet-about-wall">
                <div className="coloured-sheet-about-gallery">
                    <GallerySlider slides={dataSet?.contents?.mainGallery} />
                </div>
            </div>
            <div className="coloured-sheet-about-container">
                <div className="coloured-sheet-about-hdr">
                    <div className="coloured-sheet-about-top">
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
                    <div className="coloured-sheet-about-heading">{dataSet?.heading?.data}</div>
                </div>
                <div className="coloured-sheet-about-contents">
                    <div className="coloured-sheet-about-textual-contents">
                        <SafeHtmlRenderer content={dataSet?.contents?.textualContents} />
                    </div>
                </div>
                <div className="coloured-sheet-about-actions">
                    <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(AboutColouredSheet)