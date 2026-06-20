"use client";
import Link from 'next/link';
import React from 'react'

const ResourceAlZnSheets = ({ resource, isOpen, toggle }) => {
  return (
    <div className={`resource-alzn-sheets-item ${isOpen ? 'active' : ''}`} key={resource.resourceIndex}>
        <div className="resource-alzn-sheets-item-heading" onClick={toggle}>
            <div className="resource-alzn-sheets-heading-part">{resource.heading}</div>
            <div className="resource-alzn-sheets-toggler">
                {isOpen ? <span>-</span> : <span>+</span>}
            </div>
        </div>

        <ul className="resource-alzn-sheets-item-content">
            {
                resource.details?.map((elm, i) => (
                    <li className="resource-alzn-sheets-item-details" key={i}>
                        <Link href={elm?.route}>{elm?.description}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default React.memo(ResourceAlZnSheets)