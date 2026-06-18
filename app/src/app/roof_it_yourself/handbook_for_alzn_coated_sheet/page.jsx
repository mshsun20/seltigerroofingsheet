import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { alZnCoatedSheetHandbookBanner } from "@/data/alZnCoatedSheetHandbookBanner";

const AlZnCoatedSheetHandbook = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Handbook for Al-Zn Coated Sheet"} info={alZnCoatedSheetHandbookBanner} /></LazyWrapper>
    </div>
  )
}

export default AlZnCoatedSheetHandbook