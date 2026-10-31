import React from 'react'
import "@/styles/components/manufacturingfacilities.css";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/common/Banner"));
import { manufacturingFacilitiesBanner } from "@/data/manufacturingFacilitiesBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
const ManufacturingFacilitySection = dynamic(() => import("@/components/about/ManufacturingFacilitySection"));
const ManufacturingProcess = dynamic(() => import("@/components/about/ManufacturingProcess"));
const OtherFacilitySection = dynamic(() => import("@/components/about/OtherFacilitySection"));


const ManufacturingFacilities = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Manufacturing Facilities"} info={manufacturingFacilitiesBanner} /></LazyWrapper>
      <LazyWrapper><ManufacturingFacilitySection /></LazyWrapper>
      <LazyWrapper><ManufacturingProcess /></LazyWrapper>
      <LazyWrapper><OtherFacilitySection /></LazyWrapper>
    </div>
  )
}

export default ManufacturingFacilities