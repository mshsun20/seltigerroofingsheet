import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { alfaBanner } from "@/data/alfaBanner";
import { aboutAlfaInfo } from "@/data/aboutAlfaInfo";
import { featuresAlfaInfo } from "@/data/featuresAlfaInfo";
import { applicationsAlfaInfo } from "@/data/applicationsAlfaInfo";
import { galleryAlfaInfo } from "@/data/galleryAlfaInfo";
import { faqAlfaDetails } from "@/data/faqAlfaDetails";
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
  const allApps = applicationsAlfaInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Alfa"} info={alfaBanner} /></LazyWrapper>
      <LazyWrapper><AboutGalvalume dataSet={aboutAlfaInfo[0]} /></LazyWrapper>
      <LazyWrapper><GalvalumeFeatures dataSet={featuresAlfaInfo[0]} /></LazyWrapper>
      <LazyWrapper><GalvalumeApplications dataSet={applicationsAlfaInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><GalvalumeGallery dataSet={galleryAlfaInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqAlfaDetails[0]} /></LazyWrapper>
      <LazyWrapper><OtherBrands dataSet={brandsAlfaInfo[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Alfa