import React from 'react'
import "@/styles/components/handbookalzn.css";
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { alZnCoatedSheetHandbookBanner } from "@/data/alZnCoatedSheetHandbookBanner";
const HandbookResourceAlZnSheets = dynamic(() => import("@/components/roofityourself/HandbookResourceAlZnSheets"));

const AlZnCoatedSheetHandbook = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Handbook for Al-Zn Coated Sheet"} info={alZnCoatedSheetHandbookBanner} /></LazyWrapper>
      <div className="resource-alzn-sheets-main-description">
        <div className="contnr">
          <span>This page gives you the proper overview, strategy, guide and tutorial of aluzinc sheet. You can make perfect decision either you want to buy or to maintenance the existing al-zn alloy sheets.</span>
        </div>
      </div>
      <LazyWrapper><HandbookResourceAlZnSheets /></LazyWrapper>
    </div>
  )
}

export default AlZnCoatedSheetHandbook