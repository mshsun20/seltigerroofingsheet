import Image from 'next/image';
import React from 'react'
import { aboutCompanyInfo } from "@/data/aboutCompanyInfo";
import GallerySlider from '@/components/common/GallerySlider';
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import Statcounter from '@/components/common/Statcounter';

const AboutCompanyInfo = () => {
  return (
    <div className="company-layout">
        <div className="company-hdr">
            <div className="company-top">
                <span className={aboutCompanyInfo[0]?.topper?.icon?.className}>
                    <Image
                        src={aboutCompanyInfo[0]?.topper?.icon?.url}
                        alt={aboutCompanyInfo[0]?.topper?.icon?.alt}
                        width={parseInt(aboutCompanyInfo[0]?.topper?.icon?.width)}
                        height={parseInt(aboutCompanyInfo[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={aboutCompanyInfo[0]?.topper?.text?.className}>{aboutCompanyInfo[0]?.topper?.text?.data}</span>
            </div>
            <div className={aboutCompanyInfo[0]?.heading?.className}>{aboutCompanyInfo[0]?.heading?.data}</div>
        </div>
        <div className="company-container">
            <div className={aboutCompanyInfo[0]?.mainContent?.className}>
                <div className="company-content-text">
                    {
                        aboutCompanyInfo[0]?.mainContent?.contentTextuals?.map((elm, i) => (
                            <span key={i}><SafeHtmlRenderer content={elm?.data} /></span>
                        ))
                    }
                </div>
                <div className="company-content-info"><Statcounter statData={aboutCompanyInfo[0]?.mainContent?.contentCounter} /></div>
            </div>
            <div className={aboutCompanyInfo[0]?.graphicalContent?.className}>
                <Image
                    src={aboutCompanyInfo[0]?.graphicalContent?.poster?.url}
                    alt={aboutCompanyInfo[0]?.graphicalContent?.poster?.alt}
                    width={aboutCompanyInfo[0]?.graphicalContent?.poster?.width}
                    height={aboutCompanyInfo[0]?.graphicalContent?.poster?.height}
                />
            </div>
        </div>
    </div>
  )
}

export default React.memo(AboutCompanyInfo)