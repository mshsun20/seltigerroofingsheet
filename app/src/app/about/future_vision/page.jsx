"use client";
import React from 'react'
const Banner = React.lazy(() => import("@/components/common/Banner"))
import { futureVisionBanner } from "@/data/futureVisionBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
import { upcomingUpdatesInfo } from "@/data/upcomingUpdatesInfo";
const FutureVision = React.lazy(() => import("@/components/about/FutureVision"));
const UpcomingUpdates = React.lazy(() => import("@/components/about/UpcomingUpdates"));
const UpcomingProducts = React.lazy(() => import("@/components/about/UpcomingProducts"));

const futureVision = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Future Vision"} info={futureVisionBanner} /></LazyWrapper>
      <LazyWrapper><FutureVision /></LazyWrapper>
      <LazyWrapper><UpcomingUpdates /></LazyWrapper>
      <LazyWrapper><UpcomingProducts /></LazyWrapper>
    </div>
  )
}

export default futureVision