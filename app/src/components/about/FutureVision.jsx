import React from 'react'
import { futureVisionDetails } from "@/data/futureVisionDetails";
import Image from 'next/image';
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer"

const FutureVision = () => {
  return (
    <div className="future-vision-layout">
        <div className="future-vision-hdr">
            <div className="future-vision-top">
                <span className={futureVisionDetails[0]?.topper?.icon?.className}>
                    <Image
                        src={futureVisionDetails[0]?.topper?.icon?.url}
                        alt={futureVisionDetails[0]?.topper?.icon?.alt}
                        width={parseInt(futureVisionDetails[0]?.topper?.icon?.width)}
                        height={parseInt(futureVisionDetails[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={futureVisionDetails[0]?.topper?.text?.className}>{futureVisionDetails[0]?.topper?.text?.data}</span>
            </div>
            <div className={futureVisionDetails[0]?.heading?.className}>{futureVisionDetails[0]?.heading?.data}</div>
        </div>
        <div className="future-vision-container">
            <div className={futureVisionDetails[0]?.mainContent?.className}>
                <div className={futureVisionDetails[0]?.mainContent?.graphicalContents?.className}>
                    {futureVisionDetails[0]?.mainContent?.graphicalContents?.contents?.length>0
                    && futureVisionDetails[0]?.mainContent?.graphicalContents?.contents?.map(elm => (
                        <div className="future-vision-graphical-content" key={elm?.contentIndex}>
                            <Image
                                src={elm?.url}
                                alt={elm?.alt}
                                width={elm?.width}
                                height={elm?.height}
                            />
                        </div>
                    ))}
                </div>
                <div className={futureVisionDetails[0]?.mainContent?.textualContents?.className}>
                    {futureVisionDetails[0]?.mainContent?.textualContents?.contents?.length>0
                    && futureVisionDetails[0]?.mainContent?.textualContents?.contents?.map((elm, i) => <SafeHtmlRenderer
                        content={elm}
                        key={i}
                    />)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(FutureVision)