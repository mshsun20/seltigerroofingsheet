"use client";
import Image from 'next/image';
import React from 'react'
import { upcomingProductsData } from "@/data/upcomingProductsData";
import WallCard from "@/components/common/WallCard";
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';

const UpcomingProducts = () => {
  return (
    <div className="upcoming-products-layout">
        <div className="upcoming-products-hdr">
            <div className="upcoming-products-top">
                <span className={upcomingProductsData[0]?.topper?.icon?.className}>
                    <Image
                        src={upcomingProductsData[0]?.topper?.icon?.url}
                        alt={upcomingProductsData[0]?.topper?.icon?.alt}
                        width={parseInt(upcomingProductsData[0]?.topper?.icon?.width)}
                        height={parseInt(upcomingProductsData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={upcomingProductsData[0]?.topper?.text?.className}>{upcomingProductsData[0]?.topper?.text?.data}</span>
            </div>
            <div className={upcomingProductsData[0]?.heading?.className}>{upcomingProductsData[0]?.heading?.data}</div>
        </div>
        <div className="upcoming-products-container">
            {upcomingProductsData[0]?.mainContent?.allProducts?.length>0
            && upcomingProductsData[0]?.mainContent?.allProducts?.map(elm => (
                <WallCard
                    id={elm?.productIndex}
                    key={elm?.productIndex}
                    contentWall={elm?.poster}
                    title={elm?.caption}
                    renderAction={
                        <div>
                            <SafeHtmlRenderer content={elm?.description} />
                        </div>
                    }
                />
            ))}
        </div>
    </div>
  )
}

export default React.memo(UpcomingProducts)