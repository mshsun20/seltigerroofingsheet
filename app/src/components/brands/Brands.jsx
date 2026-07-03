"use client";
import React from 'react'
import "@/styles/components/brand.css";
import { brandDetails } from "@/data/brandDetails";
import Image from 'next/image';
import BrandItems from './BrandItems';

const Brands = () => {
    if (brandDetails?.length===0) return <></>
    
  return (
    <div className="brands-layout">
        <div className="contnr">
            <div className="brands-hdr">
                <div className="brands-top">
                    <span className={brandDetails[0]?.topper?.icon?.className}>
                        <Image
                            src={brandDetails[0]?.topper?.icon?.url}
                            alt={brandDetails[0]?.topper?.icon?.alt}
                            width={parseInt(brandDetails[0]?.topper?.icon?.width)}
                            height={parseInt(brandDetails[0]?.topper?.icon?.height)}
                        />
                    </span>
                    <span className={brandDetails[0]?.topper?.text?.className}>{brandDetails[0]?.topper?.text?.data}</span>
                </div>
                <div className={brandDetails[0]?.heading?.className}>{brandDetails[0]?.heading?.data}</div>
            </div>
            <div className="brands-container">
                {brandDetails[0]?.allBrands?.map((brand, index) => (
                    <BrandItems key={index} data={brand} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default React.memo(Brands)