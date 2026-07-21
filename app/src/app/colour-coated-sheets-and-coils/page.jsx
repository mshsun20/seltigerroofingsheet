import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { colourCoatedSheetCoilBanner } from "@/data/colourCoatedSheetCoilBanner";
import { aboutColourCoatedRoofingSheetInfo } from "@/data/aboutColourCoatedRoofingSheetInfo";
import { specsColourCoatedRoofingSheetInfo } from "@/data/specsColourCoatedRoofingSheetInfo";
import { techColourCoatedRoofingSheetInfo } from "@/data/techColourCoatedRoofingSheetInfo";
import { shadesColourCoatedRoofingSheetInfo } from "@/data/shadesColourCoatedRoofingSheetInfo";
import { featuresColourCoatedRoofingSheetInfo } from "@/data/featuresColourCoatedRoofingSheetInfo";
import { appsColourCoatedRoofingSheetInfo } from "@/data/appsColourCoatedRoofingSheetInfo";
import { updatesColourCoatedRoofingSheetInfo } from "@/data/updatesColourCoatedRoofingSheetInfo";
import { brandsColourCoatedRoofingSheetInfo } from "@/data/brandsColourCoatedRoofingSheetInfo";
import { faqColourCoatedDetails } from "@/data/faqColourCoatedDetails";
import { allProductsInfo } from "@/data/allProductsInfo";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const AboutProduct = dynamic(() => import("@/components/business/products/AboutProduct"));
const ProductSpecifications = dynamic(() => import("@/components/business/products/ProductSpecifications"));
const ProductTechnology = dynamic(() => import("@/components/business/products/ProductTechnology"));
const ProductShades = dynamic(() => import("@/components/business/products/ProductShades"));
const ProductFeatures = dynamic(() => import("@/components/business/products/ProductFeatures"));
const ProductApplications = dynamic(() => import("@/components/business/products/ProductApplications"));
const ProductUpdates = dynamic(() => import("@/components/business/products/ProductUpdates"));
const ProductBrands = dynamic(() => import("@/components/business/products/ProductBrands"));
const AllFaqsInfo = dynamic(() => import("@/components/business/AllFaqsInfo"));
const AllProducts = dynamic(() => import("@/components/business/products/AllProducts"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const ColourCoated = () => {
  const allTabs = specsColourCoatedRoofingSheetInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  const allShades = shadesColourCoatedRoofingSheetInfo[0]?.contents?.map((elm) => ({
    contentIndex: elm?.contentIndex,
    contentColor: elm?.contentColor,
  }))
  const allApps = appsColourCoatedRoofingSheetInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Colour Coated Sheet and Coil"} info={colourCoatedSheetCoilBanner} /></LazyWrapper>
      <LazyWrapper><AboutProduct dataSet={aboutColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductSpecifications dataSet={specsColourCoatedRoofingSheetInfo[0]} tabs={allTabs} /></LazyWrapper>
      <LazyWrapper><ProductTechnology dataSet={techColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductShades dataSet={shadesColourCoatedRoofingSheetInfo[0]} tabs={allShades} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductApplications dataSet={appsColourCoatedRoofingSheetInfo[0]} tabs={allApps} /></LazyWrapper>
      <LazyWrapper><ProductUpdates dataSet={updatesColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductBrands dataSet={brandsColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><AllFaqsInfo dataSet={faqColourCoatedDetails[0]} /></LazyWrapper>
      <LazyWrapper><AllProducts dataSet={allProductsInfo[0]} product={`Colour Coated Sheets and Coils`} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default ColourCoated