"use client";
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/styles/components/productbrands.css";

const ProductBrands = ({ dataSet = {} }) => {
  return (
    <div className="product-brands-layout">
        <div className="contnr">
            <div className="product-brands-hdr">
                <div className="product-brands-top">
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
                <div className="product-brands-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="product-brands-container">
                <div className="product-brands-contents">
                    {dataSet?.contents?.length>0
                    && dataSet?.contents?.map(itm => 
                        <div className="product-brands-content-item" key={itm?.contentIndex}>
                            <div className="product-brands-content-item-wall">
                                <Image
                                    src={itm?.contentImage?.url}
                                    alt={itm?.contentImage?.alt}
                                    width={itm?.contentImage?.width}
                                    height={itm?.contentImage?.height}
                                />
                            </div>
                            <div className="product-brands-content-item-info">
                                <div className="product-brands-content-item-info-top"></div>
                                <div className="product-brands-content-item-info-title">{itm?.contentTitle}</div>
                                <div className="product-brands-content-item-info-description">
                                    <span><SafeHtmlRenderer content={itm?.contentDescription} /></span>
                                </div>
                                <div className="product-brands-content-item-info-actions">
                                    <Link href={itm?.action?.url}>{itm?.action?.info}</Link>
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

export default React.memo(ProductBrands)