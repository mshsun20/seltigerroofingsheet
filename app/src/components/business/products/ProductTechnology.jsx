"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/producttechnology.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import Link from 'next/link';

const ProductTechnology = ({ dataSet = {} }) => {
  return (
    <div className="product-technology-layout">
        <div className="product-technology-hdr">
            <div className="product-technology-top">
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
            <div className="product-technology-heading">{dataSet?.heading?.data}</div>
        </div>
        <div className="product-technology-container">
            <div className="product-technology-contents">
                <div className="product-technology-images">
                    {dataSet?.contents?.graphicalContents?.length>0
                    && dataSet?.contents?.graphicalContents?.map(itm =>
                        <div
                            className="product-technology-image"
                            key={itm?.contentIndex}
                        >
                            <Image
                                src={itm?.url}
                                alt={itm?.alt}
                                width={parseInt(itm?.width)}
                                height={parseInt(itm?.height)}
                            />
                        </div>
                    )}
                </div>
                <div className="product-technology-description">
                    {dataSet?.contents?.textualContents?.length>0
                    && dataSet?.contents?.textualContents?.map((itm, i) => 
                        <SafeHtmlRenderer key={i} content={itm} />
                    )}
                </div>
            </div>
            <div className="product-technology-action">
                <Link href={dataSet?.action?.url}>
                    {dataSet?.action?.info}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProductTechnology)