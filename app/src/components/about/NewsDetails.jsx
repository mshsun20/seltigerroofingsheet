"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import moment from 'moment';

const NewsDetails = ({ dataSet = {} }) => {
  return (
    <div className="news-press-layout">
        <div className="contnr">
            <div className="news-press-container">
                <div className="news-press-content">
                    {dataSet?.allContents?.length > 0
                    && dataSet?.allContents?.map(itm => (
                        <div key={itm?.contentIndex} className="news-press-content-card">
                            <div className="news-press-content-card-wall">
                                <Image
                                    src={itm?.contentWall?.url}
                                    alt={itm?.contentWall?.alt}
                                    width={itm?.contentWall?.width}
                                    height={itm?.contentWall?.height}
                                />
                            </div>
                            <div className="news-press-content-card-details">
                                <div className="news-press-content-card-details-caption">
                                    {itm?.dated !== ""
                                    && (<div className="news-press-content-card-details-caption-date">
                                        {moment(itm?.dated)?.format("Do MMM YYYY")}
                                    </div>)}
                                    <div className="news-press-content-card-details-caption-author">
                                        {itm?.author}
                                    </div>
                                </div>
                                <div className="news-press-content-card-details-title">
                                    {itm?.title}
                                </div>
                                <div className="news-press-content-card-details-description">
                                    <SafeHtmlRenderer content={itm?.description} />
                                </div>
                                <div className="news-press-content-card-details-action">
                                    <Link href={itm?.action?.url} target="_blank">{itm?.action?.info}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(NewsDetails)