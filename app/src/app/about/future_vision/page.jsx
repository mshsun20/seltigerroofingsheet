"use client";
import React from 'react'
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/common/Banner"))
import { futureVisionBanner } from "@/data/futureVisionBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
const FutureVision = dynamic(() => import("@/components/about/FutureVision"));
const UpcomingUpdates = dynamic(() => import("@/components/about/UpcomingUpdates"));
const UpcomingProducts = dynamic(() => import("@/components/about/UpcomingProducts"));

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