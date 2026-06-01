import React from 'react'
const Banner = React.lazy(() => import("@/components/Banner"));
import { manufacturingFacilitiesBanner } from "@/data/manufacturingFacilitiesBanner";


const ManufacturingFacilities = () => {
  return (
    <div className="content-layout">
      <Banner data={"Manufacturing Facilities"} info={manufacturingFacilitiesBanner} />
    </div>
  )
}

export default ManufacturingFacilities