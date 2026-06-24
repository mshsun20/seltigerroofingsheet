import React from 'react'
import "@/styles/components/industrialuse.css";
import { industrialUseInfoDetails } from "@/data/industrialUseInfoDetails";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import Link from 'next/link';
import Image from 'next/image';

const IndustrialUseInfo = () => {
  return (
    <div className="industrial-use-info-layout">
      <div className={industrialUseInfoDetails[0]?.mainContent?.textualContents?.className}>
        {industrialUseInfoDetails[0]?.mainContent?.textualContents?.contents?.length>0
        && industrialUseInfoDetails[0]?.mainContent?.textualContents?.contents?.map((elm, i) => (
            <SafeHtmlRenderer content={elm} key={i} />
        ))}
        <div className="industrial-use-info-link">
          <Link href={`/contact`}>Contact Us</Link>
        </div>
      </div>
      <div className="industrial-use-info-hdr">
        <div className="industrial-use-info-top">
          <span className={industrialUseInfoDetails[0]?.topper?.icon?.className}>
            <Image
              src={industrialUseInfoDetails[0]?.topper?.icon?.url}
              alt={industrialUseInfoDetails[0]?.topper?.icon?.alt}
              width={parseInt(industrialUseInfoDetails[0]?.topper?.icon?.width)}
              height={parseInt(industrialUseInfoDetails[0]?.topper?.icon?.height)}
            />
          </span>
          <span className={industrialUseInfoDetails[0]?.topper?.text?.className}>{industrialUseInfoDetails[0]?.topper?.text?.data}</span>
        </div>
        <div className={industrialUseInfoDetails[0]?.heading?.className}>{industrialUseInfoDetails[0]?.heading?.data}</div>
      </div>
      <div className="industrial-use-info-container">
        <div className={industrialUseInfoDetails[0]?.mainContent?.className}>
          <div className={industrialUseInfoDetails[0]?.mainContent?.graphicalContents?.className}>
            {industrialUseInfoDetails[0]?.mainContent?.graphicalContents?.contents?.length>0
            && industrialUseInfoDetails[0]?.mainContent?.graphicalContents?.contents?.map(elm => 
              <Image
                key={elm?.contentIndex}
                src={elm?.url}
                alt={elm?.alt}
                width={elm?.width}
                height={elm?.height}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(IndustrialUseInfo)