import React from 'react';
import "@/styles/home.css";
// import Hero from "@/components/home/hero/Hero";
const Hero = React.lazy(() => import('@/components/home/hero/Hero'));

export default function Home() {
  return (
    <div className="content-layout">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </React.Suspense>
    </div>
  );
}
