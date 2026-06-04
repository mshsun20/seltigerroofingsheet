import React from 'react'
import { companyValueData } from "@/data/companyValueData";
import Image from 'next/image';

const CompanyValue = () => {
  return (
    <div className="value-layout">
        <div className="value-hdr">
            <div className="value-top">
                <span className={companyValueData[0]?.topper?.icon?.className}>
                    <Image
                        src={companyValueData[0]?.topper?.icon?.url}
                        alt={companyValueData[0]?.topper?.icon?.alt}
                        width={parseInt(companyValueData[0]?.topper?.icon?.width)}
                        height={parseInt(companyValueData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={companyValueData[0]?.topper?.text?.className}>{companyValueData[0]?.topper?.text?.data}</span>
            </div>
            <div className={companyValueData[0]?.heading?.className}>{companyValueData[0]?.heading?.data}</div>
        </div>
        <div className="value-container"></div>
    </div>
  )
}

export default React.memo(CompanyValue)