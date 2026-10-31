"use client";
import React from 'react';
import "@/styles/components/meetseventsdetails.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import { meetsEventsData } from "@/data/meetsEventsData";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const MeetsEventsDetails = ({ dataSet = {} }) => {
    const router = useRouter();
    const recentData = React.useMemo(() => meetsEventsData[0]?.allContents?.slice(0, 5)?.map(elm => ({ ...elm })), []);

    const handleRoute = (e, link) => {
        e.preventDefault();
        router.push(link);
    }

  return (
    <div className="meets-events-details-layout">
        <div className="contnr">
            <div className="meets-events-details-container">
                <div className="meets-events-details-content">
                    <div className="meets-events-details-content-item">
                        <div className="meets-events-details-content-item-bg">
                            <Image
                                src={dataSet?.contentWall?.url}
                                alt={dataSet?.contentWall?.alt}
                                width={dataSet?.contentWall?.width}
                                height={dataSet?.contentWall?.height}
                            />
                        </div>
                        <div className="meets-events-details-content-item-textuals">
                            <SafeHtmlRenderer content={dataSet?.contentTextuals} />
                        </div>
                        <div className="meets-events-details-content-item-graphicals">
                            {dataSet?.contentGraphicals?.length > 0
                            && dataSet?.contentGraphicals?.map((itm, i) => (
                                <Image
                                    src={itm}
                                    alt="meet & events images"
                                    width={1000}
                                    height={800}
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="meets-events-details-others">
                    <div className="meets-events-details-others-posts">
                        <div className="meets-events-details-others-posts-heading">Recent Posts</div>
                        <div className="meets-events-details-others-posts-list">
                            {recentData?.length > 0
                            && recentData?.map(itm => (
                                <div
                                    key={itm?.contentIndex}
                                    className="meets-events-details-others-posts-list-item"
                                    onClick={(e) => handleRoute(e, itm?.contentSlug)}
                                >
                                    <div className="meets-events-details-others-posts-list-item-wall">
                                        <Image
                                            src={itm?.contentWall?.url}
                                            alt={itm?.contentWall?.alt}
                                            width={itm?.contentWall?.width}
                                            height={itm?.contentWall?.height}
                                        />
                                    </div>
                                    <div className="meets-events-details-others-posts-list-item-title">
                                        {itm?.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="meets-events-details-others-contacts">
                        <div className="meets-events-details-others-contacts-heading">You Still Have A Question</div>
                        <div className="meets-events-details-others-contacts-description">
                            If you cannot find answer to your question our FAQ, you can always contact us. Web will answer you shortly!
                        </div>
                        <div className="meets-events-details-others-contacts-actions">
                            <Link href={`mailto:contact@shyamgroup.com`} id="email-btn">contact@shyamgroup.com</Link>
                            <Link href={`tel:+919147184230`} id="call-btn">+91 9147184230</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default React.memo(MeetsEventsDetails)