"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { productData } from "@/data/home/productData"

const ProductPoster = React.memo(function ProductPoster({ items, tabIndex=0 }) {
    return (
        <div className="products-details">
            <div className="products-poster">
                <Image
                    src={items[tabIndex]?.poster || "/"}
                    alt="products details"
                    width={20}
                    height={20}
                />
            </div>
            <div className="products-content">
                <div className="products-content-hds">{items[tabIndex]?.heading}</div>
                <div className="products-content-info">{items[tabIndex]?.info}</div>
                <div className="products-content-info">{items[tabIndex]?.description}</div>
                <div className="products-content-action">{items[tabIndex]?.actionBtn[0]?.label}</div>
            </div>
        </div>
    )
})

const Products = () => {
    const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <div className="products-layout">
        <div className="products-hdr">
            <div className="products-top">
                <span className={productData[0]?.topper?.icon?.className}>
                    <Image
                        src={productData[0]?.topper?.icon?.url}
                        alt={productData[0]?.topper?.icon?.alt}
                        width={parseInt(productData[0]?.topper?.icon?.width)}
                        height={parseInt(productData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={productData[0]?.topper?.text?.className}>{productData[0]?.topper?.text?.data}</span>
            </div>
            <div className={productData[0]?.heading?.className}>{productData[0]?.heading?.data}</div>
        </div>
        <div className="products-container">
            <div className="products-vtabs">
                {productData[0]?.allItems?.itemDetails?.length>0
                && productData[0]?.allItems?.itemDetails?.map((itm, i) => (
                    <div className="products-vtabs-link" key={i}>
                        <div className={productData[0]?.allItems?.tabClassName} onClick={() => setTabIndex(i)}>{itm?.tabName}</div>
                    </div>
                ))}
            </div>
            <div className="products-section"><ProductPoster items={productData[0]?.allItems?.itemDetails} tabIndex={tabIndex} /></div>
        </div>
    </div>
  )
}

export default React.memo(Products)