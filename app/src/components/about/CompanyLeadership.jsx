import React from 'react'
import { companyLeadershipData } from "@/data/companyLeadershipData";
import Image from 'next/image';

const CompanyLeadership = () => {
  return (
    <div className="leadership-layout">
        <div className="leadership-hdr">
            <div className="leadership-top">
                <span className={companyLeadershipData[0]?.topper?.icon?.className}>
                    <Image
                        src={companyLeadershipData[0]?.topper?.icon?.url}
                        alt={companyLeadershipData[0]?.topper?.icon?.alt}
                        width={parseInt(companyLeadershipData[0]?.topper?.icon?.width)}
                        height={parseInt(companyLeadershipData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={companyLeadershipData[0]?.topper?.text?.className}>{companyLeadershipData[0]?.topper?.text?.data}</span>
            </div>
            <div className={companyLeadershipData[0]?.heading?.className}>{companyLeadershipData[0]?.heading?.data}</div>
        </div>
        <div className="leadership-container"></div>
    </div>
  )
}

export default React.memo(CompanyLeadership)