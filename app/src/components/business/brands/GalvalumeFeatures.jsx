"use client";
import Image from 'next/image';
import React from 'react';
import "@/styles/components/aboutproduct.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const GalvalumeFeatures = () => {
  return (
    <div className="galvalume-features-layout">
        <div className="contnr">
            <div className="galvalume-features-hdr">
                <div className="galvalume-features-top">
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
                <div className="galvalume-features-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="galvalume-features-container">
                <div className="galvalume-features-contents">
                    {dataSet?.contents?.length>0
                    && dataSet?.contents?.map(itm => 
                        <div
                            className="galvalume-features-item"
                            key={itm?.contentIndex}
                        >
                            <div className="galvalume-features-item-icon">
                                <Image
                                    src={itm?.itemIcon?.url}
                                    alt={itm?.itemIcon?.alt}
                                    width={itm?.itemIcon?.width}
                                    height={itm?.itemIcon?.height}
                                />
                            </div>
                            <div className="galvalume-features-item-details">
                                <div className="galvalume-features-item-title">
                                    {itm?.itemTitle}
                                </div>
                                <div className="galvalume-features-item-description">
                                    <SafeHtmlRenderer content={itm?.itemDescription} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default GalvalumeFeatures