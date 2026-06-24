import React from 'react'
import "@/styles/components/projectbased.css";
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { projectBasedBanner } from "@/data/projectBasedBanner";
const ProjectBasedInfo = dynamic(() => import("@/components/business/ProjectBasedInfo"));
const ProjectBasedFaqInfo = dynamic(() => import("@/components/business/ProjectBasedFaqInfo"))

const ProjectBased = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Roofing Sheets for Project Based"} info={projectBasedBanner} /></LazyWrapper>
      <LazyWrapper><ProjectBasedInfo /></LazyWrapper>
      <LazyWrapper><ProjectBasedFaqInfo /></LazyWrapper>
    </div>
  )
}

export default ProjectBased