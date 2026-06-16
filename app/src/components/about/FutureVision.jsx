import React from 'react'
import { futureVisionDetails } from "@/data/futureVisionDetails";
import Image from 'next/image';

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
    </div>
  )
}

export default FutureVision