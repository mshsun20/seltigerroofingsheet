"use client";

import React from "react";
import "@/styles/components/product.css";
import Image from "next/image";
import Link from "next/link";
import { productData } from "@/data/productData";
import GallerySlider from "@/components/common/GallerySlider";

const ProductPoster = React.memo(function ProductPoster({ items, tabIndex = 0 }) {
    const [arrow, setArrow] = React.useState("↗");
    const selectedItem = items[tabIndex];

    if (!selectedItem) return null;

    return (
        <div className="products-details">
            <div className="products-poster">
                <GallerySlider
                    slides={selectedItem.posters}
                    key={tabIndex}
                />
            </div>
            <div className="products-content">
                <div className="products-content-hds">{selectedItem.heading}</div>
                <div className="products-content-info">{selectedItem.info}</div>
                <div className="products-content-description">{selectedItem.description}</div>
                <div className="products-content-action">
                    <Link
                        href={selectedItem.actionBtn?.url || "#"}
                        className="action-btn"
                        onMouseEnter={() => setArrow("→")}
                        onMouseLeave={() => setArrow("↗")}
                    >
                        {selectedItem.actionBtn?.label}
                        {" "}
                        <span>{arrow}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
});

const Products = () => {
    // One state controls both the selected tab and displayed content.
    const [activeTab, setActiveTab] = React.useState(0);
    const items = productData?.[0]?.allItems?.itemDetails ?? [];

    if (items.length === 0) return null;

    return (
        <div className="products-layout">
            <div className="contnr">
                <div className="products-hdr">
                    <div className="products-top">
                        <span className={productData[0]?.topper?.icon?.className}>
                            <Image
                                src={productData[0]?.topper?.icon?.url}
                                alt={productData[0]?.topper?.icon?.alt || ""}
                                width={parseInt(productData[0]?.topper?.icon?.width, 10)}
                                height={parseInt(productData[0]?.topper?.icon?.height, 10)}
                            />
                        </span>
                        <span className={productData[0]?.topper?.text?.className}>
                            {productData[0]?.topper?.text?.data}
                        </span>
                    </div>
                    <div className={productData[0]?.heading?.className}>
                        {productData[0]?.heading?.dataList?.map((elm, i) => <span className="hdng" key={i}>{elm}</span>)}
                    </div>
                </div>
                <div className="products-container">
                    <div className="products-vtabs">
                        {items.map((itm, i) => (
                            <div
                                className={activeTab === i
                                    ? "products-vtabs-link active"
                                    : "products-vtabs-link"
                                }
                                key={itm.tabName}
                                onClick={() => setActiveTab(i)}
                                role="button"
                                tabIndex={0}
                                aria-pressed={activeTab === i}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        setActiveTab(i);
                                    }
                                }}
                            >
                                <div className={productData[0]?.allItems?.tabClassName}>
                                    {itm.tabName}{" "}
                                    {activeTab === i ? "🡽" : "🡾"}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="products-section">
                        <ProductPoster
                            items={items}
                            tabIndex={activeTab}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Products);