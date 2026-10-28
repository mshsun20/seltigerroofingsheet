import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { thankYouBanner } from "@/data/thankYouBanner";
import { thankYouData } from "@/data/thankYouData";
const Banner = dynamic(() => import("@/components/common/Banner"))
const ThankYouContent = dynamic(() => import("@/components/thankyou/ThankYouContent"));

const ThankYou = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Thank You"} info={thankYouBanner} /></LazyWrapper>
      <LazyWrapper><ThankYouContent dataSet={thankYouData[0]} /></LazyWrapper>
    </div>
  )
}

export default ThankYou