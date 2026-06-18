"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const BrandItems = ({ data }) => {
  return (
    <div className="brands-item-container">
        <div className="brands-item-section">
            <div className="brands-item-poster">
                {data.poster && <Image src={data.poster} alt={data.name} width={1000} height={1000} />}
            </div>
            <div className="brands-item-wrapper"></div>
            <div className="brands-item-icon">
                {data.icon && <Image src={data.icon} alt={data.name} width={1000} height={1000} />}
            </div>
            <div className={data.description.className}>
                <div className="item-description-heading">{data.description?.heading}</div>
                <div className="item-description-details">{data.description?.details}</div>
                <div className={data.description.link.className}>
                    <Link href="#">{data.description?.link?.name}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(BrandItems)