"use client";
import Image from 'next/image';
import React from 'react'

const ChooseReason = ({ data }) => {
  return (
    <div className={data.className} id={`id${data.containerIndex}`}>
        {
            data.allDetails?.length>0 && data.allDetails?.map((elm, i) => (
                <div className="detail-section" id={String(data.alignment)} key={i}>
                    <div className={elm.icon?.className}>
                        <Image src={elm.icon?.url} alt={elm.icon?.alt} width={elm.icon?.width} height={elm.icon?.height} />
                    </div>
                    <div className="details-info">
                        <div className="details-heading">{elm?.name}</div>
                        <div className="detail-description">{elm?.details}</div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default React.memo(ChooseReason)