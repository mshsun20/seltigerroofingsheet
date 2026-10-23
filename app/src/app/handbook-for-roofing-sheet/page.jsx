import React from 'react'
import "@/styles/components/handbookroofing.css";
import Link from 'next/link';
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"));
import { roofingSheetHandbookBanner } from "@/data/roofingSheetHandbookBanner";
const HandbookResourceRoofingSheets = dynamic(() => import("@/components/roofityourself/HandbookResourceRoofingSheets"))

const page = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"Handbook for Roofing Sheet"} info={roofingSheetHandbookBanner} /></LazyWrapper>
        <div className="resource-roofing-sheets-main-description">
            <div className="contnr">
                <span>This guide covers everything you need to know about roofing sheets, from their key features and benefits to selecting the best option for your project. It also includes practical maintenance tips to help extend their lifespan, making it easier to decide whether you should install new roofing sheets or preserve the ones you already have.</span>
                <div className="resource-roofing-sheets-main-description-links">
                    <Link href={`/handbook-for-colour-coated-roofing-sheet`}>
                        Handbook for Colour Coated Roofing Sheet
                    </Link>
                    <Link href={`/handbook-for-aluzinc-sheet`}>
                        Handbook for Aluminium Zinc Coated Sheet
                    </Link>
                </div>
            </div>
        </div>
        <LazyWrapper><HandbookResourceRoofingSheets /></LazyWrapper>
    </div>
  )
}

export default page