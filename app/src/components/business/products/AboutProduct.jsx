"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "@/styles/components/aboutproduct.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const AboutProduct = ({ dataSet = {} }) => {
  return (
    <div className="product-about-layout">
        <div className="contnr">
            <div className="product-about-wall">
                <div className="product-about-poster">
                    <Image
                        src={dataSet?.contents?.graphicalContents?.poster?.url}
                        alt={dataSet?.contents?.graphicalContents?.poster?.alt}
                        width={parseInt(dataSet?.contents?.graphicalContents?.poster?.width)}
                        height={parseInt(dataSet?.contents?.graphicalContents?.poster?.height)}
                    />
                </div>
                <div className="product-about-mini">
                    <Image
                        src={dataSet?.contents?.graphicalContents?.imageDock?.url}
                        alt={dataSet?.contents?.graphicalContents?.imageDock?.alt}
                        width={parseInt(dataSet?.contents?.graphicalContents?.imageDock?.width)}
                        height={parseInt(dataSet?.contents?.graphicalContents?.imageDock?.height)}
                    />
                </div>
            </div>
            <div className="product-about-container">
                <div className="product-about-hdr">
                    <div className="product-about-top">
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
                    <div className="product-about-heading">{dataSet?.heading?.data}</div>
                </div>
                <div className="product-about-contents">
                    <div className="product-about-textual-contents">
                        {dataSet?.contents?.textualContents?.length>0
                        && dataSet?.contents?.textualContents?.map((itm, i) => <SafeHtmlRenderer content={itm} key={i} />)}
                    </div>
                </div>
                <div className="product-about-actions">
                    <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(AboutProduct)