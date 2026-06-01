"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Banner = ({ data, info }) => {
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
                    data===info?.bannerTitle
                    ? <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                    : info?.bannerInfo?.map((elm, i) => (
                        <div key={i}>
                            <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                            <Link href={elm?.url}>{elm?.name}</Link>
                            <span>&nbsp;&nbsp;{">>"}&nbsp;&nbsp;</span>
                        </div>
                    ))
                }
                <Link href="#">{data}</Link>
            </div>
        </div>
    </div>
  )
}

export default React.memo(Banner)