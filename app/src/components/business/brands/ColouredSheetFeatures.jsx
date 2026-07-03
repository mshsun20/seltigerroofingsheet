"use client";
import Image from 'next/image';
import React from 'react';
import "@/styles/components/aboutproduct.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ColouredSheetFeatures = ({ dataSet = {} }) => {
  return (
    <div className="coloured-sheet-features-layout">
        <div className="contnr">
            <div className="coloured-sheet-features-hdr">
                <div className="coloured-sheet-features-top">
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
                <div className="coloured-sheet-features-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="coloured-sheet-features-container">
                <div className="coloured-sheet-features-contents">
                    {dataSet?.contents?.length>0
                    && dataSet?.contents?.map(itm => 
                        <div
                            className="coloured-sheet-features-item"
                            key={itm?.contentIndex}
                        >
                            <div className="coloured-sheet-features-item-icon">
                                <Image
                                    src={itm?.itemIcon?.url}
                                    alt={itm?.itemIcon?.alt}
                                    width={itm?.itemIcon?.width}
                                    height={itm?.itemIcon?.height}
                                />
                            </div>
                            <div className="coloured-sheet-features-item-details">
                                <div className="coloured-sheet-features-item-title">
                                    {itm?.itemTitle}
                                </div>
                                <div className="coloured-sheet-features-item-description">
                                    <SafeHtmlRenderer content={itm?.itemDescription} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ColouredSheetFeatures)