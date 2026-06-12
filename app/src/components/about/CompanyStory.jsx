"use client";
import React from 'react'
import Image from 'next/image';
import { companyStoryData } from "@/data/companyStoryData";
import CarouselSlider from "@/components/common/CarouselSlider";
import CompanyStoryCard from "@/components/about/CompanyStoryCard";

const CompanyStory = () => {
  return (
    <div className="story-layout">
        <div className="story-hdr">
            <div className="story-top">
                <span className={companyStoryData[0]?.topper?.icon?.className}>
                    <Image
                        src={companyStoryData[0]?.topper?.icon?.url}
                        alt={companyStoryData[0]?.topper?.icon?.alt}
                        width={parseInt(companyStoryData[0]?.topper?.icon?.width)}
                        height={parseInt(companyStoryData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={companyStoryData[0]?.topper?.text?.className}>{companyStoryData[0]?.topper?.text?.data}</span>
            </div>
            <div className={companyStoryData[0]?.heading?.className}>{companyStoryData[0]?.heading?.data}</div>
        </div>
        <div className="story-container">
            <CarouselSlider
                data={companyStoryData[0]?.mainContent?.contentDetails}
                cardWidth={80}
                slideWidth={50}
                gap={50}
                autoPlay={true}
                autoDelay={5000}
                renderItem={(item) => (
                    <CompanyStoryCard item={item} />
                )}
                animationConfig={{
                    activeOpacity: 1,
                    inactiveOpacity: 0.4,
                    activeBlur: "0",
                    inactiveBlur: "0.2rem"
                }}
                springConfig={{
                    type: "spring",
                    stiffness: 150,
                    damping: 50
                }}
            />
        </div>
    </div>
  )
}

export default React.memo(CompanyStory)