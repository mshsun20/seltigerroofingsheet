"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productfeatures.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ProductFeatures = ({ dataSet = {} }) => {
  return (
    <div className="product-features-layout"
        style={{background: dataSet?.contents?.bg}}
    >
        <div className="contnr">
            <div
                className="product-features-wall"
                style={{order: dataSet?.contents?.graphicalContents?.order}}
            >
                <div className="product-features-poster">
                    <Image
                        src={dataSet?.contents?.graphicalContents?.poster?.url}
                        alt={dataSet?.contents?.graphicalContents?.poster?.alt}
                        width={parseInt(dataSet?.contents?.graphicalContents?.poster?.width)}
                        height={parseInt(dataSet?.contents?.graphicalContents?.poster?.height)}
                    />
                </div>
            </div>
            <div
                className="product-features-container"
                style={{order: dataSet?.contents?.textualContents?.order}}
            >
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
                    {dataSet?.contents?.textualContents?.allContents?.length>0
                    && dataSet?.contents?.textualContents?.allContents?.map(itm => 
                        <div
                            className="product-features-item"
                            key={itm?.contentIndex}
                        >
                            <div className="product-features-item-icon">
                                <Image
                                    src={itm?.contentIcon?.url}
                                    alt={itm?.contentIcon?.alt}
                                    width={itm?.contentIcon?.width}
                                    height={itm?.contentIcon?.height}
                                />
                            </div>
                            <div className="product-features-item-details">
                                <div className="product-features-item-title">
                                    {itm?.contentHeading}
                                </div>
                                <div className="product-features-item-description">
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

export default React.memo(ProductFeatures)