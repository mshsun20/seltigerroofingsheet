import React from 'react'
import { companyStoryData } from "@/data/companyStoryData";
import Image from 'next/image';

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
        <div className="story-container"></div>
    </div>
  )
}

export default React.memo(CompanyStory)