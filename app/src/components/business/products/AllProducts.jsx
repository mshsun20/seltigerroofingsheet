"use client";
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/styles/components/allproducts.css";

const AllProducts = ({ dataSet = {}, product = "" }) => {
    const productsList = React.useMemo(() => dataSet?.contents?.filter(itm => String(itm?.contentTitle) !== String(product)), [dataSet, product]);

  return (
    <div className="all-products-layout">
        <div className="contnr">
            <div className="all-products-hdr">
                <div className="all-products-top">
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
                <div className="all-products-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="all-products-container">
                <div className="all-products-contents">
                    {productsList?.length>0
                    && productsList?.map(itm => 
                        <div className="all-products-content-item" key={itm?.contentIndex}>
                            <div className="all-products-content-item-wall">
                                <Image
                                    src={itm?.contentImage?.url}
                                    alt={itm?.contentImage?.alt}
                                    width={itm?.contentImage?.width}
                                    height={itm?.contentImage?.height}
                                />
                            </div>
                            <div className="all-products-content-item-info">
                                <div className="all-products-content-item-info-top"></div>
                                <div className="all-products-content-item-info-title">{itm?.contentTitle}</div>
                                <div className="all-products-content-item-info-description">
                                    <span><SafeHtmlRenderer content={itm?.contentDescription} /></span>
                                </div>
                                <div className="all-products-content-item-info-actions">
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

export default React.memo(AllProducts)