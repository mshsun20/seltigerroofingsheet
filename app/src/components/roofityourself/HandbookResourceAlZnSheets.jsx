"use client";
import React from 'react'
import Image from 'next/image';
import Accordion from "@/components/common/Accordion";
import ResourceAlZnSheets from "@/components/roofityourself/ResourceAlZnSheets";
import { resourceAlZnSheetsHandbookData } from "@/data/resourceAlZnSheetsHandbookData";

const HandbookResourceAlZnSheets = () => {
    const items = resourceAlZnSheetsHandbookData[0]?.allResources?.map((resource) => ({
        id: resource?.resourceIndex,
        heading: resource?.heading,
        details: [...resource?.details],
    }));

  return (
    <div className="resource-alzn-sheets-layout">
        <div className="resource-alzn-sheets-hdr">
            <div className="resource-alzn-sheets-top">
                <span className={resourceAlZnSheetsHandbookData[0]?.topper?.icon?.className}>
                    <Image
                        src={resourceAlZnSheetsHandbookData[0]?.topper?.icon?.url}
                        alt={resourceAlZnSheetsHandbookData[0]?.topper?.icon?.alt}
                        width={parseInt(resourceAlZnSheetsHandbookData[0]?.topper?.icon?.width)}
                        height={parseInt(resourceAlZnSheetsHandbookData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={resourceAlZnSheetsHandbookData[0]?.topper?.text?.className}>{resourceAlZnSheetsHandbookData[0]?.topper?.text?.data}</span>
            </div>
            <div className={resourceAlZnSheetsHandbookData[0]?.heading?.className}>{resourceAlZnSheetsHandbookData[0]?.heading?.data}</div>
        </div>
        <div className="resource-alzn-sheets-container">
            <Accordion
                items={items}
                defaultOpen={0}
                multiple={false}
                renderItem={(resource, isOpen, toggle) => (
                    <ResourceAlZnSheets
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

export default React.memo(HandbookResourceAlZnSheets)