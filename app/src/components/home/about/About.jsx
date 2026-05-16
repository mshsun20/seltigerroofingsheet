import React from 'react'
import '@/styles/components/about.css';
import Image from 'next/image';
import { aboutDetails } from "@/data/home/aboutDetails"
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const About = () => {
    if (aboutDetails?.length === 0) return <></>
  return (
    <div className="about-layout">
        <div className="about-hdr">
            <div className="about-top">
                <span className={aboutDetails[0]?.topper?.icon?.className}>
                    <Image
                        src={aboutDetails[0]?.topper?.icon?.url}
                        alt={aboutDetails[0]?.topper?.icon?.alt}
                        width={parseInt(aboutDetails[0]?.topper?.icon?.width)}
                        height={parseInt(aboutDetails[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={aboutDetails[0]?.topper?.text?.className}>{aboutDetails[0]?.topper?.text?.data}</span>
            </div>
            <div className={aboutDetails[0]?.heading?.className}>{aboutDetails[0]?.heading?.data}</div>
        </div>
        <div className="about-container">
            <div className={aboutDetails[0]?.mainContent.className}>
                <div className="about-content-text">
                    {aboutDetails[0]?.mainContent?.contentTextuals?.length>0
                    && aboutDetails[0]?.mainContent?.contentTextuals?.map((elm, i) => (
                        <p key={i}>
                            <SafeHtmlRenderer content={elm?.data} />
                        </p>
                    ))}
                </div>
                <div className="about-content-info">
                    {aboutDetails[0]?.mainContent?.contentInfo?.length>0
                    && aboutDetails[0]?.mainContent?.contentInfo?.map((itm, i) => (
                        <div className="about-content-info-card" key={i}>
                            <div className="content-info-top"><SafeHtmlRenderer content={itm.top} /></div>
                            <div className="content-info-desc">{itm.description}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={aboutDetails[0]?.highlightedContent?.className}>
                {aboutDetails[0]?.highlightedContent?.allHighlighted?.length>0
                && aboutDetails[0]?.highlightedContent?.allHighlighted?.map((itm, i) => (
                    <div className="about-highlight-card" key={i}>
                        <div className="about-highlight-card-hds">{itm.heading}</div>
                        <div className="about-highlight-card-details">{itm.details}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default React.memo(About)