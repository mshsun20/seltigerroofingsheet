import React from 'react'
const Banner = React.lazy(() => import("@/components/Banner"))
import { companyOverviewBanner } from "@/data/companyOverviewBanner";
import LazyWrapper from '@/components/LazyWrapper';
const ReliableInfo = React.lazy(() => import("@/components/about/ReliableInfo"))
const AboutCompanyInfo = React.lazy(() => import("@/components/about/AboutCompanyInfo"))
const CompanyStory = React.lazy(() => import("@/components/about/CompanyStory"))
const CompanyValue = React.lazy(() => import("@/components/about/CompanyValue"))
const CompanyLeadership = React.lazy(() => import("@/components/about/CompanyLeadership"))
const Faqs = React.lazy(() => import("@/components/faqs/Faqs"))

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