import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { pipeBanner } from "@/data/pipeBanner";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Pipes = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Pipes"} info={pipeBanner} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Pipes