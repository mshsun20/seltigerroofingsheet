"use client";
import React from 'react'
import { meetsEventsData } from "@/data/meetsEventsData";

let LIMIT = 4

const AllMeetsEvents = () => {
    const [allData, setAllData] = React.useState([...meetsEventsData[0]?.allContents])
    const [page, setPage] = React.useState(0)
    const [dataCount] = React.useState(DATA_COUNT_PER_PAGE)

    const handleData = React.useCallback((page, limit) => {
        const paginated = meetsEventsData[0]?.allContents?.filter((elm, i) => elm.contentFeatured)
        .sort((a, b) => b.contentIndex-a.contentIndex)
        setTimeout(() => setAllData(paginated), 0)
    }, [])

    React.useEffect(() => {
        handleData(page, dataCount)
    }, [handleData, page, dataCount])

  return (
    <div className="meets-events-layout">
        <div className="meets-events-hdr">{meetsEventsData[0]?.baseTitle}</div>
        <div className={meetsEventsData[0]?.className}></div>
    </div>
  )
}

export default AllMeetsEvents