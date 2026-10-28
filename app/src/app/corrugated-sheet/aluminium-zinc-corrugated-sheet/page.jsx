import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { alZnCorrugatedSheetBanner } from "@/data/alZnCorrugatedSheetBanner";
import { aboutAlZnCorrugated } from "@/data/aboutAlZnCorrugated";
import { specsAlZnCorrugated } from "@/data/specsAlZnCorrugated";
import { alZnCorrugatedFeatures } from "@/data/alZnCorrugatedFeatures";
import { alZnCorrugatedAdvantages } from "@/data/alZnCorrugatedAdvantages";
import { corrugatedTypesInfo } from "@/data/corrugatedTypesInfo";
import { faqAlZnCorrugatedDetails } from "@/data/faqAlZnCorrugatedDetails";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutCorrugated = dynamic(() => import("@/components/business/products/AboutCorrugated"));
const CorrugatedSpecifications = dynamic(() => import("@/components/business/products/CorrugatedSpecifications"));
const CorrugatedFeatures = dynamic(() => import("@/components/business/products/CorrugatedFeatures"));
const CorrugatedAdvantages = dynamic(() => import("@/components/business/products/CorrugatedAdvantages"));
const RoofingTypes = dynamic(() => import("@/components/business/products/RoofingTypes"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));

const AlZnCorrugatedSheet = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Aluminium Zinc Corrugated Sheet"} info={alZnCorrugatedSheetBanner} /></LazyWrapper>
      <LazyWrapper><AboutCorrugated dataSet={aboutAlZnCorrugated[0]} /></LazyWrapper>
      <LazyWrapper><CorrugatedSpecifications dataSet={specsAlZnCorrugated[0]} /></LazyWrapper>
      <LazyWrapper><CorrugatedFeatures dataSet={alZnCorrugatedFeatures[0]} /></LazyWrapper>
      <LazyWrapper><CorrugatedAdvantages dataSet={alZnCorrugatedAdvantages[0]} /></LazyWrapper>
      <LazyWrapper><RoofingTypes dataSet={corrugatedTypesInfo[0]} type={`Aluminium Zinc Corrugated Sheet`} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqAlZnCorrugatedDetails[0]} /></LazyWrapper>
    </div>
  )
}

export default AlZnCorrugatedSheet