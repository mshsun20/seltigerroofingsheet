"use client";
import React from 'react'
import dynamic from "next/dynamic";
import LazyWrapper from '@/components/common/LazyWrapper';
import { csrBanner } from "@/data/csrBanner";
import { aboutCsr } from "@/data/aboutCsr";
const Banner = dynamic(() => import("@/components/common/Banner"))
const AboutCsr = dynamic(() => import("@/components/about/AboutCsr"));
const OurCsr = dynamic(() => import("@/components/about/OurCsr"));

const Csr = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"CSR"} info={csrBanner} /></LazyWrapper>
        <LazyWrapper><AboutCsr dataSet={aboutCsr[0]} /></LazyWrapper>
        <LazyWrapper><OurCsr /></LazyWrapper>
    </div>
  )
}

export default Csr