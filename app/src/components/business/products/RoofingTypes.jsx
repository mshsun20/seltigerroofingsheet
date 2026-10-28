"use client";
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/styles/components/roofingtypes.css";

const RoofingTypes = ({ dataSet = {}, type = "" }) => {
    const typesList = React.useMemo(() => dataSet?.contents?.filter(itm => String(itm?.contentTitle) !== String(type)), [dataSet, type]);

  return (
    <div className="corrugated-roofing-types-layout">
        <div className="contnr">
            <div className="corrugated-roofing-types-hdr">
                <div className="corrugated-roofing-types-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-roofing-types-container">
                <div className="corrugated-roofing-types-contents">
                    {typesList?.length>0
                    && typesList?.map(itm => 
                        <div className="corrugated-roofing-types-content-item" key={itm?.contentIndex}>
                            <div className="corrugated-roofing-types-content-item-wall">
                                <Image
                                    src={itm?.contentImage?.url}
                                    alt={itm?.contentImage?.alt}
                                    width={itm?.contentImage?.width}
                                    height={itm?.contentImage?.height}
                                />
                            </div>
                            <div className="corrugated-roofing-types-content-item-info">
                                <div className="corrugated-roofing-types-content-item-info-top"></div>
                                <div className="corrugated-roofing-types-content-item-info-title">{itm?.contentTitle}</div>
                                <div className="corrugated-roofing-types-content-item-info-description">
                                    <span><SafeHtmlRenderer content={itm?.contentDescription} /></span>
                                </div>
                                <div className="corrugated-roofing-types-content-item-info-actions">
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

export default React.memo(RoofingTypes)