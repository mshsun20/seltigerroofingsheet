import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { alZnSheetCoilBanner } from "@/data/alZnSheetCoilBanner";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const AluzincSheets = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Aluzinc Sheet and Coil"} info={alZnSheetCoilBanner} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default AluzincSheets