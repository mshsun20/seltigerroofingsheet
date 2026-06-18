import React from 'react'
import "@/styles/components/companyoverview.css";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/common/Banner"))
import { companyOverviewBanner } from "@/data/companyOverviewBanner";
import LazyWrapper from '@/components/common/LazyWrapper';
const ReliableInfo = dynamic(() => import("@/components/about/ReliableInfo"))
const AboutCompanyInfo = dynamic(() => import("@/components/about/AboutCompanyInfo"))
const CompanyStory = dynamic(() => import("@/components/about/CompanyStory"))
const CompanyValue = dynamic(() => import("@/components/about/CompanyValue"))
const CompanyLeadership = dynamic(() => import("@/components/about/CompanyLeadership"))
const Faqs = dynamic(() => import("@/components/faqs/Faqs"))

const CompanyOverview = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"About Us"} info={companyOverviewBanner} /></LazyWrapper>
      <LazyWrapper><ReliableInfo /></LazyWrapper>
      <LazyWrapper><AboutCompanyInfo /></LazyWrapper>
      <LazyWrapper><CompanyStory /></LazyWrapper>
      <LazyWrapper><CompanyValue /></LazyWrapper>
      <LazyWrapper><CompanyLeadership /></LazyWrapper>
      <LazyWrapper><Faqs /></LazyWrapper>
    </div>
  )
}

export default CompanyOverview