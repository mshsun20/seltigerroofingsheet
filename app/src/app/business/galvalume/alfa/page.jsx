import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { alfaBanner } from "@/data/alfaBanner";
import { brandsAlfaInfo } from "@/data/brandsAlfaInfo";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const OtherBrands = dynamic(() => import("@/components/business/brands/OtherBrands"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Alfa = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Alfa"} info={alfaBanner} /></LazyWrapper>
      <LazyWrapper><OtherBrands dataSet={brandsAlfaInfo[0]} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Alfa