"use client";
import React from 'react'
import "@/styles/components/corrugatedadvantages.css";
import Link from 'next/link';

const CorrugatedAdvantages = ({ dataSet={} }) => {
  return (
    <div className="corrugated-advantages-layout">
        <div className="contnr">
            <div className="corrugated-advantages-hdr">
                <div className="corrugated-advantages-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-advantages-container">
                <ul className="corrugated-advantages-list">
                    {dataSet?.contents?.listedContents?.length > 0
                    && dataSet?.contents?.listedContents?.map((itm, i) => (
                        <li key={i} className="corrugated-advantages-list-item">{itm}</li>
                    ))}
                </ul>
                <div className="corrugated-advantages-action">
                    {dataSet?.action && <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(CorrugatedAdvantages)