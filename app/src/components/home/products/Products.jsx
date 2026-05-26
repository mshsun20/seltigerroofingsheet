"use client";
import React from 'react'
import "@/styles/components/product.css"
import Image from 'next/image';
import Link from 'next/link';
import { productData } from "@/data/home/productData"
import GallerySlider from '@/components/GallerySlider';

const ProductPoster = React.memo(function ProductPoster({ items, tabIndex=0 }) {
    const [arrow, setArrow] = React.useState('↗');

    return (
        <div className="products-details">
            <div className="products-poster">
                <GallerySlider slides={items[tabIndex]?.posters} key={tabIndex} />
            </div>
            <div className="products-content">
                <div className="products-content-hds">{items[tabIndex]?.heading}</div>
                <div className="products-content-info">{items[tabIndex]?.info}</div>
                <div className="products-content-description">{items[tabIndex]?.description}</div>
                <div className="products-content-action">
                    <Link href="#" className="action-btn" onMouseEnter={() => setArrow('→')} onMouseLeave={() => setArrow('↗')}>
                        {items[tabIndex]?.actionBtn[0]?.label} <span>{arrow}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
})

const Products = () => {
    const [tabIndex, setTabIndex] = React.useState(0)
    const [activeTab, setActiveTab] = React.useState(0)

    if (productData?.length===0) return <></>

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
            <div className={productData[0]?.heading?.className}>
                {
                    productData[0]?.heading?.dataList?.map((elm, i) => (
                        <span className="hdng" key={i}>{elm}</span>
                    ))
                } 
            </div>
        </div>
        <div className="products-container">
            <div className="products-vtabs">
                {productData[0]?.allItems?.itemDetails?.length>0
                && productData[0]?.allItems?.itemDetails?.map((itm, i) => (
                    <div className={activeTab===i ? "products-vtabs-link active" : "products-vtabs-link"} key={i} onClick={() => setActiveTab(i)}>
                        <div className={productData[0]?.allItems?.tabClassName} onClick={() => setTabIndex(i)}>
                            {itm?.tabName} {activeTab===i ? "🡽" : "🡾"}
                        </div>
                    </div>
                ))}
            </div>
            <div className="products-section"><ProductPoster items={Array.from({ length: productData[0]?.allItems?.itemDetails?.length }, (_, i) => productData[0]?.allItems?.itemDetails[i])} tabIndex={tabIndex} /></div>
        </div>
    </div>
  )
}

export default React.memo(Products)