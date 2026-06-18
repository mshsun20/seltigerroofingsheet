import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { azureBanner } from "@/data/azureBanner";

const Azure = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Azure"} info={azureBanner} /></LazyWrapper>
    </div>
  )
}

export default Azure