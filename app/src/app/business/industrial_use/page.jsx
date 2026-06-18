import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { industrialUseBanner } from "@/data/industrialUseBanner";

const IndustrialUse = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Roofing Sheets for Industrial Use"} info={industrialUseBanner} /></LazyWrapper>
    </div>
  )
}

export default IndustrialUse