import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { corrugatedSheetBanner } from "@/data/corrugatedSheetBanner";
import { aboutCorrugatedSheetInfo } from "@/data/aboutCorrugatedSheetInfo";
import { specsCorrugatedInfo } from "@/data/specsCorrugatedInfo";
import { roofingTypesInfo } from "@/data/roofingTypesInfo";
import { roofingAdvantages } from "@/data/roofingAdvantages";
import { roofingApplications } from "@/data/roofingApplications";
import { roofingChoose } from "@/data/roofingChoose";
import { faqRoofingDetails } from "@/data/faqRoofingDetails";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutCorrugated = dynamic(() => import("@/components/business/products/AboutCorrugated"));
const CorrugatedSpecifications = dynamic(() => import("@/components/business/products/CorrugatedSpecifications"));
const RoofingTypes = dynamic(() => import("@/components/business/products/RoofingTypes"));
const RoofingAdvantages = dynamic(() => import("@/components/business/products/RoofingAdvantages"));
const RoofingApplications = dynamic(() => import("@/components/business/products/RoofingApplications"));
const RoofingChoose = dynamic(() => import("@/components/business/products/RoofingChoose"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));

const CorrugatedSheet = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Corrugated Sheet"} info={corrugatedSheetBanner} /></LazyWrapper>
      <LazyWrapper><AboutCorrugated dataSet={aboutCorrugatedSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><CorrugatedSpecifications dataSet={specsCorrugatedInfo[0]} /></LazyWrapper>
      <LazyWrapper><RoofingTypes dataSet={roofingTypesInfo[0]} /></LazyWrapper>
      <LazyWrapper><RoofingAdvantages dataSet={roofingAdvantages[0]} /></LazyWrapper>
      <LazyWrapper><RoofingApplications dataSet={roofingApplications[0]} /></LazyWrapper>
      <LazyWrapper><RoofingChoose dataSet={roofingChoose[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqRoofingDetails[0]} /></LazyWrapper>
    </div>
  )
}

export default CorrugatedSheet