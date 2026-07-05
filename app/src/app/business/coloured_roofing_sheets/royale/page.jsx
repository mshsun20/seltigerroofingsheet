import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { royaleBanner } from "@/data/royaleBanner";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
import { aboutRoyaleInfo } from "@/data/aboutRoyaleInfo";
import { featuresRoyaleInfo } from "@/data/featuresRoyaleInfo";
const Banner = dynamic(() => import("@/components/common/Banner"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));
const AboutColouredSheet = dynamic(() => import("@/components/business/brands/AboutColouredSheet"));
const ColouredSheetFeatures = dynamic(() => import("@/components/business/brands/ColouredSheetFeatures"));

const Royale = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Royale"} info={royaleBanner} /></LazyWrapper>
      <LazyWrapper><AboutColouredSheet dataSet={aboutRoyaleInfo[0]} /></LazyWrapper>
      <LazyWrapper><ColouredSheetFeatures dataSet={featuresRoyaleInfo[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Royale