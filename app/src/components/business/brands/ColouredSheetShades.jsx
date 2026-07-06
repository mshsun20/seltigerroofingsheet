"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/colouredsheetshades.css";

const ColouredSheetShades = ({ dataSet = {}, tabs = [] }) => {
    const [tabContents, setTabContents] = React.useState({... dataSet?.contents[0]})

    const handleTab = React.useCallback((e, indx) => {
        e.preventDefault();
        const itemSpecs = dataSet?.contents?.find(d => parseInt(d.contentIndex)===parseInt(indx))
        setTabContents({...itemSpecs})
    }, [dataSet])

  return (
    <div className="coloured-sheet-shades-layout">
        <div className="coloured-sheet-shades-hdr" style={{background: dataSet?.headerbg}}>
            <div className="coloured-sheet-shades-top">
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
            <div className="coloured-sheet-shades-heading">{dataSet?.heading?.data}</div>
        </div>
        <div className="coloured-sheet-shades-container">
            <div className="coloured-sheet-shades-wall">
                <Image
                    src={tabContents?.contentShade?.url}
                    alt={tabContents?.contentShade?.alt}
                    width={parseInt(tabContents?.contentShade?.width)}
                    height={parseInt(tabContents?.contentShade?.height)}
                />
            </div>
            <div className="coloured-sheet-shades-tabs">
                {tabs?.length>0
                && tabs?.map(itm => 
                    <div
                        className="coloured-sheet-shades-tab"
                        key={itm?.contentIndex}
                        onClick={(e) => handleTab(e, itm?.contentIndex)}
                        style={{backgroundColor: itm?.contentColor}}
                    ></div>
                )}
            </div>
        </div>
    </div>
  )
}

export default React.memo(ColouredSheetShades)