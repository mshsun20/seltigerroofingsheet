"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/companystorycard.css";

const CompanyStoryCard = ({ item }) => {
  return (
    <div className="story-slider-card">
        <div className="story-slider-card-hdr">
            <div className="story-slider-hdr">
                {item?.year || ""}
            </div>
        </div>
        <div className="story-slider-details">
            <div className="story-slider-caption">{item?.title || ""}</div>
            <div className="story-slider-description">{item?.description || ""}</div>
            <div className="story-slider-image">
                <Image
                    src={item?.image?.url || "/"}
                    alt={item?.image?.alt || "No Image"}
                    width={item?.image?.width || 0}
                    height={item?.image?.height || 0}
                />
            </div>
        </div>
    </div>
  )
}

export default React.memo(CompanyStoryCard)