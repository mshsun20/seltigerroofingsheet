import React from 'react'
import '@/styles/components/about.css';
import Image from 'next/image';
import { div } from 'framer-motion/client';
import card from '@/components/Card';

const contentInfo = [
    { top: "20k+", description: "Employee Strength" },
    { top: "6th Largest", description: "Integrated Steel Producer in India" },
    { top: "16.78 MTPA", description: "Combined Production Capacity" },
]

const allHighlights = [
    {
        heading: "Mission",
        details: "Shyam Metalics leverages resource efficiency and dynamic leadership to boost productivity and strengthen India's industrial base, in line with Shri M. P. Agarwal’s vision."
    },
    {
        heading: "Vision",
        details: "We aspire to be the global industry benchmark through value creation, process innovation, enhanced stakeholder participation & relentless pursuit of opportunity."
    }
]

const About = () => {
  return (
    <div className="about-layout">
        <div className="about-hdr">
            <div className="about-top">
                <span className="topper-icon">
                    <Image
                        src="/wp-content/themes/sel/assets/img/icons/sub-logo3.svg"
                        alt="sub logo3"
                        width={20}
                        height={20}
                    />
                </span>
                <span className="topper-text">ABOUT US</span>
            </div>
            <div className="about-hdng">Reliable Roofing Sheets for a Safer & Stronger Future</div>
        </div>
        <div className="about-container">
            <div className="about-content">
                <div className="about-content-details">
                    <div className="about-content-text">
                        <p>SEL TIGER Roofing Sheets, a brand from Shyam Metalics, manufactures high-quality flat steel and roofing sheets including colour coated sheet and aluzinc sheet for many different uses.</p>
                        <p>We focus on strong materials, modern technology, and strict quality checks to make sure flat steel and roofing sheets are durable and reliable. Our roofing sheets and flat steel products are designed to meet today&apos;s industry needs.</p>
                        <p>Like a tiger, we work with focus, strength, and precision-setting new standards in the steel industry.</p>
                    </div>
                    <div className="about-content-info">
                        {contentInfo?.length>0 && contentInfo?.map((itm, i) => (
                            <div className="about-content-info-card" key={i}>
                                <div className="content-info-top">{itm.top}</div>
                                <div className="content-info-desc">{itm.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="about-highlight">
                    {allHighlights?.length>0 && allHighlights?.map((itm, i) => (
                        <div className="about-highlight-card" key={i}>
                            <div className="about-highlight-card-hds">{itm.heading}</div>
                            <div className="about-highlight-card-details">{itm.details}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(About)