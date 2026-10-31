"use client";
import React from 'react'
import { otherFacilitiesInfo } from "@/data/otherFacilitiesInfo"
import WallCard from "@/components/common/WallCard";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const OtherFacilityDetails = React.memo(function OtherFacilityDetails({
    heading="",
    contentDetails="",
    onClose
}) {
    return (
        <div className="other-facility-content-card-modal">
            <div className="other-facility-content-card-modal-close" onClick={onClose}>X</div>
            <div className="other-facility-content-card-heading">{heading}</div>
            <div className="other-facility-content-card-details">
                <SafeHtmlRenderer content={contentDetails} />
            </div>
        </div>
    )
})

const DEFAULT_VALUE = { status: false, title: "", data: "" }

const OtherFacilitySection = () => {
    const [open, setOpen] = React.useState(DEFAULT_VALUE);

    const handleOpen = (e, heading, details) => {
        e.preventDefault();
        setOpen({ status: true, title: heading, data: details });
    }

    const handleClose = (e) => {
        setOpen(DEFAULT_VALUE);
    }
    
  return (
    <div className="other-facility-layout">
        <div className="contnr">
            <div className="other-facility-hdr">
                <div className={otherFacilitiesInfo[0]?.heading?.className}>
                    {otherFacilitiesInfo[0]?.heading?.data}
                </div>
            </div>
            <div className="other-facility-container">
                <div className={otherFacilitiesInfo[0]?.mainContent?.className}>
                    {otherFacilitiesInfo[0]?.mainContent?.allContents?.length>0
                    && otherFacilitiesInfo[0]?.mainContent?.allContents?.map(elm => (
                        <div
                            key={elm?.contentIndex}
                            className="other-facility-content-card"
                        >
                            <WallCard
                                id={elm?.contentIndex}
                                contentWall={elm?.poster}
                                title={elm?.heading}
                                renderAction={
                                    <button onClick={(e) => handleOpen(e, elm?.heading, elm?.details)} className="other-facility-content-btn">
                                        Open
                                    </button>
                                }
                            />
                        </div>
                    ))}
                </div>
                {open?.status
                && <OtherFacilityDetails
                    heading={open?.title}
                    contentDetails={open?.data}
                    onClose={handleClose}
                />}
            </div>
        </div>
    </div>
  )
}

export default React.memo(OtherFacilitySection)