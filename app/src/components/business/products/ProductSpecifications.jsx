"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productspecifications.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ProductSpecifications = ({ dataSet = {}, tabs = [] }) => {
    const [tabContents, setTabContents] = React.useState({... dataSet[0]})
    const [open, setOpen] = React.useState(false);

    const handleTab = (e, indx) => {
        e.preventDefault();
        // console.log(indx);
        const itemSpecs = dataSet?.find(d => parseInt(d.itemIndex)===parseInt(indx))
        setTabContents({...itemSpecs})
    }

  return (
    <div className="product-specifications-layout">
        <div className="product-specifications-hdr">
            <div className="product-specifications-top">
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
            <div className="product-specifications-heading">{dataSet?.heading?.data}</div>
        </div>
        <div className="product-specifications-container">
            <div className="product-specifications-tabs">
                {tabs?.length>0 && tabs?.map(itm => (
                    <div
                        key={itm?.itemIndex}
                        onClick={(e) => handleTab(e, itm?.itemIndex)}
                    >
                        {itm?.itemName}
                    </div>
                ))}
            </div>
            <div className="product-specifications-contents">
                {tabContents?.itemSpecifications?.length>0
                && tabContents?.itemSpecifications?.map(spec => (
                    <div className="product-specifications-section" key={spec?.specsIndex}>
                        <div className="product-specifications-icon">
                            <Image
                                src={spec?.propertyIcon?.url}
                                alt={spec?.propertyIcon?.alt}
                                width={spec?.propertyIcon?.width}
                                height={spec?.propertyIcon?.height}
                            />
                        </div>
                        <div className="product-specifications-info">
                            <div className="product-specifications-heading">{spec?.propertyHeading}</div>
                            <div className="product-specifications-details">
                                <SafeHtmlRenderer content={spec} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="product-specifications-description">
                <SafeHtmlRenderer content={tabContents?.itemDescription} />
            </div>
            <div className="product-specifications-action">
                {tabContents?.itemDetails
                && <button onClick={() => setOpen(true)}>{tabContents?.itemDetails?.info}</button>}
            </div>
        </div>

        {open && <div className="spec-details-modal">
            <SafeHtmlRenderer content={tabContents?.itemDetails?.detailsData} />
        </div>}
    </div>
  )
}

export default React.memo(ProductSpecifications)