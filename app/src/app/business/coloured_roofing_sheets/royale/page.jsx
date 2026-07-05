import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { royaleBanner } from "@/data/royaleBanner";
import { aboutRoyaleInfo } from "@/data/aboutRoyaleInfo";
import { featuresRoyaleInfo } from "@/data/featuresRoyaleInfo";
import { applicationsRoyaleInfo } from "@/data/applicationsRoyaleInfo";
import { shadesRoyaleInfo } from "@/data/shadesRoyaleInfo";
import { galleryRoyaleInfo } from "@/data/galleryRoyaleInfo";
import { faqRoyaleDetails } from "@/data/faqRoyaleDetails";
import { brandsRoyaleInfo } from "@/data/brandsRoyaleInfo";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutColouredSheet = dynamic(() => import("@/components/business/brands/AboutColouredSheet"));
const ColouredSheetFeatures = dynamic(() => import("@/components/business/brands/ColouredSheetFeatures"));
const ColouredSheetApplications = dynamic(() => import("@/components/business/brands/ColouredSheetApplications"));
const ColouredSheetShades = dynamic(() => import("@/components/business/brands/ColouredSheetShades"));
const ColouredSheetGallery = dynamic(() => import("@/components/business/brands/ColouredSheetGallery"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));
const OtherBrands = dynamic(() => import("@/components/business/brands/OtherBrands"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Royale = () => {
  const allApps = applicationsRoyaleInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  const allShades = shadesRoyaleInfo[0]?.contents?.map((elm) => ({
    contentIndex: elm?.contentIndex,
    contentColor: elm?.contentColor,
  }))
  
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Royale"} info={royaleBanner} /></LazyWrapper>
      <LazyWrapper><AboutColouredSheet dataSet={aboutRoyaleInfo[0]} /></LazyWrapper>
      <LazyWrapper><ColouredSheetFeatures dataSet={featuresRoyaleInfo[0]} /></LazyWrapper>
      <LazyWrapper><ColouredSheetApplications dataSet={applicationsRoyaleInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><ColouredSheetShades dataSet={shadesRoyaleInfo[0]} tabs={allShades} /></LazyWrapper>
      <LazyWrapper><ColouredSheetGallery dataSet={galleryRoyaleInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqRoyaleDetails[0]} /></LazyWrapper>
      <LazyWrapper><OtherBrands dataSet={brandsRoyaleInfo[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Royale