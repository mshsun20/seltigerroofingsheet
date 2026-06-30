"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productupdates.css";

const ProductUpdates = ({ dataSet = {} }) => {
    const [open, setOpen] = React.useState(false);

  return (
    <div className="product-update-layout">
        <div className="product-update-hdr">
            <div className="product-update-top">
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
            <div className="product-update-heading">{dataSet?.heading?.data}</div>
        </div>
        <div className="product-update-container">
            <div className="product-update-contents">
                {dataSet?.contents?.itemImages?.length>0
                && dataSet?.contents?.itemImages?.map(img => (
                    <div className="product-update-section" key={img?.imgsIndex}>
                        <button
                            className="product-update-action"
                            onClick={() => setOpen(true)}
                        >
                            <Image
                                src={img?.itemImage?.url}
                                alt={img?.itemImage?.alt}
                                width={img?.itemImage?.width}
                                height={img?.itemImage?.height}
                            />
                        </button>
                        {open && <div className="product-update-modal">
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