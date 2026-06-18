import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { colourCoatedSheetCoilBanner } from "@/data/colourCoatedSheetCoilBanner";

const ColourCoated = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Colour Coated Sheet and Coil"} info={colourCoatedSheetCoilBanner} /></LazyWrapper>
    </div>
  )
}

export default ColourCoated