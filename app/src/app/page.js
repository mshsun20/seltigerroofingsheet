import React from 'react';
import "@/styles/home.css";
// import Hero from "@/components/home/hero/Hero";
const Hero = React.lazy(() => import('@/components/home/hero/Hero'));
const About = React.lazy(() => import('@/components/home/about/About'))
const Products = React.lazy(() => import('@/components/home/products/Products'))
const Brands = React.lazy(() => import('@/components/home/brands/Brands'))

const LazyWrapper = ({ children, fallback }) => {
  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  )
}

export default function Home() {
  return (
    <div className="content-layout">
      <LazyWrapper fallback={<div>Loading...</div>}><Hero /></LazyWrapper>
      <LazyWrapper fallback={<div>Loading...</div>}><About /></LazyWrapper>
      <LazyWrapper fallback={<div>Loading...</div>}><Products /></LazyWrapper>
      <LazyWrapper fallback={<div>Loading...</div>}><Brands /></LazyWrapper>
    </div>
  );
}
