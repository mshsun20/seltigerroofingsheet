import React from 'react';
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
const Banner = dynamic(() => import("@/components/common/Banner"));
import { colourCorrugatedSheetBanner } from "@/data/colourCorrugatedSheetBanner";

const ColourCorrugatedSheet = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Colour Corrugated Sheet"} info={colourCorrugatedSheetBanner} /></LazyWrapper>
    </div>
  )
}

export default ColourCorrugatedSheet