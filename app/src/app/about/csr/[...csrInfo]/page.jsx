import React from 'react';
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { csrData } from "@/data/csrData";
const Banner = dynamic(() => import("@/components/generic/Banner"))
import SafeHtmlRenderer from "@/configs/SafeHtmlRenderer"
import Image from 'next/image';


const CsrInfo = async ({ params }) => {
    const { csrInfo } = await params
    console.log(csrInfo);
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
            { name: "CSR", url: "/about/csr" },
            { name: data?.contentTextuals?.caption, url: "#" },
        ]
    })

  return (
    <div className="csr-layout">
        <LazyWrapper><Banner data={data?.contentTextuals?.caption} info={csrSubBannerData} /></LazyWrapper>
        <div className={data?.className}>
            <div className={data?.contentBackground?.className}>
                <Image
                    src={data?.contentBackground?.url}
                    alt={data?.contentBackground?.alt}
                    width={data?.contentBackground?.width}
                    height={data?.contentBackground?.height}
                />
            </div>
            <div className={data?.contentTextuals?.className}>
                <SafeHtmlRenderer content={data?.contentTextuals?.details} />
            </div>
        </div>
    </div>
  )
}

export default React.memo(CsrInfo)