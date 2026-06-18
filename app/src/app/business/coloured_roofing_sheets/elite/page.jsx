import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"));
import { eliteBanner } from "@/data/eliteBanner";

const Elite = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Elite"} info={eliteBanner} /></LazyWrapper>
    </div>
  )
}

export default Elite