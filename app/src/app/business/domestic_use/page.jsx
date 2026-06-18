import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { domesticUseBanner } from "@/data/domesticUseBanner";

const DomesticUse = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Roofing Sheets for Domestic Use"} info={domesticUseBanner} /></LazyWrapper>
    </div>
  )
}

export default DomesticUse