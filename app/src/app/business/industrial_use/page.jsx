import React from 'react'
import "@/styles/components/industrialuse.css";
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { industrialUseBanner } from "@/data/industrialUseBanner";
const IndustrialUseInfo = dynamic(() => import("@/components/business/application/IndustrialUseInfo"));
import { industrialUseFaqDetails } from "@/data/industrialUseFaqDetails";
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));

const IndustrialUse = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Roofing Sheets for Industrial Use"} info={industrialUseBanner} /></LazyWrapper>
      <LazyWrapper><IndustrialUseInfo /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={industrialUseFaqDetails[0]} /></LazyWrapper>
    </div>
  )
}

export default IndustrialUse