"use client";
import React from 'react'
import "@/styles/components/card.css"
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer";

const Card = ({ content }) => {
  console.log(content);
  return (
    <div className='card'>
        <div className="card-poster">
          <Link href={`/blogs/${content.slug}`}>
            {String(content?.mediaLink) === ""
            ? <h3>{content?.title || ""}</h3>
            : <Image
              src={content?.mediaLink}
              alt={content?.title}
              width={5000}
              height={5000}
              unoptimized
            />}
          </Link>
        </div>
        <div className='card-info'>
          <div className="card-toppr">
            <div className="card-date">
              {moment(content?.updatedAt).format("Do MMM YYYY")}
            </div>
            <div className="card-author">by {content?.author?.name}</div>
          </div>
          <div className="card-hdr">
            <Link href={`/blogs/${content.slug}`}>{content?.title}</Link>
          </div>
          <div className="card-details">
            <SafeHtmlRenderer content={content?.description} />
          </div>
        </div>
        <div className="card-actions">
          <Link href={`/blogs/${content.slug}`}>Read More</Link>
        </div>
    </div>
  )
}

export default React.memo(Card)