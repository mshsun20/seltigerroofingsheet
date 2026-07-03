"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/productapplications.css";

const ColouredSheetShades = ({ dataSet = {}, tabs = [] }) => {
    const [tabIndex, setTabIndex] = React.useState(0)
    const [tabContents, setTabContents] = React.useState({... dataSet[0]})

    const handleTab = React.useCallback((e, indx) => {
        e.preventDefault();
        setTabIndex(indx)
        const itemDetails = dataSet?.find(d => parseInt(d.itemIndex)===parseInt(indx))
        setTabContents({...itemDetails})
    }, [dataSet])

  return (
    <div className="coloured-sheet-applications-layout">
        <div className="contnr">
            <div className="coloured-sheet-applications-hdr">
                <div className="coloured-sheet-applications-top">
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
                <div className="coloured-sheet-applications-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="coloured-sheet-applications-container">
                <div className="coloured-sheet-applications-tabs">
                    {tabs?.length>0 && tabs?.map(itm => (
                        <div
                            key={itm?.itemIndex}
                            onClick={(e) => handleTab(e, itm?.itemIndex)}
                            style={{backgroundColor:itm.itemColour}}
                        ></div>
                    ))}
                </div>
                <div className="coloured-sheet-applications-contents">
                    <Image
                        src={tabContents[tabIndex]?.shades?.url}
                        alt={tabContents[tabIndex]?.shades?.alt}
                        width={tabContents[tabIndex]?.shades?.width}
                        height={tabContents[tabIndex]?.shades?.height}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(ColouredSheetShades)