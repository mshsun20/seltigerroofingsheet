import React from 'react'
const Banner = React.lazy(() => import("@/components/common/Banner"));
import { manufacturingFacilitiesBanner } from "@/data/manufacturingFacilitiesBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
const ManufacturingFacilitySection = React.lazy(() => import("@/components/about/ManufacturingFacilitySection"));
const OtherFacilitySection = React.lazy(() => import("@/components/about/OtherFacilitySection"));


const ManufacturingFacilities = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Manufacturing Facilities"} info={manufacturingFacilitiesBanner} /></LazyWrapper>
      <LazyWrapper><ManufacturingFacilitySection /></LazyWrapper>
      <LazyWrapper><OtherFacilitySection /></LazyWrapper>
    </div>
  )
}

export default ManufacturingFacilities