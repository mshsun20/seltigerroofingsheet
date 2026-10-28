"use client";
import React from 'react'
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import "@/styles/components/roofingapplications.css";

const RoofingApplications = ({ dataSet = {} }) => {
  return (
    <div className="corrugated-roofing-applications-layout">
        <div className="contnr">
            <div className="corrugated-roofing-applications-hdr">
                <div className="corrugated-roofing-applications-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-roofing-applications-container">
                <div className="corrugated-roofing-applications-textual">
                    <span><SafeHtmlRenderer content={dataSet?.contents?.textualContents} /></span>
                </div>
                <div className="corrugated-roofing-applications-cards">
                    {dataSet?.contents?.cards?.length > 0
                    && dataSet?.contents?.cards?.map((itm, i) => (
                        <div key={i} className="corrugated-roofing-applications-card">
                            <div className="corrugated-roofing-applications-card-heading">{itm?.heading}</div>
                            <div className="corrugated-roofing-applications-card-details">{itm?.details}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(RoofingApplications)