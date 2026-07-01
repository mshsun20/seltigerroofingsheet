"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productspecifications.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ProductSpecifications = ({ dataSet = {}, tabs = [] }) => {
    const [tab, setTab] = React.useState(tabs[0]?.itemName);
    const [tabContents, setTabContents] = React.useState({... dataSet?.contents[0]})
    const [open, setOpen] = React.useState(false);

    const handleTab = React.useCallback((e, indx) => {
        e.preventDefault();
        setTab(tabs[indx]?.itemName)
        const itemSpecs = dataSet?.contents?.find(d => parseInt(d.itemIndex)===parseInt(indx))
        setTabContents({...itemSpecs})
    }, [dataSet, tabs])

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
            {tabs?.length>1 && (
                <div className="product-specifications-tabs">
                    {tabs?.map(tabItem => (
                        <div
                            key={tabItem?.itemIndex}
                            className={`product-specifications-tab-item ${tab === tabItem?.itemName ? "active" : ""}`}
                            onClick={(e) => handleTab(e, tab?.itemIndex)}
                        >
                            {tabItem?.itemName}
                        </div>
                    ))}
                </div>
            )}
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
                            <div className="product-specifications-info-heading">{spec?.propertyHeading}</div>
                            <div className="product-specifications-info-details">
                                <SafeHtmlRenderer content={spec?.propertyDetails} />
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

        {open && <div className="product-specifications-modal">
            <div className="product-specifications-modal-container">
                <button
                    className="product-specifications-modal-close"
                    onClick={() => setOpen(false)}
                >
                    X
                </button>
                <div className="product-specifications-modal-contents">
                    <SafeHtmlRenderer content={tabContents?.itemDetails?.detailsData} />
                </div>
            </div>
        </div>}
    </div>
  )
}

export default React.memo(ProductSpecifications)