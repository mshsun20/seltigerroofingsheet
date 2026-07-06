import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { eliteBanner } from "@/data/eliteBanner";
import { aboutEliteInfo } from "@/data/aboutEliteInfo";
import { featuresEliteInfo } from "@/data/featuresEliteInfo";
import { applicationsEliteInfo } from "@/data/applicationsEliteInfo";
import { shadesEliteInfo } from "@/data/shadesEliteInfo";
import { galleryEliteInfo } from "@/data/galleryEliteInfo";
import { faqEliteDetails } from "@/data/faqEliteDetails";
import { brandsEliteInfo } from "@/data/brandsEliteInfo";
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

const Elite = () => {
  const allApps = applicationsEliteInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  const allShades = shadesEliteInfo[0]?.contents?.map((elm) => ({
    contentIndex: elm?.contentIndex,
    contentColor: elm?.contentColor,
  }))

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Elite"} info={eliteBanner} /></LazyWrapper>
      <LazyWrapper><AboutColouredSheet dataSet={aboutEliteInfo[0]} /></LazyWrapper>
      <LazyWrapper><ColouredSheetFeatures dataSet={featuresEliteInfo[0]} /></LazyWrapper>
      <LazyWrapper><ColouredSheetApplications dataSet={applicationsEliteInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><ColouredSheetShades dataSet={shadesEliteInfo[0]} tabs={allShades} /></LazyWrapper>
      <LazyWrapper><ColouredSheetGallery dataSet={galleryEliteInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqEliteDetails[0]} /></LazyWrapper>
      <LazyWrapper><OtherBrands dataSet={brandsEliteInfo[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Elite