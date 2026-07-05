"use client";
import Image from 'next/image';
import React from 'react'
import "@/styles/components/colouredsheetapplication.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const ColouredSheetApplications = ({ dataSet = {}, tabs = [] }) => {
    const [tab, setTab] = React.useState(tabs[0]?.itemName);
    const [app, setApp] = React.useState({...dataSet[0]?.contents[0]?.itemApplications[0]});
    const [tabContents, setTabContents] = React.useState({... dataSet?.contents[0]})
    const [open, setOpen] = React.useState(false);
    const modalRef = React.useRef();

    const handleTab = React.useCallback((e, indx) => {
        e.preventDefault();
        setTab(tabs[indx]?.itemName)
        const itemSpecs = dataSet?.contents?.find(d => parseInt(d.itemIndex)===parseInt(indx))
        setTabContents({...itemSpecs})
    }, [dataSet, tabs])

    const handleApp = React.useCallback((e, indx) => {
        e.preventDefault();
        setApp(tabContents?.itemApplications[indx])
        setOpen(true)
    }, [tabContents])

    const handleClickOutside = React.useCallback((e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpen(false)
        }
    }, [])
    React.useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside, open])

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
                            className={`coloured-sheet-applications-tab-item ${tab === itm?.itemName ? "active" : ""}`}
                        >
                            {itm?.itemName}
                        </div>
                    ))}
                </div>
                <div className="coloured-sheet-applications-contents">
                    {tabContents?.itemApplications?.length>0
                    && tabContents?.itemApplications?.map(itm => (
                        <div className="coloured-sheet-applications-section" key={itm?.contentIndex}>
                            <button
                                className="coloured-sheet-applications-action"
                                onClick={(e) => handleApp(e, itm?.contentIndex)}
                            >
                                <Image
                                    src={itm?.url}
                                    alt={itm?.alt}
                                    width={itm?.width}
                                    height={itm?.height}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {open && <div className="coloured-sheet-applications-modal">
            <div className="coloured-sheet-applications-modal-container" ref={modalRef}>
                <button
                    className="coloured-sheet-applications-modal-close"
                    onClick={() => setOpen(false)}
                >
                    X
                </button>
                <div className="coloured-sheet-applications-modal-contents">
                    <Image
                        src={app?.url}
                        alt={app?.alt}
                        width={app?.width}
                        height={app?.height}
                    />
                </div>
            </div>
        </div>}
    </div>
  )
}

export default React.memo(ColouredSheetApplications)