"use client";
import React from 'react'

const BandItems = ({ data }) => {
  return (
    <div className="brand-item-container">
        <div className="brand-item-section">
            <div className="brand-item-poster">
                {data.poster && <img src={data.poster} alt={data.name} />}
            </div>
            <div className="brand-item-wrapper"></div>
            <div className="brand-item-icon">
                {data.icon && <img src={data.icon} alt={data.name} />}
            </div>
            <div className={data.description.className}>
                <div className="item-description-heading">{data.description?.heading}</div>
                <div className="item-description-details">{data.description?.details}</div>
                <div className={data.description.link.className}>{data.description?.link?.name}</div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(BandItems)