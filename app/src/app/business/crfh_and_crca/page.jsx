import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { crfhCrcaBanner } from "@/data/crfhCrcaBanner";

const CrfhAndCrca = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"CRFH & CRCA"} info={crfhCrcaBanner} /></LazyWrapper>
    </div>
  )
}

export default CrfhAndCrca