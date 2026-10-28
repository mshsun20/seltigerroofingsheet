import React from 'react'
import "@/styles/components/corrugatedspecifications.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import Link from 'next/link';

const CorrugatedSpecifications = ({ dataSet={} }) => {
  return (
    <div className="corrugated-specifications-layout">
        <div className="contnr">
            <div className="corrugated-specifications-hdr">
                <div className="corrugated-specifications-heading">{dataSet?.heading?.data}</div>
            </div>
            <div className="corrugated-specifications-container">
                <div className="corrugated-specifications-content">
                    <div className="corrugated-specifications-tabular-content">
                        {
                            dataSet?.contents?.tableContents && (
                                <table className="corrugated-specifications-table">
                                    <thead>
                                        <tr>
                                            {
                                                dataSet?.contents?.tableContents?.columns?.length > 0
                                                && dataSet?.contents?.tableContents?.columns?.map((itm, i) => (
                                                    <th key={i}>{itm}</th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataSet?.contents?.tableContents?.items?.length > 0
                                            && dataSet?.contents?.tableContents?.items?.map(itm => (
                                                <tr key={itm?.itemIndex}>
                                                    {
                                                        dataSet?.contents?.tableContents?.columns?.length > 0
                                                        && dataSet?.contents?.tableContents?.columns?.map((fld, i) => (
                                                            <td
                                                                key={i}
                                                                style={
                                                                    i===0
                                                                    ? {color:"#000000",fontWeight:600}
                                                                    : {color:"#424242",fontWeight:400}
                                                                }
                                                            >
                                                                <SafeHtmlRenderer content={itm[fld]} />
                                                            </td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    {dataSet?.contents?.tableContents?.footer
                                    && (<tfoot>
                                        <tr>
                                            <td colSpan={parseInt(dataSet?.contents?.tableContents?.columns?.length + 1)}>{dataSet?.contents?.tableContents?.footer}</td>
                                        </tr>
                                    </tfoot>)}
                                </table>
                            )
                        }
                    </div>
                    <div className="corrugated-specifications-textual-content">
                        <SafeHtmlRenderer content={dataSet?.contents?.textualContents} />
                    </div>
                    {dataSet?.action && (
                        <div className="corrugated-specifications-action">
                            <Link href={dataSet?.action?.url}>{dataSet?.action?.info}</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(CorrugatedSpecifications)