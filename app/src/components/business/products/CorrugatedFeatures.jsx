"use client";
import React from 'react'
import "@/styles/components/corrugatedfeatures.css";
import Link from 'next/link';

const CorrugatedFeatures = ({ dataSet={} }) => {
  return (
    <div className="corrugated-features-layout">
        <div className="contnr">
            <div className="corrugated-features-hdr">
                <div className="corrugated-features-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-features-container">
                <ul className="corrugated-features-list">
                    {dataSet?.contents?.listedContents?.length > 0
                    && dataSet?.contents?.listedContents?.map((itm, i) => (
                        <li key={i} className="corrugated-features-list-item">{itm}</li>
                    ))}
                </ul>
                <div className="corrugated-features-action">
                    {dataSet?.action && <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(CorrugatedFeatures)