"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "@/styles/components/aboutgalvalume.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const AboutGalvalume = ({ dataSet = {} }) => {
  return (
    <div className="galvalume-about-layout">
        <div className="contnr">
            <div className="galvalume-about-wall">
                <div className="galvalume-about-gallery">
                    <Image
                        src={dataSet?.poster?.url}
                        alt={dataSet?.poster?.alt}
                        width={dataSet?.poster?.width}
                        height={dataSet?.poster?.height}
                    />
                </div>
            </div>
            <div className="galvalume-about-container">
                <div className="galvalume-about-hdr">
                    <div className="galvalume-about-top">
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
                    <div className="galvalume-about-heading">{dataSet?.heading?.data}</div>
                </div>
                <div className="galvalume-about-contents">
                    <div className="galvalume-about-textual-contents">
                        <SafeHtmlRenderer content={dataSet?.content} />
                    </div>
                </div>
                <div className="galvalume-about-actions">
                    <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(AboutGalvalume)