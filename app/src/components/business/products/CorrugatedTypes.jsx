"use client";
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/styles/components/allcorrugatedtypes.css";

const CorrugatedTypes = ({ dataSet = {} }) => {
  return (
    <div className="corrugated-types-layout">
        <div className="contnr">
            <div className="corrugated-types-hdr">
                <div className="corrugated-types-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-types-container">
                <div className="corrugated-types-contents">
                    {dataSet?.contents?.length>0
                    && dataSet?.contents?.map(itm => 
                        <div className="corrugated-types-content-item" key={itm?.contentIndex}>
                            <div className="corrugated-types-content-item-wall">
                                <Image
                                    src={itm?.contentImage?.url}
                                    alt={itm?.contentImage?.alt}
                                    width={itm?.contentImage?.width}
                                    height={itm?.contentImage?.height}
                                />
                            </div>
                            <div className="corrugated-types-content-item-info">
                                <div className="corrugated-types-content-item-info-top"></div>
                                <div className="corrugated-types-content-item-info-title">{itm?.contentTitle}</div>
                                <div className="corrugated-types-content-item-info-description">
                                    <span><SafeHtmlRenderer content={itm?.contentDescription} /></span>
                                </div>
                                <div className="corrugated-types-content-item-info-actions">
                                    <Link href={itm?.action?.url}>{itm?.action?.info}</Link>
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

export default React.memo(CorrugatedTypes)