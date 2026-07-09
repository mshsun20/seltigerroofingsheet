import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { alZnSheetCoilBanner } from "@/data/alZnSheetCoilBanner";
import { aboutAlZnSheetInfo } from "@/data/aboutAlZnSheetInfo";
import { specsAlZnSheetInfo } from "@/data/specsAlZnSheetInfo";
import { featuresAlZnSheetInfo } from "@/data/featuresAlZnSheetInfo";
import { appsAlZnSheetInfo } from "@/data/appsAlZnSheetInfo";
import { updatesAlZnSheetInfo } from "@/data/updatesAlZnSheetInfo";
import { brandsAlZnSheetInfo } from "@/data/brandsAlZnSheetInfo";
import { faqAlZnDetails } from "@/data/faqAlZnDetails";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutProduct = dynamic(() => import("@/components/business/products/AboutProduct"));
const ProductSpecifications = dynamic(() => import("@/components/business/products/ProductSpecifications"));
const ProductFeatures = dynamic(() => import("@/components/business/products/ProductFeatures"));
const ProductApplications = dynamic(() => import("@/components/business/products/ProductApplications"));
const ProductUpdates = dynamic(() => import("@/components/business/products/ProductUpdates"));
const ProductBrands = dynamic(() => import("@/components/business/products/ProductBrands"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const AluzincSheets = () => {
  const allTabs = specsAlZnSheetInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  const allApps = appsAlZnSheetInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Aluzinc Sheet and Coil"} info={alZnSheetCoilBanner} /></LazyWrapper>
      <LazyWrapper><AboutProduct dataSet={aboutAlZnSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductSpecifications dataSet={specsAlZnSheetInfo[0]} tabs={allTabs} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresAlZnSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductApplications dataSet={appsAlZnSheetInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><ProductUpdates dataSet={updatesAlZnSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductBrands dataSet={brandsAlZnSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqAlZnDetails[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default AluzincSheets