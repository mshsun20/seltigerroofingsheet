import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { crfhCrcaBanner } from "@/data/crfhCrcaBanner";
import { aboutCrfhCrcaInfo } from "@/data/aboutCrfhCrcaInfo";
import { advantagesCrfhCrcaInfo } from "@/data/advantagesCrfhCrcaInfo";
import { specsCrfhCrcaInfo } from "@/data/specsCrfhCrcaInfo";
import { featuresCrfhInfo } from "@/data/featuresCrfhInfo";
import { featuresCrcaInfo } from "@/data/featuresCrcaInfo";
import { appsCrfhCrcaInfo } from "@/data/appsCrfhCrcaInfo";
import { updatesCrfhCrcaInfo } from "@/data/updatesCrfhCrcaInfo";
import { faqCrfhCrcaDetails } from "@/data/faqCrfhCrcaDetails";
import { allProductsInfo } from "@/data/allProductsInfo";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutProduct = dynamic(() => import("@/components/business/products/AboutProduct"));
const ProducstAdvantages = dynamic(() => import("@/components/business/products/ProducstAdvantages"));
const ProductSpecifications = dynamic(() => import("@/components/business/products/ProductSpecifications"));
const ProductFeatures = dynamic(() => import("@/components/business/products/ProductFeatures"));
const ProductApplications = dynamic(() => import("@/components/business/products/ProductApplications"));
const ProductUpdates = dynamic(() => import("@/components/business/products/ProductUpdates"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));
const AllProducts = dynamic(() => import("@/components/business/products/AllProducts"));
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
      <LazyWrapper><ProducstAdvantages dataSet={advantagesCrfhCrcaInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductSpecifications dataSet={specsCrfhCrcaInfo[0]} tabs={allTabs} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresCrfhInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresCrcaInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductApplications dataSet={appsCrfhCrcaInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><ProductUpdates dataSet={updatesCrfhCrcaInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqCrfhCrcaDetails[0]} /></LazyWrapper>
      <LazyWrapper><AllProducts dataSet={allProductsInfo[0]} product={`CRFH & CRCA`} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default CrfhAndCrca