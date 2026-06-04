import React from 'react'
const Banner = React.lazy(() => import("@/components/Banner"));
import { manufacturingFacilitiesBanner } from "@/data/manufacturingFacilitiesBanner";
import LazyWrapper from '@/components/LazyWrapper';


const ManufacturingFacilities = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Manufacturing Facilities"} info={manufacturingFacilitiesBanner} /></LazyWrapper>
    </div>
  )
}

export default ManufacturingFacilities