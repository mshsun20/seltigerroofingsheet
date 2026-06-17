"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Banner = ({ data, info }) => {
    // console.log("Data:", data);
    // console.log("Banner Title:", info?.bannerInfo);
  return (
    <div className='banner'>
        <div className="banner-poster">
            <Image
                src={info?.bannerImage?.url}
                alt={info?.bannerImage?.alt}
                width={info?.bannerImage?.width}
                height={info?.bannerImage?.height}
            />
        </div>
        <div className="banner-content container">
            <div className="banner-hdr">{data}</div>
            <div className="banner-info">
                <Link href={info?.baseInfo?.url}>{info?.baseInfo?.name}</Link>
                {
                    info?.bannerInfo?.map((elm, i) => (
                        <div key={i}>
                            <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                            {
                                String(elm?.url)==="#" ? <span>{elm.name}</span>
                                : <Link href={elm?.url}>{elm?.name}</Link>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default React.memo(Banner)