"use client";
import React from 'react'
const Banner = React.lazy(() => import("@/components/common/Banner"))
import { futureVisionBanner } from "@/data/futureVisionBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
import { upcomingUpdatesInfo } from "@/data/upcomingUpdatesInfo";
const FutureVision = React.lazy(() => import("@/components/about/FutureVision"));

const futureVision = () => {
  console.log(upcomingUpdatesInfo);

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Future Vision"} info={futureVisionBanner} /></LazyWrapper>
      <LazyWrapper><FutureVision /></LazyWrapper>
    </div>
  )
}

export default futureVision