import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { alZnSheetCoilBanner } from "@/data/alZnSheetCoilBanner";

const AluzincSheets = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Aluzinc Sheet and Coil"} info={alZnSheetCoilBanner} /></LazyWrapper>
    </div>
  )
}

export default AluzincSheets