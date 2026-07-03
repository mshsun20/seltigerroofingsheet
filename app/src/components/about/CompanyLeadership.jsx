"use client";
import React from 'react'
import { companyLeadershipData } from "@/data/companyLeadershipData";
import Image from 'next/image';
import BoardOfDirectors from "@/components/about/BoardOfDirectors";
import Accordion from "@/components/common/Accordion";
import BoardOfCommittee from "@/components/about/BoardOfCommittee";


const CompanyLeadership = () => {
    const [tab, setTab] = React.useState(0)
    const [activeTab, setActiveTab] = React.useState({ index: 0, status: "Inactive" })
    const handleTab = (e, indx) => {
        e.preventDefault();
        console.log(indx);
        setTab(indx)
        setActiveTab({ index: indx, status: "active" })
    }
    const committeeDetails = companyLeadershipData[0]?.mainContent[tab]?.data?.map(committee => ({
        id: committee?.committeeIndex,
        type: committee?.type,
        members: committee?.members?.map(elm => elm)
    }))

  return (
    <div className="leadership-layout">
        <div className="contnr">
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
            <div className="leadership-container">
                <div className="leadership-tabgroup">
                    {companyLeadershipData[0]?.mainContent?.map((elm) => (
                        <button
                            className={`${elm?.className} ${activeTab?.index===elm?.tabIndex ? "active" : ""}`}
                            onClick={(e) => handleTab(e, elm?.tabIndex)}
                            key={elm?.tabIndex}
                        >
                            {elm?.value}
                        </button>
                    ))}
                </div>
                <div className="leadership-content">
                    {companyLeadershipData[0]?.mainContent[tab]?.value==="Board of Directors"
                    && <div className="directors-content">{companyLeadershipData[0]?.mainContent[tab]?.data?.map(elm => <BoardOfDirectors data={elm} key={elm?.leadershipIndex} />)}</div>}
                    {companyLeadershipData[0]?.mainContent[tab]?.value==="Board of Committees"
                    && <div className="committee-content">
                        <Accordion
                            items={committeeDetails}
                            defaultOpen={0}
                            multiple={false}
                            renderItem={(committeeData, isOpen, toggle) => <BoardOfCommittee
                                key={committeeData.id}
                                committeeData={committeeData}
                                isOpen={isOpen}
                                toggle={toggle}
                            />}
                        />
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(CompanyLeadership)