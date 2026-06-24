import React from 'react'
import "@/styles/components/domesticuse.css";
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { domesticUseBanner } from "@/data/domesticUseBanner";
const DomesticUseInfo = dynamic(() => import("@/components/business/DomesticUseInfo"));
const DomesticUseFaqInfo = dynamic(() => import("@/components/business/DomesticUseFaqInfo"));

const DomesticUse = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Roofing Sheets for Domestic Use"} info={domesticUseBanner} /></LazyWrapper>
      <LazyWrapper><DomesticUseInfo /></LazyWrapper>
      <LazyWrapper><DomesticUseFaqInfo /></LazyWrapper>
    </div>
  )
}

export default DomesticUse