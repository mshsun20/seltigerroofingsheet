"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/galvalumegallery.css";

const GalvalumeGallery = ({ dataSet = {} }) => {
  return (
    <div className="galvalume-gallery-layout">
        <div className="contnr">
            <div className="galvalume-gallery-hdr">
                <div className="galvalume-gallery-top">
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
                <div className="galvalume-gallery-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="galvalume-gallery-container">
                {dataSet?.contents?.graphicalContents?.length>0
                && dataSet?.contents?.graphicalContents?.map(itm => 
                    <div
                        className="galvalume-gallery-item"
                        key={itm?.contentIndex}
                    >
                        <Image
                            src={itm?.url}
                            alt={itm?.alt}
                            width={itm?.width}
                            height={itm?.height}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default React.memo(GalvalumeGallery)