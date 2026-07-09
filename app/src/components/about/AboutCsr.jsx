"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "@/styles/components/aboutcsr.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const AboutCsr = ({ dataSet = {} }) => {
  return (
    <div className="csr-about-layout">
        <div className="contnr">
            <div className="csr-about-hdr">
                <div className="csr-about-top">
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
                <div className="csr-about-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="csr-about-container">
                <div className="csr-about-wall">
                    <div className="csr-about-gallery">
                        <Image
                            src={dataSet?.contents?.poster?.url}
                            alt={dataSet?.contents?.poster?.alt}
                            width={dataSet?.contents?.poster?.width}
                            height={dataSet?.contents?.poster?.height}
                        />
                    </div>
                </div>
                <div className="csr-about-contents">
                    <div className="csr-about-subheading">{dataSet?.contents?.subheading}</div>
                    <div className="csr-about-textual-contents">
                        <SafeHtmlRenderer content={dataSet?.contents?.textualContents} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(AboutCsr)