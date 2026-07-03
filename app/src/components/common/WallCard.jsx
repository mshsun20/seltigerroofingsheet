"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/styles/components/wallcard.css";

const WallCard = ({
    id=0,
    contentWall,
    title,
    description,
    renderAction,
    width="100%",
    height="100%",
}) => {
  return (
    <div className="wallcard-content" key={id} style={{ width: width, height: height }}>
        <div className="wall-section">
            <Image
                src={contentWall?.url}
                alt={contentWall?.alt}
                width={contentWall?.width}
                height={contentWall?.height}
            />
        </div>
        <div className="caption-section">
            <div className="title-section">
                {title}
            </div>
            <div className="action-section">
                {renderAction}
            </div>
        </div>
    </div>
  )
}

export default React.memo(WallCard)