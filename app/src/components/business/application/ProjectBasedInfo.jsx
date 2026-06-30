"use client";
import React from 'react'
import { projectBasedInfoDetails } from "@/data/projectBasedInfoDetails";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import Link from 'next/link';
import Image from 'next/image';

const ProjectBasedInfo = () => {
  return (
    <div className="project-based-info-layout">
        <div className={projectBasedInfoDetails[0]?.mainContent?.textualContents?.className}>
            {projectBasedInfoDetails[0]?.mainContent?.textualContents?.contents?.length>0
            && projectBasedInfoDetails[0]?.mainContent?.textualContents?.contents?.map((elm, i) => (
                <SafeHtmlRenderer content={elm} key={i} />
            ))}
            <div className="project-based-info-link">
                <Link href={`/contact`}>Contact Us</Link>
            </div>
        </div>
        <div className="project-based-info-hdr">
            <div className="project-based-info-top">
                <span className={projectBasedInfoDetails[0]?.topper?.icon?.className}>
                    <Image
                        src={projectBasedInfoDetails[0]?.topper?.icon?.url}
                        alt={projectBasedInfoDetails[0]?.topper?.icon?.alt}
                        width={parseInt(projectBasedInfoDetails[0]?.topper?.icon?.width)}
                        height={parseInt(projectBasedInfoDetails[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={projectBasedInfoDetails[0]?.topper?.text?.className}>{projectBasedInfoDetails[0]?.topper?.text?.data}</span>
            </div>
            <div className={projectBasedInfoDetails[0]?.heading?.className}>{projectBasedInfoDetails[0]?.heading?.data}</div>
        </div>
        <div className="project-based-info-container">
            <div className={projectBasedInfoDetails[0]?.mainContent?.className}>
                <div className={projectBasedInfoDetails[0]?.mainContent?.graphicalContents?.className}>
                    {projectBasedInfoDetails[0]?.mainContent?.graphicalContents?.contents?.length>0
                    && projectBasedInfoDetails[0]?.mainContent?.graphicalContents?.contents?.map(elm => 
                        <div
                            className="graphical-content-info"
                            key={elm?.contentIndex}
                        >
                            <Image
                                src={elm?.url}
                                alt={elm?.alt}
                                width={elm?.width}
                                height={elm?.height}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProjectBasedInfo)