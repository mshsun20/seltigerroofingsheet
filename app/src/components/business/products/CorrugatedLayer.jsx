"use client";
import React from 'react'
import "@/styles/components/corrugatedlayer.css";
import Image from 'next/image';
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';

const CorrugatedLayer = ({ dataSet={} }) => {
  return (
    <div className="corrugated-layer-layout">
        <div className="contnr">
            <div className="corrugated-layer-hdr">
                <div className="corrugated-layer-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-layer-container">
                <div className="corrugated-layer-contents">
                    <div className="corrugated-layer-content-graphical">
                        <Image
                            src={dataSet?.contents?.graphicalContent?.url}
                            alt={dataSet?.contents?.graphicalContent?.alt}
                            width={dataSet?.contents?.graphicalContent?.width}
                            height={dataSet?.contents?.graphicalContent?.height}
                        />
                    </div>
                    <div className="corrugated-layer-content-textual">
                        <span><SafeHtmlRenderer content={dataSet?.contents?.textualContent} /></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(CorrugatedLayer)