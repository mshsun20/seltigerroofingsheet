import React from 'react';
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { colourCorrugatedSheetBanner } from "@/data/colourCorrugatedSheetBanner";
import { aboutColorCoatedCorrugated } from "@/data/aboutColorCoatedCorrugated";
import { specsColorCoatedCorrugated } from "@/data/specsColorCoatedCorrugated";
import { corrugatedLayerData } from "@/data/corrugatedLayerData";
import { colorCorrugatedAdvantages } from "@/data/colorCorrugatedAdvantages";
import { corrugatedTypesInfo } from "@/data/corrugatedTypesInfo";
import { faqColorCoatedCorrugatedDetails } from "@/data/faqColorCoatedCorrugatedDetails";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutCorrugated = dynamic(() => import("@/components/business/products/AboutCorrugated"));
const CorrugatedSpecifications = dynamic(() => import("@/components/business/products/CorrugatedSpecifications"));
const CorrugatedLayer = dynamic(() => import("@/components/business/products/CorrugatedLayer"));
const CorrugatedAdvantages = dynamic(() => import("@/components/business/products/CorrugatedAdvantages"));
const RoofingTypes = dynamic(() => import("@/components/business/products/RoofingTypes"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));

const ColourCorrugatedSheet = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Colour Corrugated Sheet"} info={colourCorrugatedSheetBanner} /></LazyWrapper>
      <LazyWrapper><AboutCorrugated dataSet={aboutColorCoatedCorrugated[0]} /></LazyWrapper>
      <LazyWrapper><CorrugatedSpecifications dataSet={specsColorCoatedCorrugated[0]} /></LazyWrapper>
      <LazyWrapper><CorrugatedLayer dataSet={corrugatedLayerData[0]} /></LazyWrapper>
      <LazyWrapper><CorrugatedAdvantages dataSet={colorCorrugatedAdvantages[0]} /></LazyWrapper>
      <LazyWrapper><RoofingTypes dataSet={corrugatedTypesInfo[0]} type={`Colour Corrugated Sheet`} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqColorCoatedCorrugatedDetails[0]} /></LazyWrapper>
    </div>
  )
}

export default ColourCorrugatedSheet