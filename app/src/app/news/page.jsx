import React from 'react'
import "@/styles/components/news.css";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/common/Banner"));
import { newsBanner } from "@/data/newsBanner";
import { newsData } from "@/data/newsData";
import LazyWrapper from '@/components/common/LazyWrapper';
const NewsDetails = dynamic(() => import("@/components/about/NewsDetails"));

const News = () => {
  return (
    <div className="content-layout">
        <LazyWrapper><Banner data={"News & Press Releases"} info={newsBanner} /></LazyWrapper>
        <LazyWrapper><NewsDetails dataSet={newsData[0]} /></LazyWrapper>
    </div>
  )
}

export default News