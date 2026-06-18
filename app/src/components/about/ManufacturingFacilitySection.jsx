"use client";
import React from 'react'
import { manufacturingFacilitiesDetails } from "@/data/manufacturingFacilitiesDetails"
import GallerySlider from "@/components/common/GallerySlider";
import Image from 'next/image';
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ManufacturingFacilitySection = () => {
  return (
    <div className="manufacturing-facility-layout">
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
                        <div id="manufacturing-facility-imageblocka">
                            <Image
                                src={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockA?.url}
                                alt={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockA?.alt}
                                width={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockA?.width}
                                height={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockA?.height}
                            />
                        </div>
                        <div id="manufacturing-facility-imageblockb">
                            <Image
                                src={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockB?.url}
                                alt={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockB?.alt}
                                width={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockB?.width}
                                height={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockB?.height}
                            />
                        </div>
                        <div id="manufacturing-facility-imageblockc">
                            <Image
                                src={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockC?.url}
                                alt={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockC?.alt}
                                width={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockC?.width}
                                height={manufacturingFacilitiesDetails[0]?.mainContent?.contentGraphicals?.imageBlock?.blockC?.height}
                            />
                        </div>
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
  )
}

export default React.memo(ManufacturingFacilitySection)