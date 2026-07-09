import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { pipeBanner } from "@/data/pipeBanner";
import { aboutPipesInfo } from "@/data/aboutPipesInfo";
import { specsPipesInfo } from "@/data/specsPipesInfo";
import { featuresPipesInfo } from "@/data/featuresPipesInfo";
import { appsPipesInfo } from "@/data/appsPipesInfo";
import { updatesPipesInfo } from "@/data/updatesPipesInfo";
import { faqPipesDetails } from "@/data/faqPipesDetails";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutProduct = dynamic(() => import("@/components/business/products/AboutProduct"));
const ProductSpecifications = dynamic(() => import("@/components/business/products/ProductSpecifications"));
const ProductFeatures = dynamic(() => import("@/components/business/products/ProductFeatures"));
const ProductApplications = dynamic(() => import("@/components/business/products/ProductApplications"));
const ProductUpdates = dynamic(() => import("@/components/business/products/ProductUpdates"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Pipes = () => {
  const allTabs = specsPipesInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  const allApps = appsPipesInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))

  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Pipes"} info={pipeBanner} /></LazyWrapper>
      <LazyWrapper><AboutProduct dataSet={aboutPipesInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductSpecifications dataSet={specsPipesInfo[0]} tabs={allTabs} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresPipesInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductApplications dataSet={appsPipesInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><ProductUpdates dataSet={updatesPipesInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqPipesDetails[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Pipes