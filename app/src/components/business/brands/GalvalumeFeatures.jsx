"use client";
import Image from 'next/image';
import React from 'react';
import "@/styles/components/galvalumefeatures.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const GalvalumeFeatures = ({ dataSet = {} }) => {
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
                    {dataSet?.contents?.contentFeatures?.length>0
                    && dataSet?.contents?.contentFeatures?.map(itm => 
                        <div
                            className="galvalume-features-item"
                            key={itm?.contentIndex}
                        >
                            <div className="galvalume-features-item-icon">
                                <Image
                                    src={itm?.contentIcon?.url}
                                    alt={itm?.contentIcon?.alt}
                                    width={itm?.contentIcon?.width}
                                    height={itm?.contentIcon?.height}
                                />
                            </div>
                            <div className="galvalume-features-item-details">
                                <div className="galvalume-features-item-title">
                                    {itm?.contentTitle}
                                </div>
                                <div className="galvalume-features-item-description">
                                    <SafeHtmlRenderer content={itm?.contentDescription} />
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