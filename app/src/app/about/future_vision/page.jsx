import React from 'react'
const Banner = React.lazy(() => import("@/components/common/Banner"))
import { futureVisionBanner } from "@/data/futureVisionBanner";
import LazyWrapper from '@/components/common/LazyWrapper';

const futureVision = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Future Vision"} info={futureVisionBanner} /></LazyWrapper>
    </div>
  )
}

export default futureVision