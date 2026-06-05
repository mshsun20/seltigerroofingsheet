import React from 'react'
const Banner = React.lazy(() => import("@/components/Banner"))
import { meetsEventsBanner } from "@/data/meetsEventsBanner";
import LazyWrapper from '@/components/LazyWrapper';

const MeetsEvents = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Meets & Events"} info={meetsEventsBanner} /></LazyWrapper>
    </div>
  )
}

export default MeetsEvents