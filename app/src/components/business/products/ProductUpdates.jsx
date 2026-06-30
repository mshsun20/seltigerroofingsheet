"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productupdates.css";

const ProductUpdates = ({ dataSet = {} }) => {
    const [open, setOpen] = React.useState(false);

  return (
    <div className="product-updates-layout">
        <div className="product-updates-hdr">
            <div className="product-updates-top">
                <span className="topper-icon">
                    <Image
                        src={dataSet?.topper?.icon?.url}
                        alt={dataSet?.topper?.icon?.alt}
                        width={parseInt(dataSet?.topper?.icon?.width)}
                        height={parseInt(dataSet?.topper?.icon?.height)}
                    />
                </span>
                <span className="topper-text">{dataSet?.topper?.text?.data}</span>
            </div>
            <div className="product-updates-heading">{dataSet?.heading?.data}</div>
        </div>
        <div className="product-updates-container">
            <div className="product-updates-contents">
                {dataSet?.contents?.itemImages?.length>0
                && dataSet?.contents?.itemImages?.map(img => (
                    <div className="product-updates-section" key={img?.imgsIndex}>
                        <button
                            className="product-updates-action"
                            onClick={() => setOpen(true)}
                        >
                            <Image
                                src={img?.itemImage?.url}
                                alt={img?.itemImage?.alt}
                                width={img?.itemImage?.width}
                                height={img?.itemImage?.height}
                            />
                        </button>
                        {open && <div className="product-updates-modal">
                            <Image
                                src={img?.itemImage?.url}
                                alt={img?.itemImage?.alt}
                                width={img?.itemImage?.width}
                                height={img?.itemImage?.height}
                            />
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProductUpdates)