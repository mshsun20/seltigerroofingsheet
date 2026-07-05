import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { eliteBanner } from "@/data/eliteBanner";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Elite = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Elite"} info={eliteBanner} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Elite