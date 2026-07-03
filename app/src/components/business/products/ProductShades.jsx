"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productshades.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import Link from 'next/link';

const ProductShades = ({ dataSet = {}, tabs = [] }) => {
    const [tabContents, setTabContents] = React.useState({... dataSet?.contents[0]})

    const handleTab = React.useCallback((e, indx) => {
        e.preventDefault();
        const itemSpecs = dataSet?.contents?.find(d => parseInt(d.contentIndex)===parseInt(indx))
        setTabContents({...itemSpecs})
    }, [dataSet])
    
  return (
    <div className="product-shades-layout">
        <div className="contnr">
            <div className="product-shades-wall">
                <div className="product-shades-poster">
                    <Image
                        src={tabContents?.contentShade?.url}
                        alt={tabContents?.contentShade?.alt}
                        width={parseInt(tabContents?.contentShade?.width)}
                        height={parseInt(tabContents?.contentShade?.height)}
                    />
                </div>
            </div>
            <div className="product-shades-container">
                <div className="product-shades-hdr">
                    <div className="product-shades-top">
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
                    <div className="product-shades-heading">{dataSet?.heading?.data}</div>
                </div>
                <div className="product-shades-tabs">
                    {tabs?.length>0
                    && tabs?.map(itm => 
                        <div
                            className="product-shades-tab"
                            key={itm?.contentIndex}
                            onClick={(e) => handleTab(e, itm?.contentIndex)}
                            style={{backgroundColor: itm?.contentColor}}
                        ></div>
                    )}
                </div>
                <div className="product-shades-contents">
                    <div className="product-shades-item">
                        <div className="product-shades-item-title">
                            {tabContents?.contentHeading}
                        </div>
                        <div className="product-shades-item-description">
                            <SafeHtmlRenderer content={tabContents?.contentDescription} />
                        </div>
                        <div className="product-shades-item-images">
                            {tabContents?.contentImages?.length>0
                            && tabContents?.contentImages?.map((elm, i) => (
                                <div
                                    className="product-shades-item-image"
                                    key={i}
                                >
                                    <Image
                                        src={elm?.url}
                                        alt={elm?.alt}
                                        width={parseInt(elm?.width)}
                                        height={parseInt(elm?.height)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="product-shades-action">
                    <Link href={dataSet?.action?.url}>
                        {dataSet?.action?.info}
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ProductShades)