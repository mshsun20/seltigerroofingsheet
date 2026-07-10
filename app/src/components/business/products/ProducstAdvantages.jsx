"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "@/styles/components/productadvantages.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import BeforeAfterSlider from "@/components/common/BeforeAfterSlider";
import GallerySlider from "@/components/common/GallerySlider";

const ProducstAdvantages = ({ dataSet = {} }) => {
  return (
    <div className="product-advantages-layout">
        <div className="contnr">
            <div className="product-advantages-container">
                <div className="product-advantages-hdr">
                    <div className="product-advantages-top">
                        <span className="topper-icon">
                            <Image
                                src={dataSet?.topper?.icon?.url}
                                alt={dataSet?.topper?.icon?.alt}
                                width={parseInt(dataSet?.topper?.icon?.width)}
                                height={parseInt(dataSet?.topper?.icon?.height)}
                            />
                        </span>
                        <span className="topper-text">{dataSet?.topper?.text?.data}</span>
                    </div>
                    <div className="product-advantages-heading">{dataSet?.heading?.data}</div>
                </div>
                <div className="product-advantages-contents">
                    <div className="product-advantages-textual-contents">
                        {dataSet?.contents?.textualContents?.length>0
                        && dataSet?.contents?.textualContents?.map((itm, i) => <SafeHtmlRenderer content={itm} key={i} />)}
                    </div>
                </div>
            </div>
            {dataSet?.contents?.graphicalContents?.length>0
            && <div className="product-advantages-wall">
                {dataSet?.contents?.graphicalContents?.length===2
                ? <BeforeAfterSlider
                    beforeImage={dataSet?.contents?.graphicalContents[0]?.url}
                    beforeAlt={dataSet?.contents?.graphicalContents[0]?.alt}
                    afterImage={dataSet?.contents?.graphicalContents[1]?.url}
                    afterAlt={dataSet?.contents?.graphicalContents[1]?.alt}
                /> : <GallerySlider slides={dataSet?.contents?.graphicalContents} />}
            </div>}
        </div>
    </div>
  )
}

export default ProducstAdvantages