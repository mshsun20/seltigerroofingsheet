"use client";
import React from 'react'
import { meetsEventsData } from "@/data/meetsEventsData";
import Image from 'next/image';
import Link from 'next/link';
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const FeaturedMeetsEvents = () => {
    const [featured, setFeatured] = React.useState([...meetsEventsData[0]?.allContents])

    React.useEffect(() => {
        const featData = meetsEventsData[0]?.allContents?.filter((elm, i) => elm.contentFeatured)
        .sort((a, b) => b.contentIndex-a.contentIndex)
        setTimeout(() => setFeatured(featData), 0)
    }, [])
    
  return (
    <div className="featured-layout">
        <div className="contnr">
            <div className="featured-hdr">Featured Meets & Events</div>
            <div className="featured-container">
                {
                    featured?.length>0 && featured?.map(elm => (
                        <div className="featured-content" key={elm?.contentIndex}>
                            <div className="featured-wall">
                                <Image
                                    src={elm?.contentWall?.url}
                                    alt={elm?.contentWall?.alt}
                                    width={elm?.contentWall?.width}
                                    height={elm?.contentWall?.height}
                                />
                            </div>
                            <div className="featured-info">
                                <div className="featured-top"></div>
                                <div className="featured-title" title={elm?.title}>{elm?.title}</div>
                                <div className="featured-details">
                                    <span><SafeHtmlRenderer content={elm?.contentTextuals} /></span>
                                </div>
                                <div className="featured-actions">
                                    <Link href={`/about/highlights/meets_and_events/${elm.contentSlug}`}>
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default React.memo(FeaturedMeetsEvents)