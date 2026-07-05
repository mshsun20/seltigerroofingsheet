"use client";
import Image from 'next/image';
import React from 'react'

const ColouredSheetGalleryCard = ({ item, onClick }) => {
  return (
    <div
        className="coloured-sheet-gallery-slider-card"
        onClick={() => onClick(item)}
    >
        <Image
            src={item?.url || "/"}
            alt={item?.alt || "No Image"}
            width={item?.width || 0}
            height={item?.height || 0}
        />
    </div>
  )
}

export default React.memo(ColouredSheetGalleryCard)