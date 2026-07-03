"use client";
import React from 'react'
import { meetsEventsData } from "@/data/meetsEventsData";
import SafeHtmlRenderer from '@/configs/SafeHtmlRenderer';
import Link from 'next/link';
import Image from 'next/image';
import CustomPagination from "@/components/common/CustomPagination";

let LIMIT = 6

const AllMeetsEvents = () => {
    const [allData, setAllData] = React.useState([])
    const [page, setPage] = React.useState(1)

    const totalCount = meetsEventsData[0]?.allContents?.length || 0;
    const totalPages = Math.ceil(totalCount / LIMIT);

    const handleData = React.useCallback((page, limit) => {
        const allContents = meetsEventsData[0]?.allContents || [];
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = [...allContents].sort((a, b) => a.contentIndex - b.contentIndex).slice(startIndex, endIndex);
        setTimeout(() => setAllData(paginatedData), 0)
    }, [])
    React.useEffect(() => {
        handleData(page, LIMIT)
    }, [handleData, page])

    const handlePageChange = (e, val) => {
        e.preventDefault();
        setPage(val)
    }

  return (
    <div className="meets-events-layout">
        <div className="contnr">
            <div className="meets-events-hdr">{meetsEventsData[0]?.baseTitle}</div>
            <div className={meetsEventsData[0]?.className}>
                {
                    allData?.map(elm => (
                        <div className={elm?.className} key={elm?.contentIndex}>
                            <div className="all-content-wall">
                                <Image
                                    src={elm?.contentWall?.url}
                                    alt={elm?.contentWall?.alt}
                                    width={elm?.contentWall?.width}
                                    height={elm?.contentWall?.height}
                                />
                            </div>
                            <div className="all-content-info">
                                <div className="all-content-info-top"></div>
                                <div className="all-content-info-title" title={elm?.title}>{elm?.title}</div>
                                <div className="all-content-info-details">
                                    <span><SafeHtmlRenderer content={elm?.contentTextuals} /></span>
                                </div>
                                <div className="all-content-info-actions">
                                    <Link href={`/about/highlights/meets_and_events/${elm.contentSlug}`}>Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="meets-events-pagination">
                <CustomPagination
                page={page}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                />
            </div>
        </div>
    </div>
  )
}

export default React.memo(AllMeetsEvents)