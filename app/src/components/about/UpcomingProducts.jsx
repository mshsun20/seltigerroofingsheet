"use client";
import Image from 'next/image';
import React from 'react'
import { upcomingProductsData } from "@/data/upcomingProductsData";
import WallCard from "@/components/common/WallCard";
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';

const UpcomingProductDetails = React.memo(function UpcomingProductDetails({
    heading="",
    contentDetails="",
    onClose
}) {
    return (
        <div className="upcoming-products-content-card-modal">
            <div className="upcoming-products-content-card-modal-close" onClick={onClose}>X</div>
            <div className="upcoming-products-content-card-heading">{heading}</div>
            <div className="upcoming-products-content-card-details">
                <SafeHtmlRenderer content={contentDetails} />
            </div>
        </div>
    )
})

const DEFAULT_VALUE = { status: false, title: "", data: "" }

const UpcomingProducts = () => {
    const [open, setOpen] = React.useState(DEFAULT_VALUE);

    const handleOpen = (e, heading, details) => {
        e.preventDefault();
        setOpen({ status: true, title: heading, data: details });
    }

    const handleClose = (e) => {
        setOpen(DEFAULT_VALUE);
    }

  return (
    <div className="upcoming-products-layout">
        <div className="contnr">
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
                <div className={upcomingProductsData[0]?.mainContent?.className}>
                    {upcomingProductsData[0]?.mainContent?.allProducts?.length>0
                    && upcomingProductsData[0]?.mainContent?.allProducts?.map(elm => (
                        <WallCard
                            id={elm?.productIndex}
                            key={elm?.productIndex}
                            contentWall={elm?.poster}
                            title={elm?.caption}
                            height="25rem"
                            onClick={(e) => handleOpen(e, elm?.caption, elm?.description)}
                            renderAction={
                                <div
                                    style={{
                                        padding:"1rem 0",
                                        color:"var(--theme)",
                                        fontSize:"1rem",
                                        fontWeight:400,
                                        cursor:"pointer"
                                    }}
                                >Read More</div>
                            }
                        />
                    ))}
                </div>
                {open?.status
                && <UpcomingProductDetails
                    heading={open?.title}
                    contentDetails={open?.data}
                    onClose={handleClose}
                />}
            </div>
        </div>
    </div>
  )
}

export default React.memo(UpcomingProducts)