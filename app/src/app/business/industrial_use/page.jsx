import React from 'react'
import "@/styles/components/industrialuse.css";
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { industrialUseBanner } from "@/data/industrialUseBanner";
const IndustrialUseInfo = dynamic(() => import("@/components/business/IndustrialUseInfo"));
const IndustrialUseFaqInfo = dynamic(() => import("@/components/business/IndustrialUseFaqInfo"));

const IndustrialUse = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Roofing Sheets for Industrial Use"} info={industrialUseBanner} /></LazyWrapper>
      <LazyWrapper><IndustrialUseInfo /></LazyWrapper>
      <LazyWrapper><IndustrialUseFaqInfo /></LazyWrapper>
    </div>
  )
}

export default IndustrialUse