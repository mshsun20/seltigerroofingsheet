import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { corrugatedSheetBanner } from "@/data/corrugatedSheetBanner";
import { aboutCorrugatedSheetInfo } from "@/data/aboutCorrugatedSheetInfo";
import { specsCorrugatedInfo } from "@/data/specsCorrugatedInfo";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutCorrugated = dynamic(() => import("@/components/business/products/AboutCorrugated"));
const CorrugatedSpecifications = dynamic(() => import("@/components/business/products/CorrugatedSpecifications"));

const CorrugatedSheet = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Corrugated Sheet"} info={corrugatedSheetBanner} /></LazyWrapper>
        <LazyWrapper><AboutCorrugated dataSet={aboutCorrugatedSheetInfo[0]} /></LazyWrapper>
        <LazyWrapper><CorrugatedSpecifications dataSet={specsCorrugatedInfo[0]} /></LazyWrapper>
    </div>
  )
}

export default CorrugatedSheet