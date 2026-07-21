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
        {/* <div className={csrData[0]?.mainContent?.className}>
            {
                csrData[0]?.mainContent?.allContent?.map(elm => (
                    <div className={elm?.className} key={elm?.contentIndex}>
                        <div className={elm?.contentBackground?.className}>
                            <Image
                                src={elm?.contentBackground?.url}
                                alt={elm?.contentBackground?.alt}
                                width={elm?.contentBackground?.width}
                                height={elm?.contentBackground?.height}
                            />
                        </div>
                        <div className={elm?.contentTextuals?.className}></div>
                        <div className="csr-content-actions">
                            <Link href={`/about/csr/${elm?.contentSlug}`}>Read More</Link>
                        </div>
                    </div>
                ))
            }
        </div> */}
    </div>
  )
}

export default Csr