"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productfeatures.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ProductFeatures = ({ dataSet = {} }) => {
  return (
    <div className="product-features-layout">
        <div className="product-features-poster">
            <div className="product-features-top">
                <Image
                    src={dataSet?.topper?.icon?.url}
                    alt={dataSet?.topper?.icon?.alt}
                    width={parseInt(dataSet?.topper?.icon?.width)}
                    height={parseInt(dataSet?.topper?.icon?.height)}
                />
            </div>
        </div>
        <div className="product-features-container">
            <div className="product-features-hdr">
                <div className="product-features-top">
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
                <div className="product-features-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="product-features-contents">
                {dataSet?.contents?.length>0
                && dataSet?.contents?.map(itm => 
                    <div
                        className="product-features-item"
                        key={itm?.contentIndex}
                    >
                        <div className="product-features-item-icon">
                            <Image
                                src={itm?.itemIcon?.url}
                                alt={itm?.itemIcon?.alt}
                                width={itm?.itemIcon?.width}
                                height={itm?.itemIcon?.height}
                            />
                        </div>
                        <div className="product-features-item-details">
                            <div className="product-features-item-title">
                                {itm?.itemTitle}
                            </div>
                            <div className="product-features-item-description">
                                <SafeHtmlRenderer content={itm?.itemDescription} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProductFeatures)