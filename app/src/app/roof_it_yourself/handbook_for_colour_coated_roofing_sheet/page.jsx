import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { colourCoatedSheetHandbookBanner } from "@/data/colourCoatedSheetHandbookBanner"

const ColourCoatedSheetHandbook = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Handbook for Colour Coated Roofing Sheet"} info={colourCoatedSheetHandbookBanner} /></LazyWrapper>
    </div>
  )
}

export default ColourCoatedSheetHandbook