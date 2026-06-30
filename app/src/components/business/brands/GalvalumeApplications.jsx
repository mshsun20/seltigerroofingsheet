"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productapplications.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const GalvalumeApplications = ({ dataSet = {}, tabs = [] }) => {
    const [tabContents, setTabContents] = React.useState({... dataSet[0]})
    const [open, setOpen] = React.useState(false);

    const handleTab = React.useCallback((e, indx) => {
        e.preventDefault();
        const itemSpecs = dataSet?.find(d => parseInt(d.itemIndex)===parseInt(indx))
        setTabContents({...itemSpecs})
    }, [dataSet])

  return (
    <div className="galvalume-applications-layout">
        <div className="galvalume-applications-hdr">
            <div className="galvalume-applications-top">
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
            <div className="galvalume-applications-heading">{dataSet?.heading?.data}</div>
        </div>
        <div className="galvalume-applications-container">
            <div className="galvalume-applications-tabs">
                {tabs?.length>0 && tabs?.map(itm => (
                    <div
                        key={itm?.itemIndex}
                        onClick={(e) => handleTab(e, itm?.itemIndex)}
                    >
                        {itm?.itemName}
                    </div>
                ))}
            </div>
            <div className="galvalume-applications-contents">
                {tabContents?.itemImages?.length>0
                && tabContents?.itemImages?.map(img => (
                    <div className="galvalume-applications-section" key={img?.imgsIndex}>
                        <button
                            className="galvalume-applications-action"
                            onClick={() => setOpen(true)}
                        >
                            <Image
                                src={img?.itemImage?.url}
                                alt={img?.itemImage?.alt}
                                width={img?.itemImage?.width}
                                height={img?.itemImage?.height}
                            />
                        </button>
                        {open && <div className="galvalume-applications-modal">
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
            <div className="galvalume-applications-description">
                <SafeHtmlRenderer content={tabContents?.itemDescription} />
            </div>
        </div>
    </div>
  )
}

export default React.memo(GalvalumeApplications)