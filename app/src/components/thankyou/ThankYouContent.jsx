"use client";
import React from 'react'
import Link from 'next/link';
import "@/styles/components/thankyou.css";

const ThankYouContent = ({ dataSet = {} }) => {
  return (
    <div className="thank-you-layout">
        <div className="contnr">
            <div className="thank-you-hdr">
                <div className="thank-you-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="thank-you-container">
                <div className="thank-you-contents">
                    {dataSet?.content?.textualContents?.length>0
                    && dataSet?.content?.textualContents?.map((itm, i) => (
                        <div key={i} className="thank-you-text-content">{itm}</div>
                    ))}
                </div>
                <div className="thank-you-action">
                    <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ThankYouContent)