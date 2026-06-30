"use client";
import Image from 'next/image';
import React from 'react'
import Accordion from '@/components/common/Accordion';
import ProjectBasedFaq from "./ProjectBasedFaq";
import { projectBasedFaqDetails } from "@/data/projectBasedFaqDetails";

const ProjectBasedFaqInfo = () => {
    const items = projectBasedFaqDetails[0]?.mainContent?.allContents?.map((item) => ({
        id: item?.contentIndex,
        heading: item?.heading,
        details: item?.details,
    }));

  return (
    <div className="project-based-faq-layout">
        <div className="project-based-faq-hdr">
            <div className="project-based-faq-top">
                <span className={projectBasedFaqDetails[0]?.topper?.icon?.className}>
                    <Image
                        src={projectBasedFaqDetails[0]?.topper?.icon?.url}
                        alt={projectBasedFaqDetails[0]?.topper?.icon?.alt}
                        width={parseInt(projectBasedFaqDetails[0]?.topper?.icon?.width)}
                        height={parseInt(projectBasedFaqDetails[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={projectBasedFaqDetails[0]?.topper?.text?.className}>{projectBasedFaqDetails[0]?.topper?.text?.data}</span>
            </div>
            <div className={projectBasedFaqDetails[0]?.heading?.className}>{projectBasedFaqDetails[0]?.heading?.data}</div>
        </div>
        <div className="project-based-faq-container">
            <div className={projectBasedFaqDetails[0]?.mainContent?.className}>
                <Accordion
                    items={items}
                    defaultOpen={0}
                    multiple={false}
                    renderItem={(item, isOpen, toggle) => (
                        <ProjectBasedFaq
                            key={item.id}
                            item={item}
                            isOpen={isOpen}
                            toggle={toggle}
                        />
                    )}
                />
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProjectBasedFaqInfo)