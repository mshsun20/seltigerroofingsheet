"use client";
import React from 'react'
import { manufacturingFacilitiesDetails } from "@/data/manufacturingFacilitiesDetails";
import GallerySlider from "@/components/common/GallerySlider";
import Image from 'next/image';
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ManufacturingFacilitySection = () => {
  return (
    <div className="manufacturing-facility-layout">
        <div className="contnr">
            <div className="manufacturing-facility-hdr">
                <div className={manufacturingFacilitiesDetails[0]?.heading?.className}>
                    {manufacturingFacilitiesDetails[0]?.heading?.data}
                </div>
            </div>
            <div className="manufacturing-facility-container">
                <div className={manufacturingFacilitiesDetails[0]?.mainContent?.className}>
                    <div className={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.className}>
                        <div className="manufacturing-facility-slider">
                            <GallerySlider slides={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.gallery} />
                        </div>
                        <div className="manufacturing-facility-images">
                            {manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.length>0
                            && manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.map(itm => (
                                <div
                                    key={itm?.imgIndex}
                                    className="image-block"
                                    id={`img-block-${parseInt(itm?.imgIndex)+1}`}
                                >
                                    <Image
                                        src={itm?.url}
                                        alt={itm?.alt}
                                        width={itm?.width}
                                        height={itm?.height}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="manufacturing-facility-textual-contents">
                        <div className="manufacturing-facility-textual-contents-title">
                            {manufacturingFacilitiesDetails[0]?.mainContent?.contentTextuals?.title}
                        </div>
                        <div className="manufacturing-facility-textual-contents-description">
                            {manufacturingFacilitiesDetails[0]?.mainContent?.contentTextuals?.description?.length>0
                            && manufacturingFacilitiesDetails[0]?.mainContent?.contentTextuals?.description?.map((elm, i) => <SafeHtmlRenderer content={elm} key={i} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ManufacturingFacilitySection)