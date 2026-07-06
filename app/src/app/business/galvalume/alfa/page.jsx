import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { alfaBanner } from "@/data/alfaBanner";
import { aboutAzureInfo } from "@/data/aboutAzureInfo";
import { featuresAzureInfo } from "@/data/featuresAzureInfo";
import { applicationsAzureInfo } from "@/data/applicationsAzureInfo";
import { galleryAzureInfo } from "@/data/galleryAzureInfo";
import { faqAzureDetails } from "@/data/faqAzureDetails";
import { brandsAlfaInfo } from "@/data/brandsAlfaInfo";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutGalvalume = dynamic(() => import("@/components/business/brands/AboutGalvalume"));
const GalvalumeFeatures = dynamic(() => import("@/components/business/brands/GalvalumeFeatures"));
const GalvalumeApplications = dynamic(() => import("@/components/business/brands/GalvalumeApplications"));
const GalvalumeGallery = dynamic(() => import("@/components/business/brands/GalvalumeGallery"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));
const OtherBrands = dynamic(() => import("@/components/business/brands/OtherBrands"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Alfa = () => {
  const allApps = applicationsAzureInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Alfa"} info={alfaBanner} /></LazyWrapper>
      <LazyWrapper><AboutGalvalume dataSet={aboutAzureInfo[0]} /></LazyWrapper>
      <LazyWrapper><GalvalumeFeatures dataSet={featuresAzureInfo[0]} /></LazyWrapper>
      <LazyWrapper><GalvalumeApplications dataSet={applicationsAzureInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><GalvalumeGallery dataSet={galleryAzureInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqAzureDetails[0]} /></LazyWrapper>
      <LazyWrapper><OtherBrands dataSet={brandsAlfaInfo[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Alfa