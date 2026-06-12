import Image from 'next/image';
import React from 'react'

const BoardOfDirectors = ({ data }) => {
  return (
    <div className="directors-card">
        <div className="directors-image">
            <Image
                src={data?.image?.url}
                alt={data?.image?.alt}
                width={data?.image?.width}
                height={data?.image?.height}
            />
            <div className="directors-image-filter"></div>
        </div>
        <div className="directors-details">
            <div className="directors-title">{data?.name}</div>
            <div className="directors-info">{data?.position}</div>
        </div>
    </div>
  )
}

export default React.memo(BoardOfDirectors)