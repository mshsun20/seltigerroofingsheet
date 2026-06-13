"use client";
import React from 'react'
import { otherFacilitiesInfo } from "@/data/otherFacilitiesInfo"
import WallCard from "@/components/common/WallCard";
import { useRouter } from "next/navigation"

const OtherFacilitySection = () => {
    const navig = useRouter()
    const handleOpen = (e, link) => {
        e.preventDefault()
        navig.push(link)
    }
    
  return (
    <div className="other-facility-layout">
        <div className="other-facility-hdr">
            <div className={otherFacilitiesInfo[0]?.heading?.className}>
                {otherFacilitiesInfo[0]?.heading?.data}
            </div>
        </div>
        <div className="other-facility-container">
            <div className={otherFacilitiesInfo[0]?.mainContent?.className}>
                {otherFacilitiesInfo[0]?.mainContent?.allContents?.length>0
                && otherFacilitiesInfo[0]?.mainContent?.allContents?.map(elm => (
                    <WallCard
                        id={elm?.contentIndex}
                        key={elm?.contentIndex}
                        contentWall={elm?.poster}
                        title={elm?.heading}
                        renderAction={
                            <button onClick={(e) => handleOpen(e, elm?.linkUrl)} className="other-facility-content-btn">
                                Open
                            </button>
                        }
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default React.memo(OtherFacilitySection)