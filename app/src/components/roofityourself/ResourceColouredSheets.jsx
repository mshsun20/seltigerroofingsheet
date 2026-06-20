"use client";
import Link from 'next/link';
import React from 'react'

const ResourceColouredSheets = ({ resource, isOpen, toggle }) => {
  return (
    <div className={`resource-coloured-sheets-item ${isOpen ? 'active' : ''}`} key={resource.resourceIndex}>
        <div className="resource-coloured-sheets-item-heading" onClick={toggle}>
            <div className="resource-coloured-sheets-heading-part">{resource.heading}</div>
            <div className="resource-coloured-sheets-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="resource-coloured-sheets-item-content">
            {
                resource.details?.map((elm, i) => (
                    <li className="resource-coloured-sheets-item-details" key={i}>
                        <Link href={elm?.route}>{elm?.description}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default React.memo(ResourceColouredSheets)