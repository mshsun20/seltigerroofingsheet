import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { azureBanner } from "@/data/azureBanner";
import { brandsAzureInfo } from "@/data/brandsAzureInfo";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const OtherBrands = dynamic(() => import("@/components/business/brands/OtherBrands"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Azure = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Azure"} info={azureBanner} /></LazyWrapper>
      <LazyWrapper><OtherBrands dataSet={brandsAzureInfo[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Azure