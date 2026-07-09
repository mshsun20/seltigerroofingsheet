import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { crfhCrcaBanner } from "@/data/crfhCrcaBanner";
import { aboutCrfhCrcaInfo } from "@/data/aboutCrfhCrcaInfo";
import { specsCrfhCrcaInfo } from "@/data/specsCrfhCrcaInfo";
import { featuresCrfhInfo } from "@/data/featuresCrfhInfo";
import { featuresCrcaInfo } from "@/data/featuresCrcaInfo";
import { appsCrfhCrcaInfo } from "@/data/appsCrfhCrcaInfo";
import { updatesColourCoatedRoofingSheetInfo } from "@/data/updatesColourCoatedRoofingSheetInfo";
import { brandsColourCoatedRoofingSheetInfo } from "@/data/brandsColourCoatedRoofingSheetInfo";
import { faqColourCoatedDetails } from "@/data/faqColourCoatedDetails";
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

const CrfhAndCrca = () => {
  const allTabs = specsCrfhCrcaInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  const allApps = appsCrfhCrcaInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"CRFH & CRCA"} info={crfhCrcaBanner} /></LazyWrapper>
      <LazyWrapper><AboutProduct dataSet={aboutCrfhCrcaInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductSpecifications dataSet={specsCrfhCrcaInfo[0]} tabs={allTabs} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresCrfhInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresCrcaInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductApplications dataSet={appsCrfhCrcaInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><ProductUpdates dataSet={updatesColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductBrands dataSet={brandsColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqColourCoatedDetails[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default CrfhAndCrca