import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { royaleBanner } from "@/data/royaleBanner";

const Royale = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Royale"} info={royaleBanner} /></LazyWrapper>
    </div>
  )
}

export default Royale