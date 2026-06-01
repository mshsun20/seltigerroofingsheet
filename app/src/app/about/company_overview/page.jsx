import React from 'react'
const Banner = React.lazy(() => import("@/components/Banner"))
import { companyOverviewBanner } from "@/data/companyOverviewBanner";

const CompanyOverview = () => {
  return (
    <div className="content-layout">
      <Banner data={"About Us"} info={companyOverviewBanner} />
    </div>
  )
}

export default CompanyOverview