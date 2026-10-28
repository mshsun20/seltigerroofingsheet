"use client";
import React from 'react'
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import "@/styles/components/roofingchoose.css";
import Link from 'next/link';

const RoofingChoose = ({ dataSet = {} }) => {
  return (
    <div className="corrugated-roofing-choose-layout">
        <div className="contnr">
            <div className="corrugated-roofing-choose-hdr">
                <div className="corrugated-roofing-choose-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-roofing-choose-container">
                <div className="corrugated-roofing-choose-textual">
                    <span><SafeHtmlRenderer content={dataSet?.contents?.textualContents} /></span>
                </div>
                <div className="corrugated-roofing-choose-list">
                    <ul className="corrugated-roofing-choose-list-items">
                        {dataSet?.contents?.listedContents?.length > 0
                        && dataSet?.contents?.listedContents?.map((itm, i) => (
                            <li key={i} className="corrugated-roofing-choose-list-item">{itm}</li>
                        ))}
                    </ul>
                </div>
                <div className="corrugated-roofing-choose-action">
                    <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(RoofingChoose)