"use client";
import React from 'react'
import Image from 'next/image';
import { manufacturingProcessInfo } from "@/data/manufacturingProcessInfo"

const ManufacturingProcess = () => {
  return (
    <div className="manufacturing-process-layout">
        <div className="contnr">
            <div className="manufacturing-process-hdr">
                <div className={manufacturingProcessInfo[0]?.heading?.className}>
                    {manufacturingProcessInfo[0]?.heading?.data}
                </div>
            </div>
            <div className="manufacturing-process-container">
                <div className={manufacturingProcessInfo[0]?.mainContent?.className}>
                    <div className="manufacturing-process-graphical">
                        <Image
                            src={manufacturingProcessInfo[0]?.mainContent?.contentGraphicals?.url}
                            alt={manufacturingProcessInfo[0]?.mainContent?.contentGraphicals?.alt}
                            width={manufacturingProcessInfo[0]?.mainContent?.contentGraphicals?.width}
                            height={manufacturingProcessInfo[0]?.mainContent?.contentGraphicals?.height}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ManufacturingProcess)