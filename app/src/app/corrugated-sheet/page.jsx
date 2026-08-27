import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
const Banner = dynamic(() => import("@/components/common/Banner"));
import { corrugatedSheetBanner } from "@/data/corrugatedSheetBanner";

const CorrugatedSheet = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Corrugated Sheet"} info={corrugatedSheetBanner} /></LazyWrapper>
    </div>
  )
}

export default CorrugatedSheet