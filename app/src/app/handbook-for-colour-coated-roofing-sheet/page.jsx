import React from 'react'
import "@/styles/components/handbookcolourcoated.css";
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { colourCoatedSheetHandbookBanner } from "@/data/colourCoatedSheetHandbookBanner";
const HandbookResourceColouredSheets = dynamic(() => import("@/components/roofityourself/HandbookResourceColouredSheets"));

const ColourCoatedSheetHandbook = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Handbook for Colour Coated Roofing Sheet"} info={colourCoatedSheetHandbookBanner} /></LazyWrapper>
      <div className="resource-coloured-sheets-main-description">
        <div className="contnr">
          <span>This page gives you a clear and simple overview of colour roofing sheets. It explains what they are, how to choose the right one, and how to take care of them. This will help you decide whether to buy new sheets or maintain your existing ones.</span>
        </div>
      </div>
      <LazyWrapper><HandbookResourceColouredSheets /></LazyWrapper>
    </div>
  )
}

export default ColourCoatedSheetHandbook