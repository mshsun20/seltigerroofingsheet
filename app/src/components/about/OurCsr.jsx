import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { csrData } from "@/data/csrData";
import "@/styles/components/ourcsr.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const OurCsr = () => {
  return (
    <div className="csr-layout">
        <div className="contnr">
            <div className="csr-hdr">
                <div className="csr-top">
                    <span className={csrData[0]?.topper?.icon?.className}>
                        <Image
                            src={csrData[0]?.topper?.icon?.url}
                            alt={csrData[0]?.topper?.icon?.alt}
                            width={parseInt(csrData[0]?.topper?.icon?.width)}
                            height={parseInt(csrData[0]?.topper?.icon?.height)}
                        />
                    </span>
                    <span className={csrData[0]?.topper?.text?.className}>{csrData[0]?.topper?.text?.data}</span>
                </div>
                <div className={csrData[0]?.heading?.className}>{csrData[0]?.heading?.data}</div>
            </div>
            <div className="csr-container">
                <div className={csrData[0]?.mainContent?.className}>
                    {
                        csrData[0]?.mainContent?.allContent?.map(elm => (
                            <div className={elm?.className} key={elm?.contentIndex}>
                                <div className={elm?.contentBackground?.className}>
                                    <Image
                                        src={elm?.contentBackground?.url}
                                        alt={elm?.contentBackground?.alt}
                                        width={elm?.contentBackground?.width}
                                        height={elm?.contentBackground?.height}
                                    />
                                </div>
                                <div className="csr-content-details">
                                    <div className={elm?.contentTextuals?.className}>
                                        <div className="csr-item-textuals-title">
                                            {elm?.contentTextuals?.title}
                                        </div>
                                        <div className="csr-item-textuals-description">
                                            <span><SafeHtmlRenderer content={elm?.contentTextuals?.description} /></span>
                                        </div>
                                    </div>
                                    <div className="csr-content-actions">
                                        <Link href={`/csr/${elm?.contentSlug}`}>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(OurCsr)