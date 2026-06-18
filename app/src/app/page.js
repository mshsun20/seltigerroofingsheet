import React from 'react';
import dynamic from "next/dynamic";
import "@/styles/home.css";
import LazyWrapper from "@/components/common/LazyWrapper";
const Hero = dynamic(() => import('@/components/hero/Hero'));
const About = dynamic(() => import('@/components/about/About'))
const Products = dynamic(() => import('@/components/products/Products'))
const Brands = dynamic(() => import('@/components/brands/Brands'))
const Choose = dynamic(() => import('@/components/choose/Choose'))
const Faqs = dynamic(() => import('@/components/faqs/Faqs'))

export default function Home() {
  return (
    <div className="content-layout">
      <LazyWrapper><Hero /></LazyWrapper>
      <LazyWrapper><About /></LazyWrapper>
      <LazyWrapper><Products /></LazyWrapper>
      <LazyWrapper><Brands /></LazyWrapper>
      <LazyWrapper><Choose /></LazyWrapper>
      <LazyWrapper><Faqs /></LazyWrapper>
    </div>
  );
}
