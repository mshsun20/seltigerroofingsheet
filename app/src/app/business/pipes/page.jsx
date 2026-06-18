import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { pipeBanner } from "@/data/pipeBanner";

const Pipes = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Pipes"} info={pipeBanner} /></LazyWrapper>
    </div>
  )
}

export default Pipes