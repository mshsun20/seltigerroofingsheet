import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { meetsEventsData } from "@/data/meetsEventsData";
const Banner = dynamic(() => import("@/components/common/Banner"));
const MeetsEventsDetails = dynamic(() => import("@/components/about/MeetsEventsDetails"));

const MeetAndEvent = async ({ params }) => {
  const { meetevnt } = await params;
  // console.log(meetevnt);
  const data = meetsEventsData[0]?.allContents?.find(itm => String(itm?.contentSlug)===String(meetevnt?.[0] || ""))
  const meetsEventSubBannerData = {}
  Object.assign(meetsEventSubBannerData, {
    bannerImage: {
      url: meetsEventsData[0]?.detailBannerImage?.url,
      alt: meetsEventsData[0]?.detailBannerImage?.alt,
      width: meetsEventsData[0]?.detailBannerImage?.width || 5000,
      height: meetsEventsData[0]?.detailBannerImage?.height || 5000,
    },
    bannerTitle: "Meets & Events",
    baseInfo: { name: "Home", url: "/" },
    bannerInfo: [
      { name: "Meets & Events", url: "/meets-events" },
      { name: data?.title, url: data?.contentSlug },
    ]
  })

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={data?.title} info={meetsEventSubBannerData} /></LazyWrapper>
      <LazyWrapper><MeetsEventsDetails dataSet={data} /></LazyWrapper>
    </div>
  )
}

export default MeetAndEvent