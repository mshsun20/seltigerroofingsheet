"use client";
import React from 'react'
import Image from 'next/image';
import Accordion from "@/components/common/Accordion";
import ResourceRoofingSheets from "@/components/roofityourself/ResourceRoofingSheets";
import { resourceRoofingSheetsHandbookData } from "@/data/resourceRoofingSheetsHandbookData";

const HandbookResourceRoofingSheets = () => {
    const items = resourceRoofingSheetsHandbookData[0]?.allResources?.map((resource) => ({
        id: resource?.resourceIndex,
        heading: resource?.heading,
        details: [...resource?.details],
    }));

  return (
    <div className="resource-roofing-sheets-layout">
        <div className="resource-roofing-sheets-hdr">
            <div className="resource-roofing-sheets-top">
                <span className={resourceRoofingSheetsHandbookData[0]?.topper?.icon?.className}>
                    <Image
                        src={resourceRoofingSheetsHandbookData[0]?.topper?.icon?.url}
                        alt={resourceRoofingSheetsHandbookData[0]?.topper?.icon?.alt}
                        width={parseInt(resourceRoofingSheetsHandbookData[0]?.topper?.icon?.width)}
                        height={parseInt(resourceRoofingSheetsHandbookData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={resourceRoofingSheetsHandbookData[0]?.topper?.text?.className}>{resourceRoofingSheetsHandbookData[0]?.topper?.text?.data}</span>
            </div>
            <div className={resourceRoofingSheetsHandbookData[0]?.heading?.className}>{resourceRoofingSheetsHandbookData[0]?.heading?.data}</div>
        </div>
        <div className="resource-roofing-sheets-container">
            <Accordion
                items={items}
                defaultOpen={0}
                multiple={false}
                renderItem={(resource, isOpen, toggle) => (
                    <ResourceRoofingSheets
                        key={resource.id}
                        resource={resource}
                        isOpen={isOpen}
                        toggle={toggle}
                    />
                )}
            />
        </div>
    </div>
  )
}

export default React.memo(HandbookResourceRoofingSheets)