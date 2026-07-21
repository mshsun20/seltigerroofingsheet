import React from 'react'
import "@/styles/components/meetsevents.css";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/common/Banner"))
import { meetsEventsBanner } from "@/data/meetsEventsBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
const FeaturedMeetsEvents = dynamic(() => import("@/components/about/FeaturedMeetsEvents"))
const AllMeetsEvents = dynamic(() => import("@/components/about/AllMeetsEvents"))

const MeetsEvents = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Meets & Events"} info={meetsEventsBanner} /></LazyWrapper>
      <LazyWrapper><FeaturedMeetsEvents /></LazyWrapper>
      <LazyWrapper><AllMeetsEvents /></LazyWrapper>
    </div>
  )
}

export default MeetsEvents