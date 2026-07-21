"use client";
import React from 'react'
import "@/styles/banner.css";
import Image from 'next/image';
import Link from 'next/link';
import BannerObserver from "@/components/BannerObserver";

const Banner = ({ data, info }) => {
  return (
    <div className='banner-layout'>
        <div className="banner-poster">
            <Image
                src={info?.bannerImage?.url}
                alt={info?.bannerImage?.alt}
                width={info?.bannerImage?.width}
                height={info?.bannerImage?.height}
            />
        </div>
        <div className="banner-content">
            <div className="contnr">
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
        
        <BannerObserver range={72} />
    </div>
  )
}

export default React.memo(Banner)