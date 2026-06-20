"use client";
import React from 'react'
import Image from 'next/image';
import Accordion from "@/components/common/Accordion";
import ResourceColouredSheets from "@/components/roofityourself/ResourceColouredSheets";
import { resourceColouredSheetsHandbookData } from "@/data/resourceColouredSheetsHandbookData";

const HandbookResourceColouredSheets = () => {
    const items = resourceColouredSheetsHandbookData[0]?.allResources?.map((resource) => ({
        id: resource?.resourceIndex,
        heading: resource?.heading,
        details: [...resource?.details],
    }));

  return (
    <div className="resource-coloured-sheets-layout">
        <div className="resource-coloured-sheets-hdr">
            <div className="resource-coloured-sheets-top">
                <span className={resourceColouredSheetsHandbookData[0]?.topper?.icon?.className}>
                    <Image
                        src={resourceColouredSheetsHandbookData[0]?.topper?.icon?.url}
                        alt={resourceColouredSheetsHandbookData[0]?.topper?.icon?.alt}
                        width={parseInt(resourceColouredSheetsHandbookData[0]?.topper?.icon?.width)}
                        height={parseInt(resourceColouredSheetsHandbookData[0]?.topper?.icon?.height)}
                    />
                </span>
                <span className={resourceColouredSheetsHandbookData[0]?.topper?.text?.className}>{resourceColouredSheetsHandbookData[0]?.topper?.text?.data}</span>
            </div>
            <div className={resourceColouredSheetsHandbookData[0]?.heading?.className}>{resourceColouredSheetsHandbookData[0]?.heading?.data}</div>
        </div>
        <div className="resource-coloured-sheets-container">
            <Accordion
                items={items}
                defaultOpen={0}
                multiple={false}
                renderItem={(resource, isOpen, toggle) => (
                    <ResourceColouredSheets
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

export default React.memo(HandbookResourceColouredSheets)