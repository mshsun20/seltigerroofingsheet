import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { colourCoatedSheetCoilBanner } from "@/data/colourCoatedSheetCoilBanner";
import { aboutColourCoatedRoofingSheetInfo } from "@/data/aboutColourCoatedRoofingSheetInfo";
import { specsColourCoatedRoofingSheetInfo } from "@/data/specsColourCoatedRoofingSheetInfo";
import { featuresColourCoatedRoofingSheetInfo } from "@/data/featuresColourCoatedRoofingSheetInfo";
import { updatesColourCoatedRoofingSheetInfo } from "@/data/updatesColourCoatedRoofingSheetInfo";
const AboutProduct = dynamic(() => import("@/components/business/products/AboutProduct"));
const ProductSpecifications = dynamic(() => import("@/components/business/products/ProductSpecifications"));
const ProductFeatures = dynamic(() => import("@/components/business/products/ProductFeatures"));
const ProductUpdates = dynamic(() => import("@/components/business/products/ProductUpdates"));

const ColourCoated = () => {
  const allTabs = specsColourCoatedRoofingSheetInfo[0]?.contents?.map((elm) => ({
    itemIndex: elm?.itemIndex,
    itemName: elm?.itemName,
  }))
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Colour Coated Sheet and Coil"} info={colourCoatedSheetCoilBanner} /></LazyWrapper>
      <LazyWrapper><AboutProduct dataSet={aboutColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductSpecifications dataSet={specsColourCoatedRoofingSheetInfo[0]} tabs={allTabs} /></LazyWrapper>
      <LazyWrapper><ProductFeatures dataSet={featuresColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
      <LazyWrapper><ProductUpdates dataSet={updatesColourCoatedRoofingSheetInfo[0]} /></LazyWrapper>
    </div>
  )
}

export default ColourCoated