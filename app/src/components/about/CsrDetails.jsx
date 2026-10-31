"use client";
import React from 'react';
import "@/styles/components/csrdetails.css";
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";
import { csrData } from "@/data/csrData";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const CsrDetails = ({ dataSet = {} }) => {
    const router = useRouter();

    const handleRoute = (e, link) => {
        e.preventDefault();
        router.push(link);
    }

  return (
    <div className="csr-details-layout">
        <div className="contnr">
            <div className="csr-details-container">
                <div className="csr-details-content">
                    <div className="csr-details-content-item">
                        <div className="csr-details-content-item-bg">
                            <Image
                                src={dataSet?.contentBackground?.url}
                                alt={dataSet?.contentBackground?.alt}
                                width={dataSet?.contentBackground?.width}
                                height={dataSet?.contentBackground?.height}
                            />
                        </div>
                        <div className="csr-details-content-item-textuals">
                            <SafeHtmlRenderer content={dataSet?.contentTextuals?.details} />
                        </div>
                    </div>
                </div>
                <div className="csr-details-others">
                    <div className="csr-details-others-posts">
                        <div className="csr-details-others-posts-heading">Recent Posts</div>
                        <div className="csr-details-others-posts-list">
                            {csrData[0]?.mainContent?.allContent?.length > 0
                            && csrData[0]?.mainContent?.allContent?.map(itm => (
                                <div
                                    key={itm?.contentIndex}
                                    className="csr-details-others-posts-list-item"
                                    onClick={(e) => handleRoute(e, itm?.contentSlug)}
                                >
                                    <div className="csr-details-others-posts-list-item-wall">
                                        <Image
                                            src={itm?.contentBackground?.url}
                                            alt={itm?.contentBackground?.alt}
                                            width={itm?.contentBackground?.width}
                                            height={itm?.contentBackground?.height}
                                        />
                                    </div>
                                    <div className="csr-details-others-posts-list-item-title">
                                        {itm?.contentTextuals?.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="csr-details-others-contacts">
                        <div className="csr-details-others-contacts-heading">You Still Have A Question</div>
                        <div className="csr-details-others-contacts-description">
                            If you cannot find answer to your question our FAQ, you can always contact us. Web will answer you shortly!
                        </div>
                        <div className="csr-details-others-contacts-actions">
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

export default React.memo(CsrDetails)