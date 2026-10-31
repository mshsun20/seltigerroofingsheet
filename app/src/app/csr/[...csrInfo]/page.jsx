import React from 'react';
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { csrData } from "@/data/csrData";
const Banner = dynamic(() => import("@/components/common/Banner"));
const CsrDetails = dynamic(() => import("@/components/about/CsrDetails"));


const CsrInfo = async ({ params }) => {
    const { csrInfo } = await params
    // console.log(csrInfo);
    const data = csrData[0]?.mainContent?.allContent?.find(itm => String(itm?.contentSlug)===String(csrInfo?.[0] || ""))
    const csrSubBannerData = {}
    Object.assign(csrSubBannerData, {
        bannerImage: {
            url: data?.contentBackground?.url,
            alt: data?.contentBackground?.alt,
            width: data?.contentBackground?.width || 1000,
            height: data?.contentBackground?.height || 800
        },
        bannerTitle: "CSR",
        baseInfo: { name: "Home", url: "/" },
        bannerInfo: [
            { name: "CSR", url: "/csr" },
            { name: data?.contentTextuals?.title, url: data?.contentSlug },
        ]
    })

  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={data?.contentTextuals?.title} info={csrSubBannerData} /></LazyWrapper>
        <LazyWrapper><CsrDetails dataSet={data} /></LazyWrapper>
    </div>
  )
}

export default React.memo(CsrInfo)