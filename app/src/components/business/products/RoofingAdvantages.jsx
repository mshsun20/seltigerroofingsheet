"use client";
import React from 'react'
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import "@/styles/components/roofingadvantages.css";

const RoofingAdvantages = ({ dataSet = {} }) => {
  return (
    <div className="corrugated-roofing-advantages-layout">
        <div className="contnr">
            <div className="corrugated-roofing-advantages-hdr">
                <div className="corrugated-roofing-advantages-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-roofing-advantages-container">
                <div className="corrugated-roofing-advantages-textual">
                    <span><SafeHtmlRenderer content={dataSet?.contents?.textualContents} /></span>
                </div>
                <div className="corrugated-roofing-advantages-list">
                    <div className="corrugated-roofing-advantages-list-heading">{dataSet?.contents?.listHeading}:</div>
                    <ul className="corrugated-roofing-advantages-list-items">
                        {dataSet?.contents?.listedContents?.length > 0
                        && dataSet?.contents?.listedContents?.map((itm, i) => (
                            <li key={i} className="corrugated-roofing-advantages-list-item">{itm}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(RoofingAdvantages)