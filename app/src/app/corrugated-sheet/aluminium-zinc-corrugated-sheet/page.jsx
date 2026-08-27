import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
const Banner = dynamic(() => import("@/components/common/Banner"));
import { alZnCorrugatedSheetBanner } from "@/data/alZnCorrugatedSheetBanner";

const AlZnCorrugatedSheet = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Aluminium Zinc Corrugated Sheet"} info={alZnCorrugatedSheetBanner} /></LazyWrapper>
    </div>
  )
}

export default AlZnCorrugatedSheet