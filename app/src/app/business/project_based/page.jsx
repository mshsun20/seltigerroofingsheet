import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
const Banner = dynamic(() => import("@/components/common/Banner"))
import { projectBasedBanner } from "@/data/projectBasedBanner";

const ProjectBased = () => {
  return (
    <div className="content-layout">
      <LazyWrapper><Banner data={"Roofing Sheets for Project Based"} info={projectBasedBanner} /></LazyWrapper>
    </div>
  )
}

export default ProjectBased