import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { alfaBanner } from "@/data/alfaBanner";
import { commonBusinessEnquiry } from "@/data/commonBusinessEnquiry";
const Banner = dynamic(() => import("@/components/common/Banner"));
const BusinessEnquiry = dynamic(() => import("@/components/business/BusinessEnquiry"));

const Alfa = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Alfa"} info={alfaBanner} /></LazyWrapper>
      <LazyWrapper><BusinessEnquiry dataSet={commonBusinessEnquiry[0]} /></LazyWrapper>
    </div>
  )
}

export default Alfa