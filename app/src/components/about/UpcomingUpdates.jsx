"use client";
import Image from 'next/image';
import React from 'react'
import { upcomingUpdatesInfo } from "@/data/upcomingUpdatesInfo";

const TABS = ["Current", "Upcoming"];

const UpcomingUpdates = () => {
    const data = upcomingUpdatesInfo?.[0];
    const [tab, setTab] = React.useState("Current");
    const [lineIndex, setLineIndex] = React.useState(0);
    const products = React.useMemo(() => upcomingUpdatesInfo[0]?.mainContent?.allProducts || [], []);

    const processedProducts = React.useMemo(() => {
        return products.map((product) => {
            const totalValue = product?.tiles?.reduce((sum, tile) => sum + (tile?.statValue || 0), 0) || 0;

            return {
                ...product,
                netItem: {
                    ...product?.netItem,
                    statValue: totalValue || product?.netItem?.statValue || 0,
                },
            };
        });
    }, [products]);

    const lineItems = React.useMemo(() => {
        return processedProducts.filter((product) => product?.productStatus === tab);
    }, [processedProducts, tab]);

    const activeProduct = React.useMemo(() => {
        return (lineItems.find((item) => item?.productIndex === lineIndex) || lineItems[0]);
    }, [lineItems, lineIndex]);

    const handleTab = React.useCallback((selectedTab) => {
        setTab(selectedTab);
    }, []);

    const handleLine = React.useCallback((index) => {
        setLineIndex(index);
    }, []);

  return (
    <div className="upcoming-updates-layout">
        <div className="upcoming-updates-hdr">
            <div className="upcoming-updates-top">
                <span className={upcomingUpdatesInfo[0]?.topper?.icon?.className}>
                    <Image
                        src={upcomingUpdatesInfo[0]?.topper?.icon?.url}
                        alt={upcomingUpdatesInfo[0]?.topper?.icon?.alt}
                        width={parseInt(upcomingUpdatesInfo[0]?.topper?.icon?.width)}
                        height={parseInt(upcomingUpdatesInfo[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={upcomingUpdatesInfo[0]?.topper?.text?.className}>{upcomingUpdatesInfo[0]?.topper?.text?.data}</span>
            </div>
            <div className={upcomingUpdatesInfo[0]?.heading?.className}>{upcomingUpdatesInfo[0]?.heading?.data}</div>
        </div>
        <div className="upcoming-updates-container">
            {/* Tabs */}
            <div className="upcoming-updates-tabs">
                {TABS.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={`upcoming-updates-tab-item ${tab === item ? "active" : ""}`}
                        onClick={() => handleTab(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className={data?.mainContent?.className}>
                {/* Product List */}
                <div className="upcoming-updates-lines">
                    {lineItems.map((item) => (
                        <button
                            key={item.productIndex}
                            type="button"
                            className={`upcoming-updates-line-item ${activeProduct?.productIndex === item.productIndex ? "active" : ""}`}
                            onClick={() => handleLine(item.productIndex)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Details */}
                <div className="upcoming-updates-details">
                    <div className="upcoming-updates-details-info">
                        <div className="upcoming-updates-info-hdr">{activeProduct?.name}</div>
                        <div className="upcoming-updates-info-data">
                            {activeProduct?.info?.map((info) => (
                                <div className="data-details" key={info?.id}>
                                    <div className="data-tag">{info?.descTag}:</div>
                                    <div className="data-thickness">{info?.thickness}</div>
                                    <div className="data-width">{info?.width}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Tiles */}
                    <div className="upcoming-updates-details-tiles">
                        <div className="upcoming-updates-details-subsection">
                            {activeProduct?.tiles?.map((tile) => (
                                <div key={tile?.id} className="upcoming-updates-details-subsection-tile">
                                    {tile?.statValue!==0?tile?.statValue:"_"}
                                </div>
                            ))}
                        </div>
                        <div className="upcoming-updates-details-totalsection">
                            <div className="upcoming-updates-details-subsection-tile">
                                {activeProduct?.netItem?.statValue!==0?activeProduct?.netItem?.statValue:"_"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Poster */}
        {activeProduct?.poster?.url && (
            <div className="upcoming-updates-wall">
                <Image
                    src={activeProduct.poster.url}
                    alt={activeProduct.poster.alt}
                    width={activeProduct.poster.width}
                    height={activeProduct.poster.height}
                    priority
                />
            </div>
        )}
    </div>
  )
}

export default React.memo(UpcomingUpdates)