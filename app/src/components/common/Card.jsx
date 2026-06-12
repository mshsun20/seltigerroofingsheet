"use client";
import React from 'react'
import "@/styles/components/card.css"
import Link from 'next/link';

const Card = ({ poster, title, description, url }) => {
  return (
    <div className='card'>
        <div className="card-poster">
          <Link href={url}>{poster === "" ? <h3>{title || ""}</h3> : <img src={poster} alt={title} />}</Link>
        </div>
        <div className='card-info'>
          <div className="card-hdr">
            <Link href={url}>{title}</Link>
          </div>
          <div className="card-details">{description}</div>
        </div>
        <div className="card-actions">
          <Link href={url}>Read More</Link>
        </div>
    </div>
  )
}

export default React.memo(Card)