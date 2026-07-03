"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productshades.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ProductShades = ({ dataSet = {} }) => {
  return (
    <div className="product-shades-layout">
        <div className="product-shades-wall">
            <div className="product-shades-poster">
                <Image
                    src={dataSet?.contents?.graphicalContents?.poster?.url}
                    alt={dataSet?.contents?.graphicalContents?.poster?.alt}
                    width={parseInt(dataSet?.contents?.graphicalContents?.poster?.width)}
                    height={parseInt(dataSet?.contents?.graphicalContents?.poster?.height)}
                />
            </div>
        </div>
        <div className="product-shades-container">
            <div className="product-shades-hdr">
                <div className="product-shades-top">
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
                <div className="product-shades-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="product-shades-contents">
                {dataSet?.contents?.textualContents?.length>0
                && dataSet?.contents?.textualContents?.map(itm => 
                    <div
                        className="product-shades-item"
                        key={itm?.contentIndex}
                    >
                        <div className="product-shades-item-icon">
                            <Image
                                src={itm?.contentIcon?.url}
                                alt={itm?.contentIcon?.alt}
                                width={itm?.contentIcon?.width}
                                height={itm?.contentIcon?.height}
                            />
                        </div>
                        <div className="product-shades-item-details">
                            <div className="product-shades-item-title">
                                {itm?.contentHeading}
                            </div>
                            <div className="product-shades-item-description">
                                <SafeHtmlRenderer content={itm?.contentDescription} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProductShades)