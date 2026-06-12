import React from 'react';
import "@/styles/home.css";
// import Hero from "@/components/home/hero/Hero";
import LazyWrapper from "@/components/common/LazyWrapper";
const Hero = React.lazy(() => import('@/components/hero/Hero'));
const About = React.lazy(() => import('@/components/about/About'))
const Products = React.lazy(() => import('@/components/products/Products'))
const Brands = React.lazy(() => import('@/components/brands/Brands'))
const Choose = React.lazy(() => import('@/components/choose/Choose'))
const Faqs = React.lazy(() => import('@/components/faqs/Faqs'))

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
