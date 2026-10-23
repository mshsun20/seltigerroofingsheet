"use client";
import Link from 'next/link';
import React from 'react'

const ResourceRoofingSheets = ({ resource, isOpen, toggle }) => {
  return (
    <div className={`resource-roofing-sheets-item ${isOpen ? 'active' : ''}`} key={resource.resourceIndex}>
        <div className="resource-roofing-sheets-item-heading" onClick={toggle}>
            <div className="resource-roofing-sheets-heading-part">{resource.heading}</div>
            <div className="resource-roofing-sheets-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="resource-roofing-sheets-item-content">
            {
                resource.details?.map((elm, i) => (
                    <li className="resource-roofing-sheets-item-details" key={i}>
                        <Link href={elm?.route}>{elm?.description}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default React.memo(ResourceRoofingSheets)